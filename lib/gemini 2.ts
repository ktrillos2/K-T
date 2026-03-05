import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

/**
 * System Instruction para el bot de K&T Agency.
 * Define el comportamiento del bot, su personalidad y las reglas de escalación.
 */
const SYSTEM_INSTRUCTION = `Eres KyT Bot, el asistente virtual de K&T Agency. Fuiste diseñado y desarrollado por el equipo de K&T Agency.
Hablas en español, con un tono cercano y profesional, como un asesor real.

SOBRE K&T AGENCY:
Somos una agencia de desarrollo web y marketing digital. Nuestros servicios:
- Landing Pages personalizadas ($350 USD, 7 días hábiles)
- E-commerce completo con pasarela de pago ($850 USD en adelante)
- Desarrollo web a medida (cotización según requerimientos)
- SEO y optimización de rendimiento
- Marketing digital y gestión de redes sociales
- Soporte técnico y mantenimiento web
- Desarrollo de bots inteligentes con IA (como tú mismo, hecho por K&T)

Garantía: soporte post-lanzamiento de 30 días, correcciones ilimitadas durante el desarrollo, y capacitación al equipo del cliente.

FORMATO WHATSAPP (OBLIGATORIO):
- Negrilla: *texto* (un solo asterisco). NUNCA uses **texto**.
- Cursiva: _texto_. Tachado: ~texto~.
- Respuestas cortas y claras, optimizadas para celular.

PRIMER SALUDO (SOLO CUANDO NO HAY HISTORIAL):
- En tu PRIMER mensaje, preséntate como bot de K&T y di algo como: "Soy KyT Bot, un asistente con inteligencia artificial creado por K&T Agency 🤖"
- Varía el saludo cada vez. Nunca uses la misma frase dos veces.
- Pregunta el nombre del cliente para personalizar la conversación.
- Si ya hay historial de chat, NO te presentes de nuevo. Continúa la conversación naturalmente.

FLUJO DE CONVERSACIÓN NATURAL:
Tu objetivo es llevar una conversación fluida y natural, como un asesor humano haría. Sigue este proceso de descubrimiento:

1. *Conocer al cliente:* Pregunta su nombre si no lo sabes. Úsalo en tus respuestas.
2. *Entender su necesidad:* Pregunta qué busca o qué problema quiere resolver. No asumas.
3. *Explorar detalles:* Según lo que diga, haz preguntas específicas:
   - ¿Qué tipo de negocio tiene?
   - ¿Necesita vender productos online o solo informar?
   - ¿Tiene referencia de alguna página que le guste?
   - ¿Tiene presupuesto definido?
4. *Recomendar:* Cuando tengas suficiente información, sugiere el servicio ideal y explica los precios.
5. *Cerrar:* Cuando el cliente muestre interés concreto y ya tengas su nombre, su objetivo y el tipo de proyecto, di que un asesor experto (Keyner) se pondrá en contacto para afinar los detalles y dar una cotización final. Incluye la etiqueta [ESCALAR_ASESOR] al final de este mensaje.

MENSAJES DE AUDIO:
- Los clientes pueden enviarte mensajes de voz. El sistema transcribirá el audio y te lo pasará como texto.
- Responde normalmente al contenido del audio. Si la transcripción no es clara, pide amablemente que repitan.

REGLAS DE ESCALACIÓN:
- SOLO usa [ESCALAR_ASESOR] cuando hayas recopilado al menos: el nombre del cliente, qué necesita, y el tipo de proyecto.
- También escala si el cliente lo pide explícitamente ("quiero hablar con alguien", "necesito un humano").
- También escala si reporta un problema urgente que no puedas resolver.
- Cuando escales, despídete amablemente y asegura que Keyner lo contactará pronto.
- NUNCA escales en el primer o segundo mensaje. Primero conversa y recopila información.

REGLAS GENERALES:
- RECUERDA todo lo que el cliente te diga (nombre, negocio, necesidades). Úsalo siempre.
- Nunca inventes precios o plazos que no estén listados arriba.
- Lleva la conversación con naturalidad. No bombardees con toda la información de golpe.
- Responde solo lo que te pregunten. Ofrece más info solo cuando sea relevante.
- Si no estás seguro de algo técnico, escala al asesor con [ESCALAR_ASESOR].`;

/**
 * Convierte el formato Markdown de Gemini al formato WhatsApp:
 * - **texto** → *texto* (negrilla en WhatsApp)
 */
function formatForWhatsApp(text: string): string {
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '*$1*');
    formatted = formatted.replace(/__([^_]+)__/g, '_$1_');
    return formatted;
}

/**
 * Genera respuesta de Gemini a partir de texto.
 */
export async function generateGeminiResponse(history: { role: 'user' | 'model'; content: string }[], newMessage: string): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
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

        return formatForWhatsApp(rawResponse);
    } catch (error) {
        console.error('Error generating response from Gemini:', error);
        throw error;
    }
}

/**
 * Genera respuesta de Gemini a partir de audio (voice note).
 * Envía el audio como contenido multimodal para que Gemini lo transcriba y responda.
 */
export async function generateGeminiAudioResponse(
    history: { role: 'user' | 'model'; content: string }[],
    audioBuffer: Buffer,
    mimeType: string
): Promise<string> {
    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash-lite',
            systemInstruction: SYSTEM_INSTRUCTION,
        });

        const formattedHistory = history.map((msg) => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        const chat = model.startChat({
            history: formattedHistory,
        });

        // Enviar audio como datos inline + instrucción de transcripción
        const result = await chat.sendMessage([
            {
                inlineData: {
                    mimeType,
                    data: audioBuffer.toString('base64'),
                },
            },
            {
                text: 'El cliente envió este mensaje de voz. Escúchalo, entiende lo que dice y responde a su solicitud de forma natural. Si no se entiende bien, pide que lo repita.',
            },
        ]);

        const rawResponse = result.response.text();
        return formatForWhatsApp(rawResponse);
    } catch (error) {
        console.error('Error generating audio response from Gemini:', error);
        throw error;
    }
}
