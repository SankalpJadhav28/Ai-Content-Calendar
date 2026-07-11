import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "AI Content Calendar",
  description: "AI powered content planning tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white h-screen flex overflow-hidden">
        <AppProvider>
          {/* Sidebar */}
          <aside className="w-56 h-screen bg-gray-900 border-r border-gray-800 p-6 flex flex-col gap-6 flex-shrink-0">
            <div className="text-base font-semibold text-white">
              AI Calendar
            </div>
            <nav className="flex flex-col gap-1">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/generate"
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Generate Ideas
              </Link>
              <Link
                href="/calendar"
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Calendar
              </Link>
              <Link
                href="/saved"
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Saved Content
              </Link>
              <Link
                href="/script"
                className="px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
              >
                Script Writer
              </Link>
            </nav>
          </aside>

          {/* Main */}
          <main className="flex-1 h-screen overflow-y-auto p-8">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
