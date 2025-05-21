export default async function handler(req, res) {
    const { message, conversationId } = req.body;
    res.send({ role: 'assistant', conversationId, message: message.message });
}
