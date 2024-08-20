'use client'
import { useChat } from "@/context/ChatContext";
import React from "react";

function MessagesCounter() {
    const{messages}=useChat()
  return (
    <>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Chat Messages</h2>
        <div className="bg-gray-200 rounded-lg p-2 mt-2">
          <p className="text-sm font-medium">{messages.length}/50</p>
        </div>
      </div>
    </>
  );
}

export default MessagesCounter;
