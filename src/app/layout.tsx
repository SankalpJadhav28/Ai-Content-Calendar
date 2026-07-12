"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./globals.css";
import { AppProvider, useApp } from "@/context/AppContext";

function Navbar() {
  const { user, signOut } = useApp();
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/generate", label: "Generate" },
    { href: "/calendar", label: "Calendar" },
    { href: "/saved", label: "Saved" },
    { href: "/script", label: "Script" },
  ];

  if (pathname === "/login" || pathname === "/signup") return null;

  return (
    <nav
      className="flex-shrink-0 px-8 flex items-center justify-between"
      style={{
        height: "56px",
        background: "#0f0f13",
        borderBottom: "0.5px solid #1f1f27",
      }}
    >
      <Link href="/" className="flex items-center gap-2">
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
          style={{ background: "rgba(124,58,237,0.2)" }}
        >
          ✦
        </div>
        <span className="text-sm font-semibold text-white">AI Calendar</span>
      </Link>

      <div className="flex items-center gap-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: isActive ? "rgba(124,58,237,0.1)" : "transparent",
                color: isActive ? "#a78bfa" : "#6b7280",
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-xs text-gray-600">{user.email}</span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
              style={{ background: "rgba(124,58,237,0.2)", color: "#a78bfa" }}
            >
              {user.email[0].toUpperCase()}
            </div>
            <button
              onClick={signOut}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="text-xs px-3 py-1.5 rounded-lg transition-all"
            style={{
              background: "rgba(124,58,237,0.15)",
              color: "#a78bfa",
              border: "0.5px solid rgba(124,58,237,0.3)",
            }}
          >
            Sign in →
          </Link>
        )}
      </div>
    </nav>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isAuthPage ? "0" : "2.5rem 3rem",
          scrollbarWidth: "none",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gray-950 text-white"
        style={{ margin: 0, padding: 0 }}
      >
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
