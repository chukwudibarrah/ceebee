"use client";

import { useState, useRef, FormEvent } from "react";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [buttonLoading, setButtonLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form reference is not defined");
      setButtonLoading(false);
      return;
    }

    // Validate form fields
    const formData = new FormData(form.current);
    const name = formData.get("from_name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !subject || !message) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required.",
      });
      setButtonLoading(false);
      return;
    }

    setButtonLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error("Missing email service configuration");
      setButtonLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, form.current, publicKey);
      toast({
        description: "Your message has been sent.",
      });
      setButtonLoading(false);
      form.current.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with sending your message.",
      });
      console.error("Error sending email:", error);
      setButtonLoading(false);
      form.current.reset();
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto transition-opacity duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } bg-neutral-950 w-screen overscroll-none`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 text-center w-screen">
        <div className="relative bg-neutral-950 h-screen min-w-full max-w-lg mx-auto p-8 rounded-lg shadow-lg overscroll-none z-50">
          <h2 className="text-5xl md:text-6xl text-gray-300 font-extrabold uppercase mb-4">Get in touch</h2>
          <form ref={form} onSubmit={handleSubmit} className="grid justify-center md:pt-32">
            <div className="flex flex-col lg:flex-row justify-evenly my-10">
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="from_name"
                  type="text"
                  className="border-b-2 bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-hidden bg-inherit mx-3 text-gray-300"
                />
              </div>
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="border-b-2 bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-hidden bg-inherit mx-3 text-gray-300"
                />
              </div>
              <div className="grid my-3 group transition-all duration-300 ease-in-out">
                <label className="text-gray-300 text-sm" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="border-b-2 bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-hidden bg-inherit mx-3 text-gray-300"
                />
              </div>
            </div>
            <div className="grid my-3 group transition-all duration-300 ease-in-out px-10 md:px-0 md:w-full">
              <label className="text-gray-300 text-sm" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="resize-none border-b-2 bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-700 ease-out outline-hidden bg-inherit text-gray-300"
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
          <button 
          className="text-gray-300 hover:text-sienna pt-16 pb-24" 
          onClick={onClose}
          aria-label="Send message"
          >
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
