"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";

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
    activeStyle: "border-pink-500 bg-pink-500/5",
    formats: ["Reel", "Carousel", "Story", "Post", "Guide"],
    previewColor: "from-pink-900/40 to-purple-900/40",
    hashtags: "#instagram #content #trending #viral",
  },
  {
    name: "YouTube",
    emoji: "🎬",
    desc: "Long-form, Shorts, scripts",
    activeStyle: "border-red-500 bg-red-500/5",
    formats: ["Short", "Tutorial", "Vlog", "Review", "Live"],
    previewColor: "from-red-900/40 to-orange-900/40",
    hashtags: "#youtube #shorts #viral #subscribe",
  },
  {
    name: "LinkedIn",
    emoji: "💼",
    desc: "Posts, articles, thought leadership",
    activeStyle: "border-blue-500 bg-blue-500/5",
    formats: ["Post", "Article", "Poll", "Newsletter", "Story"],
    previewColor: "from-blue-900/40 to-cyan-900/40",
    hashtags: "#linkedin #professional #growth #networking",
  },
];

const tones = ["Casual", "Professional", "Funny", "Inspirational"];

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
};
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
};
export default function GeneratePage() {
  const { saveIdea } = useApp();
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [tone, setTone] = useState("Casual");
  const [audience, setAudience] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("Reel");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewIdea, setPreviewIdea] = useState<Idea | null>(null);
  const [copied, setCopied] = useState<number | null>(null);

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
    console.log("toggleSave called", index);
    setIdeas((prev) =>
      prev.map((idea, i) => {
        if (i === index) {
          console.log("saving idea:", idea.title);
          if (!idea.saved) {
            saveIdea({
              title: idea.title,
              description: idea.description,
              platform: platform,
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

  // When platform changes reset format to first option
  function handlePlatformChange(name: string) {
    setPlatform(name);
    const p = platforms.find((p) => p.name === name)!;
    setSelectedFormat(p.formats[0]);
    setPreviewIdea(null);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sticky header */}
      <div className="pb-2 mb-2">
        <h1 className="text-3xl font-bold text-white">Generate ideas</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Pick a platform, set your preferences — get content ideas instantly
        </p>
      </div>

      {/* Two panel layout */}
      <div
        className="grid gap-5 items-start"
        style={{ gridTemplateColumns: "2fr 3fr" }}
      >
        {/* LEFT PANEL — controls */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5 sticky top-8">
          {" "}
          {/* Platform */}
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
              Platform
            </p>
            <div className="grid grid-cols-3 gap-2">
              {platforms.map((p) => (
                <button
                  key={p.name}
                  onClick={() => handlePlatformChange(p.name)}
                  className={`flex flex-col gap-2 p-3 rounded-xl border transition-all duration-200 text-left ${
                    platform === p.name
                      ? p.activeStyle
                      : "border-gray-800 bg-gray-900/40 hover:border-gray-700"
                  }`}
                >
                  <span className="text-lg">{p.emoji}</span>
                  <div>
                    <p className="text-xs font-medium text-white">{p.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{p.desc}</p>
                  </div>
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
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                      topic === t
                        ? "border-violet-500 bg-violet-500/10 text-violet-300"
                        : "border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-300 bg-gray-900/40"
                    }`}
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
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    selectedFormat === f
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-gray-800 text-gray-500 hover:border-gray-700 hover:text-gray-400"
                  }`}
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
            <div className="grid grid-cols-2 gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`text-xs py-2 rounded-xl border transition-all ${
                    tone === t
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-gray-800 text-gray-500 hover:border-gray-700"
                  }`}
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
            className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
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
          <div className="border border-gray-800 rounded-xl p-4 flex flex-col gap-2 mt-auto bg-gray-900/60">
            <p className="text-xs text-gray-500 uppercase tracking-widest">
              Tips
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Be specific with your topic – &quot;home workouts for
              beginners&quot; works better than just &quot;fitness&quot;
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Try different tones for the same topic to get variety
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Click any idea on the right to preview it
            </p>
          </div>
        </div>

        {/* RIGHT PANEL — preview + ideas */}
        <div className="flex flex-col gap-4 min-h-full">
          {/* Platform preview card */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">
              {platform} preview
            </p>

            {/* Phone mockup */}
            <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 max-w-xs mx-auto">
              {/* Post header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-8 h-8 rounded-full bg-gradient-to-br ${activePlatform.previewColor} border border-gray-700`}
                />
                <div>
                  <p className="text-xs font-medium text-white">your_handle</p>
                  <p className="text-xs text-gray-600">
                    {selectedFormat} · just now
                  </p>
                </div>
              </div>

              {/* Post image placeholder */}
              <div
                className={`w-full aspect-square rounded-xl bg-gradient-to-br ${activePlatform.previewColor} border border-gray-800 flex items-center justify-center mb-3`}
              >
                <p className="text-xs text-gray-600 text-center px-4">
                  {selectedFormat} thumbnail
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 text-sm mb-2">
                <span>❤️</span>
                <span>💬</span>
                <span>✈️</span>
              </div>

              {/* Caption */}
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
                  Ideas
                </p>
                <p className="text-xs text-gray-600">
                  {ideas.filter((i) => i.saved).length} saved
                </p>
              </div>

              {ideas.map((idea, index) => (
                <div
                  key={index}
                  onClick={() => setPreviewIdea(idea)}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                    previewIdea?.title === idea.title
                      ? "border-violet-500/50 bg-violet-500/5"
                      : "border-gray-800 hover:border-gray-700"
                  }`}
                >
                  <div className="w-6 h-6 rounded-lg bg-violet-500/15 text-violet-400 text-xs font-medium flex items-center justify-center flex-shrink-0 mt-0.5">
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
                        className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-400 px-2 py-1 rounded-lg transition-colors"
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
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs transition-all flex-shrink-0 ${
                      idea.saved
                        ? "bg-yellow-500/15 text-yellow-400"
                        : "bg-gray-800 text-gray-600 hover:text-yellow-400"
                    }`}
                  >
                    {idea.saved ? "★" : "☆"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
