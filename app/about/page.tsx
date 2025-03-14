// /app/about/page.tsx

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LinkPreview } from "@/components/ui/link-preview";
import type { Metadata } from "next";

export default function About() {
  return (
    <main className="min-h-screen font-poppins w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center pt-32">
      <h1
        className={`fixed bottom-36 -z-0 text-[160px] leading-[150px] md:text-[400px] md:leading-[230px] opacity-5 text-gray-200/40 font-extrabold select-none`}
      >
        about
        <br />
        me
      </h1>
      <div
        className={`overflow-hidden my-20 space-y-8 z-20 lg:px-28 md:px-16 px-4`}
      >
        <section>
          <motion.h2
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.75 }}
            className={`md:text-7xl text-5xl text-gray-200 tracking-wide`}
          >
            Who&apos;s Chukwudi Barrah?
          </motion.h2>
          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl tracking-wide pt-3"
          >
            <span className="font-thin">noun </span>[
            <span className="italic font-thin">chook-woo-dee</span>]
          </motion.p>

          <motion.h3
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.75 }}
            className="text-gray-200 font-thin md:text-3xl text-2xl py-10 pt-12 tracking-wide"
          >
            Professional amateur. Digital tinkerer. Probably not caffeinated
            enough.
          </motion.h3>

          <motion.h4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl tracking-wide"
          >
            What I do
          </motion.h4>

          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl py-5 tracking-wide font-thin"
          >
            I make things happen on the internet (lol, it&apos;s my website;
            I&apos;m allowed to say things). Sometimes they&apos;re good things,
            like:{" "}
          </motion.p>
          <ul className="list-disc list-inside text-gray-200 md:text-2xl text-xl tracking-wide font-thin">
            <motion.li
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.1, duration: 0.75 }}
            >
              Creating websites that (hopefully) don&apos;t make your eyes bleed
              (see{" "}
              <span>
                <LinkPreview
                  url="https://mirrorsmind.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the Mirror's Mind website"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Mirror&apos;s Mind
                  </span>
                </LinkPreview>
              </span>
              ,{" "}
              <span>
                <LinkPreview
                  url="https://melanintravelsmagic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the Melanin Travels Magic website"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Melanin Travels Magic{" "}
                  </span>
                </LinkPreview>
              </span>
              and{" "}
              <span>
                <LinkPreview
                  url="https://www.blackgourd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit the Black Gourd Creative Collective website"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Black Gourd
                  </span>
                </LinkPreview>
              </span>
              )
            </motion.li>
            <motion.li
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.75 }}
            >
              Talking into microphones (almost) professionally (check the{" "}
              <span>
                <LinkPreview
                  url="https://open.spotify.com/show/57HkbwEhFc9Dbi2qXZpbk9?si=e32057ed7a3b4065"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to Other Expats podcast on Spotify"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Other Expats{" "}
                  </span>
                </LinkPreview>
              </span>
              and{" "}
              <span>
                <LinkPreview
                  url="https://open.spotify.com/show/4jliloBWNDps9Acme4TPn3?si=bae0278a032a4a14"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to blackside podcast on Spotify"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    blackside UK
                  </span>
                </LinkPreview>
              </span>{" "}
              podcasts)
            </motion.li>
            <motion.li
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.3, duration: 0.75 }}
            >
              Documenting Black excellence and mediocrity on{" "}
              <span>
                <LinkPreview
                  url="https://blackside.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to blackside UK podcast on Spotify"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    blackside UK{" "}
                  </span>
                </LinkPreview>
              </span>
              and (
              <span>
                <LinkPreview
                  url="https://otherexpats.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Go to Other Expats podcast on Spotify"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Other Expats
                  </span>
                </LinkPreview>
              </span>
              )
            </motion.li>
            <motion.li
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.75 }}
            >
              Writing words that people (probably don&apos;t) want to read
            </motion.li>
          </ul>

          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl lg:pt-5 pt-10 tracking-wide  font-thin"
          >
            Receipts? Of course; check out my{" "}
            <span>
              <Link
                href="journal"
                aria-label="Navigate to the journal page"
                rel="noopener"
                className="group text-gray-200 transition-all duration-300 ease-in-out"
              >
                <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                  journal
                </span>
              </Link>
            </span>{" "}
            or browse through my greatest hits in the{" "}
            <span>
              <Link
                href="/projects"
                aria-label="Navigate to the projects page"
                rel="noopener"
                className="group text-gray-200 transition-all duration-300 ease-in-out"
              >
                <span className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                  projects
                </span>
              </Link>
            </span>{" "}
            section.
          </motion.p>
        </section>

        {/* New section */}

        <section className="">
          <motion.h4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl pt-5 tracking-wide"
          >
            Things that make me tick
          </motion.h4>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="grid md:grid-cols-2 text-gray-200 md:text-2xl text-xl py-5 tracking-wide  font-thin"
          >
            <ul className="list-disc list-inside">
              <li>Audiobooks (because reading is hard)</li>
              <li>Walking (cheaper than therapy)</li>
              <li>Making lists</li>
            </ul>
            <ul className="list-disc list-inside">
              <li>Reading (yes, I contradict myself occassionally)</li>
              <li>Photography</li>
              <li>Running (from responsibilities, obviously)</li>
            </ul>
          </motion.div>
        </section>

        {/* New section */}

        <section className="">
          <motion.h4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl tracking-wide"
          >
            My digital toolbox (aka tech stack)
          </motion.h4>
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="grid md:grid-cols-2 text-gray-200 md:text-2xl text-xl py-5 tracking-wide  font-thin md:space-y-0 space-y-10"
          >
            <div>
              <h3 className="py-3 font-semibold">The go-to weapons</h3>
              <ul className="list-disc list-inside">
                <li>React</li>
                <li>NextJS</li>
                <li>Node</li>
                <li>TailwindCSS</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div>
              <h3 className="py-3 font-semibold">B-team</h3>
              <ul className="list-disc list-inside">
                <li>WordPress</li>
                <li>Wix</li>
                <li>Appwrite</li>
                <li>Sanity</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* New section */}

        <section>
          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.7, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl tracking-wide  font-thin"
          >
            PS: This list grows fast so check back next week for whatever new
            shiny tool catches my eye. <br /> Want to chat? Send me a message at{" "}
            <span className="group text-gray-200 transition-all duration-300 ease-in-out">
              <span className="">
                <Link
                  href="mailto:hello@chukwudibarrah.com"
                  aria-label="Send an email to hello@chukwudibarrah.com"
                  target="_blank"
                  rel="noopener"
                  className="bg-left-bottom bg-linear-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna"
                >
                  hello@chukwudibarrah.com
                </Link>
              </span>
            </span>{" "}
            or use the fancy contact form below. I promise I read everything.
            Eventually.
          </motion.p>
        </section>
      </div>
    </main>
  );
}
