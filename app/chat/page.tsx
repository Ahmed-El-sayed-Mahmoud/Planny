import Navbar from "./NavBar";
import ChatPage from "./ChatPage";
import { Suspense } from "react";
import ChatsFallback from "./loading"; // Assuming this is the fallback/loading component

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full px-2 overflow-x-hidden">
      <div className="w-screen text-black flex" style={{ height: "calc(100vh - 85px)" }}>
      <div className="navBar w-1/4 h-full text-black bg-gray-200 2xs:hidden xs:hidden sm:hidden md:hidden lg:block">
        <Navbar/>
      </div>
      <div className="chatPage flex-1 h-full min-h-full bg-gray-100">
        <ChatPage/>
      </div>
    </div>
    </div>
  );
}
