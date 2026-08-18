import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Career-Ops | Mission Control",
  description: "AI-powered job search automation pipeline.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <div className="app-container">
          <aside className="sidebar glass-panel">
            <div className="sidebar-header">
              <div className="logo">
                <span className="logo-icon">▲</span>
                <h2>Career-Ops</h2>
              </div>
            </div>
            
            <nav className="sidebar-nav">
              <ul>
                <li>
                  <Link href="/" className="nav-item">
                    <span className="nav-icon">📊</span>
                    Mission Control
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="nav-item">
                    <span className="nav-icon">🧠</span>
                    Offer Reports
                  </Link>
                </li>
                <li>
                  <Link href="/pipeline" className="nav-item">
                    <span className="nav-icon">📥</span>
                    Pipeline Inbox
                  </Link>
                </li>
                <li>
                  <Link href="/cv" className="nav-item">
                    <span className="nav-icon">📄</span>
                    CV Studio
                  </Link>
                </li>
              </ul>
            </nav>
            
            <div className="sidebar-footer">
              <div className="status-indicator">
                <div className="pulse-dot"></div>
                <span>CLI Connected</span>
              </div>
            </div>
          </aside>
          
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
