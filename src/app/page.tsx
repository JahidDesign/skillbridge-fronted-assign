import Link from "next/link";
import { Search, Star, Users, BookOpen, ArrowRight, Sparkles, Zap } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroIllustration from "@/components/HeroIllustration";
import VideoSection from "@/components/Videosection";

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED_STATS = [
  { label: "Expert Tutors", value: "500+", icon: Users },
  { label: "Sessions Completed", value: "12,000+", icon: BookOpen },
  { label: "Average Rating", value: "4.8★", icon: Star },
];

const CATEGORIES = [
  { name: "Mathematics", icon: "📐", count: "48 tutors" },
  { name: "Programming", icon: "💻", count: "63 tutors" },
  { name: "Languages", icon: "🌍", count: "91 tutors" },
  { name: "Science", icon: "🔬", count: "37 tutors" },
  { name: "Music", icon: "🎵", count: "29 tutors" },
  { name: "Design", icon: "🎨", count: "22 tutors" },
  { name: "Business", icon: "📊", count: "44 tutors" },
  { name: "History", icon: "📚", count: "18 tutors" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Find Your Tutor",
    desc: "Browse profiles, read reviews, and filter by subject, price, and availability.",
    icon: Search,
  },
  {
    step: "02",
    title: "Book a Session",
    desc: "Pick a time that works for you and book instantly. No waiting, no friction.",
    icon: Zap,
  },
  {
    step: "03",
    title: "Learn & Grow",
    desc: "Attend your session and leave a review to help others find great tutors.",
    icon: Sparkles,
  },
];

const TESTIMONIALS = [
  {
    stars: "★★★★★",
    quote: "Found a fantastic Python tutor in minutes. The session was incredibly focused and I leveled up faster than any course I've taken.",
    name: "James L.",
    role: "Software Engineer",
    bg: "#fff7ed",
    emoji: "👨‍💼",
  },
  {
    stars: "★★★★★",
    quote: "My Spanish went from beginner to conversational in just 8 weeks. Maria is amazing and SkillBridge made booking a breeze.",
    name: "Priya S.",
    role: "Marketing Manager",
    bg: "#ffedd5",
    emoji: "👩‍💼",
  },
  {
    stars: "★★★★★",
    quote: "As a parent, I love being able to see tutor ratings and reviews. My daughter's math grades improved dramatically.",
    name: "David K.",
    role: "Parent",
    bg: "#fef9c3",
    emoji: "👨‍👧",
  },
];

const TRUST_ITEMS = [
  "No subscription required",
  "Book in 60 seconds",
  "Instant confirmation",
];

