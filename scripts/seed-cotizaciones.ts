/**
 * Script para subir las 5 cotizaciones existentes a Sanity.
 * Ejecutar con: npx tsx scripts/seed-cotizaciones.ts
 */
import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'bc3zxc91',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2026-01-28',
  useCdn: false,
})

interface Cotizacion {
  _type: 'cotizacion'
  title: string
  slug: { _type: 'slug'; current: string }
  subdomain: string
  password: string
  clientName: string
  isActive: boolean
  headerTitle: string
  headerSubtitle?: string
  date: string
  validityDays: string
  scopeTitle: string
  scopeDescription: string
  scopeItems: { _type: 'scopeItem'; _key: string; title: string; description: string }[]
  investmentTitle: string
  currency: string
  investmentItems: { _type: 'investmentItem'; _key: string; concept: string; value?: string; isIncluded: boolean }[]
  totalLabel: string
  totalValue: string
  termsTitle: string
  termsCards: { _type: 'termsCard'; _key: string; title: string; content: string; isFullWidth: boolean; isWarning: boolean }[]
  paymentTitle: string
  showInternationalPayments: boolean
  internationalPaymentMethods?: { _type: 'intlPayment'; _key: string; name: string; description: string; recommended: boolean }[]
  warrantyTitle: string
  warrantyDescription: string
  warrantyCoverageTitle: string
  warrantyCoverage: string[]
  warrantyExclusionsTitle: string
  warrantyExclusions: string[]
  whatsappMessage: string
}

