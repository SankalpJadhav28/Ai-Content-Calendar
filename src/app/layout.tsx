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
  if (pathname === "/") return null;

  return (
    <nav
      style={{
        height: "52px",
        background: "rgba(10,10,15,0.95)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <Link
        href="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "8px",
            background: "rgba(124,58,237,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
          }}
        >
          ✦
        </div>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#ffffff" }}>
          AI Calendar
        </span>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          background: "rgba(255,255,255,0.04)",
          border: "0.5px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
          padding: "4px",
        }}
      >
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: "13px",
                padding: "5px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                background: isActive ? "rgba(124,58,237,0.2)" : "transparent",
                color: isActive ? "#c4b5fd" : "#6b7280",
                fontWeight: isActive ? 500 : 400,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            <span style={{ fontSize: "12px", color: "#4b5563" }}>
              {user.email}
            </span>
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "rgba(124,58,237,0.2)",
                border: "0.5px solid rgba(124,58,237,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 500,
                color: "#a78bfa",
              }}
            >
              {user.email[0].toUpperCase()}
            </div>
            <button
              onClick={signOut}
              style={{
                fontSize: "12px",
                color: "#4b5563",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
            >
              Sign out
            </button>
          </>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href="/login"
              style={{
                fontSize: "12px",
                color: "#6b7280",
                textDecoration: "none",
              }}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              style={{
                fontSize: "12px",
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(124,58,237,0.15)",
                border: "0.5px solid rgba(124,58,237,0.3)",
                color: "#a78bfa",
                textDecoration: "none",
              }}
            >
              Get started free →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

function SignupBanner() {
  const { user } = useApp();
  const pathname = usePathname();

  const showBanner =
    !user &&
    (pathname === "/generate" ||
      pathname === "/calendar" ||
      pathname === "/script");

  if (!showBanner) return null;

  return (
    <div
      style={{
        background: "rgba(124,58,237,0.06)",
        borderBottom: "0.5px solid rgba(124,58,237,0.2)",
        padding: "8px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <p style={{ fontSize: "12px", color: "#a78bfa" }}>
        ✦ You&apos;re in preview mode — sign up free to save ideas, scripts and
        posts
      </p>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Link
          href="/login"
          style={{ fontSize: "12px", color: "#6b7280", textDecoration: "none" }}
        >
          Sign in
        </Link>
        <Link
          href="/signup"
          style={{
            fontSize: "12px",
            color: "#a78bfa",
            textDecoration: "none",
            fontWeight: 500,
            background: "rgba(124,58,237,0.15)",
            border: "0.5px solid rgba(124,58,237,0.3)",
            padding: "4px 12px",
            borderRadius: "6px",
          }}
        >
          Sign up free →
        </Link>
      </div>
    </div>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useApp();
  const pathname = usePathname();
  if (pathname === "/login" || pathname === "/signup") return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <SignupBanner />
      <main
        style={{
          flex: 1,
          overflowY: "auto",
          padding: isAuthPage || isLandingPage ? "0" : "32px 40px",
          scrollbarWidth: "none" as const,
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
        style={{
          margin: 0,
          padding: 0,
          background: "#0a0a0f",
          color: "#ffffff",
        }}
      >
        <AppProvider>
          <AppShell>{children}</AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
