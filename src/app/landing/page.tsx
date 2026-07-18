"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div
      style={{
        background: "#05050a",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        color: "#fff",
        overflowX: "hidden",
      }}
    >
      {/* Grid background */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage:
            "linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow TL */}
      <div
        style={{
          position: "fixed",
          top: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Glow BR */}
      <div
        style={{
          position: "fixed",
          bottom: "-150px",
          right: "-150px",
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 60px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(5,5,10,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "0.5px solid rgba(255,255,255,0.06)",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <div
            style={{
              width: "26px",
              height: "26px",
              background: "rgba(124,58,237,0.25)",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
            }}
          >
            ✦
          </div>
          AI Calendar
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.06)",
            borderRadius: "12px",
            padding: "4px",
          }}
        >
          {["Features", "How it works", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              style={{
                fontSize: "13px",
                color: "#6b7280",
                padding: "5px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e5e7eb")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              {item}
            </a>
          ))}
        </div>

        <Link
          href="/login"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "0.5px solid rgba(124,58,237,0.4)",
            color: "#a78bfa",
            padding: "7px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 500,
            textDecoration: "none",
          }}
        >
          Get started free →
        </Link>
      </nav>

      {/* Hero */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "100px 24px 60px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
            filter: "blur(60px)",
            pointerEvents: "none",
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(124,58,237,0.08)",
            border: "0.5px solid rgba(124,58,237,0.25)",
            borderRadius: "20px",
            padding: "5px 14px",
            marginBottom: "28px",
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
          <span
            style={{
              fontSize: "11px",
              color: "#a78bfa",
              letterSpacing: "0.06em",
              textTransform: "uppercase" as const,
              fontWeight: 500,
            }}
          >
            Built for creators
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(38px, 5.5vw, 68px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            marginBottom: "20px",
            maxWidth: "780px",
          }}
        >
          Why does making content <br />
          <span
            style={{ fontStyle: "italic", fontWeight: 300, color: "#4b5563" }}
          >
            feel like actual work?
          </span>
        </h1>

        {/* Sub */}
        <p
          style={{
            fontSize: "16px",
            color: "#525252",
            maxWidth: "440px",
            lineHeight: 1.7,
            marginBottom: "36px",
          }}
        >
          You have ideas. You just never have the time, the plan, or the words.
          AI Calendar fixes all three — in minutes.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            href="/signup"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(124,58,237,0.3)",
            }}
          >
            Plan my content →
          </Link>
          <a
            href="#how-it-works"
            style={{
              background: "transparent",
              color: "#6b7280",
              padding: "12px 20px",
              borderRadius: "10px",
              fontSize: "14px",
              border: "0.5px solid rgba(255,255,255,0.08)",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            See how it works
          </a>
        </div>
        <p style={{ fontSize: "11px", color: "#333", marginTop: "14px" }}>
          Free to start · No credit card · Takes 2 minutes
        </p>

        {/* App window */}
        <div
          style={{
            position: "relative",
            margin: "60px auto 0",
            maxWidth: "860px",
            width: "100%",
            padding: "0 24px",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "70%",
              height: "120px",
              background:
                "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              background: "#0d0d12",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: "14px",
              overflow: "hidden",
              boxShadow:
                "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08)",
            }}
          >
            {/* Window bar */}
            <div
              style={{
                background: "#0a0a0f",
                borderBottom: "0.5px solid rgba(255,255,255,0.05)",
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {["#ef4444", "#fbbf24", "#22c55e"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: c,
                  }}
                />
              ))}
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#333",
                }}
              >
                ai-calendar.vercel.app · Dashboard
              </div>
            </div>

            {/* Window content */}
            <div style={{ padding: "16px" }}>
              {/* Mini navbar */}
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "0.5px solid rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                  padding: "6px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      background: "rgba(124,58,237,0.3)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "8px",
                    }}
                  >
                    ✦
                  </div>
                  AI Calendar
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["Dashboard", "Generate", "Calendar", "Script"].map(
                    (l, i) => (
                      <div
                        key={l}
                        style={{
                          fontSize: "10px",
                          color: i === 0 ? "#a78bfa" : "#525252",
                          background:
                            i === 0 ? "rgba(124,58,237,0.1)" : "transparent",
                          padding: i === 0 ? "2px 8px" : "0",
                          borderRadius: "4px",
                        }}
                      >
                        {l}
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                {[
                  { label: "Posts this month", val: "12", color: "#a78bfa" },
                  { label: "Ideas saved", val: "8", color: "#34d399" },
                  { label: "Scripts written", val: "5", color: "#fbbf24" },
                  { label: "Streak", val: "🔥 3", color: "#f87171" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "0.5px solid rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "8px",
                        color: "#525252",
                        textTransform: "uppercase" as const,
                        letterSpacing: "0.05em",
                        marginBottom: "4px",
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        fontWeight: 700,
                        color: s.color,
                      }}
                    >
                      {s.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom two cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "0.5px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "8px",
                      color: "#525252",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    AI Ideas — Instagram
                  </div>
                  {[
                    "Morning routine that changed my life",
                    "5 habits before 8am — Reel",
                    "Behind the scenes of my day",
                    "Productivity tips nobody talks about",
                  ].map((idea, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "5px",
                      }}
                    >
                      <div
                        style={{
                          width: "14px",
                          height: "14px",
                          borderRadius: "3px",
                          background: "rgba(124,58,237,0.2)",
                          color: "#a78bfa",
                          fontSize: "7px",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ fontSize: "9px", color: "#9ca3af" }}>
                        {idea}
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "0.5px solid rgba(255,255,255,0.05)",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "8px",
                      color: "#525252",
                      textTransform: "uppercase" as const,
                      letterSpacing: "0.05em",
                      marginBottom: "8px",
                    }}
                  >
                    AI insight
                  </div>
                  <div
                    style={{
                      background: "rgba(124,58,237,0.05)",
                      border: "0.5px solid rgba(124,58,237,0.15)",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "8px",
                        color: "#a78bfa",
                        marginBottom: "3px",
                        fontWeight: 500,
                      }}
                    >
                      💡 For you this week
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        color: "#6b7280",
                        lineHeight: 1.5,
                      }}
                    >
                      You&apos;re strong on Instagram but missing LinkedIn. Add
                      one post Thursday — peak professional engagement day.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "0.5px solid rgba(255,255,255,0.04)",
          borderBottom: "0.5px solid rgba(255,255,255,0.04)",
          padding: "16px 0",
          overflow: "hidden",
          margin: "80px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            animation: "scroll 25s linear infinite",
            whiteSpace: "nowrap" as const,
          }}
        >
          {[
            "AI Idea Generator",
            "Script Writer",
            "Content Calendar",
            "Weekly AI Review",
            "Live Post Preview",
            "Platform Analytics",
            "Streak Tracker",
            "Next Week Planner",
            "AI Idea Generator",
            "Script Writer",
            "Content Calendar",
            "Weekly AI Review",
            "Live Post Preview",
            "Platform Analytics",
            "Streak Tracker",
            "Next Week Planner",
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "#333",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#7c3aed",
                }}
              />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Pain section */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 60px 100px",
          maxWidth: "1060px",
          margin: "0 auto",
        }}
        id="features"
      >
        <div
          style={{
            fontSize: "11px",
            color: "#525252",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          The problem
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          Sound familiar?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.05)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {[
            {
              emoji: "😩",
              title: "The blank page problem",
              before: "Staring at a blank caption for 45 minutes",
              after: "AI gives you 5 ready ideas in 3 seconds",
            },
            {
              emoji: "📉",
              title: "Inconsistent posting",
              before: "3 posts one week, nothing the next",
              after: "Visual calendar keeps you consistent automatically",
            },
            {
              emoji: "🤯",
              title: "Platform overwhelm",
              before: "Different formats for every platform...",
              after: "AI adapts your content per platform automatically",
            },
            {
              emoji: "✍️",
              title: "Writing takes forever",
              before: "2 hours writing one caption or script",
              after: "Full script written in minutes — you just edit",
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "32px",
                background: "#05050a",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0a0a12")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#05050a")
              }
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>
                {item.emoji}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  letterSpacing: "-0.3px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#ef4444",
                  opacity: 0.6,
                  textDecoration: "line-through",
                  marginBottom: "4px",
                }}
              >
                {item.before}
              </div>
              <div style={{ fontSize: "12px", color: "#a78bfa" }}>
                {item.after}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 60px 100px",
          maxWidth: "1060px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "#525252",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          What it does
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          Everything in one place.
          <br />
          <span
            style={{ fontStyle: "italic", fontWeight: 300, color: "#4b5563" }}
          >
            Finally.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.05)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {[
            {
              icon: "💡",
              name: "Idea Generator",
              desc: "Type a topic, pick a platform. Get 5 content ideas instantly — tailored to your tone, audience and format.",
              tag: "Instagram · YouTube · LinkedIn · Facebook",
              bg: "rgba(124,58,237,0.12)",
            },
            {
              icon: "✍️",
              name: "Script Writer",
              desc: "Full Reel scripts, YouTube videos, LinkedIn posts. AI suggests lines as you type. Done in minutes.",
              tag: "Inline AI suggestions",
              bg: "rgba(236,72,153,0.12)",
            },
            {
              icon: "📅",
              name: "Content Calendar",
              desc: "Visual monthly view. Schedule posts, colour-code by platform. See your whole month at a glance.",
              tag: "Never miss a post",
              bg: "rgba(59,130,246,0.12)",
            },
            {
              icon: "📊",
              name: "AI Analytics",
              desc: "Consistency score, platform balance, peak day coverage — calculated from your real posts automatically.",
              tag: "Real insights not vanity metrics",
              bg: "rgba(245,158,11,0.12)",
            },
            {
              icon: "🔄",
              name: "Weekly AI Review",
              desc: "AI reviews your week, finds the gaps, and builds your entire next week schedule — one click.",
              tag: "1-click next week plan",
              bg: "rgba(16,185,129,0.12)",
            },
            {
              icon: "👁️",
              name: "Live Post Preview",
              desc: "See exactly how your post looks on each platform before publishing. No more formatting surprises.",
              tag: "What you see is what you post",
              bg: "rgba(239,68,68,0.12)",
            },
          ].map((f) => (
            <div
              key={f.name}
              style={{
                padding: "28px",
                background: "#05050a",
                transition: "background 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#0a0a12")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#05050a")
              }
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  background: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  marginBottom: "14px",
                }}
              >
                {f.icon}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "6px",
                  letterSpacing: "-0.3px",
                }}
              >
                {f.name}
              </div>
              <div
                style={{ fontSize: "12px", color: "#525252", lineHeight: 1.6 }}
              >
                {f.desc}
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: "9px",
                  color: "#a78bfa",
                  background: "rgba(124,58,237,0.08)",
                  border: "0.5px solid rgba(124,58,237,0.2)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                  marginTop: "10px",
                }}
              >
                {f.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 60px 100px",
          maxWidth: "1060px",
          margin: "0 auto",
        }}
        id="how-it-works"
      >
        <div
          style={{
            fontSize: "11px",
            color: "#525252",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          How it works
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          Three steps.
          <br />
          <span
            style={{ fontStyle: "italic", fontWeight: 300, color: "#4b5563" }}
          >
            That&apos;s genuinely it.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "24px",
          }}
        >
          {[
            {
              num: "01",
              icon: "💡",
              title: "Tell AI what you're about",
              desc: "Pick your platforms, niche and tone. Takes 2 minutes during onboarding. AI learns your style from day one.",
            },
            {
              num: "02",
              icon: "✍️",
              title: "Generate, write, schedule",
              desc: "Get ideas, write scripts with AI, drop them on your calendar. Your whole month planned in one session.",
            },
            {
              num: "03",
              icon: "📈",
              title: "Review, improve, repeat",
              desc: "Weekly AI review shows what's working. One click generates next week's plan. Stay consistent without burning out.",
            },
          ].map((s) => (
            <div
              key={s.num}
              style={{
                position: "relative",
                padding: "28px",
                background: "rgba(255,255,255,0.02)",
                border: "0.5px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")
              }
            >
              <div
                style={{
                  fontSize: "72px",
                  fontWeight: 900,
                  color: "rgba(255,255,255,0.025)",
                  lineHeight: 1,
                  position: "absolute",
                  top: "8px",
                  right: "16px",
                  letterSpacing: "-4px",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: "20px", marginBottom: "16px" }}>
                {s.icon}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  marginBottom: "8px",
                  letterSpacing: "-0.3px",
                }}
              >
                {s.title}
              </div>
              <div
                style={{ fontSize: "12px", color: "#525252", lineHeight: 1.7 }}
              >
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "0 60px 100px",
          maxWidth: "1060px",
          margin: "0 auto",
        }}
        id="pricing"
      >
        <div
          style={{
            fontSize: "11px",
            color: "#525252",
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
            fontWeight: 500,
            marginBottom: "12px",
          }}
        >
          Pricing
        </div>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: "48px",
          }}
        >
          Simple pricing.
          <br />
          <span
            style={{ fontStyle: "italic", fontWeight: 300, color: "#4b5563" }}
          >
            No surprises.
          </span>
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.05)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {[
            {
              plan: "Free",
              price: "$0",
              sub: "Forever",
              features: [
                "50 AI ideas / month",
                "10 scripts / month",
                "Content calendar",
                "1 platform",
              ],
              cta: "Start free",
              highlight: false,
            },
            {
              plan: "Pro",
              price: "$9",
              sub: "per month",
              features: [
                "Unlimited AI ideas",
                "Unlimited scripts",
                "Weekly AI review",
                "All 4 platforms",
                "AI analytics",
              ],
              cta: "Start free trial",
              highlight: true,
            },
            {
              plan: "Agency",
              price: "$29",
              sub: "per month",
              features: [
                "Everything in Pro",
                "5 workspaces",
                "Team collaboration",
                "Priority support",
                "Custom branding",
              ],
              cta: "Contact us",
              highlight: false,
            },
          ].map((tier) => (
            <div
              key={tier.plan}
              style={{
                padding: "32px",
                background: tier.highlight
                  ? "rgba(124,58,237,0.06)"
                  : "#05050a",
                position: "relative",
              }}
            >
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    fontSize: "9px",
                    color: "#a78bfa",
                    background: "rgba(124,58,237,0.15)",
                    border: "0.5px solid rgba(124,58,237,0.3)",
                    borderRadius: "4px",
                    padding: "2px 7px",
                  }}
                >
                  Most popular
                </div>
              )}
              <div
                style={{
                  fontSize: "13px",
                  color: "#6b7280",
                  marginBottom: "8px",
                }}
              >
                {tier.plan}
              </div>
              <div
                style={{
                  fontSize: "36px",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  marginBottom: "2px",
                }}
              >
                {tier.price}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#525252",
                  marginBottom: "24px",
                }}
              >
                {tier.sub}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "24px",
                }}
              >
                {tier.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "12px",
                      color: "#9ca3af",
                    }}
                  >
                    <div
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "rgba(124,58,237,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "8px",
                        color: "#a78bfa",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                    {f}
                  </div>
                ))}
              </div>
              <Link
                href="/signup"
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "10px",
                  borderRadius: "10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  background: tier.highlight
                    ? "linear-gradient(135deg, #7c3aed, #a855f7)"
                    : "rgba(255,255,255,0.04)",
                  color: tier.highlight ? "#fff" : "#6b7280",
                  border: tier.highlight
                    ? "none"
                    : "0.5px solid rgba(255,255,255,0.08)",
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: "relative", zIndex: 1, padding: "0 60px 80px" }}>
        <div
          style={{
            border: "0.5px solid rgba(124,58,237,0.2)",
            borderRadius: "20px",
            padding: "64px",
            textAlign: "center",
            background: "rgba(124,58,237,0.03)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: "400px",
              height: "200px",
              background:
                "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            Stop putting off
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your content.
            </span>
          </h2>
          <p
            style={{
              fontSize: "14px",
              color: "#525252",
              marginBottom: "28px",
              lineHeight: 1.6,
            }}
          >
            You already know what you want to post.
            <br />
            You just need a system that makes it easy.
          </p>
          <Link
            href="/signup"
            style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: "10px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 0 30px rgba(124,58,237,0.3)",
            }}
          >
            Start planning for free →
          </Link>
          <p style={{ fontSize: "11px", color: "#333", marginTop: "14px" }}>
            No credit card · 2 minute setup · Cancel anytime
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "0.5px solid rgba(255,255,255,0.04)",
          padding: "24px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "12px", color: "#333" }}>
          © 2026 AI Calendar · Built by Sankalp Jadhav
        </div>
        <div style={{ fontSize: "12px", color: "#333" }}>
          Next.js · Supabase · Groq AI
        </div>
      </footer>

      <style>{`
        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
      `}</style>
    </div>
  );
}
