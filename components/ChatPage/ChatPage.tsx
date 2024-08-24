"use client";
import React, { useRef, useEffect, useState } from "react";
import InputText from "./InputText";
import Message from "./Message";
import { useChat } from "@/context/ChatContext";
import LoadingMsg from "./LoadingMsg";
import MessagesLoader from "./MessagesLoader";
import {
  ChangeHistoryAction,
  LoadNewMessages,
} from "../../app/chat/actions";
import { Tables } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import toast from "react-hot-toast";
import { MobileSidebar } from "../SideBar/MobileSideBar";
import { useRouter } from "next/navigation";

function ChatPage() {
  const { messages, isLoading, activeChatId, setMessages } = useChat();
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const router = useRouter();

  const scrollToBottom = () => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!activeChatId) return;
      setLoadingMsgs(true);
      const fetchedMessages = await LoadNewMessages(activeChatId!);
      if (!fetchedMessages) {
        router.push("/login");
        return;
      }
      if (fetchedMessages.error) {
        toast.error(fetchedMessages.error.message);
        if (fetchedMessages.error.status === 401) {
          router.push("/login");
          return;
        }
      } else {
        setMessages(fetchedMessages.data as Tables<"message">[]);
        await ChangeHistoryAction(fetchedMessages.data!);
        setLoadingMsgs(false);
      }
    };

    loadMessages();
  }, [activeChatId, setMessages, router]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="absolute top-[90px] left-5">
        <MobileSidebar />
      </div>

      <div
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 w-full overflow-x-hidden custom-scrollbar"
      >
        {loadingMsgs ? (
          <MessagesLoader />
        ) : (
          messages.map((val, index) => (
            <Message
              key={index}
              text={val.content}
              sender={val.sender}
              id={val.id ? -1 : index}
              last_id={messages.length - 1}
            />
          ))
        )}
        {isLoading && <LoadingMsg />}
      </div>

      <div className="chatInput p-2 bg-slate-100">
        {activeChatId && <InputText />}
      </div>
    </div>
  );
}

export default ChatPage;
