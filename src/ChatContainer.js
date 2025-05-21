import { Fragment, useState } from 'react';
import './ChatContainer.css';
import { ChatControls } from './ChatControls.js';

export function ChatContainer({ messages, onUserMessage, isLoading, conversationId }) {
    const [active, setActive] = useState([]);
    const onFeedback = (index, feedback) => {
        const key = `${feedback}-${index}`;

        setActive(prev => {
            let next = [...prev];

            if (next.includes(key)) {
                return next.filter(x => x !== key);
            }
            if (feedback === 'like') {
                next = next.filter(x => x !== `dislike-${index}`)
            }
            if (feedback === 'dislike') {
                next = next.filter(x => x !== `like-${index}`)
            }
            return [...next, key]
        });
        console.log(`Feedback for message "${index}": ${feedback}`);
    }

    if (!Array.isArray(messages)) {
        return null;
    }

    return (
        <div className="chat-container">
            <ChatControls />
            <h1>Chat <small>(#{conversationId})</small></h1>
            <div className="messages">
                {messages.map(({ role, message }, key) => {
                    return (
                        <Fragment key={key}>
                            <div className={`message ${role}`}>
                                <p>{message}</p>
                            </div>
                            {role === 'assistant'
                                && <div className="assistant-feedback">
                                    <button className={['like-button', active.includes(`like-${key}`) && 'active'].filter(Boolean).join(' ')} onClick={() => onFeedback(key, 'like')}>Like</button>
                                    <button className={['dislike-button', active.includes(`dislike-${key}`) && 'active'].filter(Boolean).join(' ')}onClick={() => onFeedback(key, 'dislike')}>Dislike</button>
                            </div>}
                        </Fragment>
                    );
                })}
                {isLoading && (
                    <div className="message assistant">
                        <p>...</p>
                    </div>
                )}
            </div>
            <form>
                <input
                    type="text"
                    disabled={isLoading}
                    placeholder="Type your message..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onUserMessage(e.target.value);
                            e.target.value = '';
                        }
                    }}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    onClick={(e) => {
                        e.preventDefault();
                        const input = e.target.previousElementSibling;
                        onUserMessage(input.value);
                        input.value = '';
                    }}>GO</button>
            </form>
        </div>
    );
}
