import { GoogleGenAI } from "@google/genai";
let geminiClient = null;
export function getGemini() {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return null;
    }
    if (!geminiClient) {
        geminiClient = new GoogleGenAI({
            apiKey: apiKey,
            httpOptions: {
                headers: {
                    'User-Agent': 'aistudio-build',
                },
            },
        });
    }
    return geminiClient;
}

export function getGeminiModel() {
    return process.env.GEMINI_MODEL || "gemini-3.6-flash";
}
