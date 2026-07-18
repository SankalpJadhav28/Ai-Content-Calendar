"use client";

import { useApp, PLATFORM_DOT, PLATFORM_BADGE } from "@/context/AppContext";
import Link from "next/link";
import LandingPage from "./landing/page";

export default function Home() {
  const { user, posts, savedIdeas, savedScripts } = useApp();

  // Not logged in — show landing page
  if (!user) return <LandingPage />;

  // Logged in — show dashboard
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

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
  const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const thisMonthPosts = posts.filter(
    (p) => p.month === currentMonth && p.year === currentYear,
  );
  const upcomingPosts = posts
    .filter(
      (p) =>
        p.day >= today.getDate() &&
        p.month === currentMonth &&
        p.year === currentYear,
    )
    .sort((a, b) => a.day - b.day)
    .slice(0, 3);

  const platforms = ["Instagram", "YouTube", "LinkedIn", "Facebook"];
  const platformCounts = platforms.map((pl) => ({
    name: pl,
    count: posts.filter((p) => p.platform === pl).length,
    color: PLATFORM_DOT[pl],
  }));
  const maxCount = Math.max(...platformCounts.map((p) => p.count), 1);

  const dayOfWeek = today.getDay();
  let streak = 0;
  for (let w = 0; w < 4; w++) {
    const ws = today.getDate() - dayOfWeek - w * 7;
    const we = ws + 6;
    if (
      posts.some((p) => p.day >= ws && p.day <= we && p.month === currentMonth)
    )
      streak++;
    else break;
  }

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

  const hour = today.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "rgba(124,58,237,0.1)",
            border: "0.5px solid rgba(124,58,237,0.25)",
            borderRadius: "20px",
            padding: "3px 12px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: "#a78bfa",
            }}
          />
          <span style={{ fontSize: "11px", color: "#a78bfa" }}>AI powered</span>
        </div>
        <h1
          style={{
            fontSize: "30px",
            fontWeight: 600,
            color: "#ffffff",
            marginBottom: "4px",
          }}
        >
          {greeting} 👋
        </h1>
        <p style={{ fontSize: "13px", color: "#4b5563" }}>
          {MONTHS[currentMonth]} {currentYear} — content overview
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "10px",
          marginBottom: "16px",
        }}
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
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.07)",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                color: "#4b5563",
                textTransform: "uppercase" as const,
                letterSpacing: "0.06em",
                marginBottom: "8px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: "28px",
                fontWeight: 600,
                color: stat.color,
                lineHeight: 1,
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: "11px", color: "#4b5563", marginTop: "6px" }}>
              {stat.sub}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "18px 20px",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#e5e7eb",
              marginBottom: "12px",
            }}
          >
            Quick actions
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[
              {
                icon: "💡",
                label: "Generate ideas",
                sub: "AI ideas for any platform",
                href: "/generate",
                bg: "rgba(124,58,237,0.1)",
              },
              {
                icon: "✍️",
                label: "Write a script",
                sub: "Turn an idea into a script",
                href: "/script",
                bg: "rgba(236,72,153,0.1)",
              },
              {
                icon: "📅",
                label: "Open calendar",
                sub: "Schedule your content",
                href: "/calendar",
                bg: "rgba(16,185,129,0.1)",
              },
              {
                icon: "🔖",
                label: "Saved content",
                sub: "View all saved ideas",
                href: "/saved",
                bg: "rgba(245,158,11,0.1)",
              },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "9px 10px",
                  borderRadius: "10px",
                  border: "0.5px solid rgba(255,255,255,0.05)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")
                }
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "9px",
                    background: action.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "15px",
                    flexShrink: 0,
                  }}
                >
                  {action.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      color: "#e5e7eb",
                    }}
                  >
                    {action.label}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#4b5563",
                      marginTop: "1px",
                    }}
                  >
                    {action.sub}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "18px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <p style={{ fontSize: "13px", fontWeight: 500, color: "#e5e7eb" }}>
              Upcoming posts
            </p>
            <Link
              href="/calendar"
              style={{
                fontSize: "11px",
                color: "#4b5563",
                textDecoration: "none",
              }}
            >
              View all →
            </Link>
          </div>
          {upcomingPosts.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "140px",
                gap: "6px",
              }}
            >
              <p style={{ fontSize: "12px", color: "#4b5563" }}>
                No upcoming posts
              </p>
              <Link
                href="/calendar"
                style={{
                  fontSize: "11px",
                  color: "#a78bfa",
                  textDecoration: "none",
                }}
              >
                Schedule one →
              </Link>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {upcomingPosts.map((post) => {
                const date = new Date(post.year, post.month, post.day);
                const dayName = DAYS_OF_WEEK[date.getDay()];
                const badge = PLATFORM_BADGE[post.platform];
                return (
                  <div
                    key={post.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        border: "0.5px solid rgba(255,255,255,0.07)",
                        background: "#0f0f13",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 600,
                          color: "#e5e7eb",
                          lineHeight: 1,
                        }}
                      >
                        {post.day}
                      </p>
                      <p
                        style={{
                          fontSize: "9px",
                          color: "#4b5563",
                          marginTop: "1px",
                        }}
                      >
                        {dayName}
                      </p>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: 500,
                          color: "#e5e7eb",
                          whiteSpace: "nowrap" as const,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {post.title}
                      </p>
                      <span
                        style={{
                          fontSize: "10px",
                          padding: "1px 7px",
                          borderRadius: "20px",
                          background: badge?.bg,
                          color: badge?.color,
                          marginTop: "3px",
                          display: "inline-block",
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

        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            padding: "18px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: "#e5e7eb",
                marginBottom: "12px",
              }}
            >
              Platform split
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {platformCounts.map((pl) => (
                <div
                  key={pl.name}
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#6b7280",
                      width: "65px",
                      flexShrink: 0,
                    }}
                  >
                    {pl.name}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "4px",
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: "9999px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${(pl.count / maxCount) * 100}%`,
                        height: "4px",
                        borderRadius: "9999px",
                        background: pl.color,
                        transition: "width 0.5s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#4b5563",
                      width: "12px",
                      textAlign: "right" as const,
                    }}
                  >
                    {pl.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              borderTop: "0.5px solid rgba(255,255,255,0.05)",
              paddingTop: "14px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#4b5563",
                marginBottom: "8px",
              }}
            >
              Last 4 weeks
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "3px" }}
            >
              {streakGrid.map((week, wi) => (
                <div key={wi} style={{ display: "flex", gap: "3px" }}>
                  {week.map(({ post }, di) => (
                    <div
                      key={di}
                      style={{
                        flex: 1,
                        height: "12px",
                        borderRadius: "3px",
                        background: post
                          ? PLATFORM_DOT[post.platform] + "55"
                          : "rgba(255,255,255,0.04)",
                        border: `0.5px solid ${post ? PLATFORM_DOT[post.platform] + "80" : "transparent"}`,
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

      <div
        style={{
          background: "rgba(124,58,237,0.05)",
          border: "0.5px solid rgba(124,58,237,0.15)",
          borderRadius: "14px",
          padding: "14px 18px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <span style={{ fontSize: "16px", flexShrink: 0 }}>💡</span>
        <div>
          <p
            style={{
              fontSize: "11px",
              fontWeight: 500,
              color: "#a78bfa",
              marginBottom: "3px",
            }}
          >
            AI insight
          </p>
          <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
            {savedIdeas.length > 0
              ? `You have ${savedIdeas.length} saved idea${savedIdeas.length > 1 ? "s" : ""} that ${savedIdeas.length > 1 ? "haven't" : "hasn't"} been scripted yet. `
              : ""}
            {thisMonthPosts.length === 0
              ? "No posts scheduled this month — head to the calendar to start planning."
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
