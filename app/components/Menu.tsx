"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DrawerClose } from "@/components/ui/drawer";

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="w-screen">
      <div className="min-h-full w-full grid grid-cols-1 content-center text-left space-y-20 z-30 text-sienna font-bold text-6xl md:text-8xl pt-32 md:px-32 px-11">
        <Link
          className={`link ${
            pathname === "/about" ? "active" : "text-persian"
          }`}
          href="/about"
        >
          <DrawerClose asChild>
            <button className="text-gray-200 hover:text-sienna">About</button>
          </DrawerClose>
        </Link>
        <Link
          className={`link ${
            pathname === "/projects" ? "active" : "text-persian"
          }`}
          href="/projects"
        >
          <DrawerClose asChild>
            <button className="text-gray-200 hover:text-sienna">
              Projects
            </button>
          </DrawerClose>
        </Link>
        <Link
          className={`link ${
            pathname === "/journal" ? "active" : "text-persian"
          }`}
          href="/journal"
        >
          <DrawerClose asChild>
            <button className="text-gray-200 hover:text-sienna">Journal</button>
          </DrawerClose>
        </Link>
      </div>
    </nav>
  );
}