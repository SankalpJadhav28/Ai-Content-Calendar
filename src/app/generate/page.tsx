"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Idea {
  title: string;
  description: string;
  saved: boolean;
}

function parseIdeas(text: string): Idea[] {
  const lines = text.split("\n").filter((line) => line.trim());
  const ideas: Idea[] = [];
  for (const line of lines) {
    const cleaned = line
      .replace(/\*\*/g, "")
      .replace(/^\d+\.\s*/, "")
      .trim();
    if (!cleaned) continue;
    const colonIndex = cleaned.indexOf(":");
    if (colonIndex !== -1) {
      ideas.push({
        title: cleaned.substring(0, colonIndex).trim(),
        description: cleaned.substring(colonIndex + 1).trim(),
        saved: false,
      });
    }
  }
  return ideas;
}

const platforms = [
  {
    name: "Instagram",
    emoji: "📸",
    desc: "Reels, carousels, stories",
    activeStyle:
      "border-color: rgba(236,72,153,0.6); background: rgba(236,72,153,0.08);",
    formats: ["Reel", "Carousel", "Story", "Post", "Guide"],
    previewColor:
      "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(124,58,237,0.3))",
    hashtags: "#instagram #content #trending #viral",
  },
  {
    name: "YouTube",
    emoji: "🎬",
    desc: "Long-form, Shorts, scripts",
    activeStyle:
      "border-color: rgba(239,68,68,0.6); background: rgba(239,68,68,0.08);",
    formats: ["Short", "Tutorial", "Vlog", "Review", "Live"],
    previewColor:
      "linear-gradient(135deg, rgba(239,68,68,0.3), rgba(245,158,11,0.3))",
    hashtags: "#youtube #shorts #viral #subscribe",
  },
  {
    name: "LinkedIn",
    emoji: "💼",
    desc: "Posts, articles, thought leadership",
    activeStyle:
      "border-color: rgba(59,130,246,0.6); background: rgba(59,130,246,0.08);",
    formats: ["Post", "Article", "Poll", "Newsletter", "Story"],
    previewColor:
      "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(6,182,212,0.3))",
    hashtags: "#linkedin #professional #growth #networking",
  },
  {
    name: "Facebook",
    emoji: "👍",
    desc: "Posts, stories, reels",
    activeStyle:
      "border-color: rgba(24,119,242,0.6); background: rgba(24,119,242,0.08);",
    formats: ["Post", "Reel", "Story", "Live", "Group"],
    previewColor:
      "linear-gradient(135deg, rgba(24,119,242,0.3), rgba(59,130,246,0.3))",
    hashtags: "#facebook #viral #trending #share",
  },
];

const tones = ["Casual", "Professional", "Funny", "Inspirational"];

const trendingTopics: Record<string, string[]> = {
  Instagram: [
    "Morning routine",
    "Outfit of the day",
    "Healthy recipes",
    "Gym transformation",
    "Travel aesthetic",
    "Productivity tips",
    "Skincare routine",
    "Budget fashion",
  ],
  YouTube: [
    "Day in my life",
    "Tech review",
    "Study with me",
    "Budget travel",
    "Beginner workout",
    "Room makeover",
    "Side hustle ideas",
    "Book summary",
  ],
  LinkedIn: [
    "Career lessons",
    "Startup story",
    "Leadership tips",
    "Work life balance",
    "First job advice",
    "Salary negotiation",
    "Remote work tips",
    "Industry trends",
  ],
  Facebook: [
    "Family moments",
    "Local community",
    "Recipe share",
    "Life update",
    "Throwback",
    "Business tips",
    "Event sharing",
    "Motivational",
  ],
};

const samplePreviews: Record<string, { title: string; caption: string }> = {
  Instagram: {
    title: "Trendy Transformation",
    caption:
      "Watch how one accessory completely changes an outfit. Which look is your fav? 👇 Drop a comment below!",
  },
  YouTube: {
    title: "I tried this for 30 days...",
    caption:
      "What happens when you commit to one habit for a full month? The results surprised me. Watch till the end 👀",
  },
  LinkedIn: {
    title: "3 lessons from my first year",
    caption:
      "A year ago I had no idea what I was doing. Here's what I wish someone had told me on day one. Thread 🧵",
  },
  Facebook: {
    title: "This changed everything for me",
    caption:
      "I never thought I'd share this publicly but here we are. Sometimes the most unexpected things teach you the most.",
  },
};

