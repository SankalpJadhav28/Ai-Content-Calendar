"use client";

import { useApp } from "@/context/AppContext";
import { PLATFORM_DOT, PLATFORM_BADGE } from "@/context/AppContext";
import Link from "next/link";

export default function Dashboard() {
  const { posts, savedIdeas, savedScripts } = useApp();

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  // Posts this month
  const thisMonthPosts = posts.filter(
    (p) => p.month === currentMonth && p.year === currentYear,
  );

  // Upcoming posts — from today onwards
  const upcomingPosts = posts
    .filter(
      (p) =>
        p.day >= today.getDate() &&
        p.month === currentMonth &&
        p.year === currentYear,
    )
    .sort((a, b) => a.day - b.day)
    .slice(0, 4);

  // Platform split
  const platforms = ["Instagram", "YouTube", "LinkedIn", "Facebook"];
  const platformCounts = platforms.map((pl) => ({
    name: pl,
    count: posts.filter((p) => p.platform === pl).length,
    color: PLATFORM_DOT[pl],
  }));
  const maxCount = Math.max(...platformCounts.map((p) => p.count), 1);

  // Streak — weeks with at least one post
  const dayOfWeek = today.getDay();
  let streak = 0;
  for (let w = 0; w < 4; w++) {
    const ws = today.getDate() - dayOfWeek - w * 7;
    const we = ws + 6;
    const hasPost = posts.some(
      (p) => p.day >= ws && p.day <= we && p.month === currentMonth,
    );
    if (hasPost) streak++;
    else break;
  }

  // Mini streak grid — last 4 weeks
  const streakGrid = [3, 2, 1, 0].map((weeksAgo) => {
    const ws = today.getDate() - dayOfWeek - weeksAgo * 7;
    return [0, 1, 2, 3, 4, 5, 6].map((d) => {
      const dayNum = ws + d;
      const post = posts.find(
        (p) => p.day === dayNum && p.month === currentMonth,
      );
      return { dayNum, post };
    });
  });

  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs text-violet-400">AI powered</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Good morning 👋</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here's your content overview for{" "}
            {today.toLocaleString("default", { month: "long" })} {currentYear}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        {[
          {
            label: "Posts this month",
            value: thisMonthPosts.length,
            color: "#a78bfa",
            sub: `${upcomingPosts.length} upcoming`,
          },
          {
            label: "Ideas saved",
            value: savedIdeas.length,
            color: "#34d399",
            sub: "across all platforms",
          },
          {
            label: "Scripts written",
            value: savedScripts.length,
            color: "#fbbf24",
            sub: "ready to post",
          },
          {
            label: "Current streak",
            value: `🔥 ${streak}`,
            color: "#f87171",
            sub: "weeks consistent",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5"
          >
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-2">
              {stat.label}
            </p>
            <p className="text-3xl font-semibold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 mt-2">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle row */}
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "1.3fr 1fr 1fr" }}
      >
        {/* Quick actions */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
          <p className="text-sm font-medium text-white mb-4">Quick actions</p>
          <div className="flex flex-col gap-2">
            {[
              {
                icon: "💡",
                label: "Generate ideas",
                sub: "Get AI content ideas for any platform",
                href: "/generate",
                color: "rgba(124,58,237,0.15)",
              },
              {
                icon: "✍️",
                label: "Write a script",
                sub: "Turn an idea into a full script",
                href: "/script",
                color: "rgba(236,72,153,0.15)",
              },
              {
                icon: "📅",
                label: "Open calendar",
                sub: "Schedule and plan your content",
                href: "/calendar",
                color: "rgba(16,185,129,0.15)",
              },
              {
                icon: "🔖",
                label: "Saved content",
                sub: "View all your saved ideas",
                href: "/saved",
                color: "rgba(245,158,11,0.15)",
              },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all hover:border-gray-700"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background: "transparent",
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0"
                  style={{ background: action.color }}
                >
                  {action.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {action.label}
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5">{action.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming posts */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-white">Upcoming posts</p>
            <Link
              href="/calendar"
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              View all →
            </Link>
          </div>
          {upcomingPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="text-xs text-gray-600">No upcoming posts</p>
              <Link
                href="/calendar"
                className="text-xs text-violet-400 hover:text-violet-300"
              >
                Schedule one →
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingPosts.map((post) => {
                const date = new Date(post.year, post.month, post.day);
                const dayName = DAYS_OF_WEEK[date.getDay()];
                return (
                  <div key={post.id} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl border border-gray-800 flex flex-col items-center justify-center flex-shrink-0"
                      style={{ background: "#0f0f13" }}
                    >
                      <p className="text-sm font-semibold text-white leading-none">
                        {post.day}
                      </p>
                      <p className="text-xs text-gray-600 mt-0.5">{dayName}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">
                        {post.title}
                      </p>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{
                          background: PLATFORM_BADGE[post.platform]?.bg,
                          color: PLATFORM_BADGE[post.platform]?.color,
                        }}
                      >
                        {post.platform}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Platform split + mini streak */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 flex flex-col gap-4">
          <div>
            <p className="text-sm font-medium text-white mb-3">
              Platform split
            </p>
            <div className="flex flex-col gap-2">
              {platformCounts.map((pl) => (
                <div key={pl.name} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-20">{pl.name}</span>
                  <div
                    className="flex-1 rounded-full"
                    style={{ height: "5px", background: "#1f2937" }}
                  >
                    <div
                      style={{
                        width: `${(pl.count / maxCount) * 100}%`,
                        height: "5px",
                        borderRadius: "9999px",
                        background: pl.color,
                        transition: "width 0.5s",
                      }}
                    />
                  </div>
                  <span className="text-xs text-gray-600 w-4 text-right">
                    {pl.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-800 pt-4">
            <p className="text-xs text-gray-600 mb-2">Last 4 weeks</p>
            <div className="flex flex-col gap-1">
              {streakGrid.map((week, wi) => (
                <div key={wi} className="flex gap-1">
                  {week.map(({ dayNum, post }, di) => (
                    <div
                      key={di}
                      className="flex-1 rounded"
                      style={{
                        height: "14px",
                        background: post
                          ? PLATFORM_DOT[post.platform] + "50"
                          : "#1f2937",
                        border: `0.5px solid ${post ? PLATFORM_DOT[post.platform] + "80" : "transparent"}`,
                        opacity: dayNum === today.getDate() ? 1 : 0.8,
                      }}
                      title={post ? post.title : ""}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI insight */}
      <div
        className="rounded-2xl p-4 flex items-start gap-3"
        style={{
          background: "rgba(124,58,237,0.05)",
          border: "0.5px solid rgba(124,58,237,0.2)",
        }}
      >
        <span className="text-lg flex-shrink-0">💡</span>
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: "#a78bfa" }}>
            AI insight
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "#9ca3af" }}>
            {savedIdeas.length > 0
              ? `You have ${savedIdeas.length} saved idea${savedIdeas.length > 1 ? "s" : ""} that ${savedIdeas.length > 1 ? "haven't" : "hasn't"} been scripted yet. `
              : ""}
            {thisMonthPosts.length === 0
              ? "No posts scheduled this month yet — head to the calendar to start planning."
              : `You've scheduled ${thisMonthPosts.length} post${thisMonthPosts.length > 1 ? "s" : ""} this month. `}
            {streak > 0
              ? `Keep it up — you're on a ${streak} week streak! 🔥`
              : "Start posting consistently to build your streak."}
          </p>
        </div>
      </div>
    </div>
  );
}
