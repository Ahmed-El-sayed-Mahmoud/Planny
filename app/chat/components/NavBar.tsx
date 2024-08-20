import React from "react";
import ChatList from "./Chats";
import Modal from "./Modal";
import MessagesCounter from "./MessagesCounter";

export default function Navbar() {
  return (
    <div className="p-3  h-full relative">
      
      
      {/* User Plan Section */}
      <div className="mb-4 2xs:hidden sm:block">
        <h2 className="text-lg font-semibold">Your Plan</h2>
        <div className="bg-gray-200 rounded-lg p-2 mt-2">
          <p className="text-sm font-bold bg-gray-300 p-3">Beta User</p>
        </div>
      </div>

     <MessagesCounter/>

      {/* Chats Section */}
      <div className="flex-grow overflow-y-auto mb-4 2xs:hidden lg:block" style={{ height: "50%" }}>
        <h2 className="text-lg font-semibold">Chats</h2>
        <ul >
          <ChatList />
        </ul>
      </div>

      <div className="w-[95%] absolute bottom-0  ">
        <Modal/>
      </div>
    </div>
  );
}
