"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-body {
          background: #05050a;
          min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif;
          color: #fff;
          overflow-x: hidden;
        }

        /* Animations */
        @keyframes scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        /* Navbar */
        .land-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 0 60px; height: 56px;
          display: flex; align-items: center; justify-content: space-between;
          background: rgba(5,5,10,0.85); backdrop-filter: blur(20px);
          border-bottom: 0.5px solid rgba(255,255,255,0.06);
        }
        .land-logo {
          display: flex; align-items: center; gap: 10px;
          font-size: 14px; font-weight: 600; text-decoration: none; color: #fff;
        }
        .land-logo-icon {
          width: 26px; height: 26px; background: rgba(124,58,237,0.25);
          border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px;
        }
        .land-nav-center {
          display: flex; align-items: center; gap: 2px;
          background: rgba(255,255,255,0.04); border: 0.5px solid rgba(255,255,255,0.06);
          border-radius: 12px; padding: 4px;
        }
        .land-nav-link {
          font-size: 13px; color: #6b7280; padding: 5px 14px;
          border-radius: 8px; text-decoration: none; transition: color 0.2s;
        }
        .land-nav-link:hover { color: #e5e7eb; }
        .land-nav-cta {
          background: rgba(124,58,237,0.15); border: 0.5px solid rgba(124,58,237,0.4);
          color: #a78bfa; padding: 7px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 500; text-decoration: none;
        }

        /* Hero */
        .land-hero {
          position: relative; z-index: 1;
          min-height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 100px 24px 60px;
        }
        .land-hero-blob {
          position: absolute; top: 20%; left: 50%; transform: translateX(-50%);
          width: 600px; height: 400px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none;
        }
        .land-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(124,58,237,0.08); border: 0.5px solid rgba(124,58,237,0.25);
          border-radius: 20px; padding: 5px 14px; margin-bottom: 28px;
        }
        .land-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #a78bfa; animation: pulse 2s infinite;
        }
        .land-eyebrow-text {
          font-size: 11px; color: #a78bfa;
          letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500;
        }
        .land-hero-title {
          font-size: clamp(32px, 5.5vw, 68px); font-weight: 800;
          line-height: 1.05; letter-spacing: -2px; margin-bottom: 20px; max-width: 780px;
        }
        .land-hero-title em { font-style: italic; font-weight: 300; color: #4b5563; }
        .land-hero-sub {
          font-size: 16px; color: #525252; max-width: 440px;
          line-height: 1.7; margin-bottom: 36px;
        }
        .land-hero-actions { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: center; }
        .land-btn-main {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: #fff; padding: 12px 24px; border-radius: 10px;
          font-size: 14px; font-weight: 600; border: none; cursor: pointer;
          text-decoration: none; box-shadow: 0 0 30px rgba(124,58,237,0.3);
          display: inline-block;
        }
        .land-btn-ghost {
          background: transparent; color: #6b7280; padding: 12px 20px;
          border-radius: 10px; font-size: 14px;
          border: 0.5px solid rgba(255,255,255,0.08); cursor: pointer;
          text-decoration: none; display: inline-block;
        }
        .land-hero-note { font-size: 11px; color: #333; margin-top: 14px; }

        /* App window */
        .land-window-wrap {
          position: relative; margin: 60px auto 0;
          max-width: 860px; width: 100%; padding: 0 24px;
        }
        .land-window-glow {
          position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);
          width: 70%; height: 120px;
          background: radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%);
          filter: blur(30px); pointer-events: none;
        }
        .land-window {
          background: #0d0d12; border: 0.5px solid rgba(255,255,255,0.08);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(124,58,237,0.08);
        }
        .land-window-bar {
          background: #0a0a0f; border-bottom: 0.5px solid rgba(255,255,255,0.05);
          padding: 10px 16px; display: flex; align-items: center; gap: 6px;
        }
        .land-wdot { width: 8px; height: 8px; border-radius: 50%; }
        .land-window-url { flex: 1; text-align: center; font-size: 10px; color: #333; }
        .land-window-body { padding: 16px; }
        .land-window-topbar {
          background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.05);
          border-radius: 8px; padding: 6px 14px;
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;
        }
        .land-window-logo { font-size: 11px; font-weight: 600; color: #e5e7eb; display: flex; align-items: center; gap: 5px; }
        .land-window-logo-icon { width: 16px; height: 16px; background: rgba(124,58,237,0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 8px; }
        .land-window-links { display: flex; gap: 10px; }
        .land-window-navlink { font-size: 10px; color: #525252; }
        .land-window-navlink.on { color: #a78bfa; background: rgba(124,58,237,0.1); padding: 2px 8px; border-radius: 4px; }
        .land-window-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; margin-bottom: 10px; }
        .land-wstat { background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; }
        .land-wstat-label { font-size: 8px; color: #525252; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .land-wstat-val { font-size: 20px; font-weight: 700; }
        .land-window-grid2 { display: grid; grid-template-columns: 1.2fr 1fr; gap: 8px; }
        .land-wcard { background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 10px; }
        .land-wcard-title { font-size: 8px; color: #525252; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
        .land-widea { display: flex; align-items: center; gap: 6px; margin-bottom: 5px; }
        .land-widea-num { width: 14px; height: 14px; border-radius: 3px; background: rgba(124,58,237,0.2); color: #a78bfa; font-size: 7px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .land-widea-text { font-size: 9px; color: #9ca3af; }
        .land-winsight { background: rgba(124,58,237,0.05); border: 0.5px solid rgba(124,58,237,0.15); border-radius: 6px; padding: 8px; }
        .land-winsight-label { font-size: 8px; color: #a78bfa; margin-bottom: 3px; font-weight: 500; }
        .land-winsight-text { font-size: 9px; color: #6b7280; line-height: 1.5; }

        /* Marquee */
        .land-marquee-wrap {
          position: relative; z-index: 1;
          border-top: 0.5px solid rgba(255,255,255,0.04);
          border-bottom: 0.5px solid rgba(255,255,255,0.04);
          padding: 16px 0; overflow: hidden; margin: 80px 0;
        }
        .land-marquee-track {
          display: flex; gap: 40px;
          animation: scroll 25s linear infinite; white-space: nowrap;
        }
        .land-marquee-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #333; flex-shrink: 0; }
        .land-marquee-dot { width: 4px; height: 4px; border-radius: 50%; background: #7c3aed; }

        /* Sections */
        .land-section { position: relative; z-index: 1; padding: 0 60px 100px; max-width: 1060px; margin: 0 auto; }
        .land-section-eye { font-size: 11px; color: #525252; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500; margin-bottom: 12px; }
        .land-section-head { font-size: clamp(26px, 4vw, 44px); font-weight: 800; letter-spacing: -1.5px; line-height: 1.1; margin-bottom: 48px; }
        .land-section-head em { font-style: italic; font-weight: 300; color: #4b5563; }

        /* Pain grid */
        .land-pain-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden;
        }
        .land-pain-cell { padding: 32px; background: #05050a; transition: background 0.2s; }
        .land-pain-cell:hover { background: #0a0a12; }
        .land-pain-emoji { font-size: 24px; margin-bottom: 12px; }
        .land-pain-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.3px; }
        .land-pain-before { font-size: 12px; color: #ef4444; opacity: 0.6; text-decoration: line-through; margin-bottom: 4px; }
        .land-pain-after { font-size: 12px; color: #a78bfa; }

        /* Features grid */
        .land-feat-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden;
        }
        .land-feat-cell { padding: 28px; background: #05050a; transition: background 0.2s; cursor: default; }
        .land-feat-cell:hover { background: #0a0a12; }
        .land-feat-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-bottom: 14px; }
        .land-feat-name { font-size: 14px; font-weight: 600; margin-bottom: 6px; letter-spacing: -0.3px; }
        .land-feat-desc { font-size: 12px; color: #525252; line-height: 1.6; }
        .land-feat-tag { display: inline-block; font-size: 9px; color: #a78bfa; background: rgba(124,58,237,0.08); border: 0.5px solid rgba(124,58,237,0.2); border-radius: 4px; padding: 2px 7px; margin-top: 10px; }

        /* Steps */
        .land-steps-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .land-step-card { position: relative; padding: 28px; background: rgba(255,255,255,0.02); border: 0.5px solid rgba(255,255,255,0.05); border-radius: 16px; transition: border-color 0.2s; }
        .land-step-card:hover { border-color: rgba(124,58,237,0.2); }
        .land-step-num { font-size: 72px; font-weight: 900; color: rgba(255,255,255,0.025); line-height: 1; position: absolute; top: 8px; right: 16px; letter-spacing: -4px; }
        .land-step-icon { font-size: 20px; margin-bottom: 16px; }
        .land-step-title { font-size: 15px; font-weight: 600; margin-bottom: 8px; letter-spacing: -0.3px; }
        .land-step-desc { font-size: 12px; color: #525252; line-height: 1.7; }

        /* Pricing */
        .land-pricing-grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 0.5px solid rgba(255,255,255,0.05); border-radius: 16px; overflow: hidden;
        }
        .land-pricing-cell { padding: 32px; background: #05050a; position: relative; }
        .land-pricing-cell.highlight { background: rgba(124,58,237,0.06); }
        .land-popular-badge { position: absolute; top: 16px; right: 16px; font-size: 9px; color: #a78bfa; background: rgba(124,58,237,0.15); border: 0.5px solid rgba(124,58,237,0.3); border-radius: 4px; padding: 2px 7px; }
        .land-plan-name { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
        .land-plan-price { font-size: 36px; font-weight: 800; letter-spacing: -1px; margin-bottom: 2px; }
        .land-plan-sub { font-size: 12px; color: #525252; margin-bottom: 24px; }
        .land-plan-features { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .land-plan-feature { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #9ca3af; }
        .land-plan-check { width: 14px; height: 14px; border-radius: 50%; background: rgba(124,58,237,0.15); display: flex; align-items: center; justify-content: center; font-size: 8px; color: #a78bfa; flex-shrink: 0; }
        .land-plan-btn { display: block; text-align: center; padding: 10px; border-radius: 10px; font-size: 13px; font-weight: 600; text-decoration: none; }
        .land-plan-btn.primary { background: linear-gradient(135deg, #7c3aed, #a855f7); color: #fff; }
        .land-plan-btn.secondary { background: rgba(255,255,255,0.04); color: #6b7280; border: 0.5px solid rgba(255,255,255,0.08); }

        /* CTA */
        .land-cta-wrap { position: relative; z-index: 1; padding: 0 60px 80px; }
        .land-cta-box { border: 0.5px solid rgba(124,58,237,0.2); border-radius: 20px; padding: 64px; text-align: center; background: rgba(124,58,237,0.03); position: relative; overflow: hidden; }
        .land-cta-glow { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 400px; height: 200px; background: radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%); filter: blur(40px); pointer-events: none; }
        .land-cta-title { font-size: clamp(26px, 4vw, 48px); font-weight: 800; letter-spacing: -2px; line-height: 1.1; margin-bottom: 12px; }
        .land-cta-sub { font-size: 14px; color: #525252; margin-bottom: 28px; line-height: 1.6; }
        .land-cta-note { font-size: 11px; color: #333; margin-top: 14px; }

        /* Footer */
        .land-footer { position: relative; z-index: 1; border-top: 0.5px solid rgba(255,255,255,0.04); padding: 24px 60px; display: flex; align-items: center; justify-content: space-between; }
        .land-footer-text { font-size: 12px; color: #333; }

        /* Grid backgrounds */
        .land-bg-grid { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px); background-size: 60px 60px; pointer-events: none; z-index: 0; }
        .land-glow-tl { position: fixed; top: -150px; left: -150px; width: 500px; height: 500px; background: radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .land-glow-br { position: fixed; bottom: -150px; right: -150px; width: 450px; height: 450px; background: radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%); pointer-events: none; z-index: 0; }

        /* ===================== */
        /* MOBILE RESPONSIVE     */
        /* ===================== */
        @media (max-width: 768px) {

          /* Navbar */
          .land-nav { padding: 0 20px; }
          .land-nav-center { display: none; }

          /* Hero */
          .land-hero { padding: 90px 20px 40px; }
          .land-hero-blob { width: 300px; height: 200px; }
          .land-hero-title { letter-spacing: -1px; margin-bottom: 16px; }
          .land-hero-sub { font-size: 15px; }
          .land-hero-actions { flex-direction: column; width: 100%; }
          .land-btn-main { width: 100%; text-align: center; }
          .land-btn-ghost { width: 100%; text-align: center; }

          /* App window — hide on mobile, too complex */
          .land-window-wrap { display: none; }

          /* Marquee */
          .land-marquee-wrap { margin: 40px 0; }

          /* Sections */
          .land-section { padding: 0 20px 60px; }
          .land-section-head { margin-bottom: 28px; }

          /* Pain grid — stack to 1 column */
          .land-pain-grid { grid-template-columns: 1fr; }
          .land-pain-cell { padding: 24px 20px; }

          /* Features — stack to 1 column */
          .land-feat-grid { grid-template-columns: 1fr; }
          .land-feat-cell { padding: 24px 20px; }

          /* Steps — stack to 1 column */
          .land-steps-grid { grid-template-columns: 1fr; gap: 12px; }
          .land-step-card { padding: 24px 20px; }
          .land-step-num { font-size: 48px; }

          /* Pricing — stack to 1 column */
          .land-pricing-grid { grid-template-columns: 1fr; }
          .land-pricing-cell { padding: 28px 20px; }

          /* CTA */
          .land-cta-wrap { padding: 0 20px 60px; }
          .land-cta-box { padding: 40px 24px; }

          /* Footer */
          .land-footer { padding: 20px; flex-direction: column; gap: 8px; text-align: center; }

          /* Window stats hide on small screens */
          .land-window-links { display: none; }
        }

        @media (max-width: 480px) {
          .land-hero-title { letter-spacing: -0.5px; }
          .land-hero-sub { font-size: 14px; }
          .land-nav-cta { padding: 6px 12px; font-size: 12px; }
        }
      `}</style>

      <div className="landing-body">
        <div className="land-bg-grid" />
        <div className="land-glow-tl" />
        <div className="land-glow-br" />

        {/* Navbar */}
        <nav className="land-nav">
          <Link href="/" className="land-logo">
            <div className="land-logo-icon">✦</div>
            AI Calendar
          </Link>
          <div className="land-nav-center">
            {["Features", "How it works", "Pricing"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="land-nav-link"
              >
                {item}
              </a>
            ))}
          </div>
          <Link href="/signup" className="land-nav-cta">
            Get started free →
          </Link>
        </nav>

        {/* Hero */}
        <div className="land-hero">
          <div className="land-hero-blob" />
          <div className="land-eyebrow">
            <div className="land-eyebrow-dot" />
            <span className="land-eyebrow-text">Built for creators</span>
          </div>
          <h1 className="land-hero-title">
            Why does making content
            <br />
            <em>feel like actual work?</em>
          </h1>
          <p className="land-hero-sub">
            You have ideas. You just never have the time, the plan, or the
            words. AI Calendar fixes all three — in minutes.
          </p>
          <div className="land-hero-actions">
            <Link href="/signup" className="land-btn-main">
              Plan my content →
            </Link>
            <a href="#features" className="land-btn-ghost">
              See how it works
            </a>
          </div>
          <p className="land-hero-note">
            Free to start · No credit card · Takes 2 minutes
          </p>

          {/* App window — hidden on mobile */}
          <div className="land-window-wrap">
            <div className="land-window-glow" />
            <div className="land-window">
              <div className="land-window-bar">
                {["#ef4444", "#fbbf24", "#22c55e"].map((c, i) => (
                  <div
                    key={i}
                    className="land-wdot"
                    style={{ background: c }}
                  />
                ))}
                <div className="land-window-url">
                  ai-calendar.vercel.app · Dashboard
                </div>
              </div>
              <div className="land-window-body">
                <div className="land-window-topbar">
                  <div className="land-window-logo">
                    <div className="land-window-logo-icon">✦</div>
                    AI Calendar
                  </div>
                  <div className="land-window-links">
                    {["Dashboard", "Generate", "Calendar", "Script"].map(
                      (l, i) => (
                        <div
                          key={l}
                          className={`land-window-navlink${i === 0 ? " on" : ""}`}
                        >
                          {l}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div className="land-window-stats">
                  {[
                    { label: "Posts this month", val: "12", color: "#a78bfa" },
                    { label: "Ideas saved", val: "8", color: "#34d399" },
                    { label: "Scripts written", val: "5", color: "#fbbf24" },
                    { label: "Streak", val: "🔥 3", color: "#f87171" },
                  ].map((s) => (
                    <div key={s.label} className="land-wstat">
                      <div className="land-wstat-label">{s.label}</div>
                      <div
                        className="land-wstat-val"
                        style={{ color: s.color }}
                      >
                        {s.val}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="land-window-grid2">
                  <div className="land-wcard">
                    <div className="land-wcard-title">AI Ideas — Instagram</div>
                    {[
                      "Morning routine that changed my life",
                      "5 habits before 8am — Reel",
                      "Behind the scenes of my day",
                      "Productivity tips nobody talks about",
                    ].map((idea, i) => (
                      <div key={i} className="land-widea">
                        <div className="land-widea-num">{i + 1}</div>
                        <div className="land-widea-text">{idea}</div>
                      </div>
                    ))}
                  </div>
                  <div className="land-wcard">
                    <div className="land-wcard-title">AI insight</div>
                    <div className="land-winsight">
                      <div className="land-winsight-label">
                        💡 For you this week
                      </div>
                      <div className="land-winsight-text">
                        You&apos;re strong on Instagram but missing LinkedIn.
                        Add one post Thursday — peak engagement day.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="land-marquee-wrap">
          <div className="land-marquee-track">
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
              <div key={i} className="land-marquee-item">
                <div className="land-marquee-dot" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Pain */}
        <div className="land-section" id="features">
          <div className="land-section-eye">The problem</div>
          <h2 className="land-section-head">Sound familiar?</h2>
          <div className="land-pain-grid">
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
              <div key={item.title} className="land-pain-cell">
                <div className="land-pain-emoji">{item.emoji}</div>
                <div className="land-pain-title">{item.title}</div>
                <div className="land-pain-before">{item.before}</div>
                <div className="land-pain-after">{item.after}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="land-section">
          <div className="land-section-eye">What it does</div>
          <h2 className="land-section-head">
            Everything in one place.
            <br />
            <em>Finally.</em>
          </h2>
          <div className="land-feat-grid">
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
                desc: "Consistency score, platform balance, peak day coverage — calculated from your real posts.",
                tag: "Real insights not vanity metrics",
                bg: "rgba(245,158,11,0.12)",
              },
              {
                icon: "🔄",
                name: "Weekly AI Review",
                desc: "AI reviews your week, finds the gaps, and builds your next week schedule — one click.",
                tag: "1-click next week plan",
                bg: "rgba(16,185,129,0.12)",
              },
              {
                icon: "👁️",
                name: "Live Post Preview",
                desc: "See exactly how your post looks on each platform before publishing.",
                tag: "What you see is what you post",
                bg: "rgba(239,68,68,0.12)",
              },
            ].map((f) => (
              <div key={f.name} className="land-feat-cell">
                <div className="land-feat-icon" style={{ background: f.bg }}>
                  {f.icon}
                </div>
                <div className="land-feat-name">{f.name}</div>
                <div className="land-feat-desc">{f.desc}</div>
                <div className="land-feat-tag">{f.tag}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="land-section" id="how-it-works">
          <div className="land-section-eye">How it works</div>
          <h2 className="land-section-head">
            Three steps.
            <br />
            <em>That&apos;s genuinely it.</em>
          </h2>
          <div className="land-steps-grid">
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
              <div key={s.num} className="land-step-card">
                <div className="land-step-num">{s.num}</div>
                <div className="land-step-icon">{s.icon}</div>
                <div className="land-step-title">{s.title}</div>
                <div className="land-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="land-section" id="pricing">
          <div className="land-section-eye">Pricing</div>
          <h2 className="land-section-head">
            Simple pricing.
            <br />
            <em>No surprises.</em>
          </h2>
          <div className="land-pricing-grid">
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
                className={`land-pricing-cell${tier.highlight ? " highlight" : ""}`}
              >
                {tier.highlight && (
                  <div className="land-popular-badge">Most popular</div>
                )}
                <div className="land-plan-name">{tier.plan}</div>
                <div className="land-plan-price">{tier.price}</div>
                <div className="land-plan-sub">{tier.sub}</div>
                <div className="land-plan-features">
                  {tier.features.map((f) => (
                    <div key={f} className="land-plan-feature">
                      <div className="land-plan-check">✓</div>
                      {f}
                    </div>
                  ))}
                </div>
                <Link
                  href="/signup"
                  className={`land-plan-btn${tier.highlight ? " primary" : " secondary"}`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="land-cta-wrap">
          <div className="land-cta-box">
            <div className="land-cta-glow" />
            <h2 className="land-cta-title">
              Stop putting off
              <br />
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                your content.
              </span>
            </h2>
            <p className="land-cta-sub">
              You already know what you want to post.
              <br />
              You just need a system that makes it easy.
            </p>
            <Link href="/signup" className="land-btn-main">
              Start planning for free →
            </Link>
            <p className="land-cta-note">
              No credit card · 2 minute setup · Cancel anytime
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="land-footer">
          <div className="land-footer-text">
            © 2026 AI Calendar · Built by Sankalp Jadhav
          </div>
          <div className="land-footer-text">Next.js · Supabase · Groq AI</div>
        </footer>
      </div>
    </>
  );
}
