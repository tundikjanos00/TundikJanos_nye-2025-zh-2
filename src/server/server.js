import express from 'express';
import dotenv from 'dotenv';
import { getAIChatResponse } from './get-ai-chat-response.js';

dotenv.config();

process.on('unhandledRejection', (reason) => {
    console.error(reason);
    console.log('App still running ...');
});

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.get('/api', (_, res) => res.send({ message: 'Hello world!' }));

app.post('/api/ai/message', async (req, res) => {
    try {
        const { message, conversationId } = req.body;
        const response = await getAIChatResponse(message.message);
        res.send({ ...response, conversationId });
    } catch (e) {
        const status = e.status || 500;
        res.status(status).send(e.error || { message: 'Something went wrong' });
    }
});

app.post('/api/echo', (req, res) => {
    const { message, conversationId } = req.body;
    res.send({ role: 'assistant', conversationId, message: message.message });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
