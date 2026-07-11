"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const PLATFORM_TIPS: Record<string, string> = {
  Instagram:
    "Hook in first 3 words. Keep voiceover natural and fast-paced. End caption with a question.",
  YouTube:
    "First 30 seconds are everything. Use pattern interrupts. Always include a CTA.",
  LinkedIn:
    "No buzzwords. Be direct. Short paragraphs. Start with a bold statement not 'I am excited'.",
  Facebook:
    "Tell a story. Be conversational. Ask a question at the end to drive comments.",
};

const TONES = ["Casual", "Professional", "Funny", "Inspirational"];
const PLATFORMS = ["Instagram", "YouTube", "LinkedIn", "Facebook"];

function ScriptWriterInner() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const initialPlatform = searchParams.get("platform") || "Instagram";

  const [platform, setPlatform] = useState(initialPlatform);
  const [tone, setTone] = useState("Casual");
  const [script, setScript] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [generating, setGenerating] = useState(false);
  const [suggesting, setSuggesting] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suggestTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto suggest after user stops typing for 2 seconds
  useEffect(() => {
    if (!script.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSuggestion("");
      return;
    }
    if (suggestTimeout.current) clearTimeout(suggestTimeout.current);
    suggestTimeout.current = setTimeout(async () => {
      setSuggesting(true);
      try {
        const response = await fetch("/api/suggest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentScript: script,
            platform,
            tone,
            title,
          }),
        });
        const data = await response.json();
        setSuggestion(data.suggestion || "");
      } catch {
        setSuggestion("");
      }
      setSuggesting(false);
    }, 2000);
    return () => {
      if (suggestTimeout.current) clearTimeout(suggestTimeout.current);
    };
  }, [script, platform, tone, title]);

  async function generateFullScript() {
    setGenerating(true);
    setSuggestion("");
    try {
      const response = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          platform,
          tone,
          currentScript: script,
        }),
      });
      const data = await response.json();
      setScript(data.script || "");
    } catch {
      /* fail silently */
    }
    setGenerating(false);
  }

  async function rewriteScript() {
    if (!script.trim()) return;
    setGenerating(true);
    setSuggestion("");
    try {
      const response = await fetch("/api/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          platform,
          tone,
          currentScript: "",
        }),
      });
      const data = await response.json();
      setScript(data.script || "");
    } catch {
      /* fail silently */
    }
    setGenerating(false);
  }

  function acceptSuggestion() {
    setScript((prev) => prev + " " + suggestion);
    setSuggestion("");
  }

  async function copyScript() {
    await navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const charCount = script.length;
  const maxChars: Record<string, number> = {
    Instagram: 2200,
    YouTube: 10000,
    LinkedIn: 3000,
    Facebook: 63206,
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Script writer</h1>
        <p className="text-gray-500 mt-1 text-sm">
          AI suggestions appear as you type
        </p>
      </div>

      {/* Two column layout */}
      <div
        className="grid gap-5 flex-1"
        style={{ gridTemplateColumns: "1fr 1.5fr" }}
      >
        {/* LEFT — idea context */}
        <div className="flex flex-col gap-4">
          {/* Idea card */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
              Writing for
            </p>
            <p className="text-sm font-medium text-white mb-2">
              {title || "Untitled idea"}
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {description || "No description provided."}
            </p>
          </div>

          {/* Platform */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
              Platform
            </p>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPlatform(p)}
                  className="py-2 rounded-xl border text-xs transition-all"
                  style={{
                    borderColor:
                      platform === p
                        ? "rgba(124,58,237,0.5)"
                        : "rgba(255,255,255,0.06)",
                    background:
                      platform === p ? "rgba(124,58,237,0.1)" : "transparent",
                    color: platform === p ? "#a78bfa" : "#6b7280",
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
              Tone
            </p>
            <div className="grid grid-cols-2 gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className="py-2 rounded-xl border text-xs transition-all"
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

          {/* Platform tip */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(124,58,237,0.05)",
              border: "0.5px solid rgba(124,58,237,0.2)",
            }}
          >
            <p
              className="text-xs font-medium mb-1"
              style={{ color: "#a78bfa" }}
            >
              💡 {platform} tip
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
              {PLATFORM_TIPS[platform]}
            </p>
          </div>
        </div>

        {/* RIGHT — editor */}
        {/* Editor + toolbar wrapper */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              Script
            </p>
            <p
              className="text-xs"
              style={{
                color: charCount > maxChars[platform] ? "#ef4444" : "#4b5563",
              }}
            >
              {charCount} / {maxChars[platform].toLocaleString()}
            </p>
          </div>

          {/* Editor box — fixed height, no absolute positioning issues */}
          <textarea
            ref={textareaRef}
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`Start writing your ${platform} script here...\n\nOr click "Generate full script" to let AI write it for you.`}
            className="w-full bg-gray-900/40 border border-gray-800 rounded-2xl p-6 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-gray-700 resize-none leading-relaxed transition-colors"
            style={{ height: "340px", scrollbarWidth: "none" }}
          />

          {/* AI suggestion — outside textarea, no overlap */}
          {suggestion && !generating && (
            <div
              className="rounded-xl p-3 flex items-start justify-between gap-3"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "0.5px solid rgba(124,58,237,0.25)",
              }}
            >
              <div className="flex-1 min-w-0">
                <p className="text-xs mb-1" style={{ color: "#a78bfa" }}>
                  ✨ AI suggestion
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "#c4b5fd", fontStyle: "italic" }}
                >
                  {suggestion}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={acceptSuggestion}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    background: "rgba(124,58,237,0.2)",
                    border: "0.5px solid rgba(124,58,237,0.4)",
                    color: "#a78bfa",
                  }}
                >
                  Accept
                </button>
                <button
                  onClick={() => setSuggestion("")}
                  className="text-xs px-3 py-1.5 rounded-lg transition-all"
                  style={{
                    border: "0.5px solid rgba(255,255,255,0.06)",
                    color: "#6b7280",
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Suggesting indicator */}
          {suggesting && (
            <div className="flex items-center gap-2 px-1">
              <div
                className="w-3 h-3 border-2 rounded-full animate-spin"
                style={{
                  borderColor: "rgba(124,58,237,0.3)",
                  borderTopColor: "#a78bfa",
                }}
              />
              <p className="text-xs" style={{ color: "#6b7280" }}>
                AI is thinking...
              </p>
            </div>
          )}

          {/* Toolbar */}
          <div
            className="flex items-center justify-between gap-3 p-3 rounded-2xl border"
            style={{
              background: "#0f0f13",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex gap-2">
              <button
                onClick={generateFullScript}
                disabled={generating}
                className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all"
                style={{
                  background: "rgba(124,58,237,0.2)",
                  border: "0.5px solid rgba(124,58,237,0.4)",
                  color: generating ? "#6b7280" : "#a78bfa",
                  cursor: generating ? "not-allowed" : "pointer",
                }}
              >
                {generating ? (
                  <>
                    <div
                      className="w-3.5 h-3.5 border-2 rounded-full animate-spin"
                      style={{
                        borderColor: "rgba(124,58,237,0.3)",
                        borderTopColor: "#a78bfa",
                      }}
                    />
                    Generating...
                  </>
                ) : (
                  <>✨ Generate full script</>
                )}
              </button>
              <button
                onClick={rewriteScript}
                disabled={generating}
                className="text-xs px-3 py-2 rounded-xl border transition-all"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  color: "#6b7280",
                }}
              >
                🔁 Rewrite
              </button>
            </div>
            <button
              onClick={copyScript}
              disabled={!script.trim()}
              className="text-xs px-4 py-2 rounded-xl border transition-all"
              style={{
                borderColor: script.trim()
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(255,255,255,0.04)",
                color: script.trim() ? "#e5e7eb" : "#4b5563",
              }}
            >
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScriptPage() {
  return (
    <Suspense
      fallback={<div className="text-gray-500 text-sm p-8">Loading...</div>}
    >
      <ScriptWriterInner />
    </Suspense>
  );
}
