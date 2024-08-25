'use client'
import { useChat } from '@/context/ChatContext'
import React, { useEffect, useState } from 'react'
import { LoadChatsAction } from '../../app/chat/actions';
import toast from 'react-hot-toast';
import ChatsFallback from '../../app/chat/loading';
import { useRouter } from 'next/navigation';

function ChatList() {
    const { chats, setChats, setActiveChatId, activeChatId ,setSuggestions} = useChat();
    const [loading, setLoading] = useState(true);
    const router=useRouter();
    useEffect(() => {
        const LoadChats = async () => {
            setLoading(true);
            const fetchedChats = await LoadChatsAction();
            if(!fetchedChats)
            {
                router.push("/login");
                return;
            }
            if (fetchedChats.error) {
                toast.error(fetchedChats.error.message);
                if(fetchedChats.error.status===401)
                    router.push("/login")
                return;
            }
            setChats(fetchedChats?.data!);
            setLoading(false);
            if (fetchedChats.data && fetchedChats.data.length > 0) {
                if(!activeChatId)
                    setActiveChatId(fetchedChats?.data?.at(0)!.id);
            }
        };
        LoadChats();
    }, [router]);

    const handleChange = (id: number) => {
        setActiveChatId(id);
        setSuggestions([])
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
                            activeChatId === val.id ? 'bg-gray-500 text-black' : 'bg-gray-300'
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
