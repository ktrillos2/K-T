import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "KandT_Agency_2026";
const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

// Configurar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 });
  } else {
    return new NextResponse("Forbidden", { status: 403 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.object === "whatsapp_business_account") {
      for (const entry of body.entry || []) {
        for (const change of entry.changes || []) {
          if (change.value && change.value.messages && change.value.messages[0]) {
            const message = change.value.messages[0];
            const from = message.from; 
            
            // Solo procesar mensajes de texto
            if (message.type === "text") {
              const text = message.text.body;
              
              // Obtener respuesta de Gemini
              const replyText = await getChatbotResponse(text);
              
              // Enviar de vuelta a WhatsApp
              await sendWhatsAppMessage(from, replyText);
            }
          }
        }
      }
      return NextResponse.json({ status: "ok" });
    } else {
      return new NextResponse("Not Found", { status: 404 });
    }
  } catch (error) {
    console.error("Error en el webhook de WhatsApp:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

async function getChatbotResponse(userMessage: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = `Eres un asistente virtual experto en ventas y atención al cliente para K&T Agency (KyT Code).
Tu objetivo principal es captar la atención de posibles clientes, resolver sus dudas sobre la agencia y persuadirlos para que soliciten nuestros servicios de desarrollo.

INFORMACIÓN DE LA EMPRESA:
- Nombre: K&T Agency (KyT Code)
- Sitio Web: https://www.kytcode.lat
- Qué hacemos: Somos una agencia digital especializada en desarrollo de software, diseño de sitios web profesionales, aplicaciones móviles y soluciones tecnológicas a medida.
- Ventajas: Código de alta calidad, diseños modernos y premium, optimización SEO desde el inicio y un enfoque en resultados para hacer crecer los negocios de nuestros clientes.
- Objetivo: Conseguir que el cliente deje sus datos de contacto (nombre, teléfono y correo) o un breve resumen de lo que necesita para cotizar su proyecto.

REGLAS DE INTERACCIÓN:
- Tono: Profesional, innovador, amable y persuasivo. Tutea al cliente para generar cercanía.
- Sé breve y directo. Evita párrafos largos, usa emojis sutilmente para hacer la lectura agradable.
- Si el cliente muestra interés en un proyecto, invítalo a dejar sus datos (nombre, correo) para que un experto en desarrollo lo contacte y asesore.
- NUNCA inventes precios exactos de desarrollo, ya que cada proyecto es a medida.
- Si preguntan precios, di que dependen del alcance del proyecto y pide sus datos para que podamos hacer una cotización personalizada.`;

    // Pasamos el system prompt como historia inicial para contextualizar el modelo
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "¡Entendido! Actuaré como el asistente virtual experto de K&T Agency siguiendo tus instrucciones." }] },
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();
  } catch (error) {
    console.error("Error consultando a Gemini:", error);
    return "¡Hola! En este momento estoy actualizando mis sistemas. Por favor, intenta escribirme en unos minutos. 🤖";
  }
}

async function sendWhatsAppMessage(to: string, text: string) {
  if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
    console.error("Faltan las credenciales de WhatsApp (Token o Phone Number ID)");
    return;
  }

  const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      preview_url: false,
      body: text,
    },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error enviando mensaje de WhatsApp:", errorData);
    }
  } catch (error) {
    console.error("Error en fetch a WhatsApp:", error);
  }
}
