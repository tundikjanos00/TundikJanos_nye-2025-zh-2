import { createAsyncThunk } from "@reduxjs/toolkit";
import { actions } from "./store.js";

export const pingThunk = createAsyncThunk('app/ping', async (payload, { getState }) => {
    const state = getState();
    console.log('pong', state);
});

export const sendMessageThunk = createAsyncThunk('app/sendMessage', async (message, { dispatch, getState }) => {
    if (!message) {
        return;
    }

    const state = getState();
    const messages = state.conversations[0].messages;
    const id = state.conversations[0].id;

    const newMessage = {
        role: 'user',
        message,
    };
    const updatedMessages = [...messages, newMessage];
    dispatch(actions.setMessages({ id, messages: updatedMessages }));
    dispatch(actions.setLoading({ id, isLoading: true }));

    try {
        const { role, conversationId, message } = await getResponse(id, newMessage);
        
        if (conversationId !== id) {
            // ignore response
            return;
        }

        dispatch(actions.setMessages({ id, messages: [...updatedMessages, { role, message }] }));
    } catch (e) {
        dispatch(actions.setMessages({ id, messages: [...updatedMessages, { role: 'assistant', message: 'Sorry something went wrong :(' }] }));
    } finally {
        dispatch(actions.setLoading({ id, isLoading: false }));
    }
});

async function getResponse(id, message) {
    // /api/ai/message
    const response = await fetch('/api/ai/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, conversationId: id }),
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}
