import Navbar from "./components/NavBar";
import ChatPage from "./components/ChatPage";
export default function Home() {
  return (
    <div className="flex flex-col h-full w-full px-2 overflow-x-hidden">
      <div className="w-screen text-black flex" style={{ height: "calc(100vh - 85px)" }}>
      <div className="navBar 2xs:flex-shrink w-1/4 h-full text-black bg-gray-200 2xs:w-1/6 lg:block">
        <Navbar/>
      </div>
      <div>
        
      </div>
      <div className="chatPage flex-1 2xs:flex-grow h-full min-h-full bg-gray-100 2xs:w-5/6">
        <ChatPage/>
      </div>
    </div>
    </div>
  );
}
