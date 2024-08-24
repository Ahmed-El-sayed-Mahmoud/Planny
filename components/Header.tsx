
import React from 'react';
import Logo from "@/assets/logo.png"
import Image from "next/image";
import Link from 'next/link';
import { MobileSidebar } from './SideBar/MobileSideBar';
const Header = () => {
  return (
    <header className=" bg-black text-white  flex items-center justify-between lg:justify-evenly border-gray-900 border-solid border-b-2 p-4 fixed w-full ">
      <div className="flex items-center justify-center align-baseline">
      <Image
        width={50}
        src={Logo}
        alt="Logo"
      />
        <span className="text-3xl font-bold 2xs:text-sm lg:text-xl ">Planny</span>
      </div>
      <nav>
        <ul className=" hidden space-x-4  lg:flex ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
          <Link href="/chat">Chat</Link>
          </li>
          <li>
          <Link href="/chart">Chart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
