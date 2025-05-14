"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({
  code,
  language,
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Add line numbers only for code blocks with multiple lines
  const showLineNumbers = code.split("\n").length > 1;

  return (
    <div className="my-8 rounded-md overflow-hidden relative group">
      {filename && (
        <div className="bg-neutral-800 text-gray-300 px-4 py-2 text-sm font-mono border-b border-neutral-700 flex justify-between items-center">
          <span>{filename}</span>
          <button
            onClick={handleCopyClick}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        </div>
      )}
      <div className="relative">
        {!filename && (
          <button
            onClick={handleCopyClick}
            className="absolute top-3 right-3 bg-neutral-800/90 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 text-gray-400 hover:text-white"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
        )}
        <SyntaxHighlighter
          language={language || "text"}
          style={vscDarkPlus}
          wrapLongLines={false}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#555",
            textAlign: "right",
            userSelect: "none",
            borderRight: "1px solid #333",
            marginRight: "1em",
          }}
          customStyle={{
            margin: 0,
            borderRadius: filename ? "0 0 0.375rem 0.375rem" : "0.375rem",
            fontSize: "0.9rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
