import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function generateGeminiResponse(history: { role: 'user' | 'model'; content: string }[], newMessage: string) {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

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
