'use client';
import { useChat } from "@/context/ChatContext";
import React from "react";

function MessagesCounter() {
    const { messages } = useChat();

    return (
        <div className="mb-4">
            <h2 className="text-lg font-semibold 2xs:hidden lg:block">Chat Messages</h2>
            <div className="bg-gray-400 rounded-lg p-2 mt-2">
                <div className="flex items-center justify-center">
                    <p className="text-lg 2xs:text-xxs sm:text-sm md:text-lg font-bold">
                        {messages.length}/50
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MessagesCounter;
