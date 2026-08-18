"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CVView() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/file?target=cv")
      .then(res => res.json())
      .then(data => {
        setContent(data.content || "");
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>
      <header className="flex-between" style={{ marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            CV Studio
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Your raw resume data used for generating ATS PDFs.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button className="btn-primary" style={{ background: "transparent", border: "1px solid var(--surface-border)", boxShadow: "none" }}>
            Open PDF Output Dir
          </button>
        </div>
      </header>

      {loading ? (
        <p style={{ color: "var(--text-secondary)" }}>Loading CV...</p>
      ) : (
        <div className="glass-panel" style={{ padding: "3rem", background: "#f8fafc" }}>
          {/* Light background for CV specifically to match standard document viewing */}
          <div className="markdown-content cv-preview" style={{ color: "#334155" }}>
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "1rem", color: "#0f172a", borderBottom: "2px solid #e2e8f0", paddingBottom: "0.5rem" }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginTop: "2rem", marginBottom: "1rem", color: "#1e293b", textTransform: "uppercase", letterSpacing: "1px" }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "1rem", marginBottom: "0.5rem", color: "#334155" }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: "1rem", lineHeight: "1.6" }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginBottom: "1.5rem", paddingLeft: "1.5rem", listStyleType: "square" }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: "0.5rem", lineHeight: "1.6" }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ color: "#0f172a", fontWeight: "700" }} {...props} />,
                a: ({node, ...props}) => <a style={{ color: "#2563eb", textDecoration: "none" }} {...props} />,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}
