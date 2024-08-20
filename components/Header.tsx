
import React from 'react';
import Logo from "@/assets/logo.png"
import Image from "next/image";
import Link from 'next/link';
const Header = () => {
  return (
    <header className="2xs:justify-center bg-black text-white  flex items-center justify-between border-gray-900 border-solid border-b-2 p-4">
      <div className="flex items-center justify-center align-baseline">
      <Image
        width={50}
        src={Logo}
        alt="Logo"
      />
        <span className="text-3xl font-bold  2xs:text-xl ">Planny</span>
      </div>
      <nav>
        <ul className="flex space-x-4 2xs:hidden xs:hidden sm:hidden">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
          <Link href="/chat">Chat</Link>
          </li>
          <li>
          <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
