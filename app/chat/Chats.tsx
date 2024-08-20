'use client'
import { useChat } from '@/context/ChatContext'
import React, { useEffect, useState } from 'react'
import { LoadChatsAction } from './serverActions';
import toast from 'react-hot-toast';
import ChatsFallback from './loading';

function ChatList() {
    const {chats,setChats,setActiveChatId}=useChat();
    const[loading,setLoading]=useState(true);
    useEffect(() => {
      const LoadChats=async()=>{
        setLoading(true)
        const fetchedCahts= await LoadChatsAction();
        if(!fetchedCahts||fetchedCahts.error)
        {
         toast.error("Error loading chats");
         return;
        }
        setChats(fetchedCahts?.data!)
        setLoading(false)
        if(fetchedCahts.data)
        {
          if(fetchedCahts.data.length>0)
            setActiveChatId(fetchedCahts?.data?.at(0)!.id)
        }
        
     }
      LoadChats();
      

    },[setActiveChatId,setChats])
    const handleChange=async (id:number)=>{
      console.log(id)
      setActiveChatId(id);
      
    }
  return (
    <>{loading?<ChatsFallback/>:chats.map((val,index)=>(<li onClick={()=>handleChange(val.id!)} key={index} className="bg-gray-300 rounded-lg p-2 mb-2 cursor-pointer">
        <p className="text-sm font-medium">{val.name}</p>
      </li>))}</>
  )
}

export default ChatList