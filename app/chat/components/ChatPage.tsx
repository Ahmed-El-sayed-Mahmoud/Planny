'use client'
import React, { useRef, useEffect, useState } from 'react';
import InputText from './InputText';
import Message from './Message';
import { useChat } from '@/context/ChatContext';
import LoadingMsg from './LoadingMsg';
import MessagesLoader from './MessagesLoader';
import { ChangeHistoryAction, LoadNewMessages } from '../serverActions';
import { Tables} from '@/src/Planny.Domain/EntitiesTypes/EntityTypes';
import toast from 'react-hot-toast';

function ChatPage() {
    const { messages, isLoading, activeChatId, setMessages } = useChat();
    const chatAreaRef = useRef<HTMLDivElement>(null);
    const [loadingMsgs, setLoadingMsgs] = useState(false);

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loadingMsgs]);

    useEffect(() => {
        const loadMessages = async () => {
            if (!activeChatId) return;
            setLoadingMsgs(true);
            const fetchedMessages = await LoadNewMessages(activeChatId!);
            if (fetchedMessages.error) {
                toast.error("Error Loading chat messages");
            } else {
                setMessages(fetchedMessages.data as Tables<'message'>[]);
                await ChangeHistoryAction(fetchedMessages.data!);
                setLoadingMsgs(false);
            }
        };

        loadMessages();
    }, [activeChatId, setMessages]);

    return (
        <div className="flex flex-col h-full w-full px-2">
            <div
                ref={chatAreaRef}
                className="chatArea flex-grow overflow-y-auto p-4 bg-gray-100 w-full overflow-x-hidden"
            >
                {loadingMsgs ? (
                    <MessagesLoader />
                ) : (
                    messages.map((val, index) => (
                        <Message
                            key={index}
                            text={val.content}
                            sender={val.sender}
                            id={val.id?-1:index}
                            last_id={messages.length - 1}
                        />
                    ))
                )}
                {isLoading && <LoadingMsg />}
            </div>
            <div className="chatInput m-0 p-0 ">
                {activeChatId ? <InputText /> : <></>}
            </div>
        </div>
    );
}

export default ChatPage;
