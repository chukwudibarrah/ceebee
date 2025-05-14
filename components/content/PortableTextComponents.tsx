// components/content/PortableTextComponents.tsx

import { PortableTextReactComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/lib/client";
import { zilla } from "@/styles/fonts";
import CodeBlock from "./CodeBlock";

export const ptComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <figure className="relative w-full my-8">
          <div className="relative w-full h-auto min-h-[300px] md:min-h-[400px]">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || "Image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
              className="rounded-md"
            />
          </div>
          {value.alt && (
            <figcaption className="text-sm text-center text-gray-400 mt-2">
              {value.alt}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      if (!value?.code) {
        return null;
      }

      return (
        <CodeBlock
          code={value.code}
          language={value.language || "text"}
          filename={value.filename}
        />
      );
    },
  },
  block: {
    // Match the styles defined in your blockContentType schema
    h1: ({ children }) => (
      <h1 className="text-4xl md:text-5xl font-bold mt-12 mb-4 text-gray-200">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-gray-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-200">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-bold mt-6 mb-4 text-gray-200">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-loose md:text-xl lg:text-2xl my-7 text-gray-200">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sienna pl-4 italic my-6 text-gray-300">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Match the list types defined in your schema
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 leading-loose md:text-xl lg:text-2xl my-7 text-gray-200">
        {children}
      </ul>
    ),
  },
  listItem: {
    // Style for list items
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    // Match the mark decorators in your schema
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,

    // Match the annotations in your schema
    link: ({ children, value }) => {
      if (!value?.href) {
        return <>{children}</>;
      }
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          id="animate"
          target="_blank"
          className="text-sienna hover:opacity-80 transition-opacity"
        >
          {children}
        </a>
      );
    },
  },
};
