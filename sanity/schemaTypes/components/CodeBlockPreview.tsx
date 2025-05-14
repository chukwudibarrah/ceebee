import React from "react";

interface CodeBlockPreviewProps {
  value: {
    code: string;
    language: string;
    filename?: string;
  };
}

export default function CodeBlockPreview({ value }: CodeBlockPreviewProps) {
  const { code, language, filename } = value;

  if (!code) {
    return <div>No code to display</div>;
  }

  return (
    <div
      style={{
        maxHeight: "200px",
        overflow: "auto",
        background: "#1e1e1e",
        borderRadius: "4px",
        marginTop: "10px",
      }}
    >
      {filename && (
        <div
          style={{
            padding: "8px 12px",
            borderBottom: "1px solid #333",
            background: "#252525",
            color: "#ccc",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          {filename}
        </div>
      )}
      <pre
        style={{
          padding: "12px",
          margin: 0,
          color: "#f8f8f2",
          fontFamily: "monospace",
          fontSize: "13px",
          lineHeight: 1.5,
          overflowX: "auto",
        }}
      >
        <code>{code}</code>
      </pre>
      <div
        style={{
          padding: "4px 12px",
          borderTop: "1px solid #333",
          background: "#252525",
          color: "#999",
          fontFamily: "monospace",
          fontSize: "11px",
          textAlign: "right",
        }}
      >
        {language || "text"}
      </div>
    </div>
  );
}
