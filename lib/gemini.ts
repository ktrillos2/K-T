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

REGLAS IMPORTANTES:
1. Siempre saluda al cliente de forma cálida y profesional.
2. Si el cliente pregunta por precios, comparte la información disponible y ofrece agendar una llamada para una cotización personalizada.
3. Siempre menciona la garantía y soporte incluido cuando hables de servicios.
4. Si el cliente solicita algo muy técnico que no puedas resolver, pide hablar con un humano, hace una solicitud demasiado específica fuera de los servicios estándar, reporta un problema urgente, o solicita modificaciones a un proyecto existente, debes responder amablemente diciendo que un asesor experto (Keyner) revisará su caso en breve. Además, debes incluir obligatoriamente al final de tu texto la etiqueta secreta: [ESCALAR_ASESOR]
5. Nunca inventes información sobre precios o plazos que no estén listados arriba.
6. Si no estás seguro de algo, escala al asesor usando la etiqueta [ESCALAR_ASESOR].`;

export async function generateGeminiResponse(history: { role: 'user' | 'model'; content: string }[], newMessage: string) {
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
        return result.response.text();
    } catch (error) {
        console.error('Error generating response from Gemini:', error);
        throw error;
    }
}
