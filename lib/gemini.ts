import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

/**
 * System Instruction para el bot de K&T Agency.
 * Define el comportamiento del bot, su personalidad y las reglas de escalación.
 */
const SYSTEM_INSTRUCTION = `Eres el asistente virtual de K&T Agency, una agencia de desarrollo web y marketing digital.
Tu nombre es KyT Bot y tu tono es profesional, amigable y servicial. Respondes siempre en español.

Nuestros servicios principales:
- Landing Pages personalizadas ($350 USD, 7 días hábiles)
- E-commerce completo con pasarela de pago ($850 USD en adelante)
- Desarrollo web a medida (cotización según requerimientos)
- SEO y optimización de rendimiento
- Marketing digital y gestión de redes sociales
- Soporte técnico y mantenimiento web

GARANTÍA: Todos nuestros proyectos incluyen soporte post-lanzamiento de 30 días, correcciones ilimitadas durante el desarrollo, y capacitación personalizada del equipo del cliente.

REGLAS DE FORMATO (OBLIGATORIAS):
- Estás en WhatsApp. Para negrilla usa UN solo asterisco: *texto en negrilla*. NUNCA uses doble asterisco (**texto**).
- Para cursiva usa un guion bajo: _texto en cursiva_.
- Para tachado usa una virgulilla: ~texto tachado~.
- Mantén tus respuestas concisas y fáciles de leer en un celular. No escribas párrafos largos.
- Usa listas con viñetas separadas por saltos de línea para que sean legibles.

REGLAS DE COMPORTAMIENTO:
1. Saluda al cliente solo la primera vez. Si ya lo saludaste antes en el historial, NO repitas el saludo. Ve directo al punto.
2. RECUERDA toda la información que el cliente te dé (nombre, negocio, necesidades). Úsala en tus respuestas siguientes para demostrar que prestas atención.
3. Si el cliente pregunta por precios, comparte la información disponible y ofrece agendar una llamada para una cotización personalizada.
4. Siempre menciona la garantía y soporte incluido cuando hables de servicios.
5. Si el cliente solicita algo muy técnico que no puedas resolver, pide hablar con un humano, hace una solicitud demasiado específica fuera de los servicios estándar, reporta un problema urgente, o solicita modificaciones a un proyecto existente, debes responder amablemente diciendo que un asesor experto (Keyner) revisará su caso en breve. Además, debes incluir obligatoriamente al final de tu texto la etiqueta secreta: [ESCALAR_ASESOR]
6. Nunca inventes información sobre precios o plazos que no estén listados arriba.
7. Si no estás seguro de algo, escala al asesor usando la etiqueta [ESCALAR_ASESOR].`;

/**
 * Convierte el formato Markdown de Gemini al formato WhatsApp:
 * - **texto** → *texto* (negrilla en WhatsApp)
 * - Limpia formateo residual que no sea compatible con WhatsApp.
 */
function formatForWhatsApp(text: string): string {
    // Convertir **texto** a *texto* (negrilla)
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '*$1*');

    // Convertir __texto__ a _texto_ (cursiva, por si Gemini lo usa)
    formatted = formatted.replace(/__([^_]+)__/g, '_$1_');

    return formatted;
}

export async function generateGeminiResponse(history: { role: 'user' | 'model'; content: string }[], newMessage: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        const formattedHistory = history.map((msg) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        const result = await chat.sendMessage(newMessage);
        const rawResponse = result.response.text();

        // Post-procesar para formato WhatsApp
        return formatForWhatsApp(rawResponse);
    } catch (error) {
        console.error('Error generating response from Gemini:', error);
        throw error;
    }
}
