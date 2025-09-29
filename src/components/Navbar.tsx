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
    <header className="flex justify-between items-center p-4 bg-dark-purple  md:text-xl">
      <div className=" flex items-center text-yellow">
        <Activity className="text-yellow w-10 h-10" />

        <p className="">Together, we decide</p>
      </div>
      <ul className=" list-none  text-yellow hidden md:flex">
        <li className="mr-4">
          <Link href="/"> Home</Link>
        </li>

        <li className="mr-4">
          <Link href="/ideas"> Report & Improve </Link>
        </li>
        <li className="mr-4">
          <Link href="/poll"> Vote Now </Link>
        </li>
        <li className="mr-4">
          <Link href="/contact"> Contact</Link>
        </li>
      </ul>
      {/* mobile menu */}
      <div className="md:hidden">
        <button className="text-yellow" onClick={toggleMenu}>
          {isOpen ? (
            <span className="">&#10005;</span>
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-dark-purple text-yellow rounded-md shadow-lg">
            <ul className="list-none">
              <li className="p-2 hover:bg-dark-purple/50">
                <Link href="/"> Home</Link>
              </li>
              <li className="p-2 hover:bg-dark-purple/50">
                <Link href="/about"> About </Link>
              </li>
              <li className="p-2 hover:bg-dark-purple/50">
                <Link href="/ideas">Report & Improve </Link>
              </li>
              <li className="p-2 hover:bg-dark-purple/50">
                <Link href="/poll"> Vote Now </Link>
              </li>
              <li className="p-2 hover:bg-dark-purple/50">
                <Link href="/contact"> Contact</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
