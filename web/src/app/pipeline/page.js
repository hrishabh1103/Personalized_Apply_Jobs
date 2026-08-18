"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function PipelineView() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/file?target=pipeline")
        .then(res => res.json())
        .then(data => {
          setContent(data.content || "");
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", paddingBottom: "4rem" }}>
      <header className="flex-between" style={{ marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>
            Pipeline Inbox
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>URLs waiting to be processed by the CLI.</p>
        </div>
      </header>

      {loading ? (
        <p style={{ color: "var(--text-secondary)" }}>Loading pipeline...</p>
      ) : (
        <div className="glass-panel" style={{ padding: "3rem" }}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: "1.5rem", fontWeight: "600", marginBottom: "1.5rem", color: "var(--text-primary)" }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: "0.5rem", color: "var(--text-secondary)", fontFamily: "monospace" }} {...props} />,
                a: ({node, ...props}) => <a style={{ color: "var(--accent-color)", textDecoration: "underline" }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ paddingLeft: "1.5rem", listStyleType: "disc", color: "var(--text-secondary)" }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: "0.5rem", wordBreak: "break-all" }} {...props} />,
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
