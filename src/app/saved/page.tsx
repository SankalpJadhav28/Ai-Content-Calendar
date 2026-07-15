"use client";

import { useApp, PLATFORM_DOT, PLATFORM_BADGE } from "@/context/AppContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SavedPage() {
  const router = useRouter();
  const { savedIdeas, deleteSavedIdea, posts, deletePost } = useApp();
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

  const allItems = [
    ...savedIdeas.map((idea) => ({
      id: idea.id,
      title: idea.title,
      description: idea.description,
      platform: idea.platform,
      type: "idea" as const,
      date: idea.savedAt,
    })),
    ...posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: `Scheduled for day ${post.day}`,
      platform: post.platform,
      type: "scheduled" as const,
      date: `Day ${post.day}`,
    })),
  ];

  const filtered = allItems.filter((item) => {
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

  function handleDelete(id: string, type: "idea" | "scheduled") {
    if (type === "idea") deleteSavedIdea(id);
    else deletePost(id);
  }

  function openScriptWriter(item: (typeof allItems)[0]) {
    const params = new URLSearchParams({
      title: item.title,
      description: item.description,
      platform: item.platform,
    });
    router.push(`/script?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white">Saved content</h1>
        <p className="text-gray-500 mt-1 text-sm">
          {allItems.length} items saved
        </p>
      </div>

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
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search saved content..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
        />
      </div>

      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-12 text-center">
            <p className="text-gray-600 text-sm">
              {allItems.length === 0
                ? "No saved content yet — go generate some ideas!"
                : "No items match your search."}
            </p>
          </div>
        ) : (
          filtered.map((item) => {
            const plt = PLATFORM_DOT[item.platform];
            const badge = PLATFORM_BADGE[item.platform];
            return (
              <div
                key={item.id}
                className="bg-gray-900/40 border border-gray-800 rounded-2xl p-4 flex items-start gap-4 hover:border-gray-700 transition-all"
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: plt }}
                />
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
                      style={{ background: badge?.bg, color: badge?.color }}
                    >
                      {item.platform}
                    </span>
                    <span className="text-xs text-gray-600">{item.date}</span>
                  </div>
                </div>
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
                    onClick={() => handleDelete(item.id, item.type)}
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
