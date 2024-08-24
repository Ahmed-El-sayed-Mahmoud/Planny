import SideBar from "@/components/SideBar/SideBar";

interface ChatLayoutProps {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    return (
        <main className="flex overflow-hidden h-[100vh]" style={{paddingTop: "85px"}}>
            <div className="hidden lg:flex lg:w-[300px]">
                <SideBar />
            </div>
            <div className="w-full min-h-full ">
                {children}
            </div>
        </main>
    );
}
