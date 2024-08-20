import 'reflect-metadata';
import type { Metadata } from "next";

import Header from "@/components/Header";
import "./globals.css";
import { Electrolize } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "@/context/ChatContext";

const electrolize = Electrolize({
  subsets: ["latin"],
  weight:['400'],
});

export const metadata: Metadata = {
  title: "Planny",
  description: "Your AI chat Bot helper",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={electrolize.className}>
      
      <UserProvider>
          <Header /> 
          <ChatProvider>
            {children} 
          </ChatProvider>
          
          <Toaster position="top-right"/>
        </UserProvider>
      </body>
    </html>
  );
}
