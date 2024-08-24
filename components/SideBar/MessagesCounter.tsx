'use client';
import { useChat } from "@/context/ChatContext";
import React, { useEffect, useState } from "react";

function MessagesCounter() {
    const { messages } = useChat();
    const messageCount = messages.length;
    const messageLimit = 50;
    const [color, setColor] = useState("text-green-600");

    useEffect(() => {
        if (messageCount >= messageLimit * 0.8) {
            setColor("text-red-600 animate-pulse");
        } else if (messageCount >= messageLimit * 0.5) {
            setColor("text-yellow-600 animate-bounce");
        } else {
            setColor("text-green-600");
        }
    }, [messageCount]);

    const percentage = (messageCount / messageLimit) * 100;

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold 2xs:hidden lg:block">Chat Messages</h2>
            <div className=" rounded-lg p-2 mt-2">
                <div className="flex items-center justify-center mb-2">
                    <p className={`text-xs font-bold ${color}`}>
                        {messageCount}/{messageLimit} ({Math.round(percentage)}%)
                    </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-white">
                    <div 
                        className="h-2.5 rounded-full transition-all duration-500 ease-in-out" 
                        style={{
                            width: `${percentage}%`,
                            backgroundColor: percentage >= 80 ? '#dc2626' : percentage >= 50 ? '#fbbf24' : '#16a34a'
                        }}>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesCounter;
