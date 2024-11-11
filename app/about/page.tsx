"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Define reusable motion components
const MotionHeading2 = motion.h2 as any;
const MotionHeading3 = motion.h3 as any;
const MotionHeading4 = motion.h4 as any;
const MotionParagraph = motion.p as any;
const MotionDiv = motion.div as any;
const MotionLi = motion.li as any;

export default function About() {
  return (
    <main className="min-h-screen font-poppins w-screen overscroll-none overflow-hidden flex flex-col items-center justify-center bg-neutral-950 pt-32">
      <h1
        className={`fixed bottom-36 -z-0 text-[160px] leading-[150px] md:text-[400px] md:leading-[230px] opacity-5 text-gray-200/40 font-extrabold select-none`}
      >
        about
        <br />
        me
      </h1>
      <div className={`overflow-hidden my-20 space-y-8 z-20`}>
        <section>
          <MotionHeading2
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.75 }}
            className={`md:text-7xl text-5xl text-brown md:px-32 px-11 tracking-wide`}
          >
            Who&apos;s Chukwudi Barrah?
          </MotionHeading2>
          <MotionParagraph
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl md:px-32 px-11 tracking-wide"
          >
            <span className="font-thin">noun </span>[
            <span className="italic font-thin">chook-woo-dee</span>]
          </MotionParagraph>

          <MotionHeading3
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.7, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl md:px-32 px-11 py-10 pt-12 tracking-wide"
          >
            Professional amateur. Digital tinkerer. Probably not caffeinated enough.
          </MotionHeading3>

          <MotionHeading4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.1, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl md:px-32 px-11 tracking-wide"
          >
            What I do
          </MotionHeading4>

          <MotionParagraph
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl md:px-32 px-11 py-5 tracking-wide font-light"
          >
            I make things happen on the internet (lol, it&apos;s my website;
            I&apos;m allowed to say things). Sometimes they&apos;re good things,
            like:{" "}
          </MotionParagraph>
          <ul className="list-disc list-inside text-gray-200 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light">
            <MotionLi
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.1, duration: 0.75 }}
            >
              Creating websites that (hopefully) don&apos;t make your eyes bleed
              (see{" "}
              <span>
                <Link
                  href="https://melanintravelsmagic.com/"
                  aria-label="Visit the Black Gourd Creative Collective website"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Melanin Travels Magic{" "}
                  </span>
                </Link>
              </span>
              and{" "}
              <span>
                <Link
                  href="https://www.blackgourd.com"
                  aria-label="Visit the Black Gourd Creative Collective website"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Black Gourd
                  </span>
                </Link>
              </span>
              )
            </MotionLi>
            <MotionLi
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.75 }}
            >
              Talking into microphones (almost) professionally (check the{" "}
              <span>
                <Link
                  href="https://open.spotify.com/show/57HkbwEhFc9Dbi2qXZpbk9?si=e32057ed7a3b4065"
                  aria-label="Go to Other Expats podcast on Spotify"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Other Expats{" "}
                  </span>
                </Link>
              </span>
              and{" "}
              <span>
                <Link
                  href="https://open.spotify.com/show/4jliloBWNDps9Acme4TPn3?si=bae0278a032a4a14"
                  aria-label="Go to blackside podcast on Spotify"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    blackside UK
                  </span>
                </Link>
              </span>{" "}
              podcasts)
            </MotionLi>
            <MotionLi
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.3, duration: 0.75 }}
            >
              Documenting Black excellence (mostly) on{" "}
              <span>
                <Link
                  href="https://blackside.uk/"
                  aria-label="Go to blackside UK podcast on Spotify"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    blackside UK{" "}
                  </span>
                </Link>
              </span>
              and (
              <span>
                <Link
                  href="https://otherexpats.com"
                  aria-label="Go to Other Expats podcast on Spotify"
                  target="_blank"
                  rel="noopener"
                  className="group text-gray-200 transition-all duration-300 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                    Other Expats
                  </span>
                </Link>
              </span>
              )
            </MotionLi>
            <MotionLi
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.75 }}
            >
              Writing words that people (probably don&apos;t) want to read
            </MotionLi>
          </ul>

          <MotionParagraph
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.3, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl md:px-32 px-11 lg:pt-5 pt-10 tracking-wide font-light"
          >
            Receipts? Of course; check out my{" "}
            <span>
              <Link
                href="journal"
                aria-label="Navigate to the journal page"
                rel="noopener"
                className="group text-gray-200 transition-all duration-300 ease-in-out"
              >
                <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
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
                <span className="bg-left-bottom bg-gradient-to-r from-sienna to-sienna bg-[length:100%_2px] bg-no-repeat group-hover:bg-[length:0%_2px] transition-all duration-700 ease-out hover:text-sienna">
                  projects
                </span>
              </Link>
            </span>{" "}
            section.
          </MotionParagraph>
        </section>

        {/* New section */}

        <section className="">
          <MotionHeading4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl md:px-32 px-11 pt-5 tracking-wide"
          >
            Things that make me tick
          </MotionHeading4>
          <MotionDiv
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="grid md:grid-cols-2 text-gray-200 md:text-2xl text-xl md:px-32 px-11 py-5 tracking-wide font-light"
          >
            <ul className="list-disc list-inside">
              <li>Audiobooks (because reading is hard)</li>
              <li>Walking (cheaper than therapy)</li>
              <li>Making lists (you&apos;re reading one now)</li>
            </ul>
            <ul className="list-disc list-inside">
              <li>Reading (yes, I contradict myself occassionally)</li>
              <li>Photography (definitely not only my lunch)</li>
              <li>Running (from responsibilities, obviously)</li>
            </ul>
          </MotionDiv>
        </section>

        {/* New section */}

        <section className="">
          <MotionHeading4
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="text-gray-200 md:text-3xl text-2xl md:px-32 px-11 tracking-wide"
          >
            My digital toolbox (aka tech stack)
          </MotionHeading4>
          <MotionDiv
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.75 }}
            className="grid md:grid-cols-2 text-gray-200 md:text-2xl text-xl md:px-32 px-11 py-5 tracking-wide font-light md:space-y-0 space-y-10"
          >
            <div>
              <h3 className="py-3 font-semibold">
                The go-to weapons (it&apos;s all about the front-end)
              </h3>
            <ul className="list-disc list-inside">
              <li>React (for when vanilla JS just won&apos;t cut it)</li>
              <li>NextJS (because nobody likes slow websites)</li>
              <li>Node (server-side shenanigans)</li>
              <li>TailwindCSS (making things pretty, efficiently)</li>
              <li>MongoDB (where I keep all the secrets)</li>
            </ul>
            </div>
            <div>
            <h3 className="py-3 font-semibold">
                B-team (because sometimes, you need a different hammer)
              </h3>
            <ul className="list-disc list-inside">
              <li>WordPress (60% of the web can&apos;t be wrong... right?)</li>
              <li>Wix (when clients insist on dragging and dropping)</li>
              <li>Contentful (headless CMS for the win)</li>
              <li>Drupal (for when WordPress isn&apos;t complicated enough)</li>
            </ul>
            </div>
          </MotionDiv>
        </section>

        {/* New section */}

        <section>
          <MotionParagraph
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 1.7, duration: 0.75 }}
            className="text-gray-200 md:text-2xl text-xl md:px-32 px-11 tracking-wide font-light"
          >
            PS: This list grows fast so check back next week for whatever new shiny tool catches my eye. <br /> Want to chat? Send me a message at{" "}
            <span className="group text-gray-200 transition-all duration-300 ease-in-out">
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
            or use the fancy contact form below. I promise I read everything.
            Eventually.
          </MotionParagraph>
        </section>
      </div>
    </main>
  );
}
