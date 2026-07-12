"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

// --- Types ---
export interface ScheduledPost {
  id: string;
  day: number;
  month: number;
  year: number;
  title: string;
  platform: string;
  color: string;
}

export interface SavedIdea {
  id: string;
  title: string;
  description: string;
  platform: string;
  savedAt: string;
}

export interface SavedScript {
  id: string;
  title: string;
  platform: string;
  script: string;
  savedAt: string;
}

// --- Platform helpers ---
export const PLATFORM_COLORS: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  YouTube: "bg-red-500/20 text-red-300 border-red-500/30",
  LinkedIn: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Facebook: "bg-blue-600/20 text-blue-300 border-blue-600/30",
};

export const PLATFORM_DOT: Record<string, string> = {
  Instagram: "#ec4899",
  YouTube: "#ef4444",
  LinkedIn: "#3b82f6",
  Facebook: "#1877f2",
};

export const PLATFORM_BADGE: Record<string, { bg: string; color: string }> = {
  Instagram: { bg: "rgba(236,72,153,0.15)", color: "#f472b6" },
  YouTube: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  LinkedIn: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Facebook: { bg: "rgba(24,119,242,0.15)", color: "#60a5fa" },
};

// --- Context shape ---
interface AppContextType {
  user: { id: string; email: string } | null;
  signOut: () => Promise<void>;
  posts: ScheduledPost[];
  addPost: (post: Omit<ScheduledPost, "id">) => void;
  deletePost: (id: string) => void;
  savedIdeas: SavedIdea[];
  saveIdea: (idea: Omit<SavedIdea, "id" | "savedAt">) => void;
  deleteSavedIdea: (id: string) => void;
  savedScripts: SavedScript[];
  saveScript: (script: Omit<SavedScript, "id" | "savedAt">) => void;
  deleteSavedScript: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const today = new Date();

  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: "1",
      day: 5,
      month: today.getMonth(),
      year: today.getFullYear(),
      title: "Morning routine reel",
      platform: "Instagram",
      color: PLATFORM_COLORS["Instagram"],
    },
    {
      id: "2",
      day: 12,
      month: today.getMonth(),
      year: today.getFullYear(),
      title: "Study with me vlog",
      platform: "YouTube",
      color: PLATFORM_COLORS["YouTube"],
    },
    {
      id: "3",
      day: 18,
      month: today.getMonth(),
      year: today.getFullYear(),
      title: "Career lessons thread",
      platform: "LinkedIn",
      color: PLATFORM_COLORS["LinkedIn"],
    },
    {
      id: "4",
      day: 24,
      month: today.getMonth(),
      year: today.getFullYear(),
      title: "Outfit of the day",
      platform: "Instagram",
      color: PLATFORM_COLORS["Instagram"],
    },
  ]);

  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([
    {
      id: "1",
      title: "Morning routine reel — 5 habits before 8am",
      description: "Hook with a bold claim, show each habit quickly.",
      platform: "Instagram",
      savedAt: "Jun 28",
    },
    {
      id: "2",
      title: "3 career lessons nobody told me in college",
      description: "Personal story format — honest, relatable.",
      platform: "LinkedIn",
      savedAt: "Jul 2",
    },
    {
      id: "3",
      title: "How I built my productivity system",
      description: "Step by step walkthrough of tools and habits.",
      platform: "YouTube",
      savedAt: "Jul 5",
    },
  ]);

  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);

  // --- Auth ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  // --- Posts ---
  function addPost(post: Omit<ScheduledPost, "id">) {
    const id = Date.now().toString();
    setPosts((prev) => [...prev, { ...post, id }]);
  }

  function deletePost(id: string) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  // --- Ideas ---
  function saveIdea(idea: Omit<SavedIdea, "id" | "savedAt">) {
    const id = Date.now().toString();
    const savedAt = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setSavedIdeas((prev) => [...prev, { ...idea, id, savedAt }]);
  }

  function deleteSavedIdea(id: string) {
    setSavedIdeas((prev) => prev.filter((i) => i.id !== id));
  }

  // --- Scripts ---
  function saveScript(script: Omit<SavedScript, "id" | "savedAt">) {
    const id = Date.now().toString();
    const savedAt = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    setSavedScripts((prev) => [...prev, { ...script, id, savedAt }]);
  }

  function deleteSavedScript(id: string) {
    setSavedScripts((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <AppContext.Provider
      value={{
        user,
        signOut,
        posts,
        addPost,
        deletePost,
        savedIdeas,
        saveIdea,
        deleteSavedIdea,
        savedScripts,
        saveScript,
        deleteSavedScript,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
}
