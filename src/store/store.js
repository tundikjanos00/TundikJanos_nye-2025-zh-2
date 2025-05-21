import { configureStore, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    conversations: []
};

const appSlice = createSlice({
    name: 'app',
    initialState: INITIAL_STATE,
    reducers: {
        setMessages: (state, action) => {
            const { id, messages } = action.payload;
            state.conversations = state.conversations.map((conversation) => {
                if (conversation.id === id) {
                    return {
                        ...conversation,
                        messages: messages,
                    };
                }
                return conversation;
            });
        },
        setLoading: (state, action) => {
            const { id, isLoading } = action.payload;
            state.conversations = state.conversations.map((conversation) => {
                if (conversation.id === id) {
                    return {
                        ...conversation,
                        isLoading: isLoading,
                    };
                }
                return conversation;
            });
        },
        createNewConversation: (state) => {
            state.conversations.unshift({
                id: `conversation-${new Date().getTime()}`,
                isLoading: false,
                messages: []
            });
        },
        switchToConversation: (state, action) => {
            const id = action.payload;
            const conversation = state.conversations.find((conversation) => conversation.id === id);
            if (conversation) {
                state.conversations = state.conversations.filter((conversation) => conversation.id !== id);
                state.conversations.unshift(conversation);
            }
        }
    },
});

export const actions = appSlice.actions;

export const store = configureStore({
    reducer: appSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(() => next => action => {
        console.debug(action);
        return next(action);
    })
});
