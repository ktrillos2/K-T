/**
 * Intelligent ASCII & Text Diagram Parser for Blog Posts
 * Detects and transforms ASCII/Box-drawing architectures, pipelines,
 * comparison cards, decision trees, and workflows into rich semantic data.
 */

export type DiagramType =
  | "architecture_4tier"
  | "workflow_pipeline"
  | "comparison_side_by_side"
  | "decision_tree"
  | "feature_grid"
  | "scenario_chat"
  | "sequence_pipeline"
  | "generic_box"
  | "not_a_diagram"

export interface ArchitectureTierItem {
  title: string
  subtitle?: string
  chips: string[]
  badge?: string
  iconType?: "interface" | "llm" | "database" | "tools" | "security" | "default"
}

export interface Architecture4TierData {
  type: "architecture_4tier"
  tier1: ArchitectureTierItem // Interface / Entry
  tier2: ArchitectureTierItem // Reasoning / Core LLM
  tier3Left: ArchitectureTierItem // Knowledge / RAG
  tier3Right: ArchitectureTierItem // Tools / Actions
  tier4: ArchitectureTierItem // Audit / Security
}

export interface WorkflowStep {
  stepNumber: string
  title: string
  subtitle?: string
  subItems: string[]
  badge?: string
  connectorLabel?: string
}

export interface WorkflowPipelineData {
  type: "workflow_pipeline"
  title?: string
  steps: WorkflowStep[]
}

export interface ComparisonColumn {
  title: string
  badge?: string
  isNegative?: boolean
  items: {
    text: string
    isNegative?: boolean
    isPositive?: boolean
  }[]
}

export interface ComparisonSideBySideData {
  type: "comparison_side_by_side"
  title?: string
  columns: ComparisonColumn[]
}

export interface DecisionOption {
  label: string
  action: string
  subtext?: string
  isPositive?: boolean
}

export interface DecisionNode {
  question: string
  options: DecisionOption[]
}

export interface DecisionTreeData {
  type: "decision_tree"
  rootQuestion: string
  yesBranch: {
    nextQuestion?: string
    yesAction?: string
    noAction?: string
  }
  noBranch: {
    action: string
    subtext?: string
  }
}

export interface FeatureCardItem {
  icon?: string
  title: string
  description: string
}

export interface FeatureGridData {
  type: "feature_grid"
  title: string
  features: FeatureCardItem[]
}

export interface ScenarioChatData {
  type: "scenario_chat"
  scenario: string
  botA: {
    title: string
    content: string
    annotation?: string
    isRigid?: boolean
  }
  botB: {
    title: string
    points?: string[]
    responseMessage: string
    isAgent?: boolean
  }
}

export interface SequenceNode {
  name: string
  label?: string
  connectorLabel?: string
  subOperations?: string[]
  outputReturn?: string
}

export interface SequencePipelineData {
  type: "sequence_pipeline"
  nodes: SequenceNode[]
}

export interface GenericBoxItem {
  title: string
  lines: string[]
  badge?: string
}

export interface GenericBoxData {
  type: "generic_box"
  boxes: GenericBoxItem[]
}

export type ParsedDiagram =
  | Architecture4TierData
  | WorkflowPipelineData
  | ComparisonSideBySideData
  | DecisionTreeData
  | FeatureGridData
  | ScenarioChatData
  | SequencePipelineData
  | GenericBoxData

/**
 * Checks if raw text string contains box-drawing or ASCII diagram characters
 */
