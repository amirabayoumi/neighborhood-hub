"use client";
import Link from "next/link";
import { Activity, MenuIcon } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-dark-purple md:text-xl">
      {/* Logo / Title */}
      <div className="flex items-center text-yellow w-full justify-between md:w-auto">
        <div className="flex items-center">
          <Activity className="text-yellow w-10 h-10" />
          <p className="ml-2">Together, we decide</p>
        </div>

        <button className="text-yellow md:hidden" onClick={toggleMenu}>
          {isOpen ? <span>&#10005;</span> : <MenuIcon className="w-6 h-6" />}
        </button>
      </div>

      <ul className="list-none text-yellow hidden md:flex">
        <li className="mr-4">
          <Link href="/">Home</Link>
        </li>
        <li className="mr-4">
          <Link href="/ideas">Report & Improve</Link>
        </li>
        <li className="mr-4">
          <Link href="/poll">Vote Now</Link>
        </li>
        <li className="mr-4">
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      {isOpen && (
        <ul className="flex flex-col w-full mt-4 text-yellow md:hidden  text-center ">
          <li className="p-2 hover:bg-dark-purple/50 border-t border-gray-600">
            <Link href="/" onClick={toggleMenu}>Home</Link>
          </li>

          <li className="p-2 hover:bg-dark-purple/50 border-t border-gray-600">
            <Link href="/ideas" onClick={toggleMenu}>Report & Improve</Link>
          </li>
          <li className="p-2 hover:bg-dark-purple/50 border-t border-gray-600">
            <Link href="/poll" onClick={toggleMenu}>Vote Now</Link>
          </li>
          <li className="p-2 hover:bg-dark-purple/50 border-t border-gray-600">
            <Link href="/contact" onClick={toggleMenu}>Contact</Link>
          </li>
        </ul>
      )}
    </header>
  );
};
