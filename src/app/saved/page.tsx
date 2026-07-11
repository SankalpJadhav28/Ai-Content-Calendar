"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface SavedItem {
  id: string;
  title: string;
  description: string;
  platform: string;
  type: "idea" | "scheduled";
  date: string;
}

const PLATFORM_COLORS: Record<
  string,
  { dot: string; bg: string; color: string }
> = {
  Instagram: { dot: "#ec4899", bg: "rgba(236,72,153,0.1)", color: "#f472b6" },
  YouTube: { dot: "#ef4444", bg: "rgba(239,68,68,0.1)", color: "#f87171" },
  LinkedIn: { dot: "#3b82f6", bg: "rgba(59,130,246,0.1)", color: "#60a5fa" },
  Facebook: { dot: "#1877f2", bg: "rgba(24,119,242,0.1)", color: "#60a5fa" },
};

const SAMPLE_ITEMS: SavedItem[] = [
  {
    id: "1",
    title: "Morning routine reel — 5 habits before 8am",
    description:
      "Hook with a bold claim, show each habit quickly with transitions.",
    platform: "Instagram",
    type: "idea",
    date: "Jun 28",
  },
  {
    id: "2",
    title: "Study with me vlog — 6 hour deep work session",
    description: "Film a full day of studying, add lofi music and time lapses.",
    platform: "YouTube",
    type: "scheduled",
    date: "Jul 12",
  },
  {
    id: "3",
    title: "3 career lessons nobody told me in college",
    description:
      "Personal story format — honest, relatable, ends with actionable advice.",
    platform: "LinkedIn",
    type: "idea",
    date: "Jul 2",
  },
  {
    id: "4",
    title: "Outfit of the day — minimalist summer look",
    description:
      "Quick transition reel showing 3 outfit variations with same base pieces.",
    platform: "Instagram",
    type: "scheduled",
    date: "Jul 24",
  },
  {
    id: "5",
    title: "How I built my productivity system from scratch",
    description:
      "Step by step walkthrough of tools, habits and mindset shifts.",
    platform: "YouTube",
    type: "idea",
    date: "Jul 5",
  },
  {
    id: "6",
    title: "Why most people fail at consistency",
    description: "Counterintuitive take on why motivation is overrated.",
    platform: "Facebook",
    type: "idea",
    date: "Jul 8",
  },
];

export default function SavedPage() {
  const router = useRouter();
  const [items, setItems] = useState<SavedItem[]>(SAMPLE_ITEMS);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filters = [
    "All",
    "💡 Ideas",
    "📅 Scheduled",
    "Instagram",
    "YouTube",
    "LinkedIn",
    "Facebook",
  ];

  const filtered = items.filter((item) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "💡 Ideas" && item.type === "idea") ||
      (filter === "📅 Scheduled" && item.type === "scheduled") ||
      item.platform === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function openScriptWriter(item: SavedItem) {
    const params = new URLSearchParams({
      title: item.title,
      description: item.description,
      platform: item.platform,
    });
    router.push(`/script?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Saved content</h1>
        <p className="text-gray-500 mt-1 text-sm">{items.length} items saved</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{
                borderColor:
                  filter === f
                    ? "rgba(124,58,237,0.5)"
                    : "rgba(255,255,255,0.06)",
                background:
                  filter === f ? "rgba(124,58,237,0.1)" : "transparent",
                color: filter === f ? "#a78bfa" : "#6b7280",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search saved content..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
        />
      </div>

      {/* List */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-gray-600 text-sm">No saved content found.</p>
          </div>
        ) : (
          filtered.map((item) => {
            const plt =
              PLATFORM_COLORS[item.platform] || PLATFORM_COLORS["Instagram"];
            return (
              <div
                key={item.id}
                className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex items-start gap-4 hover:border-gray-700 transition-all"
              >
                {/* Platform dot */}
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: plt.dot }}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-1">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          item.type === "idea"
                            ? "rgba(124,58,237,0.15)"
                            : "rgba(16,185,129,0.15)",
                        color: item.type === "idea" ? "#a78bfa" : "#34d399",
                      }}
                    >
                      {item.type === "idea" ? "💡 Idea" : "📅 Scheduled"}
                    </span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: plt.bg, color: plt.color }}
                    >
                      {item.platform}
                    </span>
                    <span className="text-xs text-gray-600">{item.date}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => openScriptWriter(item)}
                    className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:border-violet-500/50 hover:text-violet-400"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#6b7280",
                    }}
                  >
                    ✍️ Script
                  </button>
                  {item.type === "idea" && (
                    <button
                      className="text-xs px-3 py-1.5 rounded-lg border transition-all hover:border-green-500/50 hover:text-green-400"
                      style={{
                        borderColor: "rgba(255,255,255,0.08)",
                        color: "#6b7280",
                      }}
                    >
                      📅 Schedule
                    </button>
                  )}
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-xs px-2 py-1.5 rounded-lg border transition-all hover:border-red-500/50 hover:text-red-400"
                    style={{
                      borderColor: "rgba(255,255,255,0.08)",
                      color: "#6b7280",
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
