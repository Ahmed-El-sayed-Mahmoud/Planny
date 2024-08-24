import React from "react";
import ChatList from "./Chats";
import Modal from "./Modal";
import MessagesCounter from "./MessagesCounter";

export default function SideBar() {
  return (
    <>
      
      <div className="p-3  h-full relative w-full bg-slate-100 text-gray-800">
        <div className="mb-4 ">
          <h2 className="text-lg font-semibold">Your Plan</h2>
          <div className="bg-gray-200 rounded-lg p-2 mt-2">
            <p className=" font-bold  p-3">Beta User</p>
          </div>
        </div>

        <MessagesCounter />
        <h2 className="text-lg font-semibold">Chats</h2>
        <div
          className="flex-grow overflow-y-scroll custom-scrollbar mb-4 "
          style={{ height: "55%" }}
        >
         
          <ul>
            <ChatList />
          </ul>
        </div>

        <div className="w-[95%] absolute bottom-0  ">
          <Modal />
        </div>
      </div>
    </>
  );
}
