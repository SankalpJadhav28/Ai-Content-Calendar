"use client";

import { useState, useEffect } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ScheduledPost {
  day: number;
  title: string;
  platform: string;
  color: string;
}

interface PlanItem {
  day: string;
  platform: string;
  format: string;
  idea: string;
  reason: string;
}

interface NextWeekPlan {
  schedule: PlanItem[];
  focus: string;
}

const PLATFORM_COLORS: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  YouTube: "bg-red-500/20 text-red-300 border-red-500/30",
  LinkedIn: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Facebook: "bg-blue-600/20 text-blue-300 border-blue-600/30",
};

const PLATFORM_DOT: Record<string, string> = {
  Instagram: "#ec4899",
  YouTube: "#ef4444",
  LinkedIn: "#3b82f6",
  Facebook: "#1877f2",
};

const PLATFORM_BADGE: Record<string, { bg: string; color: string }> = {
  Instagram: { bg: "rgba(236,72,153,0.15)", color: "#f472b6" },
  YouTube: { bg: "rgba(239,68,68,0.15)", color: "#f87171" },
  LinkedIn: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
  Facebook: { bg: "rgba(24,119,242,0.15)", color: "#60a5fa" },
};

function ScheduleForm({
  item,
  onSchedule,
  currentMonth,
  currentYear,
}: {
  item: PlanItem;
  onSchedule: (day: number, platform: string) => void;
  currentMonth: number;
  currentYear: number;
}) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [platform, setPlatform] = useState(item.platform);

  const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date();

  return (
    <div className="flex flex-col gap-3" onClick={(e) => e.stopPropagation()}>
      {/* Mini calendar */}
      <div>
        <p className="text-xs text-gray-600 mb-2">Pick a date</p>
        <div
          className="rounded-xl border border-gray-800 p-3"
          style={{ background: "#0f0f13" }}
        >
          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs text-gray-600 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Date grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`e-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday =
                day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear();
              const isSelected = selectedDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className="aspect-square rounded-lg text-xs font-medium transition-all flex items-center justify-center"
                  style={{
                    background: isSelected
                      ? "#7c3aed"
                      : isToday
                        ? "rgba(124,58,237,0.15)"
                        : "transparent",
                    color: isSelected
                      ? "#fff"
                      : isToday
                        ? "#a78bfa"
                        : "#9ca3af",
                    border:
                      isToday && !isSelected
                        ? "0.5px solid rgba(124,58,237,0.3)"
                        : "0.5px solid transparent",
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
        {selectedDay && (
          <p className="text-xs text-violet-400 mt-1.5 text-center">
            Selected: Day {selectedDay}
          </p>
        )}
      </div>

      {/* Platform selector */}
      <div>
        <p className="text-xs text-gray-600 mb-1.5">Platform</p>
        <div className="grid grid-cols-2 gap-1.5">
          {["Instagram", "YouTube", "LinkedIn", "Facebook"].map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className="py-1.5 rounded-lg border text-xs transition-all"
              style={{
                borderColor:
                  platform === p
                    ? "rgba(124,58,237,0.5)"
                    : "rgba(255,255,255,0.06)",
                background:
                  platform === p ? "rgba(124,58,237,0.15)" : "transparent",
                color: platform === p ? "#a78bfa" : "#6b7280",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Confirm */}
      <button
        onClick={() => {
          if (selectedDay) onSchedule(selectedDay, platform);
        }}
        disabled={!selectedDay}
        className="w-full py-2 rounded-lg text-xs font-medium transition-all"
        style={{
          background: selectedDay
            ? "rgba(124,58,237,0.2)"
            : "rgba(255,255,255,0.04)",
          border: `0.5px solid ${selectedDay ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.06)"}`,
          color: selectedDay ? "#a78bfa" : "#4b5563",
          cursor: selectedDay ? "pointer" : "not-allowed",
        }}
      >
        + Add to calendar
      </button>
    </div>
  );
}