const cotizaciones: Cotizacion[] = [
  // ─── 1. Gestión Publicitaria y Creación de Contenido ────────────
  {
    _type: 'cotizacion',
    title: 'Gestión Publicitaria y Creación de Contenido',
    slug: { _type: 'slug', current: 'gestion-publicitaria-contenido' },
    subdomain: 'publicidad',
    password: 'cot_publicidad2026',
    clientName: 'Gestión Publicitaria y Creación de Contenido',
    isActive: true,
    headerTitle: 'COTIZACIÓN DE GESTIÓN PUBLICITARIA',
    headerSubtitle: '(Y CREACIÓN DE CONTENIDO)',
    date: '15 de marzo de 2026',
    validityDays: '15 días calendario',
    scopeTitle: 'Alcance Detallado del Proyecto: Pauta y Contenido',
    scopeDescription: 'La presente propuesta contempla la administración profesional de campañas publicitarias y la producción gráfica necesaria para alimentar los anuncios y mantenerlos en constante optimización:',
    scopeItems: [
      { _type: 'scopeItem', _key: 'scope1', title: 'Administración y Optimización de Anuncios', description: 'Gestión técnica de las campañas en Meta Ads (Facebook e Instagram). Incluye segmentación de público objetivo, monitoreo de métricas, distribución de presupuesto y ajustes continuos para maximizar el retorno de inversión.' },
      { _type: 'scopeItem', _key: 'scope2', title: 'Creación de Contenido (Creativos)', description: 'Diseño de piezas gráficas orientadas a la conversión. El paquete mensual incluye un total de cuatro (4) imágenes y cuatro (4) carruseles.' },
      { _type: 'scopeItem', _key: 'scope3', title: 'Estrategia de Entrega (2 por semana)', description: 'Para evitar la fatiga del anuncio y mantener la optimización del algoritmo, se entregarán e implementarán dos (2) creativos nuevos cada semana.' },
      { _type: 'scopeItem', _key: 'scope4', title: 'Optimización SEO en Copywriting', description: 'Redacción persuasiva de los textos (copys) de los anuncios aplicando principios de SEO (palabras clave relevantes) para mejorar la relevancia del anuncio y disminuir el costo por clic.' },
      { _type: 'scopeItem', _key: 'scope5', title: 'Infraestructura Web (Opcional)', description: 'En caso de requerir el desarrollo de una Landing Page para dirigir el tráfico de estos anuncios, el hosting siempre será Vercel para todas las cotizaciones, garantizando máxima velocidad y conversión.' },
    ],
    investmentTitle: 'Inversión Mensual',
    currency: 'USD',
    investmentItems: [
      { _type: 'investmentItem', _key: 'inv1', concept: 'Administración, Segmentación y Optimización de Anuncios en Meta Ads', value: '$150 USD', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv2', concept: 'Producción de Contenido (4 Imágenes y 4 Carruseles entregados a 2 por semana)', value: '$100 USD', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv3', concept: 'Optimización SEO en textos publicitarios', value: '', isIncluded: true },
    ],
    totalLabel: 'Total Inversión Mensual',
    totalValue: '$250 USD',
    termsTitle: 'Condiciones Comerciales y Facturación',
    termsCards: [
      { _type: 'termsCard', _key: 'term1', title: 'Ciclo de Trabajo', content: 'El servicio tiene una duración de 30 días calendario y se renueva mes a mes.', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term2', title: 'Forma de Pago', content: 'El pago del servicio de gestión y creación de contenido se realiza 100% por anticipado durante los primeros cinco (5) días del ciclo de trabajo.\n\n(Nota: El presupuesto de inversión directa para pagarle a Facebook/Meta lo asume directamente el cliente desde su tarjeta).', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term3', title: 'Concepto de Facturación', content: 'Para futuras facturas o cuentas de cobro generadas a partir de esta cotización, el concepto de servicio se especificará de la siguiente manera:\n\n"Servicio de gestión publicitaria y creación de contenido digital para [Nombre del Cliente/Empresa] - Mes [Mes correspondiente]"', isFullWidth: true, isWarning: false },
    ],
    paymentTitle: 'Medios de Pago Internacional y Nacional',
    showInternationalPayments: true,
    internationalPaymentMethods: [
      { _type: 'intlPayment', _key: 'intl1', name: 'DolarApp', description: 'Plataforma rápida, sin comisiones ocultas y con acreditación inmediata.', recommended: true },
      { _type: 'intlPayment', _key: 'intl2', name: 'Western Union', description: 'Envío de divisas internacional a nombre del titular.', recommended: false },
      { _type: 'intlPayment', _key: 'intl3', name: 'Consignación a Cuenta Bancaria Estadounidense', description: '(Datos proporcionados al confirmar).', recommended: false },
    ],
    warrantyTitle: 'Política de Garantía del Servicio Publicitario',
    warrantyDescription: 'Para este servicio continuo, se establece la siguiente garantía estricta sobre la ejecución:',
    warrantyCoverageTitle: 'Cobertura de Ejecución',
    warrantyCoverage: [
      'K&T garantiza el cumplimiento riguroso en los tiempos de entrega pautados (2 creativos semanales listos para pauta).',
      'Se garantiza la revisión y optimización semanal de las campañas para evitar el gasto ineficiente del presupuesto publicitario.',
      'En caso de detectarse un error en la segmentación aplicada por la agencia, se corregirá de manera inmediata.',
    ],
    warrantyExclusionsTitle: 'Exclusiones Estrictas',
    warrantyExclusions: [
      'K&T no puede garantizar un número exacto de ventas, seguidores o ingresos monetarios, ya que esto depende del comportamiento del mercado, la competitividad del precio del producto/servicio y la gestión comercial interna que el cliente realice con los prospectos (leads) generados.',
      'La garantía no cubre bloqueos de cuentas publicitarias generados por incumplimiento de las políticas de Meta ajenos a los creativos diseñados por la agencia.',
    ],
    whatsappMessage: 'Hola, tengo dudas sobre la cotización del Proyecto de Gestión Publicitaria',
  },

  // ─── 2. Curso Actuación ─────────────────────────────────────────
  {
    _type: 'cotizacion',
    title: 'Plataforma de Cursos Online - Actuación',
    slug: { _type: 'slug', current: 'curso-actuacion' },
    subdomain: 'clases',
    password: 'cot_actuacion2026',
    clientName: 'Curso Actuación',
    isActive: true,
    headerTitle: 'COTIZACIÓN DE DESARROLLO WEB',
    headerSubtitle: '(PLATAFORMA DE CURSOS ONLINE)',
    date: '10 de marzo de 2026',
    validityDays: '15 días calendario',
    scopeTitle: 'Alcance Detallado del Proyecto',
    scopeDescription: 'Plataforma de Clases de Actuación: La presente propuesta contempla el diseño y desarrollo de una plataforma web educativa transaccional, enfocada en la comercialización y visualización de un programa pregrabado de técnicas de actuación para la vida (dirigido a no actores):',
    scopeItems: [
      { _type: 'scopeItem', _key: 'scope1', title: 'Estructura Web y Diseño', description: 'Creación de una interfaz atractiva para presentar el programa, los beneficios del curso y la información del instructor, orientada a la conversión y venta.' },
      { _type: 'scopeItem', _key: 'scope2', title: 'Sistema de Autenticación', description: 'Registro e inicio de sesión seguro para los estudiantes (creación y validación de cuentas).' },
      { _type: 'scopeItem', _key: 'scope3', title: 'Módulo de Curso (E-learning)', description: 'Área privada y exclusiva para usuarios que hayan comprado el programa, donde podrán visualizar las clases en video de manera organizada y secuencial.' },
      { _type: 'scopeItem', _key: 'scope4', title: 'Panel de Administración (CMS)', description: 'Sistema de gestión propio para que el administrador pueda subir nuevos videos, estructurar las lecciones del curso y gestionar los accesos de los alumnos.' },
      { _type: 'scopeItem', _key: 'scope5', title: 'Sistema de Compras', description: 'Integración de un carrito y pasarela de pago para procesar la venta del curso de forma 100% automatizada.' },
      { _type: 'scopeItem', _key: 'scope6', title: 'Tecnología e Infraestructura', description: 'Desarrollo de alto rendimiento alojado en Vercel, garantizando tiempos de carga ultrarrápidos y máxima estabilidad sin costos mensuales de servidor.' },
      { _type: 'scopeItem', _key: 'scope7', title: 'Optimización SEO Técnico', description: 'Implementación de estructuración de código y etiquetas meta optimizadas para facilitar el posicionamiento orgánico en Google.' },
    ],
    investmentTitle: 'Inversión del Proyecto',
    currency: 'COP',
    investmentItems: [
      { _type: 'investmentItem', _key: 'inv1', concept: 'Desarrollo Web (Plataforma E-learning, Login, Módulo de Videos y Sistema de Compras)', value: '$900.000', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv2', concept: 'Panel de Administración para Carga y Gestión de Videos', value: '', isIncluded: true },
      { _type: 'investmentItem', _key: 'inv3', concept: 'Infraestructura (Hosting Vercel) y Optimización SEO Técnico', value: '', isIncluded: true },
    ],
    totalLabel: 'Total Proyecto Base',
    totalValue: '$900.000',
    termsTitle: 'Condiciones Comerciales y Tiempos',
    termsCards: [
      { _type: 'termsCard', _key: 'term1', title: 'Forma de Pago', content: '50% Abono inicial: $450.000 COP\n50% Contra entrega final: $450.000 COP', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term2', title: 'Tiempos de Desarrollo', content: 'El tiempo de ejecución por parte de K&T es de 2 a 3 semanas una vez recibida toda la información inicial (textos, logos, videos del curso y credenciales de la pasarela de pago).', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term3', title: 'Cláusula de Límite Máximo', content: 'El proyecto tiene un ciclo de vida máximo de 6 semanas. Si transcurrido este límite el proyecto no se ha podido concluir por problemas de comunicación o falta de entrega de material (ej. demoras en el envío de los videos o textos) por parte del cliente, el desarrollo se dará por finalizado de manera unilateral. Se entregará el código en su estado actual y se procederá con el cobro del saldo restante.', isFullWidth: true, isWarning: true },
    ],
    paymentTitle: 'Medios de Pago',
    showInternationalPayments: false,
    warrantyTitle: 'Garantía y Soporte',
    warrantyDescription: 'Se otorga una Garantía Técnica de 1 mes (30 días) contados a partir de la fecha de entrega y publicación en producción.',
    warrantyCoverageTitle: 'Cobertura Incluida',
    warrantyCoverage: [
      'Resolución de errores de código (bugs) que afecten la navegación.',
      'Corrección de fallos en la comunicación con la pasarela de pagos.',
      'Corrección de fallos de diseño responsivo (visualización incorrecta en dispositivos móviles).',
      'Soporte frente a intermitencias derivadas netamente del Hosting en Vercel.',
    ],
    warrantyExclusionsTitle: 'Exclusiones',
    warrantyExclusions: [
      'Cambios en diseño o estructura una vez aprobada la fase inicial.',
      'Desarrollo de nuevas funcionalidades no contratadas inicialmente.',
      'Desconfiguraciones por manipulación de código de terceros no autorizados.',
    ],
    whatsappMessage: 'Hola, tengo dudas sobre la cotización de la Plataforma de Cursos Online',
  },

  // ─── 3. Tours Amazonas ──────────────────────────────────────────
  {
    _type: 'cotizacion',
    title: 'Desarrollo Web y Marketing Digital - Tours Amazonas',
    slug: { _type: 'slug', current: 'tours-amazonas' },
    subdomain: 'tours',
    password: 'tours_amazonas2026',
    clientName: 'Tours Amazonas',
    isActive: true,
    headerTitle: 'COTIZACIÓN DE DESARROLLO WEB Y MARKETING DIGITAL',
    headerSubtitle: '(TOURS AMAZONAS)',
    date: '11 de marzo de 2026',
    validityDays: '15 días calendario',
    scopeTitle: 'Alcance Detallado del Proyecto',
    scopeDescription: 'Plataforma Turística y Publicidad: La presente propuesta contempla el desarrollo de una plataforma web orientada a la captación de clientes extranjeros para tours en el Amazonas, junto con la gestión estratégica de campañas publicitarias:',
    scopeItems: [
      { _type: 'scopeItem', _key: 'scope1', title: 'Desarrollo Web Escalonado', description: 'Creación de una interfaz gráfica moderna, atractiva y adaptable a dispositivos móviles, diseñada para resaltar la experiencia turística en la selva amazónica y facilitar el contacto con clientes internacionales.' },
      { _type: 'scopeItem', _key: 'scope2', title: 'Tecnología e Infraestructura', description: 'Desarrollo de alto rendimiento con alojamiento en Vercel, garantizando tiempos de carga ultrarrápidos y máxima estabilidad global sin costos mensuales de servidor web.' },
      { _type: 'scopeItem', _key: 'scope3', title: 'Optimización SEO Avanzado', description: 'Implementación de estructuración de código, etiquetas meta y jerarquía técnica optimizadas para facilitar el posicionamiento orgánico de los tours en las búsquedas de Google a nivel internacional.' },
      { _type: 'scopeItem', _key: 'scope4', title: 'Gestión de Pauta Digital', description: 'Administración profesional de campañas publicitarias para maximizar el retorno de inversión y la captación de leads (clientes potenciales).' },
    ],
    investmentTitle: 'Opciones de Inversión: Desarrollo Web',
    currency: 'COP',
    investmentItems: [
      { _type: 'investmentItem', _key: 'inv1', concept: 'Opción 1: Landing Page - Sitio web de una sola página diseñado para conversión rápida e información concisa.', value: '$450.000', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv2', concept: 'Opción 2: Web Multipágina - Estructura base con secciones: Inicio, Nosotros, Servicios, etc.', value: '$650.000', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv3', concept: 'Opción 3: Web Completa (Recomendada) - Multipágina con apartado exclusivo de Tours y Contacto.', value: '$850.000', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv4', concept: 'Secciones Adicionales', value: '$100.000 c/u', isIncluded: false },
    ],
    totalLabel: 'Administración de Meta Ads (Mensual)',
    totalValue: '$350.000 COP',
    termsTitle: 'Condiciones Comerciales y Tiempos',
    termsCards: [
      { _type: 'termsCard', _key: 'term1', title: 'Forma de Pago (Desarrollo Web)', content: '50% Abono inicial para arrancar\n50% Contra entrega final', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term2', title: 'Forma de Pago (Meta Ads)', content: 'El servicio de gestión publicitaria se cancela mes a mes, por anticipado, durante los primeros cinco (5) días de cada periodo.', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term3', title: 'Tiempos de Desarrollo Web', content: 'El tiempo de ejecución es de 1 a 2 semanas una vez recibida toda la información inicial (textos, fotografías de los tours amazónicos, logos y precios).', isFullWidth: true, isWarning: false },
      { _type: 'termsCard', _key: 'term4', title: 'Cláusula de Límite Máximo', content: 'El proyecto web tiene un ciclo de vida máximo de 4 semanas. Si transcurrido este límite no se ha podido concluir por problemas de comunicación o falta de entrega de material por parte del cliente, el desarrollo se dará por finalizado de manera unilateral, entregando el código en su estado actual y procediendo con el cobro del saldo restante.', isFullWidth: true, isWarning: true },
    ],
    paymentTitle: 'Datos Bancarios',
    showInternationalPayments: false,
    warrantyTitle: 'Política de Garantía y Soporte',
    warrantyDescription: 'Se otorga una Garantía Técnica de 1 mes (30 días calendario) contados a partir de la fecha de entrega y publicación del sitio web en producción.',
    warrantyCoverageTitle: 'Cobertura Específica',
    warrantyCoverage: [
      'Resolución de errores de código (bugs) que afecten la navegación del usuario extranjero.',
      'Corrección de fallos en el funcionamiento de los botones de contacto (WhatsApp/Correo).',
      'Corrección de fallos de diseño responsivo (visualización incorrecta en celulares o tablets).',
      'Soporte frente a posibles intermitencias derivadas netamente de la infraestructura del Hosting en Vercel.',
    ],
    warrantyExclusionsTitle: 'Exclusiones Estrictas',
    warrantyExclusions: [
      'Cambios en la estructura de diseño, layout o paleta de colores una vez el cliente haya aprobado la fase inicial.',
      'Problemas derivados del bloqueo de cuentas publicitarias en Meta (Business Manager), ya que dependen exclusivamente de las políticas de Facebook.',
      'Desconfiguraciones causadas por manipulación del código web por parte de terceros no autorizados por K&T.',
    ],
    whatsappMessage: 'Hola, tengo dudas sobre la cotización de Tours Amazonas',
  },

  // ─── 4. Pacific Gravelero ──────────────────────────────────────
  {
    _type: 'cotizacion',
    title: 'Desarrollo Web - Pacific Gravelero',
    slug: { _type: 'slug', current: 'pacificgravelero' },
    subdomain: 'pacificgravelero',
    password: 'cot_pacificgravelero',
    clientName: 'Pacific Gravelero',
    isActive: true,
    headerTitle: 'COTIZACIÓN DE DESARROLLO WEB',
    headerSubtitle: '',
    date: '5 de marzo de 2026',
    validityDays: '15 días calendario',
    scopeTitle: 'Alcance Detallado',
    scopeDescription: 'La presente propuesta contempla el diseño a la medida y desarrollo de una página de aterrizaje (Landing Page) transaccional, enfocada en la conversión de usuarios hacia un modelo de pagos recurrentes:',
    scopeItems: [
      { _type: 'scopeItem', _key: 'scope1', title: 'Diseño Web Personalizado', description: 'Creación de interfaz gráfica única, estructurada para presentar el servicio y guiar al usuario a la suscripción.' },
      { _type: 'scopeItem', _key: 'scope2', title: 'Sistema de Suscripción', description: 'Desarrollo de la lógica interna para gestionar la membresía o servicio recurrente del cliente en la plataforma.' },
      { _type: 'scopeItem', _key: 'scope3', title: 'Pasarela de Pago (Wompi)', description: 'Integración técnica para recaudo. Wompi ofrece infraestructura robusta para cobros automáticos y suscripciones.' },
      { _type: 'scopeItem', _key: 'scope4', title: 'Tecnología e Infraestructura', description: 'Desarrollo de alto rendimiento alojado en Vercel, garantizando máxima estabilidad sin costos mensuales de servidor.' },
      { _type: 'scopeItem', _key: 'scope5', title: 'Optimización SEO Técnico', description: 'Estructuración de código y etiquetas meta para facilitar el posicionamiento orgánico en Google.' },
      { _type: 'scopeItem', _key: 'scope6', title: 'Dominio Incluido', description: 'Propiedad del nombre en internet por un año (Aplica únicamente para extensión .com).' },
    ],
    investmentTitle: 'Inversión del Proyecto',
    currency: 'COP',
    investmentItems: [
      { _type: 'investmentItem', _key: 'inv1', concept: 'Landing Page Personalizada y Sistema de Suscripción', value: '$1.300.000 COP', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv2', concept: 'Integración de Pasarela de Pago (Wompi)', value: '', isIncluded: true },
      { _type: 'investmentItem', _key: 'inv3', concept: 'Dominio Anual (.com), Infraestructura (Vercel) y SEO', value: '', isIncluded: true },
    ],
    totalLabel: 'Total Proyecto Base',
    totalValue: '$1.300.000 COP',
    termsTitle: 'Condiciones Comerciales',
    termsCards: [
      { _type: 'termsCard', _key: 'term1', title: 'Forma de Pago', content: '50% Inicio del desarrollo: $650.000 COP\n50% Contra entrega final: $650.000 COP', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term2', title: 'Tiempos de Desarrollo', content: 'El tiempo de ejecución por parte de K&T es de 1 a 2 semanas una vez recibida toda la información inicial (textos, logos, valor del plan de suscripción y credenciales de la pasarela).', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term3', title: 'Cláusula de Límite Máximo', content: 'El proyecto tiene un ciclo de vida máximo de 4 semanas. Si transcurrido este límite el proyecto no se ha podido concluir por problemas de comunicación, demoras en la revisión o falta de entrega de material por parte del cliente, el desarrollo se dará por finalizado de manera unilateral. Se entregará todo el contenido y código que esté en nuestras manos en su estado actual, y se procederá con el cobro del saldo restante.', isFullWidth: true, isWarning: true },
    ],
    paymentTitle: 'Datos Bancarios',
    showInternationalPayments: false,
    warrantyTitle: 'Garantía y Soporte',
    warrantyDescription: 'Se otorga una Garantía Técnica de 1 mes (30 días) contados a partir de la fecha de entrega y publicación en producción.',
    warrantyCoverageTitle: 'Cobertura Incluida',
    warrantyCoverage: [
      'Resolución de errores de código (bugs) que afecten la navegación.',
      'Corrección de fallos en la comunicación con la pasarela de pagos Wompi.',
      'Corrección de fallos de diseño responsivo (visualización incorrecta en móviles).',
      'Soporte frente a intermitencias derivadas netamente del Hosting en Vercel.',
    ],
    warrantyExclusionsTitle: 'Exclusiones',
    warrantyExclusions: [
      'Rechazos de tarjetas o caídas del sistema de Wompi (entidad externa).',
      'Cambios en diseño o estructura una vez aprobada la fase inicial.',
      'Desarrollo de nuevas funcionalidades no contratadas inicialmente.',
      'Desconfiguraciones por manipulación de código de terceros no autorizados.',
    ],
    whatsappMessage: 'Hola, tengo dudas sobre la cotización de Pacific Gravelero',
  },

  // ─── 5. Servicios Domicilio ─────────────────────────────────────
  {
    _type: 'cotizacion',
    title: 'Desarrollo Web - Servicios a Domicilio',
    slug: { _type: 'slug', current: 'servicios-domicilio' },
    subdomain: 'serviciosdomicilio',
    password: 'cot_serviciosdomicilio',
    clientName: 'Servicios Domicilio',
    isActive: true,
    headerTitle: 'COTIZACIÓN DE DESARROLLO WEB',
    headerSubtitle: 'Corporativo — Servicios a Domicilio',
    date: '5 de marzo de 2026',
    validityDays: '15 días calendario',
    scopeTitle: 'Alcance Detallado del Proyecto',
    scopeDescription: 'La presente propuesta contempla el diseño y desarrollo de una plataforma web profesional enfocada en la captación de clientes y personal para servicios a domicilio, con capacidades de adaptación regional:',
    scopeItems: [
      { _type: 'scopeItem', _key: 'scope1', title: 'Estructura Multipágina', description: 'Desarrollo del sitio con 5 secciones estratégicas: Inicio, Nosotros, Servicios, Contacto y Trabaja con Nosotros.' },
      { _type: 'scopeItem', _key: 'scope2', title: 'Sistema de Geolocalización Automática', description: 'Implementación de un script de detección de IP para identificar si el usuario visita desde Colombia o Argentina, adaptando automáticamente el contenido según el país.' },
      { _type: 'scopeItem', _key: 'scope3', title: 'Formulario de Servicios', description: 'Formulario dinámico con enrutamiento de datos al correo corporativo para cotizar o solicitar servicios a domicilio.' },
      { _type: 'scopeItem', _key: 'scope4', title: 'Formulario de Empleo', description: 'Formulario "Trabaja con nosotros" para la recepción de hojas de vida y captación de personal con enrutamiento al correo corporativo.' },
      { _type: 'scopeItem', _key: 'scope5', title: 'Tecnología e Infraestructura', description: 'Desarrollo de alto rendimiento alojado en Vercel, garantizando tiempos de carga ultrarrápidos y máxima estabilidad sin costos mensuales de servidor.' },
      { _type: 'scopeItem', _key: 'scope6', title: 'Optimización SEO Técnico', description: 'Implementación de estructuración de código y etiquetas meta para facilitar el posicionamiento orgánico en las búsquedas de Google.' },
    ],
    investmentTitle: 'Inversión del Proyecto',
    currency: 'USD',
    investmentItems: [
      { _type: 'investmentItem', _key: 'inv1', concept: 'Desarrollo Web (5 secciones, 2 formularios y Geolocalización Col/Arg)', value: '$270 USD (Aprox. $1.013.000 COP)', isIncluded: false },
      { _type: 'investmentItem', _key: 'inv2', concept: 'Infraestructura (Hosting Vercel) y Optimización SEO Técnico', value: '', isIncluded: true },
    ],
    totalLabel: 'Total Proyecto Base',
    totalValue: '$270 USD ($1.013.000 COP)',
    termsTitle: 'Condiciones Comerciales',
    termsCards: [
      { _type: 'termsCard', _key: 'term1', title: 'Forma de Pago', content: '50% Inicio del desarrollo: $135 USD / $506.500 COP\n50% Contra entrega final: $135 USD / $506.500 COP', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term2', title: 'Tiempos de Desarrollo', content: 'El tiempo de ejecución por parte de K&T es de 1 a 2 semanas una vez recibida toda la información inicial (textos, logos, detalles de los servicios).', isFullWidth: false, isWarning: false },
      { _type: 'termsCard', _key: 'term3', title: 'Cláusula de Límite Máximo', content: 'El proyecto tiene un ciclo de vida máximo de 4 semanas. Si transcurrido este límite el proyecto no se ha podido concluir por problemas de comunicación o falta de entrega de material por parte del cliente, el desarrollo se dará por finalizado de manera unilateral, entregando el avance actual y procediendo con el cobro del saldo.', isFullWidth: true, isWarning: true },
    ],
    paymentTitle: 'Medios de Pago Recomendados',
    showInternationalPayments: false,
    warrantyTitle: 'Garantía y Soporte',
    warrantyDescription: 'Se otorga una Garantía Técnica de 1 mes (30 días) contados a partir de la fecha de entrega y publicación del sitio web en producción.',
    warrantyCoverageTitle: 'Cobertura Incluida',
    warrantyCoverage: [
      'Resolución de errores de código (bugs) que afecten la navegación del usuario.',
      'Corrección de fallos en el sistema de geolocalización (identificación errónea de IP entre Colombia y Argentina).',
      'Garantía de correcto envío y recepción de datos en los 2 formularios desarrollados (Servicios y Trabaja con nosotros).',
      'Corrección de fallos de diseño responsivo (visualización incorrecta en dispositivos móviles).',
      'Soporte frente a posibles intermitencias derivadas netamente de la infraestructura del Hosting en Vercel.',
    ],
    warrantyExclusionsTitle: 'Exclusiones',
    warrantyExclusions: [
      'Cambios en la estructura de diseño, colores o layout una vez aprobada la fase inicial del proyecto.',
      'Desarrollo de nuevas funcionalidades o páginas adicionales no contratadas inicialmente.',
      'Desconfiguraciones causadas por manipulación del código o uso indebido por parte de terceros no autorizados por K&T.',
    ],
    whatsappMessage: 'Hola, tengo dudas sobre la cotización de Servicios a Domicilio',
  },
]

async function seedCotizaciones() {
  console.log('🚀 Iniciando seed de cotizaciones...\n')

  for (const cot of cotizaciones) {
    try {
      // Check if already exists
      const existing = await client.fetch(
        `*[_type == "cotizacion" && slug.current == $slug][0]._id`,
        { slug: cot.slug.current }
      )

      if (existing) {
        console.log(`⏭️  "${cot.title}" ya existe (${existing}), saltando...`)
        continue
      }

      const result = await client.create(cot)
      console.log(`✅ Creada: "${cot.title}" → ${result._id}`)
    } catch (err) {
      console.error(`❌ Error creando "${cot.title}":`, err)
    }
  }

  console.log('\n🏁 Seed completado.')
}

seedCotizaciones()