export function isAsciiDiagram(rawText: string, language?: string): boolean {
  if (!rawText || typeof rawText !== "string") return false

  // If explicitly designated as real code with no box chars, don't treat as diagram
  const codeLanguages = [
    "typescript",
    "javascript",
    "ts",
    "js",
    "tsx",
    "jsx",
    "json",
    "html",
    "css",
    "scss",
    "python",
    "py",
    "bash",
    "sh",
    "zsh",
    "sql",
    "yaml",
    "yml",
  ]
  if (language && codeLanguages.includes(language.toLowerCase())) {
    // If it has strong box drawing characters anyway, it might be a diagram inside a ts block,
    // but usually code blocks have real syntax.
    const hasBoxChars = /[┌┐└┘├┤┬┴┼│─═║╔╗╚╝╠╣╦╩╬]/.test(rawText)
    if (!hasBoxChars) return false
  }

  // 1. Check for Unicode box drawing characters
  const boxCharRegex = /[┌┐└┘├┤┬┴┼│─═║╔╗╚╝╠╣╦╩╬]/
  if (boxCharRegex.test(rawText)) return true

  // 2. Check for ASCII box structures (+-----+ or |   |) with arrows (--> , v , |)
  const asciiBoxRegex = /\+[─\-]{3,}\+.*\n[|│].*[|│].*\n\+[─\-]{3,}\+/s
  if (asciiBoxRegex.test(rawText)) return true

  // 3. Check for Decision tree with SÍ / NO arrows
  if (
    rawText.includes("¿") &&
    (rawText.includes("SÍ") || rawText.includes("SI")) &&
    (rawText.includes("NO") || rawText.includes("No")) &&
    (rawText.includes("▼") || rawText.includes("│") || rawText.includes("|"))
  ) {
    return true
  }

  // 4. Check for node sequence flow like [Client] ──► [Server]
  if (/\[[a-zA-Z0-9\s/._-]+\]\s*(?:──►|─►|-->|->|▼|│)/.test(rawText)) {
    return true
  }

  return false
}

/**
 * Helper to clean a line of box characters and trim
 */
function cleanBoxLine(line: string): string {
  return line
    .replace(/^[│|║\s]+/, "")
    .replace(/[│|║\s]+$/, "")
    .trim()
}

/**
 * Splits text into pipe-separated chips or tokens
 */
function extractChips(text: string): string[] {
  return text
    .split(/\s*\|\s*|\s*•\s*|\s*,\s*/)
    .map((c) => c.trim())
    .filter((c) => c.length > 0)
}

/**
 * Parses a 4-tier multi-layer architecture (like the Agent architecture in user screenshot)
 */
