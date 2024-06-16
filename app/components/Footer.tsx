"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Modal from "./Modal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <footer className={`min-h-screen w-screen overscroll-none overflow-hidden grid content-center items-center bg-black opacity-85 pt-32`}>
      <h1 className="fixed text-[200px] leading-[150px] md:text-[400px] md:leading-[230px] opacity-5 text-white font-extrabold">
        contact
        <br />
        me
      </h1>

      <div className={`overflow-hidden lg:w-7/12 py-10 tracking-wide`}>
        <motion.h2
          animate={{ y: 0 }}
          initial={{ y: "100%" }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-gray-300 md:text-2xl text-xl md:px-28 px-4 font-thin leading-loose"
        >
          Ready to start creating an outstanding web presence?
          <br />
          <br />
          <span className={`md:text-6xl text-5xl uppercase font-extrabold`}>
            Send me an email at the address below or use{" "}
          </span>
          <span className="group text-gray-300 transition-all duration-300 ease-in-out">
            <span
              className={`bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_8px] bg-no-repeat group-hover:bg-[length:0%_8px] transition-all duration-700 ease-out z-40 hover:text-sienna md:text-6xl text-5xl uppercase font-extrabold hover:cursor-pointer`}
              onClick={openModal}
            >
              this contact form.
            </span>
          </span>
        </motion.h2>
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} />

      <motion.div
        animate={{ x: 0 }}
        initial={{ x: "100%" }}
        transition={{ delay: 0.75, duration: 0.75 }}
        className="text-gray-300 flex flex-col md:flex-row my-20 md:px-28 px-4"
      >
        <div className="lg:mr-56 md:mb-24 mb-14 tracking-wide">
          <h3 className="flex items-center uppercase text-xl">
            <span className="h-5 w-5 animate-ping flex rounded-full bg-gray-300 opacity-75"></span>
            <span>
              <hr className="h-0.5 w-14 my-8 ml-7 mr-4 bg-gray-300 border-0 dark:bg-gray-300"></hr>
            </span>
            Location
          </h3>
          <p className="font-thin text-xl">
            East Midlands, England
          </p>
        </div>
        <div className="lg:mr-56 md:mb-24 mb-14">
          <h3 className="flex items-center uppercase text-xl">
            <span className="h-5 w-5 animate-ping flex rounded-full bg-gray-300 opacity-75"></span>
            <span>
              <hr className="h-0.5 w-14 my-8 ml-7 mr-4 bg-gray-300 border-0 dark:bg-gray-300"></hr>
            </span>
            Email
          </h3>
          <a
            href="mailto:ndeewo@chukwudibarrah.com"
            id="animate"
            className="font-thin text-xl select-none hover:text-sienna"
          >
            ndeewo@chukwudibarrah.com
          </a>
        </div>
      </motion.div>

      <div className="flex flex-col md:px-28 px-4 md:flex-row opacity-100 text-gray-300 font-thin tracking-wider z-20">
        <div className="text-gray-300">
          <Link
            href="https://github.com/chukwudibarrah/portfolio"
            id="animate"
            className="z-40 hover:text-sienna leading-loose my-4"
          >
            See site source code
          </Link>
        </div>
        <div className="text-gray-300">
          <Link
            href="https://github.com/chukwudibarrah"
            id="animate"
            className="z-40 hover:text-sienna leading-loose my-4 md:mx-20"
          >
            My GitHub
          </Link>
        </div>
        <div className="text-gray-300">
          <p className="leading-loose mb-20">Chukwudi Barrah - 2027</p>
        </div>
      </div>
    </footer>
  );
}