const MARQUEE_SUBJECTS = [
  "Mathematics", "Programming", "Languages", "Science", "Music",
  "Design", "Business", "History", "Chemistry", "Physics",
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Global styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'Lexend', sans-serif;
          background: #faf8f5;
          color: #1a1a1a;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Design tokens ── */
        :root {
          --orange:        #ea580c;
          --orange-dark:   #c2410c;
          --orange-pale:   #fff7ed;
          --orange-border: #fed7aa;
          --bg:            #faf8f5;
          --bg-white:      #ffffff;
          --border:        #ede8e0;
          --text:          #1a1a1a;
          --muted:         #6b7280;
          --subtle:        #9ca3af;
          --dark:          #1a1a1a;
        }

        a  { text-decoration: none; color: inherit; }
        button { cursor: pointer; font-family: 'Lexend', sans-serif; }

        /* ════════════════════════════════════════════
           HERO
        ════════════════════════════════════════════ */
        .hero {
          position: relative;
          background: var(--bg);
          padding: 88px 24px 80px;
          overflow: hidden;
          border-bottom: 1px solid var(--border);
        }
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 80% -5%,  rgba(234,88,12,.07) 0%, transparent 70%),
            radial-gradient(ellipse 45% 45% at  5% 95%,  rgba(251,146,60,.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-inner {
          position: relative;
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .hero { padding: 64px 20px 56px; }
          .hero-inner { grid-template-columns: 1fr; gap: 0; }
          .hero-illustration { display: none; }
        }
        @media (max-width: 600px) {
          .hero { padding: 48px 16px 44px; }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: var(--orange-pale);
          color: #c2410c;
          border: 1px solid var(--orange-border);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
        }
        .hero-badge-star { color: var(--orange); font-size: 12px; }

        .hero h1 {
          font-family: 'Lexend', sans-serif;
          font-size: clamp(36px, 5.5vw, 66px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -.015em;
          color: #0f0f0f;
          margin-bottom: 20px;
        }
        .hero h1 em { font-style: italic; color: var(--orange); }

        .hero-desc {
          font-size: clamp(15px, 2vw, 17px);
          color: var(--muted);
          line-height: 1.7;
          max-width: 460px;
          margin-bottom: 36px;
        }

        .hero-ctas {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        @media (max-width: 400px) {
          .hero-ctas { flex-direction: column; }
          .hero-ctas .btn { width: 100%; justify-content: center; }
        }

        .trust-row {
          display: flex;
          flex-wrap: wrap;
          gap: 16px 20px;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          color: var(--subtle);
          font-weight: 500;
        }
        .trust-check {
          width: 16px; height: 16px;
          background: var(--orange-pale);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--orange);
          font-size: 9px;
          flex-shrink: 0;
        }

        .hero-illustration {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* ════════════════════════════════════════════
           MARQUEE
        ════════════════════════════════════════════ */
        .marquee-wrap {
          overflow: hidden;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--bg-white);
          padding: 14px 0;
        }
        .marquee-track {
          display: flex;
          gap: 32px;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 500;
          color: var(--subtle);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .marquee-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--orange-border);
          flex-shrink: 0;
        }

        /* ════════════════════════════════════════════
           STATS BAND — with background video
        ════════════════════════════════════════════ */
        .stats-band {
          position: relative;
          padding: 56px 24px;
          overflow: hidden;
          background: var(--dark);
          isolation: isolate;
        }

        /* The video itself — muted, autoplay, looping */
        .stats-band-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: -2;
          pointer-events: none;
          /* Slight desaturate so it doesn't fight the content */
          filter: saturate(0.6) brightness(0.55);
        }

        /* Multi-layer overlay: dark + directional orange tint */
        .stats-band-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(
              135deg,
              rgba(10,10,10,.78)   0%,
              rgba(20,20,20,.65)  50%,
              rgba(194,65,12,.22) 100%
            );
          pointer-events: none;
        }

        /* Top-edge orange accent line */
        .stats-band-glow {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,
            transparent 0%,
            var(--orange) 30%,
            #fb923c 60%,
            transparent 100%
          );
          z-index: 1;
          pointer-events: none;
        }

        /* Bottom-edge subtle fade */
        .stats-band-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 40px;
          background: linear-gradient(to top, rgba(10,10,10,.45), transparent);
          z-index: 1;
          pointer-events: none;
        }

        .stats-inner {
          position: relative;
          z-index: 2;
          max-width: 1140px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 500px) {
          .stats-inner { grid-template-columns: 1fr; gap: 28px; }
        }

        /* Dividers between stat columns on desktop */
        @media (min-width: 501px) {
          .stat-item:not(:last-child) {
            border-right: 1px solid rgba(255,255,255,.08);
          }
        }

        .stat-item { text-align: center; padding: 0 16px; }

        .stat-icon-wrap {
          width: 42px; height: 42px;
          background: rgba(234,88,12,.16);
          border: 1px solid rgba(234,88,12,.3);
          border-radius: 13px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
          color: #fb923c;
          /* Frosted glass feel */
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .stat-value {
          font-size: clamp(26px, 4vw, 34px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -.02em;
          line-height: 1;
        }
        .stat-label {
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,.4);
          margin-top: 6px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        /* ════════════════════════════════════════════
           SHARED SECTION HELPERS
        ════════════════════════════════════════════ */
        .section     { padding: 80px 24px; background: var(--bg); }
        .section-alt { padding: 80px 24px; background: var(--bg-white); }

        @media (max-width: 768px) {
          .section, .section-alt { padding: 60px 20px; }
        }
        @media (max-width: 480px) {
          .section, .section-alt { padding: 48px 16px; }
        }

        .section-inner { max-width: 1140px; margin: 0 auto; }

        .section-head  { text-align: center; margin-bottom: 44px; }
        @media (max-width: 600px) { .section-head { margin-bottom: 32px; } }

        .section-title {
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 800;
          letter-spacing: -.015em;
          color: #0f0f0f;
          margin-bottom: 12px;
        }
        .section-sub {
          font-size: clamp(14px, 2vw, 16px);
          color: var(--subtle);
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ════════════════════════════════════════════
           CATEGORIES
        ════════════════════════════════════════════ */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) { .cat-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; } }
        @media (max-width: 600px) { .cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; } }

        .cat-card {
          background: var(--bg-white);
          border: 1.5px solid var(--border);
          border-radius: 16px;
          padding: 22px 12px;
          text-align: center;
          display: block;
          transition: all .2s ease;
        }
        .cat-card:hover {
          border-color: var(--orange);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(234,88,12,.1);
        }
        @media (max-width: 480px) {
          .cat-card { padding: 16px 10px; border-radius: 12px; }
        }
        .cat-emoji { font-size: 26px; display: block; margin-bottom: 8px; }
        .cat-name  { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
        .cat-count { font-size: 11px; color: var(--subtle); }

        /* ════════════════════════════════════════════
           HOW IT WORKS
        ════════════════════════════════════════════ */
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 860px) { .hiw-grid { grid-template-columns: 1fr; gap: 16px; } }

        .hiw-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 28px;
          position: relative;
          overflow: hidden;
          transition: box-shadow .2s ease;
        }
        @media (max-width: 480px) { .hiw-card { padding: 24px 20px; } }
        .hiw-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,.07); }
        .hiw-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--orange), #fb923c);
          border-radius: 20px 20px 0 0;
        }
        .hiw-num {
          font-size: 56px;
          font-weight: 800;
          color: #ede8e0;
          line-height: 1;
          margin-bottom: 14px;
          letter-spacing: -.015em;
        }
        .hiw-icon-box {
          width: 40px; height: 40px;
          background: var(--orange-pale);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: var(--orange);
          margin-bottom: 14px;
        }
        .hiw-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f0f0f;
          margin-bottom: 10px;
        }
        .hiw-desc { font-size: 14px; color: var(--muted); line-height: 1.7; }

        /* ════════════════════════════════════════════
           TESTIMONIALS
        ════════════════════════════════════════════ */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        @media (max-width: 860px) { .testimonials-grid { grid-template-columns: 1fr; gap: 16px; } }
        @media (min-width: 600px) and (max-width: 860px) {
          .testimonials-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .testimonial-card {
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
        }
        .t-stars { color: var(--orange); font-size: 13px; margin-bottom: 12px; letter-spacing: 1px; }
        .t-quote {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.75;
          margin-bottom: 20px;
          font-style: italic;
          flex: 1;
        }
        .t-author { display: flex; align-items: center; gap: 10px; }
        .t-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          font-size: 16px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .t-name { font-size: 13px; font-weight: 600; color: #0f0f0f; }
        .t-role { font-size: 11px; color: var(--subtle); }

        /* ════════════════════════════════════════════
           CTA BANNER
        ════════════════════════════════════════════ */
        .cta-section { padding: 80px 24px; background: var(--bg); }
        @media (max-width: 768px) { .cta-section { padding: 60px 20px; } }
        @media (max-width: 480px) { .cta-section { padding: 48px 16px; } }

        .cta-box {
          max-width: 760px;
          margin: 0 auto;
          background: var(--dark);
          border-radius: 28px;
          padding: 64px 48px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        @media (max-width: 600px) {
          .cta-box { padding: 48px 24px; border-radius: 20px; }
        }
        @media (max-width: 400px) {
          .cta-box { padding: 40px 16px; }
        }
        .cta-box::before {
          content: '';
          position: absolute;
          top: -60px; right: -60px;
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(234,88,12,.26), transparent 70%);
          pointer-events: none;
        }
        .cta-box::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 220px; height: 220px;
          background: radial-gradient(circle, rgba(251,146,60,.18), transparent 70%);
          pointer-events: none;
        }
        .cta-title {
          position: relative;
          font-size: clamp(24px, 4vw, 42px);
          font-weight: 800;
          color: #fff;
          letter-spacing: -.015em;
          margin-bottom: 14px;
        }
        .cta-sub {
          position: relative;
          font-size: clamp(14px, 2vw, 16px);
          color: rgba(255,255,255,.45);
          max-width: 400px;
          margin: 0 auto 36px;
          line-height: 1.65;
        }
        .cta-btns {
          position: relative;
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 400px) {
          .cta-btns { flex-direction: column; align-items: stretch; }
          .cta-btns .btn { justify-content: center; }
        }

        /* ════════════════════════════════════════════
           BUTTONS
        ════════════════════════════════════════════ */
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 12px;
          padding: 13px 24px;
          font-size: 15px;
          font-weight: 600;
          border: none;
          transition: all .2s ease;
          white-space: nowrap;
          font-family: 'Lexend', sans-serif;
        }
        @media (max-width: 480px) {
          .btn { padding: 12px 20px; font-size: 14px; }
        }
        .btn-orange { background: var(--orange); color: #fff; }
        .btn-orange:hover {
          background: var(--orange-dark);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(234,88,12,.3);
        }
        .btn-outline {
          background: var(--bg-white);
          color: var(--text);
          border: 1.5px solid var(--border);
        }
        .btn-outline:hover {
          border-color: var(--orange);
          color: var(--orange);
          transform: translateY(-1px);
        }
        .btn-ghost {
          background: rgba(255,255,255,.1);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,.18);
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,.16);
          transform: translateY(-1px);
        }
      `}</style>

      {/* ── Layout shell ── */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-inner">

            {/* Left: copy */}
            <div>
              <div className="hero-badge">
                <span className="hero-badge-star">★</span>
                Trusted by 10,000+ learners worldwide
              </div>

              <h1>
                Learn Anything,{" "}
                <em>From Anyone</em>
              </h1>

              <p className="hero-desc">
                Connect with expert tutors in 50+ subjects. Book sessions instantly
                and take control of your learning journey.
              </p>

              <div className="hero-ctas">
                <Link href="/tutors" className="btn btn-orange">
                  Find a Tutor <ArrowRight size={16} />
                </Link>
                <Link href="/register?role=TUTOR" className="btn btn-outline">
                  Become a Tutor
                </Link>
              </div>

              <div className="trust-row">
                {TRUST_ITEMS.map((t) => (
                  <div key={t} className="trust-item">
                    <div className="trust-check">✓</div>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: animated illustration */}
            <div className="hero-illustration">
              <HeroIllustration />
            </div>

          </div>
        </section>

        {/* ── MARQUEE ───────────────────────────────────────────────────────── */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            {[...MARQUEE_SUBJECTS, ...MARQUEE_SUBJECTS].map((s, i) => (
              <span key={i} className="marquee-item">
                {i % 2 === 1 && <span className="marquee-dot" />}
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* ── STATS BAND ────────────────────────────────────────────────────── */}
        <section className="stats-band">


          <video
            className="stats-band-video"
            src="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            /* Preload metadata only — avoids blocking page load */
            preload="metadata"
          />

          {/* Dark + orange gradient overlay */}
          <div className="stats-band-overlay" aria-hidden="true" />

          {/* Top orange accent line */}
          <div className="stats-band-glow" aria-hidden="true" />

          {/* Bottom fade */}
          <div className="stats-band-fade" aria-hidden="true" />

          {/* Stats content */}
          <div className="stats-inner">
            {FEATURED_STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="stat-item">
                <div className="stat-icon-wrap">
                  <Icon size={18} />
                </div>
                <p className="stat-value">{value}</p>
                <p className="stat-label">{label}</p>
              </div>
            ))}
          </div>

        </section>

        {/* ── CATEGORIES ────────────────────────────────────────────────────── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <h2 className="section-title">Browse by Subject</h2>
              <p className="section-sub">
                From mathematics to music, find an expert in any field you want to master.
              </p>
            </div>
            <div className="cat-grid">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/tutors?category=${cat.name}`}
                  className="cat-card"
                >
                  <span className="cat-emoji">{cat.icon}</span>
                  <div className="cat-name">{cat.name}</div>
                  <div className="cat-count">{cat.count}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="section-alt">
          <div className="section-inner">
            <div className="section-head">
              <h2 className="section-title">How SkillBridge Works</h2>
              <p className="section-sub">Three simple steps to start learning</p>
            </div>
            <div className="hiw-grid">
              {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
                <div key={step} className="hiw-card">
                  <div className="hiw-num">{step}</div>
                  <div className="hiw-icon-box">
                    <Icon size={20} />
                  </div>
                  <div className="hiw-title">{title}</div>
                  <p className="hiw-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
        <section className="section">
          <div className="section-inner">
            <div className="section-head">
              <h2 className="section-title">What Learners Say</h2>
              <p className="section-sub">
                Real results from real students — see why thousands trust SkillBridge.
              </p>
            </div>
            <div className="testimonials-grid">
              {TESTIMONIALS.map(({ stars, quote, name, role, bg, emoji }) => (
                <div key={name} className="testimonial-card">
                  <div className="t-stars">{stars}</div>
                  <p className="t-quote">"{quote}"</p>
                  <div className="t-author">
                    <div className="t-avatar" style={{ background: bg }}>{emoji}</div>
                    <div>
                      <div className="t-name">{name}</div>
                      <div className="t-role">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VIDEO SECTION ─────────────────────────────────────────────── */}
        <VideoSection />

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section className="cta-section">
          <div className="cta-box">
            <h2 className="cta-title">Ready to Start Learning?</h2>
            <p className="cta-sub">
              Join thousands of learners who have already found their perfect tutor on SkillBridge.
            </p>
            <div className="cta-btns">
              <Link href="/register" className="btn btn-orange">
                Get Started Free
              </Link>
              <Link href="/tutors" className="btn btn-ghost">
                Browse Tutors
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