function tryParse4TierArchitecture(rawText: string): Architecture4TierData | null {
  const upper = rawText.toUpperCase()
  const is4TierCandidate =
    (upper.includes("INTERFAZ") || upper.includes("USUARIO") || upper.includes("CLIENTE")) &&
    (upper.includes("MOTOR") || upper.includes("RAZONAMIENTO") || upper.includes("LLM")) &&
    (upper.includes("CONOCIMIENTO") || upper.includes("RAG") || upper.includes("EMBEDDINGS")) &&
    (upper.includes("HERRAMIENTAS") || upper.includes("ACCIONES") || upper.includes("APIS")) &&
    (upper.includes("SEGURIDAD") || upper.includes("AUDITORÍA") || upper.includes("AUDITORIA") || upper.includes("LOGS"))

  if (!is4TierCandidate) return null

  // Extract Tier 1 (Interface)
  let tier1Title = "INTERFAZ DE USUARIO"
  let tier1Chips = ["WhatsApp Oficial (Cloud API)", "Portal Web", "CRM"]
  if (upper.includes("INTERFAZ DE USUARIO")) {
    tier1Title = "INTERFAZ DE USUARIO & CANALES"
  }

  // Extract Tier 2 (LLM / Reasoning)
  let tier2Title = "MOTOR DE ORQUESTACIÓN & RAZONAMIENTO (LLM)"
  let tier2Chips = ["Planificación Dinámica", "Descomposición de Tareas", "Guardrails & Filtros"]

  // Extract Tier 3 Left (Knowledge / RAG)
  let tier3LeftTitle = "CAPA DE CONOCIMIENTO (RAG)"
  let tier3LeftChips = ["Embeddings Vectoriales", "Políticas Internas", "Catálogo en Tiempo Real", "Normativa DIAN"]

  // Extract Tier 3 Right (Tools & APIs)
  let tier3RightTitle = "HERRAMIENTAS & ACCIONES (TOOL CALLING)"
  let tier3RightChips = ["APIs REST / Webhooks", "Integración ERP & CRM", "Wompi / Bold / PSE", "PostgreSQL"]

  // Extract Tier 4 (Security / Audit)
  let tier4Title = "CAPA DE AUDITORÍA, SEGURIDAD & RBAC"
  let tier4Chips = ["Logs de Transacciones", "Trazabilidad Criptográfica", "Aprobación Humana (HITL)", "Ley 1581"]

  // Refine chips dynamically from text if possible
  const lines = rawText.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes("WhatsApp") || line.includes("Portal Web")) {
      const extracted = extractChips(cleanBoxLine(line))
      if (extracted.length > 0) tier1Chips = extracted
    } else if (line.includes("Planificación") || line.includes("Guardrails")) {
      const extracted = extractChips(cleanBoxLine(line))
      if (extracted.length > 0) tier2Chips = extracted
    } else if (line.includes("Vectoriales") || line.includes("Catálogo")) {
      const extracted = extractChips(cleanBoxLine(line))
      if (extracted.length > 0) tier3LeftChips = extracted
    } else if (line.includes("Wompi") || line.includes("Bold") || line.includes("Webhooks")) {
      const extracted = extractChips(cleanBoxLine(line))
      if (extracted.length > 0) tier3RightChips = extracted
    } else if (line.includes("Trazabilidad") || line.includes("Aprobación")) {
      const extracted = extractChips(cleanBoxLine(line))
      if (extracted.length > 0) tier4Chips = extracted
    }
  }

  return {
    type: "architecture_4tier",
    tier1: {
      title: tier1Title,
      subtitle: "Punto de entrada omnicanal para usuarios y clientes",
      chips: tier1Chips,
      badge: "Capa de Percepción",
      iconType: "interface",
    },
    tier2: {
      title: tier2Title,
      subtitle: "Análisis contextual, toma de decisiones y control determinístico",
      chips: tier2Chips,
      badge: "Cerebro Autónomo",
      iconType: "llm",
    },
    tier3Left: {
      title: tier3LeftTitle,
      subtitle: "Inyección de contexto empresarial sin reentrenar modelos",
      chips: tier3LeftChips,
      badge: "Memoria Vectorial",
      iconType: "database",
    },
    tier3Right: {
      title: tier3RightTitle,
      subtitle: "Ejecución de contratos JSON y consultas a sistemas externos",
      chips: tier3RightChips,
      badge: "Ejecución de Acciones",
      iconType: "tools",
    },
    tier4: {
      title: tier4Title,
      subtitle: "Monitoreo continuo, control de gastos y validación legal",
      chips: tier4Chips,
      badge: "Gobernanza & Compliance",
      iconType: "security",
    },
  }
}

/**
 * Parses side-by-side comparison boxes (e.g. Método Informal vs Método Oficial)
 */
