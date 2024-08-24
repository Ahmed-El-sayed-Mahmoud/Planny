'use client';
import { useChat } from "@/context/ChatContext";
import { FormEvent, KeyboardEvent, useEffect } from "react";
import { useState } from "react";
import { getResponseAction, SaveMessagesAction } from "../../app/chat/actions";
import { TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import gsap from "gsap";
const MAX_MSGS=50;
export default function InputText() {
    const [inputValue, setInputValue] = useState('');
    const { setMessages,isLoading,setIsLoading,activeChatId ,messages,suggestions,setSuggestions } = useChat();    
    const router=useRouter();
    useEffect(() => {
        
            gsap.fromTo(
                '.suggestion',
                { y: 20, opacity: 0 ,delay:5 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
            );
    }, [suggestions]);
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
            if (res.error) {
                toast.error(res.error.message);
                setIsLoading(false)
                return; 
            }    
            const response = { sender: 'bot', content: res.response as string , chat_id:activeChatId as number,suggestions:res.suggestions };
            setMessages(prev=>[...prev,response]);
            setSuggestions(res.suggestions!)
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
            setSuggestions([]) 
            e.preventDefault();
            handleSubmit(e as unknown as FormEvent); 
        }
    };

    const suggestionClick=(sg:string)=>{
        setInputValue(sg);
    }

    return (
        <>
             {(
        <div className="bg-slate-100 flex w-full justify-center" >
          {suggestions.map((val, index) => (
            <p className="suggestion text-gray-600 mb-1 text-sm rounded-lg border border-gray-200 shadow-sm p-1 mx-1 cursor-pointer hover:bg-black hover:text-white transition-colors" key={index} onClick={()=>suggestionClick(val)}>
               {val}
            </p>
          ))}
        </div>
      )}
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
        </>
    );
}
