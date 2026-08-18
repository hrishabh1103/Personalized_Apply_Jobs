"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function ReportDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/reports/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setContent(data.content);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load report");
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "4rem" }}>
      <button 
        onClick={() => router.back()} 
        className="btn-primary" 
        style={{ background: "transparent", border: "1px solid var(--surface-border)", boxShadow: "none", marginBottom: "2rem" }}
      >
        ← Back to Reports
      </button>

      {loading ? (
        <p style={{ color: "var(--text-secondary)" }}>Loading report details...</p>
      ) : error ? (
        <p style={{ color: "var(--danger-color)" }}>{error}</p>
      ) : (
        <div className="glass-panel" style={{ padding: "3rem" }}>
          <div className="markdown-content">
            <ReactMarkdown
              components={{
                h1: ({node, ...props}) => <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "1.5rem", color: "var(--text-primary)" }} {...props} />,
                h2: ({node, ...props}) => <h2 style={{ fontSize: "1.5rem", fontWeight: "600", marginTop: "2rem", marginBottom: "1rem", color: "var(--text-primary)", borderBottom: "1px solid var(--surface-border)", paddingBottom: "0.5rem" }} {...props} />,
                h3: ({node, ...props}) => <h3 style={{ fontSize: "1.25rem", fontWeight: "600", marginTop: "1.5rem", marginBottom: "0.75rem", color: "var(--text-primary)" }} {...props} />,
                p: ({node, ...props}) => <p style={{ marginBottom: "1rem", color: "var(--text-secondary)", lineHeight: "1.6" }} {...props} />,
                ul: ({node, ...props}) => <ul style={{ marginBottom: "1rem", paddingLeft: "1.5rem", listStyleType: "disc", color: "var(--text-secondary)" }} {...props} />,
                li: ({node, ...props}) => <li style={{ marginBottom: "0.5rem" }} {...props} />,
                strong: ({node, ...props}) => <strong style={{ color: "var(--text-primary)", fontWeight: "600" }} {...props} />,
                hr: ({node, ...props}) => <hr style={{ border: "0", height: "1px", background: "var(--surface-border)", margin: "2rem 0" }} {...props} />,
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
