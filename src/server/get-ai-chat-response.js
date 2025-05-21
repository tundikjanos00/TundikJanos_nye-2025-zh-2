import OpenAI from "openai";

export async function getAIChatResponse(input) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // const client = new OpenAI({ apiKey: 'lol' });
    const response = await client.responses.create({
        model: "gpt-4o-2024-05-13",
        input,
    });
    return {
        message: response.output_text,
        role: 'assistant',
    }
}