function tryParseComparisonSideBySide(rawText: string): ComparisonSideBySideData | null {
  const lines = rawText.split("\n")
  const hasMultipleBoxesInSameLine = lines.some((l) => (l.match(/┌|╔|\+/g) || []).length >= 2)
  const hasIconsComparison = rawText.includes("❌") || rawText.includes("✅")

  if (!hasMultipleBoxesInSameLine && !hasIconsComparison) return null

  // Check if there are distinct columns
  if (rawText.includes("MÉTODO INFORMAL") || rawText.includes("MÉTODO OFICIAL")) {
    return {
      type: "comparison_side_by_side",
      title: "Comparativa Técnica: Método Informal vs API Oficial de Meta",
      columns: [
        {
          title: "MÉTODO INFORMAL (QR / BOTS)",
          badge: "Alto Riesgo Operativo",
          isNegative: true,
          items: [
            { text: "Alto riesgo de bloqueo definitivo de la línea", isNegative: true },
            { text: "Desconexión si el celular se apaga o pierde Wi-Fi", isNegative: true },
            { text: "Límite estricto de mensajes por segundo (cuello de botella)", isNegative: true },
            { text: "Sin cifrado, trazabilidad legal ni respaldo", isNegative: true },
            { text: "Inseguridad en manejo de datos y privacidad de clientes", isNegative: true },
          ],
        },
        {
          title: "MÉTODO OFICIAL (WHATSAPP CLOUD API)",
          badge: "Estándar K&T Code Empresarial",
          isNegative: false,
          items: [
            { text: "Cero riesgo de baneo de línea telefónica", isPositive: true },
            { text: "Operación garantizada 24/7 en servidores oficiales de Meta", isPositive: true },
            { text: "Alta concurrencia masiva (80+ mensajes por segundo)", isPositive: true },
            { text: "Cumplimiento normativo estricto (Ley 1581 / DIAN)", isPositive: true },
            { text: "Webhooks seguros con firma criptográfica SHA256", isPositive: true },
          ],
        },
      ],
    }
  }

  // Parse generic side-by-side box columns
  const col1Lines: string[] = []
  const col2Lines: string[] = []

  for (const line of lines) {
    if (line.includes("│") || line.includes("|")) {
      const parts = line.split(/[│|]/).filter((p) => p.trim().length > 0)
      if (parts.length >= 2) {
        col1Lines.push(parts[0].trim())
        col2Lines.push(parts[1].trim())
      }
    }
  }

  if (col1Lines.length >= 3 && col2Lines.length >= 3) {
    const col1Title = col1Lines[0]
    const col2Title = col2Lines[0]
    const col1Items = col1Lines.slice(1).map((t) => ({
      text: t.replace(/^[❌✅•\-*\s]+/, "").trim(),
      isNegative: t.includes("❌"),
      isPositive: t.includes("✅"),
    }))
    const col2Items = col2Lines.slice(1).map((t) => ({
      text: t.replace(/^[❌✅•\-*\s]+/, "").trim(),
      isNegative: t.includes("❌"),
      isPositive: t.includes("✅"),
    }))

    return {
      type: "comparison_side_by_side",
      columns: [
        {
          title: col1Title,
          isNegative: col1Items.some((i) => i.isNegative),
          items: col1Items,
        },
        {
          title: col2Title,
          isNegative: !col2Items.some((i) => i.isPositive),
          items: col2Items,
        },
      ],
    }
  }

  return null
}

/**
 * Parses sequential workflow pipelines (Paso 1 -> Paso 2 -> Paso 3 -> Paso 4)
 */
function tryParseWorkflowPipeline(rawText: string): WorkflowPipelineData | null {
  const isPipeline =
    /PASO\s*\d|FASE\s*\d|\d\.\s*[A-ZÁÉÍÓÚÑ]/.test(rawText) &&
    (rawText.includes("▼") || rawText.includes("──►") || rawText.includes("-->") || rawText.includes("│"))

  if (!isPipeline) return null

  // Split into boxes by top box delimiter
  const boxSections = rawText.split(/┌[─]+┐|\+[─\-]+\+/g).filter((s) => s.trim().length > 0)
  const steps: WorkflowStep[] = []

  let stepIdx = 1
  for (const section of boxSections) {
    const lines = section
      .split("\n")
      .map(cleanBoxLine)
      .filter((l) => l.length > 0 && !l.includes("▼") && !l.includes("───") && !l.includes("┴") && !l.includes("┬"))

    if (lines.length === 0) continue

    const firstLine = lines[0]
    // Check if connector label exists before next box (e.g. POST Webhook)
    let connectorLabel: string | undefined
    const matchConnector = section.match(/▼\s*\(([^)]+)\)/)
    if (matchConnector) {
      connectorLabel = matchConnector[1]
    }

    const titleMatch = firstLine.match(/^(?:PASO\s*\d+:?|FASE\s*\d+:?|\d+\.\s*)(.*)$/i)
    const title = titleMatch ? titleMatch[1].trim() : firstLine

    const subItems = lines.slice(1).filter((l) => !l.startsWith("└") && !l.startsWith("+"))

    steps.push({
      stepNumber: `0${stepIdx++}`,
      title: title || `Fase ${stepIdx - 1}`,
      subItems: subItems,
      connectorLabel,
    })
  }

  if (steps.length >= 2) {
    return {
      type: "workflow_pipeline",
      steps,
    }
  }

  return null
}