export default function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [viewingDay, setViewingDay] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [scores, setScores] = useState({
    consistency: 0,
    platformBalance: 0,
    peakDayCoverage: 0,
  });
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      day: 5,
      title: "Morning routine reel",
      platform: "Instagram",
      color: PLATFORM_COLORS["Instagram"],
    },
    {
      day: 12,
      title: "Study with me vlog",
      platform: "YouTube",
      color: PLATFORM_COLORS["YouTube"],
    },
    {
      day: 18,
      title: "Career lessons thread",
      platform: "LinkedIn",
      color: PLATFORM_COLORS["LinkedIn"],
    },
    {
      day: 24,
      title: "Outfit of the day",
      platform: "Instagram",
      color: PLATFORM_COLORS["Instagram"],
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostPlatform, setNewPostPlatform] = useState("Instagram");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewView, setReviewView] = useState<"review" | "plan">("review");
  const [weeklyReview, setWeeklyReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [ratings, setRatings] = useState<
    Record<string, { rating: number; notes: string }>
  >({});
  const [nextWeekPlan, setNextWeekPlan] = useState<NextWeekPlan | null>(null);
  const [planLoading, setPlanLoading] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const dayOfWeek = today.getDay();
  const weekStart = today.getDate() - dayOfWeek;
  const weekEnd = weekStart + 6;
  const thisWeekPosts = posts.filter(
    (p) => p.day >= weekStart && p.day <= weekEnd,
  );

  function prevMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else setCurrentMonth(currentMonth - 1);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else setCurrentMonth(currentMonth + 1);
  }

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const getPostsForDay = (day: number) => posts.filter((p) => p.day === day);

  function handleDayClick(day: number) {
    setSelectedDay(day);
    const dayPosts = getPostsForDay(day);
    if (dayPosts.length > 0) setViewingDay(day);
    else setShowModal(true);
  }

  function addPost() {
    if (!newPostTitle.trim() || !selectedDay) return;
    setPosts((prev) => [
      ...prev,
      {
        day: selectedDay,
        title: newPostTitle,
        platform: newPostPlatform,
        color: PLATFORM_COLORS[newPostPlatform],
      },
    ]);
    setNewPostTitle("");
    setShowModal(false);
  }

  function setRatingFn(title: string, rating: number) {
    setRatings((prev) => ({
      ...prev,
      [title]: { ...prev[title], rating, notes: prev[title]?.notes || "" },
    }));
  }

  function setNotesFn(title: string, notes: string) {
    setRatings((prev) => ({
      ...prev,
      [title]: { ...prev[title], notes, rating: prev[title]?.rating || 0 },
    }));
  }

  async function generateWeeklyReview() {
    setReviewLoading(true);
    setWeeklyReview("");
    const ratingsArray = Object.entries(ratings).map(([title, data]) => ({
      title,
      rating: data.rating,
      notes: data.notes,
    }));
    try {
      const response = await fetch("/api/weekly-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posts: thisWeekPosts,
          ratings: ratingsArray,
          weekStart,
          weekEnd,
        }),
      });
      const data = await response.json();
      setWeeklyReview(data.review);
    } catch {
      setWeeklyReview("Unable to generate review right now.");
    }
    setReviewLoading(false);
  }

  async function generateNextWeekPlan() {
    if (!weeklyReview) return;
    setPlanLoading(true);
    setReviewView("plan");
    setNextWeekPlan(null);
    const ratingsArray = Object.entries(ratings).map(([title, data]) => ({
      title,
      rating: data.rating,
    }));
    try {
      const response = await fetch("/api/plan-next-week", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weeklyReview,
          ratings: ratingsArray,
          month: MONTHS[currentMonth],
        }),
      });
      const data = await response.json();
      setNextWeekPlan(data.plan);
    } catch {
      setNextWeekPlan(null);
    }
    setPlanLoading(false);
  }

  function schedulePost(item: PlanItem) {
    const dayMap: Record<string, number> = {
      Monday: 1,
      Tuesday: 2,
      Wednesday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
      Sunday: 0,
    };
    const targetDay = dayMap[item.day];
    const nextWeekDay = weekEnd + 1 + targetDay;
    setPosts((prev) => [
      ...prev,
      {
        day: nextWeekDay,
        title: item.idea,
        platform: item.platform,
        color: PLATFORM_COLORS[item.platform] || PLATFORM_COLORS["Instagram"],
      },
    ]);
  }

  function scheduleAll() {
    nextWeekPlan?.schedule.forEach((item) => schedulePost(item));
    setReviewOpen(false);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const weeks = [0, 0, 0, 0];
    posts.forEach((p) => {
      const w = Math.floor((p.day - 1) / 7);
      if (w < 4) weeks[w]++;
    });
    const consistency = Math.round(
      (weeks.filter((w) => w > 0).length / 4) * 10,
    );
    const platformList = ["Instagram", "YouTube", "LinkedIn", "Facebook"];
    const counts = platformList.map(
      (pl) => posts.filter((p) => p.platform === pl).length,
    );
    const maxC = Math.max(...counts, 1);
    const balance = Math.round((1 - (maxC - Math.min(...counts)) / maxC) * 10);
    const peakDays = posts.filter((p) => {
      const d = new Date(currentYear, currentMonth, p.day).getDay();
      return d >= 1 && d <= 4;
    }).length;
    const peakCoverage = Math.min(Math.round((peakDays / 4) * 10), 10);
    setScores({
      consistency,
      platformBalance: balance,
      peakDayCoverage: peakCoverage,
    });
    setAnalyzing(true);
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        posts,
        month: MONTHS[currentMonth],
        year: currentYear,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        setRecommendation(data.recommendation);
        setAnalyzing(false);
      })
      .catch(() => {
        setRecommendation("Unable to generate recommendation.");
        setAnalyzing(false);
      });
  }, [currentMonth, currentYear, posts.length]);

  if (reviewOpen) {
    return (
      <div
        className="flex flex-col h-full"
        style={{ height: "calc(100vh - 0px)" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            {reviewView === "plan" && (
              <button
                onClick={() => setReviewView("review")}
                className="w-7 h-7 rounded-lg border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center text-sm transition-colors"
              >
                ←
              </button>
            )}
            <div>
              <p className="text-sm font-medium text-white">
                {reviewView === "review" ? "Weekly Review" : "Next Week Plan"}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {reviewView === "review"
                  ? `${MONTHS[currentMonth]} ${weekStart}–${weekEnd}, ${currentYear}`
                  : "AI generated schedule"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
              <span className="text-xs text-violet-400">AI powered</span>
            </div>
            <button
              onClick={() => setReviewOpen(false)}
              className="w-7 h-7 rounded-lg border border-gray-800 text-gray-400 hover:text-white flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Two column body */}
        <div
          className="flex-1 grid overflow-hidden"
          style={{ gridTemplateColumns: "1fr 1fr" }}
        >
          {/* LEFT — review */}
          <div
            className="border-r border-gray-800 p-6 overflow-y-auto flex flex-col gap-5"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Week strip */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                This week
              </p>
              <div className="grid grid-cols-7 gap-1.5">
                {DAYS.map((d, i) => {
                  const dayNum = weekStart + i;
                  const postOnDay = posts.find((p) => p.day === dayNum);
                  const isCurrentDay =
                    dayNum === today.getDate() &&
                    currentMonth === today.getMonth();
                  return (
                    <div
                      key={d}
                      className="flex flex-col items-center gap-1 py-2 rounded-xl border transition-all"
                      style={{
                        borderColor: isCurrentDay
                          ? "#7c3aed"
                          : postOnDay
                            ? "rgba(124,58,237,0.25)"
                            : "rgba(255,255,255,0.06)",
                        background: isCurrentDay
                          ? "rgba(124,58,237,0.1)"
                          : postOnDay
                            ? "rgba(124,58,237,0.04)"
                            : "transparent",
                      }}
                    >
                      <span className="text-xs text-gray-600">{d}</span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: isCurrentDay ? "#a78bfa" : "#e5e7eb" }}
                      >
                        {dayNum > 0 ? dayNum : ""}
                      </span>
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: postOnDay
                            ? PLATFORM_DOT[postOnDay.platform] || "#6b7280"
                            : "transparent",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streak tracker */}
            <div>
              <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
                4-week streak
              </p>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-3xl font-semibold"
                    style={{ color: "#a78bfa" }}
                  >
                    {posts.length}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    posts in last 4 weeks
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 rounded-full px-3 py-1.5"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "0.5px solid rgba(245,158,11,0.3)",
                  }}
                >
                  <span>🔥</span>
                  <span className="text-xs" style={{ color: "#fbbf24" }}>
                    {(() => {
                      let streak = 0;
                      const weeksToCheck = [0, 1, 2, 3];
                      for (const w of weeksToCheck) {
                        const weekStartDay =
                          today.getDate() - dayOfWeek - w * 7;
                        const weekEndDay = weekStartDay + 6;
                        const hasPost = posts.some(
                          (p) => p.day >= weekStartDay && p.day <= weekEndDay,
                        );
                        if (hasPost) streak++;
                        else break;
                      }
                      return `${streak} week streak`;
                    })()}
                  </span>
                </div>
              </div>

              {/* Week grid */}
              <div
                className="rounded-xl border border-gray-800 p-3 mb-3"
                style={{ background: "#0f0f13" }}
              >
                {/* Day headers */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div style={{ width: "44px" }} />
                  {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                    <div
                      key={i}
                      className="flex-1 text-center"
                      style={{ fontSize: "10px", color: "#4b5563" }}
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* 4 weeks */}
                {[3, 2, 1, 0].map((weeksAgo) => {
                  const wStart = today.getDate() - dayOfWeek - weeksAgo * 7;
                  const wDate = new Date(currentYear, currentMonth, wStart);
                  const label = `${wDate.toLocaleString("default", { month: "short" })} ${wStart > 0 ? wStart : ""}`;

                  return (
                    <div
                      key={weeksAgo}
                      className="flex items-center gap-1.5 mb-1"
                    >
                      <div
                        style={{
                          width: "44px",
                          fontSize: "9px",
                          color: "#4b5563",
                          flexShrink: 0,
                        }}
                      >
                        {label}
                      </div>
                      {[0, 1, 2, 3, 4, 5, 6].map((d) => {
                        const dayNum = wStart + d;
                        const postsOnDay = posts.filter(
                          (p) => p.day === dayNum,
                        );
                        const isCurrentDay =
                          dayNum === today.getDate() &&
                          currentMonth === today.getMonth();

                        const platformColor: Record<string, string> = {
                          Instagram: "rgba(236,72,153,0.3)",
                          YouTube: "rgba(239,68,68,0.3)",
                          LinkedIn: "rgba(59,130,246,0.3)",
                          Facebook: "rgba(24,119,242,0.3)",
                        };

                        const platformBorder: Record<string, string> = {
                          Instagram: "rgba(236,72,153,0.5)",
                          YouTube: "rgba(239,68,68,0.5)",
                          LinkedIn: "rgba(59,130,246,0.5)",
                          Facebook: "rgba(24,119,242,0.5)",
                        };

                        let bg = "#16161e";
                        let border = "#1f1f27";

                        if (postsOnDay.length === 1) {
                          bg =
                            platformColor[postsOnDay[0].platform] ||
                            "rgba(124,58,237,0.2)";
                          border =
                            platformBorder[postsOnDay[0].platform] ||
                            "rgba(124,58,237,0.4)";
                        } else if (postsOnDay.length > 1) {
                          bg =
                            "linear-gradient(135deg, rgba(236,72,153,0.3), rgba(59,130,246,0.3))";
                          border = "rgba(124,58,237,0.4)";
                        } else if (isCurrentDay) {
                          border = "rgba(124,58,237,0.5)";
                        }

                        return (
                          <div
                            key={d}
                            className="flex-1 rounded-md"
                            style={{
                              height: "24px",
                              background: bg,
                              border: `0.5px solid ${border}`,
                              transition: "all 0.2s",
                            }}
                            title={
                              postsOnDay.length > 0
                                ? postsOnDay.map((p) => p.title).join(", ")
                                : ""
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-3 mb-4">
                {[
                  {
                    name: "Instagram",
                    color: "rgba(236,72,153,0.3)",
                    border: "rgba(236,72,153,0.5)",
                  },
                  {
                    name: "YouTube",
                    color: "rgba(239,68,68,0.3)",
                    border: "rgba(239,68,68,0.5)",
                  },
                  {
                    name: "LinkedIn",
                    color: "rgba(59,130,246,0.3)",
                    border: "rgba(59,130,246,0.5)",
                  },
                  {
                    name: "Facebook",
                    color: "rgba(24,119,242,0.3)",
                    border: "rgba(24,119,242,0.5)",
                  },
                ].map((pl) => (
                  <div key={pl.name} className="flex items-center gap-1.5">
                    <div
                      className="rounded"
                      style={{
                        width: "8px",
                        height: "8px",
                        background: pl.color,
                        border: `0.5px solid ${pl.border}`,
                      }}
                    />
                    <span style={{ fontSize: "10px", color: "#6b7280" }}>
                      {pl.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div
                className="grid gap-2 mb-4"
                style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
              >
                {[
                  {
                    label: "Total posts",
                    value: posts.length,
                    color: "#a78bfa",
                  },
                  {
                    label: "Best week",
                    value: Math.max(
                      ...[0, 1, 2, 3].map((w) => {
                        const ws = today.getDate() - dayOfWeek - w * 7;
                        return posts.filter(
                          (p) => p.day >= ws && p.day <= ws + 6,
                        ).length;
                      }),
                    ),
                    color: "#34d399",
                  },
                  {
                    label: "Platforms used",
                    value: new Set(posts.map((p) => p.platform)).size,
                    color: "#fbbf24",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-gray-800 p-3 text-center"
                    style={{ background: "#16161e" }}
                  >
                    <p
                      className="text-xl font-semibold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontSize: "10px",
                        color: "#6b7280",
                        marginTop: "3px",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Platform breakdown */}
              <div className="flex flex-col gap-2">
                {[
                  { name: "Instagram", color: "#ec4899" },
                  { name: "YouTube", color: "#ef4444" },
                  { name: "LinkedIn", color: "#3b82f6" },
                  { name: "Facebook", color: "#1877f2" },
                ].map((pl) => {
                  const count = posts.filter(
                    (p) => p.platform === pl.name,
                  ).length;
                  const pct =
                    posts.length === 0
                      ? 0
                      : Math.round((count / posts.length) * 100);
                  return (
                    <div key={pl.name} className="flex items-center gap-2">
                      <div
                        className="rounded-full flex-shrink-0"
                        style={{
                          width: "7px",
                          height: "7px",
                          background: pl.color,
                        }}
                      />
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          width: "70px",
                        }}
                      >
                        {pl.name}
                      </span>
                      <div
                        className="flex-1 rounded-full"
                        style={{ height: "5px", background: "#1f2937" }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "5px",
                            borderRadius: "9999px",
                            background: pl.color,
                            transition: "width 0.5s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "#6b7280",
                          width: "16px",
                          textAlign: "right",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Review */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-600 uppercase tracking-widest">
                  AI Review
                </p>
                <button
                  onClick={generateWeeklyReview}
                  className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                >
                  ↻ Regenerate
                </button>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  background: "rgba(124,58,237,0.04)",
                  border: "0.5px solid rgba(124,58,237,0.2)",
                }}
              >
                {reviewLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                    <p className="text-xs text-gray-500">
                      Generating your weekly review...
                    </p>
                  </div>
                ) : weeklyReview ? (
                  <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
                    {weeklyReview}
                  </p>
                ) : (
                  <p className="text-xs text-gray-600">
                    Rate your posts above then click regenerate.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — plan */}
          <div
            className="p-6 overflow-y-auto flex flex-col gap-5"
            style={{ scrollbarWidth: "none" }}
          >
            {reviewView === "review" ? (
              <div className="flex flex-col gap-4 h-full">
                <p className="text-xs text-gray-600 uppercase tracking-widest">
                  Next week plan
                </p>
                <div className="flex-1 flex flex-col items-center justify-center gap-4 border border-gray-800 rounded-2xl p-8 text-center">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: "rgba(124,58,237,0.1)" }}
                  >
                    ✦
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white mb-1">
                      Plan next week with AI
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {weeklyReview
                        ? "Your review is ready. Generate a personalised 7-day content schedule based on your performance."
                        : "Complete your weekly review first, then generate a personalised next week plan."}
                    </p>
                  </div>
                  <button
                    onClick={generateNextWeekPlan}
                    disabled={!weeklyReview || reviewLoading}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background:
                        weeklyReview && !reviewLoading
                          ? "rgba(124,58,237,0.2)"
                          : "rgba(255,255,255,0.04)",
                      border: `0.5px solid ${weeklyReview && !reviewLoading ? "rgba(124,58,237,0.5)" : "rgba(255,255,255,0.08)"}`,
                      color:
                        weeklyReview && !reviewLoading ? "#c4b5fd" : "#4b5563",
                      cursor:
                        weeklyReview && !reviewLoading
                          ? "pointer"
                          : "not-allowed",
                    }}
                  >
                    ✦ Generate next week plan
                  </button>
                </div>
              </div>
            ) : planLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
                <p className="text-sm text-gray-500">
                  Building your next week plan...
                </p>
              </div>
            ) : nextWeekPlan ? (
              <div className="flex flex-col gap-4">
                <p className="text-xs text-gray-600 uppercase tracking-widest">
                  Next week plan
                </p>

                {/* Focus */}
                <div
                  className="rounded-xl p-4"
                  style={{
                    background: "rgba(124,58,237,0.06)",
                    border: "0.5px solid rgba(124,58,237,0.2)",
                  }}
                >
                  <p className="text-xs text-violet-400 mb-1 font-medium">
                    Weekly focus
                  </p>
                  <p className="text-sm text-violet-200 leading-relaxed">
                    {nextWeekPlan.focus}
                  </p>
                </div>

                {/* Plan cards */}
                <div className="flex flex-col gap-2">
                  {nextWeekPlan.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border cursor-pointer transition-all"
                      style={{
                        background:
                          expandedPlan === idx
                            ? "rgba(124,58,237,0.04)"
                            : "#16161e",
                        borderColor:
                          expandedPlan === idx
                            ? "rgba(124,58,237,0.35)"
                            : "rgba(255,255,255,0.06)",
                      }}
                      onClick={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.closest(".schedule-form-container")) return;
                        setExpandedPlan(expandedPlan === idx ? null : idx);
                      }}
                    >
                      <div className="flex items-start justify-between gap-3 p-3">
                        <div className="flex items-start gap-2.5">
                          <div
                            className="w-1 h-10 rounded-full flex-shrink-0 mt-0.5"
                            style={{
                              background:
                                PLATFORM_DOT[item.platform] || "#6b7280",
                            }}
                          />
                          <div>
                            <p className="text-xs text-gray-500">{item.day}</p>
                            <p className="text-sm font-medium text-white mt-0.5">
                              {item.idea}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{
                              background:
                                PLATFORM_BADGE[item.platform]?.bg ||
                                "rgba(124,58,237,0.15)",
                              color:
                                PLATFORM_BADGE[item.platform]?.color ||
                                "#a78bfa",
                            }}
                          >
                            {item.platform}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.format}
                          </span>
                        </div>
                      </div>

                      {expandedPlan === idx && (
                        <div className="px-3 pb-3 border-t border-gray-800">
                          <p className="text-xs text-gray-500 leading-relaxed mt-3 mb-3">
                            {item.reason}
                          </p>
                          <div className="schedule-form-container">
                            <ScheduleForm
                              item={item}
                              currentMonth={currentMonth}
                              currentYear={currentYear}
                              onSchedule={(day, platform) => {
                                setPosts((prev) => [
                                  ...prev,
                                  {
                                    day,
                                    title: item.idea,
                                    platform,
                                    color:
                                      PLATFORM_COLORS[platform] ||
                                      PLATFORM_COLORS["Instagram"],
                                  },
                                ]);
                                setExpandedPlan(null);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-xs text-gray-600">
                  Something went wrong. Go back and try again.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-800 flex-shrink-0">
          <button
            onClick={generateWeeklyReview}
            className="text-xs text-gray-500 border border-gray-800 hover:border-gray-700 hover:text-gray-400 px-4 py-2 rounded-xl transition-all"
          >
            ↻ Regenerate review
          </button>
          {reviewView === "plan" && nextWeekPlan && (
            <button
              onClick={scheduleAll}
              className="text-sm font-medium px-5 py-2 rounded-xl transition-all"
              style={{
                background: "rgba(124,58,237,0.2)",
                border: "0.5px solid rgba(124,58,237,0.4)",
                color: "#c4b5fd",
              }}
            >
              ✓ Schedule all posts →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendar</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Plan and schedule your content
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-pink-400"></div>
            <span className="text-xs text-gray-500">Instagram</span>
            <div className="w-2 h-2 rounded-full bg-red-400 ml-2"></div>
            <span className="text-xs text-gray-500">YouTube</span>
            <div className="w-2 h-2 rounded-full bg-blue-400 ml-2"></div>
            <span className="text-xs text-gray-500">LinkedIn</span>
            <div
              className="w-2 h-2 ml-2"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#1877f2",
              }}
            ></div>
            <span className="text-xs text-gray-500">Facebook</span>
          </div>
          <button
            onClick={() => {
              setReviewOpen(true);
              setReviewView("review");
              generateWeeklyReview();
            }}
            className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
          >
            📋 Weekly Review
          </button>
        </div>
      </div>

      {/* Calendar card */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="w-8 h-8 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all flex items-center justify-center text-sm"
          >
            ←
          </button>
          <h2 className="text-base font-semibold text-white">
            {MONTHS[currentMonth]} {currentYear}
          </h2>
          <button
            onClick={nextMonth}
            className="w-8 h-8 rounded-lg border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all flex items-center justify-center text-sm"
          >
            →
          </button>
        </div>
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-center text-xs text-gray-600 font-medium py-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-16" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayPosts = getPostsForDay(day);
            const todayCell = isToday(day);
            return (
              <div
                key={day}
                onClick={() => handleDayClick(day)}
                className={`min-h-16 rounded-xl p-1.5 cursor-pointer transition-all duration-200 border ${todayCell ? "border-violet-500 bg-violet-500/10" : "border-transparent hover:border-gray-700 hover:bg-gray-800/50"}`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold mb-1 ${todayCell ? "bg-violet-600 text-white" : "text-gray-400"}`}
                >
                  {day}
                </div>
                <div className="flex flex-col gap-0.5">
                  {dayPosts.slice(0, 2).map((post, idx) => (
                    <div
                      key={idx}
                      className={`text-xs px-1.5 py-0.5 rounded border truncate ${post.color}`}
                    >
                      {post.title}
                    </div>
                  ))}
                  {dayPosts.length > 2 && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setViewingDay(day);
                      }}
                      className="text-xs text-gray-500 hover:text-gray-300 px-1 cursor-pointer"
                    >
                      +{dayPosts.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add post modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">
                Schedule for {MONTHS[currentMonth]} {selectedDay}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500">Post title</label>
              <input
                type="text"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addPost()}
                placeholder="e.g. Morning routine reel..."
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-gray-600 text-sm"
                autoFocus
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-gray-500">Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {["Instagram", "YouTube", "LinkedIn", "Facebook"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setNewPostPlatform(p)}
                    className={`py-2 rounded-xl border text-xs transition-all ${newPostPlatform === p ? "border-violet-500 bg-violet-500/10 text-violet-300" : "border-gray-700 text-gray-500 hover:border-gray-600"}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={addPost}
              disabled={!newPostTitle.trim()}
              className="bg-violet-600 hover:bg-violet-500 disabled:bg-gray-800 disabled:text-gray-600 text-white font-medium py-2.5 rounded-xl transition-all text-sm"
            >
              Add to calendar
            </button>
          </div>
        </div>
      )}

      {/* View posts modal */}
      {viewingDay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-sm mx-4 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">
                {MONTHS[currentMonth]} {viewingDay} — Posts
              </p>
              <button
                onClick={() => setViewingDay(null)}
                className="text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {getPostsForDay(viewingDay).map((post, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl border ${post.color}`}
                >
                  <div>
                    <p className="text-xs font-medium">{post.title}</p>
                    <p className="text-xs opacity-60 mt-0.5">{post.platform}</p>
                  </div>
                  <button
                    onClick={() => {
                      setPosts((prev) =>
                        prev.filter(
                          (p) =>
                            !(p.day === viewingDay && p.title === post.title),
                        ),
                      );
                      if (getPostsForDay(viewingDay).length === 1)
                        setViewingDay(null);
                    }}
                    className="text-xs opacity-40 hover:opacity-100 transition-opacity ml-3"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setViewingDay(null);
                setSelectedDay(viewingDay);
                setShowModal(true);
              }}
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-medium py-2.5 rounded-xl transition-all"
            >
              + Add another post
            </button>
          </div>
        </div>
      )}

      {/* AI Analytics */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white">
              {MONTHS[currentMonth]} {currentYear} — Content Analysis
            </p>
            <p className="text-xs text-gray-500 mt-0.5">AI powered insights</p>
          </div>
          <div className="flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-400">AI Analysis</span>
          </div>
        </div>

        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {[
            {
              label: "Consistency",
              value: scores.consistency,
              color: "#a78bfa",
              barColor: "#7c3aed",
            },
            {
              label: "Platform Balance",
              value: scores.platformBalance,
              color: "#34d399",
              barColor: "#10b981",
            },
            {
              label: "Peak Day Coverage",
              value: scores.peakDayCoverage,
              color: "#fbbf24",
              barColor: "#f59e0b",
            },
            {
              label: "Total Posts",
              value: posts.length,
              color: "#60a5fa",
              barColor: "#3b82f6",
            },
          ].map((score) => (
            <div
              key={score.label}
              className="bg-gray-950/50 border border-gray-800 rounded-xl p-4 text-center"
            >
              <p
                className="text-2xl font-semibold"
                style={{ color: score.color }}
              >
                {score.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{score.label}</p>
              <div
                style={{
                  height: "4px",
                  borderRadius: "4px",
                  marginTop: "12px",
                  background: "#1f2937",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "4px",
                    borderRadius: "4px",
                    width: `${Math.min(score.value * 10, 100)}%`,
                    background: score.barColor,
                    transition: "width 0.7s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-4">Posts per week</p>
            <div className="flex items-end gap-2" style={{ height: "64px" }}>
              {[0, 1, 2, 3].map((week) => {
                const count = posts.filter(
                  (p) => Math.floor((p.day - 1) / 7) === week,
                ).length;
                const height = count === 0 ? 4 : Math.min(count * 20, 60);
                return (
                  <div
                    key={week}
                    className="flex flex-col items-center gap-1 flex-1"
                  >
                    <div
                      style={{
                        height: `${height}px`,
                        width: "100%",
                        background: "rgba(124,58,237,0.7)",
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.5s",
                      }}
                    />
                    <span className="text-xs text-gray-600">W{week + 1}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-gray-950/50 border border-gray-800 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-4">Platform split</p>
            <div className="flex flex-col gap-3">
              {[
                { name: "Instagram", color: "#ec4899" },
                { name: "YouTube", color: "#ef4444" },
                { name: "LinkedIn", color: "#3b82f6" },
                { name: "Facebook", color: "#1877f2" },
              ].map((pl) => {
                const count = posts.filter(
                  (p) => p.platform === pl.name,
                ).length;
                const pct =
                  posts.length === 0
                    ? 0
                    : Math.round((count / posts.length) * 100);
                return (
                  <div key={pl.name} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-20">
                      {pl.name}
                    </span>
                    <div
                      className="flex-1 rounded-full"
                      style={{ height: "6px", background: "#1f2937" }}
                    >
                      <div
                        style={{
                          width: `${pct}%`,
                          height: "6px",
                          borderRadius: "9999px",
                          background: pl.color,
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-600 w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-4">
          <p className="text-xs font-medium text-violet-400 mb-2">
            💡 AI Recommendation
          </p>
          {analyzing ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-violet-400/30 border-t-violet-400 rounded-full animate-spin" />
              <p className="text-xs text-gray-500">
                Analyzing your content strategy...
              </p>
            </div>
          ) : (
            <p className="text-xs text-gray-400 leading-relaxed">
              {recommendation}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
