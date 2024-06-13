"use client";

import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonLoading(true);

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing email service configuration");
      setButtonLoading(false);
      return;
    }

    if (!form.current) {
      console.error("Form reference is not defined");
      setButtonLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      setButtonLoading(false);
      form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setButtonLoading(false);
      form.current.reset();
    }
  };

  return (
    <div className={`fixed z-50 inset-0 overflow-y-auto transition-opacity duration-500 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} bg-black bg-opacity-50`}>
      <div className="flex items-center justify-center min-h-screen pt-4 text-center">
        <div className="relative bg-white w-full max-w-lg mx-auto p-8 rounded-lg shadow-lg">
          <h2 className={`text-5xl md:text-6xl text-gray-300 font-extrabold uppercase mb-4`}>Get in touch</h2>
          <form ref={form} onSubmit={handleSubmit}>
            <div className="flex flex-col lg:flex-row justify-evenly my-10">
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="from_name"
                  type="text"
                  className="border-b-2 bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-none bg-inherit mx-3 text-gray-300"
                />
              </div>
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-b-2 bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-none bg-inherit mx-3 text-gray-300"
                />
              </div>
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="border-b-2 bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-none bg-inherit mx-3 text-gray-300"
                />
              </div>
            </div>
            <div className="grid my-3 group transition-all duration-300 ease-in-out px-10 md:px-0 md:w-full">
              <label className="text-gray-300 text-sm" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="resize-none border-b-2 bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-none bg-inherit text-gray-300"
              />
            </div>
            <div className="my-14">
              <button
                id="submit"
                type="submit"
                disabled={buttonLoading}
                className="text-sm uppercase rounded-full outline-dashed hover:outline-sienna hover:text-sienna hover:font-extrabold hover:cursor-pointer outline-gray-300 text-gray-300 font-bold py-16 px-11"
              >
                {buttonLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </form>
          <button className="text-gray-300 hover:text-sienna mt-16" onClick={onClose}>
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