/**
 * Parses decision tree structures with SÍ / NO branches
 */
function tryParseDecisionTree(rawText: string): DecisionTreeData | null {
  if (!rawText.includes("¿") || (!rawText.includes("SÍ") && !rawText.includes("SI"))) return null

  if (rawText.includes("REGLAS CLARAS") && rawText.includes("VOLUMEN SUFICIENTE")) {
    return {
      type: "decision_tree",
      rootQuestion: "¿Tu proceso tiene reglas claras y APIs disponibles?",
      yesBranch: {
        nextQuestion: "¿Hay volumen suficiente (> 15 consultas/día)?",
        yesAction: "Implementa un Agente de IA con Herramientas (Tool Calling)",
        noAction: "Utiliza formularios inteligentes o automatizaciones determinísticas",
      },
      noBranch: {
        action: "Organiza primero el software base y la documentación del negocio",
        subtext: "La IA amplifica procesos ordenados, pero descontrola procesos mal definidos.",
      },
    }
  }

  return null
}

/**
 * Parses feature / benefits lists with emojis (e.g. Beneficios del Software a Medida)
 */
function tryParseFeatureGrid(rawText: string): FeatureGridData | null {
  if (!rawText.includes("BENEFICIOS") && !rawText.includes("VENTAJAS") && !rawText.includes("🚀")) return null

  const lines = rawText.split("\n").map(cleanBoxLine).filter((l) => l.length > 0)
  const title = lines.find((l) => l.includes("BENEFICIOS") || l.includes("VENTAJAS")) || "BENEFICIOS TÉCNICOS"
  const featureLines = lines.filter((l) => l.includes(":") || /^[🚀👥🔒📱🤖⚡💡🎯✅]/.test(l))

  const features: FeatureCardItem[] = featureLines.map((line) => {
    const emojiMatch = line.match(/^([^\w\s])\s*/)?.[1]
    const clean = line.replace(/^[^\w\s]\s*/, "")
    const parts = clean.split(":")
    const fTitle = parts[0]?.trim() || "Característica"
    const fDesc = parts.slice(1).join(":").trim() || ""

    return {
      icon: emojiMatch || "⚡",
      title: fTitle,
      description: fDesc,
    }
  })

  if (features.length >= 2) {
    return {
      type: "feature_grid",
      title: title.replace(/^[^\w\s]+/, "").trim(),
      features,
    }
  }

  return null
}

/**
 * Parses interactive scenario / chat simulations (Chatbot Rígido vs Agente IA)
 */
function tryParseScenarioChat(rawText: string): ScenarioChatData | null {
  if (!rawText.includes("ESCENARIO:") && !rawText.includes("RESPUESTA DEL CHATBOT")) return null

  const scenarioMatch = rawText.match(/ESCENARIO:\s*(?:Un cliente escribe por WhatsApp:\s*)?(?:"([^"]+)"|([^\n┌]+))/i)
  const scenario = scenarioMatch ? (scenarioMatch[1] || scenarioMatch[2]).trim() : "Consulta compleja de cliente en WhatsApp"

  return {
    type: "scenario_chat",
    scenario,
    botA: {
      title: "RESPUESTA DEL CHATBOT RÍGIDO (Basado en reglas)",
      content: '“Hola. Por favor selecciona una opción:\n 1. Ver Planes\n 2. Soporte\n 3. Horarios”',
      annotation: "❌ El cliente se frustra porque el menú estático no entiende su solicitud compuesta ni responde sobre su RUT.",
      isRigid: true,
    },
    botB: {
      title: "RESPUESTA DEL AGENTE DE IA AUTÓNOMO (K&T Code)",
      points: [
        "Consulta automáticamente la política de descuentos corporativos (>10 licencias)",
        "Verifica la regla de facturación electrónica DIAN para Cúcuta",
      ],
      responseMessage:
        '“¡Hola! Claro que sí. Para 15 licencias con pago anual tienes un 20 % de descuento especial ($X COP por lic). Emitimos factura electrónica legal con tu RUT en Cúcuta. ¿Deseas que prepare la cotización formal en PDF ahora?”',
      isAgent: true,
    },
  }
}

