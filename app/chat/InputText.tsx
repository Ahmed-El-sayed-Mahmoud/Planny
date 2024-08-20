'use client';
import { useChat } from "@/context/ChatContext";
import { FormEvent, KeyboardEvent } from "react";
import { useState } from "react";
import { getResponseAction, SaveMessagesAction } from "./serverActions";
import { TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const MAX_MSGS=50;
export default function InputText() {
    const [inputValue, setInputValue] = useState('');
    const { setMessages,isLoading,setIsLoading,activeChatId ,messages } = useChat();    
    const router=useRouter();
    const handleSubmit = async (e: FormEvent) => {
        if(messages.length>MAX_MSGS-2)
        {
            toast.error("You have exceeded Your messages Limit")
            return;
        }
        e.preventDefault();
        setIsLoading(true)
        if (inputValue.trim()) { 
            const newMsg :TablesInsert<'message'>= { sender: 'user', content: inputValue , chat_id:activeChatId as number };
            setMessages(prev=>[...prev,newMsg]);
            setInputValue(''); 
            const res = await getResponseAction(newMsg); 
            if (!res||res?.error) {
              if(res?.error==="Not Authenticated")
              {
                toast.error("Not Autheticated")
                router.push("/login")
              }
                toast.error("Error Generating Response :(");
                setIsLoading(false)
                return; 
            }
            const response: TablesInsert<'message'> = { sender: 'bot', content: res.response as string , chat_id:activeChatId as number  };
            setMessages(prev=>[...prev,response]);
            setIsLoading(false)
            console.log(newMsg,response)
            const success=await SaveMessagesAction(newMsg,response);
            if(!success)
            {
              toast.error("Error Saving Messages")
            }
        }
        
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' ) { 
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent); 
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:shadow-outline focus:ring-2 bg-gray-600"
                    placeholder="Enter your message .. "
                    rows={1}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    name="msg"
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}
