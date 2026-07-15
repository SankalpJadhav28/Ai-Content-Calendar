"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";

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

interface AppContextType {
  user: { id: string; email: string } | null;
  signOut: () => Promise<void>;
  posts: ScheduledPost[];
  addPost: (post: Omit<ScheduledPost, "id">) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  savedIdeas: SavedIdea[];
  saveIdea: (idea: Omit<SavedIdea, "id" | "savedAt">) => Promise<void>;
  deleteSavedIdea: (id: string) => Promise<void>;
  savedScripts: SavedScript[];
  saveScript: (script: Omit<SavedScript, "id" | "savedAt">) => Promise<void>;
  deleteSavedScript: (id: string) => Promise<void>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [posts, setPosts] = useState<ScheduledPost[]>([]);
  const [savedIdeas, setSavedIdeas] = useState<SavedIdea[]>([]);
  const [savedScripts, setSavedScripts] = useState<SavedScript[]>([]);
  const [loading, setLoading] = useState(true);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ id: session.user.id, email: session.user.email! });
      } else {
        setUser(null);
        setPosts([]);
        setSavedIdeas([]);
        setSavedScripts([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load data when user logs in
  async function loadAllData() {
    setLoading(true);
    // eslint-disable-next-line react-hooks/immutability
    await Promise.all([loadPosts(), loadIdeas(), loadScripts()]);
    setLoading(false);
  }

  useEffect(() => {
    if (!user) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function loadPosts() {
    const { data } = await supabase
      .from("scheduled_posts")
      .select("*")
      .order("day", { ascending: true });
    if (data) {
      setPosts(
        data.map((p) => ({
          id: p.id,
          day: p.day,
          month: p.month,
          year: p.year,
          title: p.title,
          platform: p.platform,
          color: p.color || PLATFORM_COLORS[p.platform] || "",
        })),
      );
    }
  }

  async function loadIdeas() {
    const { data } = await supabase
      .from("saved_ideas")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setSavedIdeas(
        data.map((i) => ({
          id: i.id,
          title: i.title,
          description: i.description || "",
          platform: i.platform,
          savedAt: new Date(i.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        })),
      );
    }
  }

  async function loadScripts() {
    const { data } = await supabase
      .from("saved_scripts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setSavedScripts(
        data.map((s) => ({
          id: s.id,
          title: s.title,
          platform: s.platform,
          script: s.script,
          savedAt: new Date(s.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        })),
      );
    }
  }

  async function addPost(post: Omit<ScheduledPost, "id">) {
    if (!user) {
      console.log("No user found");
      return;
    }
    console.log("Adding post:", post, "for user:", user.id);
    const { data, error } = await supabase
      .from("scheduled_posts")
      .insert({ ...post, user_id: user.id })
      .select()
      .single();
    console.log("Result:", data, "Error:", error);
    if (data) {
      setPosts((prev) => [
        ...prev,
        {
          id: data.id,
          day: data.day,
          month: data.month,
          year: data.year,
          title: data.title,
          platform: data.platform,
          color: data.color || PLATFORM_COLORS[data.platform] || "",
        },
      ]);
    }
  }

  async function deletePost(id: string) {
    await supabase.from("scheduled_posts").delete().eq("id", id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  async function saveIdea(idea: Omit<SavedIdea, "id" | "savedAt">) {
    console.log("saveIdea called", idea);
    console.log("current user", user);

    if (!user) {
      console.log("NO USER — aborting");
      return;
    }

    const { data, error } = await supabase
      .from("saved_ideas")
      .insert({ ...idea, user_id: user.id })
      .select()
      .single();

    console.log("insert data:", data);
    console.log("insert error:", error);

    if (data) {
      setSavedIdeas((prev) => [
        {
          id: data.id,
          title: data.title,
          description: data.description || "",
          platform: data.platform,
          savedAt: new Date(data.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        },
        ...prev,
      ]);
    }
  }

  async function deleteSavedIdea(id: string) {
    await supabase.from("saved_ideas").delete().eq("id", id);
    setSavedIdeas((prev) => prev.filter((i) => i.id !== id));
  }

  async function saveScript(script: Omit<SavedScript, "id" | "savedAt">) {
    if (!user) return;
    const { data } = await supabase
      .from("saved_scripts")
      .insert({ ...script, user_id: user.id })
      .select()
      .single();
    if (data) {
      setSavedScripts((prev) => [
        {
          id: data.id,
          title: data.title,
          platform: data.platform,
          script: data.script,
          savedAt: new Date(data.created_at).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        },
        ...prev,
      ]);
    }
  }

  async function deleteSavedScript(id: string) {
    await supabase.from("saved_scripts").delete().eq("id", id);
    setSavedScripts((prev) => prev.filter((s) => s.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
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
        loading,
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
