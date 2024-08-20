'use client'
import { useChat } from '@/context/ChatContext'
import React, { useEffect, useState } from 'react'
import { LoadChatsAction } from '../serverActions';
import toast from 'react-hot-toast';
import ChatsFallback from '../loading';

function ChatList() {
    const { chats, setChats, setActiveChatId, activeChatId } = useChat();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const LoadChats = async () => {
            setLoading(true);
            const fetchedChats = await LoadChatsAction();
            if (!fetchedChats || fetchedChats.error) {
                toast.error("Error loading chats");
                return;
            }
            setChats(fetchedChats?.data!);
            setLoading(false);
            if (fetchedChats.data && fetchedChats.data.length > 0) {
                setActiveChatId(fetchedChats?.data?.at(0)!.id);
            }
        };
        LoadChats();
    }, [setActiveChatId, setChats]);

    const handleChange = (id: number) => {
        setActiveChatId(id);
    };

    return (
        <>
            {loading ? (
                <ChatsFallback />
            ) : (
                chats.map((val, index) => (
                    <li
                        key={index}
                        onClick={() => handleChange(val.id!)}
                        className={`rounded-lg p-2 mb-2 cursor-pointer ${
                            activeChatId === val.id ? 'bg-gray-500 text-white' : 'bg-gray-300'
                        }`}
                    >
                        <p className="text-sm font-medium">{val.name}</p>
                    </li>
                ))
            )}
        </>
    );
}

export default ChatList;
