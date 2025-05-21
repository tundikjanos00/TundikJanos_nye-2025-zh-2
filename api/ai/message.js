import OpenAI from "openai";

export default async function handler(req, res) {
    try {
        const { message, conversationId } = req.body;
        const response = await getAIChatResponse(message.message);
        res.send({ ...response, conversationId });
    } catch (e) {
        const status = e.status || 500;
        res.status(status).send(e.error || { message: 'Something went wrong' });
    }
}

async function getAIChatResponse(input) {
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
