import Link from "next/link";
import { DrawerClose } from "@/components/ui/drawer";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export default function DrawerFooter() {
  return (
    <main>
      <div className="flex space-x-24 text-white text-4xl">
        <div>
          <Link
            href="https://www.linkedin.com/in/cbarrah"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DrawerClose>
              <FaLinkedin className="hover:text-sienna" />
            </DrawerClose>
          </Link>
        </div>
        <div>
          <Link
            href="https://github.com/chukwudibarrah"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DrawerClose>
              <FaGithub className="hover:text-sienna" />
            </DrawerClose>
          </Link>
        </div>
        <div>
          <Link
            href="https://www.instagram.com/dude.with.a.camera/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DrawerClose>
              <FaInstagram className="hover:text-sienna" />
            </DrawerClose>
          </Link>
        </div>
      </div>
    </main>
  );
}
