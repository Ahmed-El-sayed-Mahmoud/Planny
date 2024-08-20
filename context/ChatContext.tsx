"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Tables, TablesInsert } from '@/src/Planny.Domain/EntitiesTypes/EntityTypes';
type ChatContextType = {
  chats: TablesInsert<'chat'>[] | Tables<'chat'>[];
  setChats: React.Dispatch<React.SetStateAction<Tables<'chat'>[]>>
  activeChatId: number | null;
  setActiveChatId: React.Dispatch<React.SetStateAction<number | null>>
  messages: TablesInsert<'message'>[];
  setMessages:React.Dispatch<React.SetStateAction<{
    chat_id: number;
    content: string;
    id?: number;
    sender: string;
}[]>>
  isLoading:boolean;
  setIsLoading:(bl:boolean)=>void
};


const ChatContext = createContext<ChatContextType|undefined>(undefined);

export const ChatProvider = ({ children }: { children: ReactNode }) => {

  const [chats, setChats] = useState<Tables<'chat'>[]>([]);

  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<TablesInsert<'message'>[]>([]);
  const [isLoading,setIsLoading]=useState(false);

  const setNewMessage=(message:TablesInsert<'message'>)=>{
    setMessages(prev=>[...prev,message]);
}

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        activeChatId,
        setActiveChatId,
        messages,
        setMessages,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
