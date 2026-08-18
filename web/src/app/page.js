"use client";

import { useEffect, useState } from "react";
import "./page.module.css"; // We'll just rely on globals.css mostly, but keep if needed.

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/applications")
        .then(res => res.json())
        .then(data => {
          setApplications(data.applications || []);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    };

    fetchData();
    // Poll every 3 seconds to keep UI synced with CLI
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalApps = applications.length;
  const avgScore = applications.length > 0 
    ? (applications.reduce((acc, curr) => acc + parseFloat(curr.score || 0), 0) / applications.length).toFixed(1)
    : 0;

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header className="flex-between" style={{ marginBottom: "3rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "700", marginBottom: "0.5rem", background: "linear-gradient(to right, #a855f7, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Mission Control
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>Live visualization of your local Career-Ops pipeline.</p>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Total Applications</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--text-primary)" }}>{totalApps}</p>
        </div>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Average Score</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--success-color)" }}>{avgScore}</p>
        </div>
        <div className="glass-panel" style={{ padding: "1.5rem" }}>
          <h3 style={{ color: "var(--text-secondary)", fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "0.5rem" }}>Pending Actions</h3>
          <p style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--warning-color)" }}>0</p>
        </div>
      </div>

      <section>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", fontWeight: "600" }}>Recent Pipeline</h2>
        <div className="glass-panel" style={{ overflow: "hidden" }}>
          {loading ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>Loading mission data...</div>
          ) : applications.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "var(--text-secondary)" }}>No applications found.</div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead style={{ background: "rgba(255, 255, 255, 0.05)", borderBottom: "1px solid var(--surface-border)" }}>
                <tr>
                  <th style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>ID</th>
                  <th style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>Company</th>
                  <th style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>Role</th>
                  <th style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>Score</th>
                  <th style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)", fontWeight: "500" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid var(--surface-border)", transition: "background 0.2s" }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: "1rem 1.5rem", color: "var(--text-secondary)" }}>{app['#']}</td>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: "500" }}>{app.empresa}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>{app.rol}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{ background: "rgba(16, 185, 129, 0.1)", color: "var(--success-color)", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.875rem", fontWeight: "600" }}>
                        {app.score}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-color)" }}></span>
                        {app.estado}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </main>
  );
}
