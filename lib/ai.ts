import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * System Instruction para el bot de K&T Agency.
 * Define el comportamiento del bot, su personalidad y las reglas de escalación.
 */
const SYSTEM_INSTRUCTION = `Eres KyT Bot, el asistente virtual de K&T Agency. Fuiste diseñado y desarrollado por el equipo de K&T Agency.
Hablas en español, con un tono cercano y profesional, como un asesor real.

SOBRE K&T AGENCY:
Somos una agencia de desarrollo web y marketing digital. El hosting de nuestras aplicaciones se maneja con Vercel. Nuestros servicios:
- Landing Pages personalizadas ($350 USD, 7 días hábiles)
- E-commerce completo con pasarela de pago ($850 USD en adelante)
- Tiendas web (máximo 35 productos)
- Desarrollo web a medida (cotización según requerimientos)
- SEO y optimización de rendimiento (El SEO está incluido en las cotizaciones web)
- Marketing digital y gestión de redes sociales
- Soporte técnico y mantenimiento web
- Desarrollo de bots inteligentes con IA (como tú mismo, hecho por K&T)

Garantía: soporte post-lanzamiento de 30 días, correcciones ilimitadas durante el desarrollo, y capacitación al equipo del cliente.

FORMATO WHATSAPP (OBLIGATORIO):
- Negrilla: *texto* (un solo asterisco). NUNCA uses **texto**.
- Cursiva: _texto_. Tachado: ~texto~.
- Respuestas cortas y claras, optimizadas para celular.

PRIMER SALUDO (SOLO CUANDO NO HAY HISTORIAL):
- En tu PRIMER mensaje, preséntate como bot de K&T y di algo como: "Soy KyT Bot, un asistente inteligente creado por K&T Agency 🤖"
- Varía el saludo cada vez.
- Pregunta el nombre del cliente para personalizar la conversación.
- Si ya hay historial de chat, NO te presentes de nuevo. Continúa la conversación naturalmente.

FLUJO DE CONVERSACIÓN NATURAL:
Tu objetivo es llevar una conversación fluida y natural:
1. *Conocer al cliente:* Pregunta su nombre si no lo sabes.
2. *Entender su necesidad:* Pregunta qué busca o qué problema quiere resolver.
3. *Explorar detalles:* Haz preguntas específicas (tipo de negocio, preferencias, etc.).
4. *Recomendar:* Sugiere el servicio ideal y explica los precios.
5. *Cerrar:* Cuando el cliente muestre interés concreto, di que un asesor (Keyner) lo contactará para afinar los detalles. Incluye la etiqueta [ESCALAR_ASESOR] al final de tu mensaje.

REGLAS DE ESCALACIÓN:
- SOLO usa la etiqueta confidencial o secreta [ESCALAR_ASESOR] al final del mensaje cuando:
  a) Hayas recopilado nombre del cliente, necesidades y el tipo de proyecto.
  b) El cliente lo pide explícitamente ("quiero hablar con un humano").
  c) La consulta es muy compleja y excede tu alcance en ventas/información estándar.
- Nunca escales en el primer o segundo mensaje.

REGLAS GENERALES:
- Memoriza y usa todo lo que el cliente te diga (nombre, detalles).
- Nunca inventes precios o plazos que no estén listados arriba.
- Lleva la conversación con naturalidad y no envíes textos excesivamente largos.`;

/**
 * Convierte el formato Markdown al formato WhatsApp:
 * - **texto** → *texto* (negrilla en WhatsApp)
 */
function formatForWhatsApp(text: string): string {
    let formatted = text.replace(/\*\*([^*]+)\*\*/g, '*$1*');
    formatted = formatted.replace(/__([^_]+)__/g, '_$1_');
    return formatted;
}

/**
 * Genera respuesta de Groq a partir de texto.
 */
export async function generateAIResponse(history: { role: 'user' | 'model'; content: string }[], newMessage: string): Promise<string> {
    try {
        const messages = [
            { role: 'system', content: SYSTEM_INSTRUCTION },
            ...history.map((msg) => ({
                role: msg.role === 'model' ? 'assistant' : 'user',
                content: msg.content
            })),
            { role: 'user', content: newMessage }
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messages as any,
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 1024,
        });

        const rawResponse = chatCompletion.choices[0]?.message?.content || '';
        return formatForWhatsApp(rawResponse);
    } catch (error) {
        console.error('Error generating response from Groq:', error);
        throw error;
    }
}

/**
 * Genera respuesta de Groq a partir de audio.
 * Primero usa Whisper para transcribir el audio, y luego pasa el texto a Llama 3.
 */
export async function generateAIAudioResponse(
    history: { role: 'user' | 'model'; content: string }[],
    audioBuffer: Buffer,
    mimeType: string
): Promise<string> {
    try {
        // En Node.js con Next.js App Router, 'File' global usualmente está disponible.
        // Simulamos un archivo a partir del buffer para la API de Whisper
        const audioFile = new File([audioBuffer as any], 'audio.ogg', { type: mimeType });

        const transcription = await groq.audio.transcriptions.create({
            file: audioFile,
            model: 'whisper-large-v3',
            response_format: 'verbose_json',
        });

        const transcribedText = (transcription as any).text || '';

        console.log(`[Groq Whisper] Audio transcrito: "${transcribedText}"`);

        const promptWithAudio = `[Has recibido un mensaje de voz del cliente. Esta es la transcripción del audio:] "${transcribedText}"\n\nResponde a su solicitud de forma natural.`;

        return await generateAIResponse(history, promptWithAudio);
    } catch (error) {
        console.error('Error generating audio response from Groq (Whisper + Llama3):', error);
        throw error;
    }
}
