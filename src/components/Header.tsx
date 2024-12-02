"use client";

import Image from "next/image";
import React from "react";
import { BiBell } from "react-icons/bi";
import { BsMenuDown } from "react-icons/bs";
import Button from "./ui/Button";
import Nav from "./Nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white text-sm shadow-lg">
      <div className="flex items-center justify-between px-4 py-2.5 ps-0 xl:px-20">
        <div className="flex items-center gap-0 sm:gap-20">
          <Image
            alt="brand name"
            className="-me-2 h-16 object-contain sm:me-0"
            height={60}
            src="/logo.png"
            width={86}
          />
          <Nav />
        </div>
        <div className="flex items-center gap-2 sm:gap-8">
          <Button className="w-auto px-1 py-2 text-xs sm:px-4 sm:py-4">Add New Post</Button>
          <div className="relative ms-0 lg:ms-12">
            <BiBell size={25} />
            <div className="absolute end-1 top-1 h-1.5 w-1.5 rounded-full bg-[#FF6550]"></div>
          </div>
          <div className="relative">
            <Image
              alt="profile"
              className="h-10 w-10 rounded-full object-cover sm:h-14 sm:w-14"
              height={56}
              src="/profile.jpg"
              width={56}
            />
            <div className="absolute -bottom-2 start-3 text-primary-shade sm:start-5">
              <BsMenuDown size={20} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