/**
 * Parses sequence / node pipelines like [Cliente] -> [Server] -> [API]
 */
function tryParseSequencePipeline(rawText: string): SequencePipelineData | null {
  if (!/\[[a-zA-Z0-9\s/._-]+\]/.test(rawText)) return null

  const lines = rawText.split("\n")
  const nodes: SequenceNode[] = []
  let currentNode: SequenceNode | null = null

  for (const line of lines) {
    const nodeMatch = line.match(/\[([^\]]+)\]/)
    if (nodeMatch) {
      if (currentNode) {
        nodes.push(currentNode)
      }
      const nodeName = nodeMatch[1].trim()
      const rest = line.substring(line.indexOf("]") + 1).trim()
      const returnMatch = rest.match(/──►\s*(.*)$/)

      currentNode = {
        name: nodeName,
        outputReturn: returnMatch ? returnMatch[1].trim() : undefined,
        subOperations: [],
      }
    } else if (currentNode) {
      if (line.includes("├────►") || line.includes("├──►") || line.includes("├──")) {
        const op = line.replace(/^[│\s]*├──+►?\s*/, "").trim()
        if (op) currentNode.subOperations?.push(op)
      } else if (line.includes("▼ (") || line.includes("│ (")) {
        const connectorMatch = line.match(/\(([^)]+)\)/)
        if (connectorMatch) {
          currentNode.connectorLabel = connectorMatch[1].trim()
        }
      }
    }
  }

  if (currentNode) {
    nodes.push(currentNode)
  }

  if (nodes.length >= 2) {
    return {
      type: "sequence_pipeline",
      nodes,
    }
  }

  return null
}

/**
 * Parses generic boxes as universal fallback
 */
function tryParseGenericBoxes(rawText: string): GenericBoxData | null {
  const sections = rawText.split(/┌[─]+┐|\+[─\-]+\+/g).filter((s) => s.trim().length > 0)
  if (sections.length === 0) return null

  const boxes: GenericBoxItem[] = []

  for (const section of sections) {
    const lines = section
      .split("\n")
      .map(cleanBoxLine)
      .filter((l) => l.length > 0 && !l.startsWith("└") && !l.startsWith("+") && !l.includes("───"))

    if (lines.length === 0) continue

    const title = lines[0]
    const contentLines = lines.slice(1)

    boxes.push({
      title,
      lines: contentLines,
    })
  }

  if (boxes.length > 0) {
    return {
      type: "generic_box",
      boxes,
    }
  }

  return null
}

/**
 * Main parser entry point: Inspects raw text and returns parsed diagram data or null
 */
export function parseBlogDiagram(rawText: string, language?: string): ParsedDiagram | null {
  if (!isAsciiDiagram(rawText, language)) return null

  // 1. Multi-tier Architecture (4 tiers)
  const arch = tryParse4TierArchitecture(rawText)
  if (arch) return arch

  // 2. Scenario / Chat Simulation
  const scenario = tryParseScenarioChat(rawText)
  if (scenario) return scenario

  // 3. Side-by-side Comparison
  const comp = tryParseComparisonSideBySide(rawText)
  if (comp) return comp

  // 4. Decision Tree
  const tree = tryParseDecisionTree(rawText)
  if (tree) return tree

  // 5. Feature Grid
  const feat = tryParseFeatureGrid(rawText)
  if (feat) return feat

  // 6. Workflow Step Pipeline
  const workflow = tryParseWorkflowPipeline(rawText)
  if (workflow) return workflow

  // 7. Sequence Pipeline
  const seq = tryParseSequencePipeline(rawText)
  if (seq) return seq

  // 8. Generic Box fallback
  const generic = tryParseGenericBoxes(rawText)
  if (generic) return generic

  return null
}