export default function GeneratePage() {
  const { saveIdea, user } = useApp();
  const router = useRouter();

  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Casual");
  const [audience, setAudience] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("Reel");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewIdea, setPreviewIdea] = useState<Idea | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const activePlatform = platforms.find((p) => p.name === platform)!;
  const preview = previewIdea ?? {
    title: samplePreviews[platform].title,
    description: samplePreviews[platform].caption,
    saved: false,
  };

  async function handleGenerate() {
    if (!topic.trim()) return;
    setLoading(true);
    setIdeas([]);
    setPreviewIdea(null);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
        platform,
        tone,
        audience,
        format: selectedFormat,
      }),
    });

    const data = await response.json();
    const parsed = parseIdeas(data.ideas);
    setIdeas(parsed);
    if (parsed.length > 0) setPreviewIdea(parsed[0]);
    setLoading(false);
  }

  function toggleSave(index: number) {
    if (!user) {
      router.push("/signup");
      return;
    }
    setIdeas((prev) =>
      prev.map((idea, i) => {
        if (i === index) {
          if (!idea.saved) {
            saveIdea({
              title: idea.title,
              description: idea.description,
              platform,
            });
          }
          return { ...idea, saved: !idea.saved };
        }
        return idea;
      }),
    );
  }

  async function copyIdea(index: number) {
    await navigator.clipboard.writeText(
      `${ideas[index].title}\n\n${ideas[index].description}`,
    );
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  }

  function handlePlatformChange(name: string) {
    setPlatform(name);
    const p = platforms.find((p) => p.name === name)!;
    setSelectedFormat(p.formats[0]);
    setPreviewIdea(null);
  }

  return (
    <>
      <style>{`
        .gen-layout { display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; }
        .gen-preview-toggle { display: none; }

        @media (max-width: 768px) {
          .gen-layout { grid-template-columns: 1fr; }
          .gen-right-panel { display: none; }
          .gen-right-panel.visible { display: block; }
          .gen-preview-toggle {
            display: flex; align-items: center; justify-content: center; gap: 8px;
            width: 100%; padding: 10px; border-radius: 12px; margin-top: 8px;
            background: rgba(124,58,237,0.1); border: 0.5px solid rgba(124,58,237,0.3);
            color: #a78bfa; font-size: 13px; cursor: pointer;
          }
          .gen-platform-grid { grid-template-columns: 1fr 1fr !important; }
          .gen-tone-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      <div className="flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Generate ideas</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Pick a platform, set your preferences — get content ideas instantly
          </p>
        </div>

        {/* Not logged in banner */}
        {!user && (
          <div
            style={{
              background: "rgba(124,58,237,0.06)",
              border: "0.5px solid rgba(124,58,237,0.2)",
              borderRadius: "12px",
              padding: "10px 14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <p style={{ fontSize: "12px", color: "#a78bfa" }}>
              ✦ Sign up free to save ideas and access all features
            </p>
            <Link
              href="/signup"
              style={{
                fontSize: "12px",
                color: "#a78bfa",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Sign up →
            </Link>
          </div>
        )}

        {/* Two panel layout */}
        <div className="gen-layout">
          {/* LEFT — controls */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 flex flex-col gap-5">
            {/* Platform */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
                Platform
              </p>
              <div
                className="gen-platform-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
                }}
              >
                {platforms.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => handlePlatformChange(p.name)}
                    className="flex flex-col gap-1.5 p-3 rounded-xl border transition-all text-left"
                    style={{
                      borderColor:
                        platform === p.name
                          ? "rgba(124,58,237,0.5)"
                          : "rgba(255,255,255,0.06)",
                      background:
                        platform === p.name
                          ? "rgba(124,58,237,0.1)"
                          : "transparent",
                    }}
                  >
                    <span className="text-lg">{p.emoji}</span>
                    <p className="text-xs font-medium text-white">{p.name}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Topic */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Topic
              </p>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="e.g. fitness, cooking, travel..."
                className="w-full bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors text-sm"
              />
              {/* Trending chips */}
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-2">
                  🔥 Trending on {platform}
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingTopics[platform].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTopic(t)}
                      className="text-xs px-3 py-1.5 rounded-lg border transition-all"
                      style={{
                        borderColor:
                          topic === t
                            ? "rgba(124,58,237,0.5)"
                            : "rgba(255,255,255,0.06)",
                        background:
                          topic === t ? "rgba(124,58,237,0.1)" : "transparent",
                        color: topic === t ? "#a78bfa" : "#6b7280",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Format */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Content format
              </p>
              <div className="flex flex-wrap gap-2">
                {activePlatform.formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => setSelectedFormat(f)}
                    className="text-xs px-3 py-1.5 rounded-lg border transition-all"
                    style={{
                      borderColor:
                        selectedFormat === f
                          ? "rgba(124,58,237,0.5)"
                          : "rgba(255,255,255,0.06)",
                      background:
                        selectedFormat === f
                          ? "rgba(124,58,237,0.1)"
                          : "transparent",
                      color: selectedFormat === f ? "#a78bfa" : "#6b7280",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Tone
              </p>
              <div
                className="gen-tone-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
                }}
              >
                {tones.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className="text-xs py-2 rounded-xl border transition-all"
                    style={{
                      borderColor:
                        tone === t
                          ? "rgba(124,58,237,0.5)"
                          : "rgba(255,255,255,0.06)",
                      background:
                        tone === t ? "rgba(124,58,237,0.1)" : "transparent",
                      color: tone === t ? "#a78bfa" : "#6b7280",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Audience */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Target audience
              </p>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. young adults, fitness lovers..."
                className="w-full bg-gray-900/60 border border-gray-800 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors text-sm"
              />
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              disabled={loading || !topic.trim()}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background:
                  !loading && topic.trim()
                    ? "rgba(124,58,237,0.8)"
                    : "rgba(255,255,255,0.04)",
                color: !loading && topic.trim() ? "#fff" : "#4b5563",
                cursor: !loading && topic.trim() ? "pointer" : "not-allowed",
              }}
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>✨ Generate ideas</>
              )}
            </button>

            {/* Tips */}
            <div
              className="border border-gray-800 rounded-xl p-4 flex flex-col gap-2 mt-auto"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-xs text-gray-600 uppercase tracking-widest">
                Tips
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Be specific —&apos;home workouts for beginners&apos; works
                better than &apos;fitness&apos;
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                Try different tones for the same topic to get variety
              </p>
            </div>
          </div>

          {/* RIGHT — preview + ideas */}
          <div
            className={`gen-right-panel flex flex-col gap-4${showPreview ? " visible" : ""}`}
          >
            {/* Platform preview */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
                {platform} preview
              </p>
              <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 max-w-xs mx-auto">
                <div className="flex items-center gap-2.5 mb-3">
                  <div
                    className="w-8 h-8 rounded-full border border-gray-700"
                    style={{ background: activePlatform.previewColor }}
                  />
                  <div>
                    <p className="text-xs font-medium text-white">
                      your_handle
                    </p>
                    <p className="text-xs text-gray-600">
                      {selectedFormat} · just now
                    </p>
                  </div>
                </div>
                <div
                  className="w-full rounded-xl mb-3 flex items-center justify-center"
                  style={{
                    aspectRatio: "1",
                    background: activePlatform.previewColor,
                    border: "0.5px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p className="text-xs text-gray-600">
                    {selectedFormat} thumbnail
                  </p>
                </div>
                <div className="flex gap-3 text-sm mb-2">❤️ 💬 ✈️</div>
                <p className="text-xs text-white font-medium mb-1">
                  {preview.title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {preview.description}
                </p>
                <p className="text-xs text-blue-400 mt-1.5">
                  {activePlatform.hashtags}
                </p>
              </div>
              {!previewIdea && (
                <p className="text-xs text-gray-600 text-center mt-3">
                  Sample preview — generate ideas to see your content here
                </p>
              )}
            </div>

            {/* Ideas list */}
            {ideas.length > 0 && (
              <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Ideas for {platform}
                  </p>
                  <p className="text-xs text-gray-600">
                    {ideas.filter((i) => i.saved).length} saved
                  </p>
                </div>
                {ideas.map((idea, index) => (
                  <div
                    key={index}
                    onClick={() => setPreviewIdea(idea)}
                    className="flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all"
                    style={{
                      borderColor:
                        previewIdea?.title === idea.title
                          ? "rgba(124,58,237,0.5)"
                          : "rgba(255,255,255,0.06)",
                      background:
                        previewIdea?.title === idea.title
                          ? "rgba(124,58,237,0.05)"
                          : "transparent",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5"
                      style={{
                        background: "rgba(124,58,237,0.15)",
                        color: "#a78bfa",
                      }}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white">
                        {idea.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed line-clamp-2">
                        {idea.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyIdea(index);
                          }}
                          className="text-xs px-2 py-1 rounded-lg transition-colors"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "0.5px solid rgba(255,255,255,0.08)",
                            color: "#6b7280",
                          }}
                        >
                          {copied === index ? "✓ Copied" : "📋 Copy"}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSave(index);
                      }}
                      className="w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all flex-shrink-0"
                      style={{
                        background: idea.saved
                          ? "rgba(234,179,8,0.15)"
                          : "rgba(255,255,255,0.04)",
                        color: idea.saved ? "#fbbf24" : "#6b7280",
                        border: "0.5px solid rgba(255,255,255,0.08)",
                      }}
                    >
                      {idea.saved ? "★" : "☆"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile — toggle preview button */}
        {ideas.length > 0 && (
          <button
            className="gen-preview-toggle"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? "← Back to controls" : "👁️ View preview & ideas →"}
          </button>
        )}
      </div>
    </>
  );
}
