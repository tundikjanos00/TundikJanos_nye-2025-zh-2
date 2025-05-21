import { ChatContainer } from './ChatContainer.js';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from './store/thunks.js';

import './Chat.css';
import { actions } from './store/store.js';

export function Chat() {
    const dispatch = useDispatch();

    const messages = useSelector((state) => state.conversations[0].messages);
    const isLoading = useSelector((state) => state.conversations[0].isLoading);
    const conversationId = useSelector((state) => state.conversations[0].id);

    const handleUserMessage = async (message) => {
        dispatch(sendMessageThunk(message));
    };

    return <div className="chat">
        <ConversationList />
        <ChatContainer messages={messages} onUserMessage={handleUserMessage} isLoading={isLoading} conversationId={conversationId} />
    </div>;
}


function ConversationList() {
    const conversations = useSelector((state) => state.conversations);
    const dispatch = useDispatch();

    const switchToConversation = (id) => {
        dispatch(actions.switchToConversation(id));
    }

    if (conversations.length === 0) {
        return null;
    }

    return <div className='conversation-list'>
        <ul>
            {conversations.map((conversation) => (
                <li key={conversation.id}>
                    <button onClick={() => switchToConversation(conversation.id)}>
                        {conversation.messages[conversation.messages.length - 1]?.message.slice(0, 10) || 'New conversation'}
                    </button>
                </li>
            ))}
        </ul>
    </div>;
}
