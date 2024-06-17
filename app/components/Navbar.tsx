"use client"

import React, { useState } from "react";
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
} from "@/components/ui/drawer";
import Menu from "./Menu";
import Image from "next/image";
import Link from "next/link";
import { CgMenuRight } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import DrawerFooter from "./DrawerFooter";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-screen z-30 bg-neutral-950 pt-8 ">
      <DrawerRoot
        direction="right"
        noBodyStyles={true}
        onOpenChange={(open) => setIsOpen(open)}
      >
        <DrawerTrigger className="w-screen">
          <div className="min-w-full flex border-none border-neutral-950 justify-between lg:px-28 md:px-16 px-4">
            <div>
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={50}
                  height={50}
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
              </Link>
            </div>
            <div>
              <DrawerTrigger>
                {isOpen ? <CgClose className="text-white text-4xl hover:text-sienna" /> : <CgMenuRight className="text-white text-4xl hover:text-sienna" />}
              </DrawerTrigger>
            </div>
          </div>
          <DrawerContent>
            <Menu />
            <div className="flex mt-28 md:mt-56 lg:mt-40 md:px-32 px-4">
              <DrawerFooter />
            </div>
          </DrawerContent>
        </DrawerTrigger>
      </DrawerRoot>
    </div>
  );
}
