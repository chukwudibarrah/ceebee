"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { outfit, zilla } from "@/fonts";

export default function About() {
  return (
    <div className="min-h-screen font-poppins w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center bg-neutral-950 pt-32">
      <h1
        className={`fixed bottom-36 -z-0 text-[160px] leading-[150px] md:text-[400px] md:leading-[230px] opacity-5 text-gray-200/40 font-extrabold select-none`}
      >
        about
        <br />
        me
      </h1>
      <div className={`overflow-hidden my-20 space-y-8 z-20`}>
        <motion.h2
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.75 }}
          className={`md:text-7xl text-5xl text-brown md:px-32 px-11 tracking-wide`}
        >
          Who&apos;s Chukwudi Barrah?
        </motion.h2>
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-2xl text-xl md:px-32 px-11 tracking-wide"
        >
          <span className="font-thin">noun </span>[
          <span className="italic font-thin">chook-woo-dee</span>]
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-3xl text-2xl md:px-32 px-11 pt-12 tracking-wide"
        >
          Amateur everything. But, I&apos;m learning.
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light"
        >
          I&apos;m not a web developer, copywriting pro, ninja, guru, or
          wordsmith. I understand that the English language is a complicated
          subject and how it can be tweaked and adjusted to convey the right
          message is continuously changing. As long as that understanding is
          clear and solid, I can create content for/about almost any subject or
          industry.
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.1, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-3xl text-2xl md:px-32 px-11 tracking-wide"
        >
          What I do
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.3, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light"
        >
          I do things; primarily online content that includes creating websites
          like{" "}
          <Link
            href="https://www.blackgourd.com"
            aria-label="Visit the Black Gourd Creative Collective website"
            target="_blank"
            rel="noopener"
            className="group text-gray-300 transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
              Black Gourd
            </span>
          </Link>
          , host a podcast and try to catalogue all things Black on{" "}
          <span className="group text-gray-300 transition-all duration-300 ease-in-out">
            <span className="">
              <Link
                href="https://blackside.uk"
                aria-label="Visit the black side website"
                target="_blank"
                rel="noopener"
                className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna"
              >
                blackside UK
              </Link>
            </span>
          </span>{" "}
          (and on{" "}
          <Link
            href="https://www.otherexpats.com"
            aria-label="Visit the Other Expats website"
            target="_blank"
            rel="noopener"
            className="group text-gray-300 transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
              Other Expats
            </span>
          </Link>
          ). You can find some of my editorial and copywriting work in the{" "}
          <Link
            href="/journal"
            aria-label="Navigate to the journal page"
            className="group text-gray-300 transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
              journal
            </span>{" "}
          </Link>
          and in my selection of previous{" "}
          <Link
            href="/projects"
            aria-label="Navigate to the projects page"
            className="group text-gray-300 transition-all duration-300 ease-in-out"
          >
            <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
              projects
            </span>{" "}
          </Link>
          .
        </motion.p>

        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-3xl text-2xl md:px-32 px-11 tracking-wide"
        >
          Things I like
        </motion.p>
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.75 }}
          className="grid md:grid-cols-2 leading-loose text-gray-300 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light"
        >
          <ul className="list-disc list-inside">
            <li>Listening to recorded words</li>
            <li>Walking</li>
            <li>Lists</li>
          </ul>
          <ul className="list-disc list-inside">
            <li>Reading words on pages</li>
            <li>Photography</li>
            <li>Running</li>
          </ul>
        </motion.div>
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1.7, duration: 0.75 }}
          className="leading-loose text-gray-300 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light"
        >
          ps. Send any enquiries to{" "}
          <span className="group text-gray-300 transition-all duration-300 ease-in-out">
            <span className="">
              <Link
                href="mailto:ndeewo@chukwudibarrah.com"
                aria-label="Send an email to ndeewo@chukwudibarrah.com"
                target="_blank"
                rel="noopener"
                className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna"
              >
                ndeewo@chukwudibarrah.com
              </Link>
            </span>
          </span>{" "}
          or use the contact form below.
        </motion.p>
      </div>
    </div>
  );
}
