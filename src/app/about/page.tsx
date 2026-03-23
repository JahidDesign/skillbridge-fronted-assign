import Head from "next/head";
import Link from "next/link";
import {
  GraduationCap, Users, Star, BookOpen,
  Target, Heart, Zap, ArrowRight,
  CheckCircle2, Quote, Play, Shield,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const STATS = [
  { label: "Expert Tutors",    value: "50+",    icon: Users,    cls: "ab-icon--indigo"  },
  { label: "Subjects Covered", value: "8",      icon: BookOpen, cls: "ab-icon--sky"     },
  { label: "Avg Rating",       value: "4.8★",   icon: Star,     cls: "ab-icon--amber"   },
  { label: "Sessions Booked",  value: "1,200+", icon: Target,   cls: "ab-icon--emerald" },
];

const VALUES = [
  { icon: Heart,  title: "Student-First",  desc: "Every decision we make puts the learner at the center. Your growth is our mission.",    cls: "ab-val--rose"   },
  { icon: Star,   title: "Quality Tutors", desc: "Every tutor is verified and reviewed. We only work with the best educators.",            cls: "ab-val--amber"  },
  { icon: Zap,    title: "Book Instantly", desc: "No waiting, no back-and-forth. Find your tutor and book a session in minutes.",          cls: "ab-val--violet" },
  { icon: Target, title: "Any Subject",    desc: "From Calculus to Guitar, from Spanish to UI/UX — we cover it all.",                     cls: "ab-val--sky"    },
];

const TEAM = [
  { name: "Sarah Chen",   role: "Mathematics", avatar: "https://i.pravatar.cc/120?img=47", rating: "4.9", sessions: 312 },
  { name: "James Wright", role: "Programming", avatar: "https://i.pravatar.cc/120?img=11", rating: "4.8", sessions: 278 },
  { name: "Maria Garcia", role: "Languages",   avatar: "https://i.pravatar.cc/120?img=5",  rating: "5.0", sessions: 421 },
  { name: "David Kim",    role: "Music",       avatar: "https://i.pravatar.cc/120?img=68", rating: "4.9", sessions: 195 },
];

const MISSION_BULLETS = [
  "Every tutor is background-checked and interview-verified",
  "Live ratings and reviews after every session",
  "Flexible scheduling — book same-day if needed",
  "Money-back guarantee on your first session",
];

const TESTIMONIALS = [
  {
    text: "I went from failing algebra to acing my finals in just 6 weeks. My tutor made everything click in a way my teacher never could.",
    name: "Aisha Rahman", sub: "Grade 11 · Mathematics", avatar: "https://i.pravatar.cc/80?img=32",
  },
  {
    text: "Booked my first Python session on a Thursday, landed my first freelance job the following month. SkillBridge changed my career.",
    name: "Tom Eriksen",  sub: "Adult learner · Programming", avatar: "https://i.pravatar.cc/80?img=57",
  },
  {
    text: "My daughter's Spanish went from D to A in one semester. The tutor is patient, engaging, and genuinely passionate about teaching.",
    name: "Linda Okafor", sub: "Parent · Languages", avatar: "https://i.pravatar.cc/80?img=25",
  },
];

/*
  ─────────────────────────────────────────────────────────────────
  CTA VIDEO — public CDN links (no download / hosting needed)

  Using Mixkit free stock videos (CC0 license, no attribution):
    Primary  : students studying at a desk
    Fallback : classroom / learning scene

  These URLs stream directly from Mixkit's CDN. Works in all
  browsers including Safari (MP4 source).
  ─────────────────────────────────────────────────────────────────
*/
const CTA_VIDEO_MP4_PRIMARY  = "https://assets.mixkit.co/videos/preview/mixkit-students-studying-in-a-library-4k-40090-large.mp4";
const CTA_VIDEO_MP4_FALLBACK = "https://assets.mixkit.co/videos/preview/mixkit-girl-studying-on-her-laptop-at-home-18675-large.mp4";
const CTA_POSTER             = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=720&fit=crop&q=80";

/* ─────────────────────────────────────────
   STYLES  (fully scoped under .ab-root)
───────────────────────────────────────── */
const STYLES = `
  .ab-root {
    --ab-body:    'Plus Jakarta Sans', system-ui, sans-serif;
    --ab-display: 'Fraunces', Georgia, serif;
    --ab-brand:        #f97316;
    --ab-brand-deep:   #ea580c;
    --ab-brand-light:  #fff7ed;
    --ab-brand-border: #fed7aa;
    --ab-ink-1: #0c0a09;
    --ab-ink-2: #44403c;
    --ab-ink-3: #78716c;
    --ab-ink-4: #a8a29e;
    --ab-bg-1:  #ffffff;
    --ab-bg-2:  #faf9f7;
    --ab-bg-3:  #f5f3ef;
    --ab-line:  #e8e4de;
    --ab-line-2:#d6d0c8;
    --ab-r-sm: 8px;
    --ab-r-md: 14px;
    --ab-r-lg: 22px;
    --ab-sh-sm:    0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
    --ab-sh-md:    0 4px 16px rgba(0,0,0,.08), 0 1px 4px rgba(0,0,0,.04);
    --ab-sh-lg:    0 20px 48px rgba(0,0,0,.10), 0 4px 12px rgba(0,0,0,.06);
    --ab-sh-brand: 0 8px 28px rgba(249,115,22,.28);
    --ab-max: 1160px;
    --ab-px:  clamp(20px, 5vw, 48px);
    --ab-py:  clamp(60px, 8vw, 104px);
  }

  .ab-root, .ab-root * { box-sizing: border-box; }
  .ab-root {
    font-family: var(--ab-body);
    color: var(--ab-ink-1);
    background: var(--ab-bg-1);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .ab-inner {
    max-width: var(--ab-max);
    margin: 0 auto;
    padding-left: var(--ab-px);
    padding-right: var(--ab-px);
  }
  .ab-py { padding-top: var(--ab-py); padding-bottom: var(--ab-py); }

  /* ── ATOMS ── */
  .ab-pill {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--ab-brand-light); color: var(--ab-brand-deep);
    border: 1px solid var(--ab-brand-border); border-radius: 100px;
    padding: 4px 13px; font-size: 11px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase; margin-bottom: 14px;
  }

  .ab-h1 {
    font-family: var(--ab-display);
    font-size: clamp(30px, 4.5vw, 52px);
    font-weight: 900; line-height: 1.08; letter-spacing: -.022em;
    color: var(--ab-ink-1);
  }
  .ab-h1 em { font-style: italic; color: var(--ab-brand); }

  .ab-h2 {
    font-family: var(--ab-display);
    font-size: clamp(24px, 3.5vw, 40px);
    font-weight: 700; line-height: 1.12; letter-spacing: -.018em;
    color: var(--ab-ink-1); margin-bottom: 10px;
  }
  .ab-h2 em { font-style: italic; color: var(--ab-brand); }

  .ab-sec-head { text-align: center; margin-bottom: clamp(32px, 5vw, 56px); }
  .ab-sec-sub  { font-size: 15px; color: var(--ab-ink-4); margin-top: 6px; }

  /* ── BUTTONS ── */
  .ab-btn, .ab-btn-ghost, .ab-btn-white, .ab-btn-outline-white {
    display: inline-flex; align-items: center; gap: 8px;
    border-radius: var(--ab-r-md); padding: 12px 22px;
    font-family: var(--ab-body); font-size: 14px; font-weight: 700;
    cursor: pointer; text-decoration: none; border: none;
    transition: background .18s, transform .18s, box-shadow .18s, border-color .18s, color .18s;
    white-space: nowrap;
  }
  .ab-btn { background: var(--ab-brand); color: #fff; box-shadow: var(--ab-sh-brand); }
  .ab-btn:hover { background: var(--ab-brand-deep); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(249,115,22,.38); }

  .ab-btn-ghost { background: var(--ab-bg-1); color: var(--ab-ink-2); border: 1.5px solid var(--ab-line-2); box-shadow: var(--ab-sh-sm); }
  .ab-btn-ghost:hover { border-color: var(--ab-brand); color: var(--ab-brand-deep); transform: translateY(-2px); }

  .ab-btn-white { background: #fff; color: var(--ab-ink-1); box-shadow: 0 4px 20px rgba(0,0,0,.18); }
  .ab-btn-white:hover { background: #f5f3ef; transform: translateY(-2px); box-shadow: 0 10px 32px rgba(0,0,0,.28); }

  .ab-btn-outline-white {
    background: rgba(255,255,255,.1); color: #fff;
    border: 1.5px solid rgba(255,255,255,.28); backdrop-filter: blur(8px);
  }
  .ab-btn-outline-white:hover { background: rgba(255,255,255,.2); border-color: rgba(255,255,255,.5); transform: translateY(-2px); }

  /* ══════════════════════════════════════
     HERO — compact two-column
  ══════════════════════════════════════ */
  .ab-hero {
    position: relative; overflow: hidden;
    background: var(--ab-bg-2);
    border-bottom: 1px solid var(--ab-line);
    padding: clamp(48px, 7vw, 80px) var(--ab-px) clamp(44px, 6vw, 72px);
  }
  .ab-hero-wash {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 60% 100% at 0% 50%,  rgba(249,115,22,.08) 0%, transparent 55%),
      radial-gradient(ellipse 50% 80%  at 100% 50%, rgba(251,191,36,.07) 0%, transparent 55%);
  }
  .ab-hero-accent {
    position: absolute; bottom: 0; left: 0; right: 0; height: 2px; pointer-events: none;
    background: linear-gradient(to right, transparent, var(--ab-brand-border) 30%, var(--ab-brand-border) 70%, transparent);
    opacity: .6;
  }
  .ab-hero-inner {
    position: relative; z-index: 1;
    max-width: var(--ab-max); margin: 0 auto;
    display: flex; align-items: center;
    gap: clamp(32px, 6vw, 72px);
  }
  @media (max-width: 768px) { .ab-hero-inner { flex-direction: column; text-align: center; } }

  .ab-hero-text { flex: 1; min-width: 0; }
  .ab-hero-desc {
    font-size: clamp(14px, 1.6vw, 16.5px); line-height: 1.72;
    color: var(--ab-ink-3); margin: 14px 0 26px; max-width: 520px;
  }
  @media (max-width: 768px) { .ab-hero-desc { margin-left: auto; margin-right: auto; } }
  .ab-hero-btns { display: flex; flex-wrap: wrap; gap: 10px; }
  @media (max-width: 768px) { .ab-hero-btns { justify-content: center; } }

  .ab-hero-aside {
    flex-shrink: 0; display: flex; flex-direction: column; gap: 12px;
    width: clamp(200px, 22vw, 256px);
  }
  @media (max-width: 768px) {
    .ab-hero-aside { flex-direction: row; flex-wrap: wrap; width: 100%; justify-content: center; }
  }
  .ab-hero-stat {
    display: flex; align-items: center; gap: 12px;
    background: var(--ab-bg-1); border: 1.5px solid var(--ab-line);
    border-radius: var(--ab-r-md); padding: 12px 16px;
    box-shadow: var(--ab-sh-sm);
    transition: box-shadow .2s, transform .2s;
  }
  .ab-hero-stat:hover { box-shadow: var(--ab-sh-md); transform: translateY(-2px); }
  .ab-hero-stat-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 36px; height: 36px; border-radius: var(--ab-r-sm); flex-shrink: 0;
  }
  .ab-hero-stat-val {
    font-family: var(--ab-display); font-size: 20px; font-weight: 900; line-height: 1;
    color: var(--ab-ink-1); margin-bottom: 2px;
  }
  .ab-hero-stat-lbl { font-size: 11px; font-weight: 600; color: var(--ab-ink-4); text-transform: uppercase; letter-spacing: .05em; }

  /* ══════════════════════════════════════
     STATS BAR
  ══════════════════════════════════════ */
  .ab-stats-wrap { background: var(--ab-bg-1); border-bottom: 1px solid var(--ab-line); }
  .ab-stats-grid { display: grid; grid-template-columns: repeat(4,1fr); }
  @media (max-width: 640px) { .ab-stats-grid { grid-template-columns: repeat(2,1fr); } }
  .ab-stat-cell {
    padding: 28px 20px; text-align: center;
    border-right: 1px solid var(--ab-line); transition: background .2s; cursor: default;
  }
  .ab-stat-cell:last-child { border-right: none; }
  .ab-stat-cell:hover { background: var(--ab-bg-2); }
  @media (max-width: 640px) {
    .ab-stat-cell:nth-child(2) { border-right: none; }
    .ab-stat-cell:nth-child(3) { border-right: 1px solid var(--ab-line); }
    .ab-stat-cell:nth-child(1), .ab-stat-cell:nth-child(2) { border-bottom: 1px solid var(--ab-line); }
  }
  .ab-stat-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: var(--ab-r-sm); margin: 0 auto 12px; transition: transform .2s;
  }
  .ab-stat-cell:hover .ab-stat-icon { transform: scale(1.1) rotate(-4deg); }
  .ab-icon--indigo  { background: #eef2ff; color: #4f46e5; }
  .ab-icon--sky     { background: #f0f9ff; color: #0284c7; }
  .ab-icon--amber   { background: #fffbeb; color: #d97706; }
  .ab-icon--emerald { background: #f0fdf4; color: #059669; }
  .ab-stat-val { font-family: var(--ab-display); font-size: clamp(26px,3.2vw,36px); font-weight: 900; color: var(--ab-ink-1); line-height: 1; margin-bottom: 4px; }
  .ab-stat-lbl { font-size: 12px; font-weight: 500; color: var(--ab-ink-4); text-transform: uppercase; letter-spacing: .05em; }

  /* ══════════════════════════════════════
     MISSION
  ══════════════════════════════════════ */
  .ab-mission-wrap { background: var(--ab-bg-1); }
  .ab-mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(36px,7vw,84px); align-items: center; }
  @media (max-width: 860px) { .ab-mission-grid { grid-template-columns: 1fr; } }
  .ab-mission-p { font-size: 15.5px; line-height: 1.8; color: var(--ab-ink-3); margin-bottom: 14px; }
  .ab-bullets { list-style: none; margin: 22px 0 30px; display: flex; flex-direction: column; gap: 11px; }
  .ab-bullet { display: flex; align-items: flex-start; gap: 10px; font-size: 14.5px; font-weight: 500; color: var(--ab-ink-2); }
  .ab-bullet svg { color: var(--ab-brand); flex-shrink: 0; margin-top: 2px; }
  .ab-mosaic { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .ab-mosaic img { width: 100%; border-radius: var(--ab-r-lg); object-fit: cover; display: block; box-shadow: var(--ab-sh-md); transition: transform .35s ease, box-shadow .35s ease; }
  .ab-mosaic img:hover { transform: scale(1.03) translateY(-4px); box-shadow: var(--ab-sh-lg); }
  .ab-mosaic img:nth-child(1) { height: clamp(130px,16vw,185px); }
  .ab-mosaic img:nth-child(2) { height: clamp(130px,16vw,185px); margin-top: 26px; }
  .ab-mosaic img:nth-child(3) { height: clamp(130px,16vw,185px); margin-top: -26px; }
  .ab-mosaic img:nth-child(4) { height: clamp(130px,16vw,185px); }

  /* ══════════════════════════════════════
     VALUES
  ══════════════════════════════════════ */
  .ab-values-wrap { background: var(--ab-bg-2); border-top: 1px solid var(--ab-line); border-bottom: 1px solid var(--ab-line); }
  .ab-val-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
  @media (max-width: 900px) { .ab-val-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 480px) { .ab-val-grid { grid-template-columns: 1fr; } }
  .ab-val-card {
    background: var(--ab-bg-1); border: 1.5px solid var(--ab-line); border-radius: var(--ab-r-lg);
    padding: 26px 22px 28px; position: relative; overflow: hidden;
    transition: box-shadow .25s, transform .25s, border-color .25s;
  }
  .ab-val-card::after { content:''; position:absolute; top:0; left:0; right:0; height:3px; opacity:0; transition:opacity .25s; border-radius:3px 3px 0 0; }
  .ab-val-card:hover { box-shadow: var(--ab-sh-lg); transform: translateY(-5px); border-color: var(--ab-line-2); }
  .ab-val-card:hover::after { opacity: 1; }
  .ab-val--rose   .ab-val-icon-wrap { background: #fff1f2; color: #e11d48; }
  .ab-val--rose::after              { background: #e11d48; }
  .ab-val--amber  .ab-val-icon-wrap { background: #fffbeb; color: #d97706; }
  .ab-val--amber::after             { background: #d97706; }
  .ab-val--violet .ab-val-icon-wrap { background: #f5f3ff; color: #7c3aed; }
  .ab-val--violet::after            { background: #7c3aed; }
  .ab-val--sky    .ab-val-icon-wrap { background: #f0f9ff; color: #0284c7; }
  .ab-val--sky::after               { background: #0284c7; }
  .ab-val-icon-wrap { display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: var(--ab-r-sm); margin-bottom: 16px; transition: transform .22s; }
  .ab-val-card:hover .ab-val-icon-wrap { transform: scale(1.12) rotate(-5deg); }
  .ab-val-title { font-size: 15px; font-weight: 700; color: var(--ab-ink-1); margin-bottom: 8px; letter-spacing: -.01em; }
  .ab-val-desc  { font-size: 13.5px; line-height: 1.7; color: var(--ab-ink-3); }

  /* ══════════════════════════════════════
     TEAM
  ══════════════════════════════════════ */
  .ab-team-wrap { background: var(--ab-bg-1); }
  .ab-team-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; margin-bottom: 44px; }
  @media (max-width: 860px) { .ab-team-grid { grid-template-columns: repeat(2,1fr); } }
  @media (max-width: 420px) { .ab-team-grid { gap: 12px; } }
  .ab-tutor-card { background: var(--ab-bg-1); border: 1.5px solid var(--ab-line); border-radius: var(--ab-r-lg); padding: 24px 18px 20px; text-align: center; transition: box-shadow .25s, transform .25s; cursor: default; }
  .ab-tutor-card:hover { box-shadow: var(--ab-sh-lg); transform: translateY(-5px); }
  .ab-avatar-wrap { position: relative; display: inline-block; margin-bottom: 14px; }
  .ab-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; display: block; border: 3px solid var(--ab-bg-1); box-shadow: 0 0 0 2px var(--ab-line), var(--ab-sh-md); }
  .ab-avatar-dot { position: absolute; bottom: 3px; right: 3px; width: 16px; height: 16px; background: #10b981; border: 2.5px solid var(--ab-bg-1); border-radius: 50%; }
  .ab-tutor-name { font-size: 14px; font-weight: 700; color: var(--ab-ink-1); margin-bottom: 3px; }
  .ab-tutor-role { font-size: 12px; color: var(--ab-ink-4); font-weight: 500; margin-bottom: 16px; }
  .ab-tutor-meta { display: flex; align-items: center; justify-content: center; gap: 14px; padding-top: 14px; border-top: 1px solid var(--ab-line); }
  .ab-tutor-meta-col { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .ab-tutor-meta-val { font-size: 13px; font-weight: 700; color: var(--ab-ink-1); }
  .ab-tutor-meta-key { font-size: 10px; font-weight: 600; color: var(--ab-ink-4); text-transform: uppercase; letter-spacing: .06em; }
  .ab-tutor-meta-sep { width: 1px; height: 28px; background: var(--ab-line); }
  .ab-team-cta { text-align: center; }

  /* ══════════════════════════════════════
     TESTIMONIALS
  ══════════════════════════════════════ */
  .ab-testi-wrap { background: var(--ab-bg-3); border-top: 1px solid var(--ab-line); border-bottom: 1px solid var(--ab-line); }
  .ab-testi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
  @media (max-width: 820px) { .ab-testi-grid { grid-template-columns: 1fr; max-width: 520px; margin: 0 auto; } }
  .ab-testi-card { background: var(--ab-bg-1); border: 1.5px solid var(--ab-line); border-radius: var(--ab-r-lg); padding: 26px 24px; display: flex; flex-direction: column; transition: box-shadow .25s, transform .25s; }
  .ab-testi-card:hover { box-shadow: var(--ab-sh-md); transform: translateY(-3px); }
  .ab-testi-stars { display: flex; gap: 3px; color: #f59e0b; margin-bottom: 12px; }
  .ab-testi-icon  { color: var(--ab-brand); margin-bottom: 12px; }
  .ab-testi-text  { font-size: 14.5px; line-height: 1.75; color: var(--ab-ink-2); font-style: italic; flex: 1; margin-bottom: 20px; }
  .ab-testi-author { display: flex; align-items: center; gap: 10px; padding-top: 16px; border-top: 1px solid var(--ab-line); }
  .ab-testi-av   { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid var(--ab-line); }
  .ab-testi-name { font-size: 13px; font-weight: 700; color: var(--ab-ink-1); margin-bottom: 2px; }
  .ab-testi-sub  { font-size: 11.5px; color: var(--ab-ink-4); }

  /* ══════════════════════════════════════
     CTA — VIDEO BACKGROUND
  ══════════════════════════════════════ */
  .ab-cta-wrap {
    position: relative; overflow: hidden;
    border-top: 1px solid var(--ab-line); color: #fff;
    min-height: 580px; display: flex; align-items: center;
  }

  /* Video fills the section completely */
  .ab-cta-video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    z-index: 0;
  }

  /* Dark gradient overlay — keeps text readable over ANY video */
  .ab-cta-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(
      135deg,
      rgba(10,8,7,.92) 0%,
      rgba(28,10,0,.80) 50%,
      rgba(10,8,7,.88) 100%
    );
  }
  /* Brand colour wash on top */
  .ab-cta-overlay::after {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 72% at 60% 52%, rgba(249,115,22,.22) 0%, transparent 64%);
  }

  /* Decorative glow orbs */
  .ab-cta-orb { position: absolute; z-index: 2; border-radius: 50%; pointer-events: none; }
  .ab-cta-orb-1 {
    width: 520px; height: 520px; top: -160px; left: -140px;
    background: radial-gradient(circle, rgba(249,115,22,.16) 0%, transparent 70%);
  }
  .ab-cta-orb-2 {
    width: 400px; height: 400px; bottom: -120px; right: -100px;
    background: radial-gradient(circle, rgba(251,191,36,.13) 0%, transparent 70%);
  }

  /* Content */
  .ab-cta-inner {
    position: relative; z-index: 3; width: 100%;
    padding: clamp(72px, 10vw, 120px) var(--ab-px);
    text-align: center;
    max-width: var(--ab-max); margin: 0 auto;
  }

  /* Live pulse badge */
  .ab-cta-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,.12); color: rgba(255,255,255,.92);
    border: 1px solid rgba(255,255,255,.22); border-radius: 100px;
    padding: 6px 16px; font-size: 11px; font-weight: 700;
    letter-spacing: .07em; text-transform: uppercase;
    margin-bottom: 22px; backdrop-filter: blur(10px);
  }
  .ab-cta-dot {
    width: 7px; height: 7px; border-radius: 50%; background: #34d399;
    animation: ab-pulse 2.2s ease-in-out infinite;
  }
  @keyframes ab-pulse {
    0%,100% { opacity: 1;   transform: scale(1);   }
    50%      { opacity: .5; transform: scale(.72); }
  }

  .ab-cta-title {
    font-family: var(--ab-display);
    font-size: clamp(34px, 6vw, 66px);
    font-weight: 900; line-height: 1.05; letter-spacing: -.025em;
    color: #fff; margin-bottom: 18px;
  }
  .ab-cta-title em { font-style: italic; color: #fb923c; }

  .ab-cta-desc {
    font-size: clamp(15px, 1.8vw, 18px); line-height: 1.72;
    color: rgba(255,255,255,.62); max-width: 480px; margin: 0 auto 38px;
  }

  .ab-cta-btns {
    display: flex; flex-wrap: wrap;
    align-items: center; justify-content: center;
    gap: 12px; margin-bottom: 48px;
  }

  /* 4-item trust row */
  .ab-cta-trust {
    display: flex; flex-wrap: wrap;
    align-items: center; justify-content: center;
    gap: 8px 28px;
    padding-top: 28px;
    border-top: 1px solid rgba(255,255,255,.13);
  }
  .ab-cta-trust-item {
    display: flex; align-items: center; gap: 7px;
    font-size: 13px; font-weight: 500; color: rgba(255,255,255,.60);
  }
  .ab-cta-trust-item svg { flex-shrink: 0; }
  .ab-cta-trust-sep { width: 1px; height: 14px; background: rgba(255,255,255,.2); }

  @media (max-width: 500px) {
    .ab-cta-trust-sep  { display: none; }
    .ab-cta-trust      { gap: 10px 14px; }
  }
  @media (max-width: 480px) {
    .ab-hero-btns, .ab-cta-btns { flex-direction: column; align-items: stretch; }
    .ab-btn, .ab-btn-ghost, .ab-btn-white, .ab-btn-outline-white { justify-content: center; }
  }
`;

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,700;1,9..144,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style>{STYLES}</style>

      <div className="ab-root">
        <Navbar />

        {/* ══════════ HERO — compact two-column ══════════ */}
        <section className="ab-hero">
          <div className="ab-hero-wash" />
          <div className="ab-hero-accent" />
          <div className="ab-hero-inner">
            <div className="ab-hero-text">
              <div className="ab-pill"><GraduationCap size={11} /> About SkillBridge</div>
              <h1 className="ab-h1">Learning,&nbsp;<em>Reimagined.</em></h1>
              <p className="ab-hero-desc">
                SkillBridge connects passionate learners with world-class tutors.
                Accessible, personal, and flexible education — for everyone, everywhere.
              </p>
              <div className="ab-hero-btns">
                <Link href="/tutors"   className="ab-btn">Find a Tutor <ArrowRight size={14} /></Link>
                <Link href="/register" className="ab-btn-ghost">Become a Tutor</Link>
              </div>
            </div>
            <div className="ab-hero-aside">
              {STATS.map(({ label, value, icon: Icon, cls }) => (
                <div key={label} className="ab-hero-stat">
                  <div className={`ab-hero-stat-icon ${cls}`}><Icon size={16} /></div>
                  <div>
                    <div className="ab-hero-stat-val">{value}</div>
                    <div className="ab-hero-stat-lbl">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ STATS BAR ══════════ */}
        <section className="ab-stats-wrap">
          <div className="ab-inner">
            <div className="ab-stats-grid">
              {STATS.map(({ label, value, icon: Icon, cls }) => (
                <div key={label} className="ab-stat-cell">
                  <div className={`ab-stat-icon ${cls}`}><Icon size={17} /></div>
                  <p className="ab-stat-val">{value}</p>
                  <p className="ab-stat-lbl">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ MISSION ══════════ */}
        <section className="ab-mission-wrap ab-py">
          <div className="ab-inner">
            <div className="ab-mission-grid">
              <div>
                <div className="ab-pill"><BookOpen size={11} /> Why We Exist</div>
                <h2 className="ab-h2">Our <em>Mission</em></h2>
                <p className="ab-mission-p">
                  We started SkillBridge with a simple belief — everyone deserves access to a great teacher.
                  Whether you're struggling with algebra, learning a new language, or picking up the guitar,
                  the right tutor changes everything.
                </p>
                <p className="ab-mission-p">
                  Our platform makes it effortless to find, vet, and book expert tutors across every subject
                  imaginable — with verified reviews and same-day availability.
                </p>
                <ul className="ab-bullets">
                  {MISSION_BULLETS.map((b) => (
                    <li key={b} className="ab-bullet"><CheckCircle2 size={15} /> {b}</li>
                  ))}
                </ul>
                <Link href="/tutors" className="ab-btn">Browse All Tutors <ArrowRight size={14} /></Link>
              </div>
              <div className="ab-mosaic">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=420&h=270&fit=crop" alt="Students collaborating" />
                <img src="https://images.unsplash.com/photo-1509228468518-180dd4864904?w=420&h=270&fit=crop" alt="Mathematics"            />
                <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=420&h=270&fit=crop" alt="Programming"             />
                <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=420&h=270&fit=crop" alt="Music lesson"            />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ VALUES ══════════ */}
        <section className="ab-values-wrap ab-py">
          <div className="ab-inner">
            <div className="ab-sec-head">
              <div className="ab-pill"><Heart size={11} /> What We Stand For</div>
              <h2 className="ab-h2">Our Core Values</h2>
              <p className="ab-sec-sub">The principles that guide every decision we make</p>
            </div>
            <div className="ab-val-grid">
              {VALUES.map(({ icon: Icon, title, desc, cls }) => (
                <div key={title} className={`ab-val-card ${cls}`}>
                  <div className="ab-val-icon-wrap"><Icon size={20} /></div>
                  <p className="ab-val-title">{title}</p>
                  <p className="ab-val-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ TEAM ══════════ */}
        <section className="ab-team-wrap ab-py">
          <div className="ab-inner">
            <div className="ab-sec-head">
              <div className="ab-pill"><Users size={11} /> The Educators</div>
              <h2 className="ab-h2">Meet Our Tutors</h2>
              <p className="ab-sec-sub">World-class educators, ready to help you succeed</p>
            </div>
            <div className="ab-team-grid">
              {TEAM.map(({ name, role, avatar, rating, sessions }) => (
                <div key={name} className="ab-tutor-card">
                  <div className="ab-avatar-wrap">
                    <img src={avatar} alt={name} className="ab-avatar" />
                    <div className="ab-avatar-dot" />
                  </div>
                  <p className="ab-tutor-name">{name}</p>
                  <p className="ab-tutor-role">{role} Tutor</p>
                  <div className="ab-tutor-meta">
                    <div className="ab-tutor-meta-col">
                      <span className="ab-tutor-meta-val">⭐ {rating}</span>
                      <span className="ab-tutor-meta-key">Rating</span>
                    </div>
                    <div className="ab-tutor-meta-sep" />
                    <div className="ab-tutor-meta-col">
                      <span className="ab-tutor-meta-val">{sessions}</span>
                      <span className="ab-tutor-meta-key">Sessions</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="ab-team-cta">
              <Link href="/tutors" className="ab-btn">View All Tutors <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section className="ab-testi-wrap ab-py">
          <div className="ab-inner">
            <div className="ab-sec-head">
              <div className="ab-pill"><Quote size={11} /> Student Stories</div>
              <h2 className="ab-h2">What Learners Say</h2>
              <p className="ab-sec-sub">Real results from real students around the world</p>
            </div>
            <div className="ab-testi-grid">
              {TESTIMONIALS.map(({ text, name, sub, avatar }) => (
                <div key={name} className="ab-testi-card">
                  <div className="ab-testi-stars">
                    {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" />)}
                  </div>
                  <Quote size={22} className="ab-testi-icon" />
                  <p className="ab-testi-text">{text}</p>
                  <div className="ab-testi-author">
                    <img src={avatar} alt={name} className="ab-testi-av" />
                    <div>
                      <p className="ab-testi-name">{name}</p>
                      <p className="ab-testi-sub">{sub}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CTA — LIVE VIDEO BACKGROUND
            Source: Mixkit.co (CC0 — free, no attribution needed)
            Streams directly from their CDN, no hosting required.
        ══════════════════════════════════════ */}
        <section className="ab-cta-wrap">

          {/*
            VIDEO ELEMENT
            ─────────────────────────────────────
            autoPlay  — starts playing immediately
            muted     — required for autoPlay to work in all browsers
            loop      — repeats seamlessly
            playsInline — prevents iOS Safari from going fullscreen

            Two <source> tags pointing to public Mixkit CDN MP4 files.
            The browser picks the first one it can play.
            ─────────────────────────────────────
          */}
          <video
            className="ab-cta-video"
            autoPlay
            loop
            muted
            playsInline
            poster={CTA_POSTER}
          >
            <source src={CTA_VIDEO_MP4_PRIMARY}  type="video/mp4" />
            <source src={CTA_VIDEO_MP4_FALLBACK} type="video/mp4" />
          </video>

          {/* Overlay + glow orbs */}
          <div className="ab-cta-overlay" />
          <div className="ab-cta-orb ab-cta-orb-1" />
          <div className="ab-cta-orb ab-cta-orb-2" />

          {/* Content */}
          <div className="ab-cta-inner">

            {/* Animated live badge */}
            <div className="ab-cta-badge">
              <span className="ab-cta-dot" />
              1,200+ sessions booked this month
            </div>

            <h2 className="ab-cta-title">
              Ready to Start<br /><em>Learning?</em>
            </h2>

            <p className="ab-cta-desc">
              Join thousands of students already transforming their skills with SkillBridge tutors.
              Your first session is completely risk-free.
            </p>

            {/* CTA buttons */}
            <div className="ab-cta-btns">
              <Link href="/register" className="ab-btn-white">
                Get Started Free <ArrowRight size={15} />
              </Link>
              <Link href="/tutors" className="ab-btn-outline-white">
                Browse Tutors
              </Link>
            </div>

            {/* 4-item trust row */}
            <div className="ab-cta-trust">
              <span className="ab-cta-trust-item">
                <Star   size={13} color="#f59e0b" fill="#f59e0b" /> 4.8 average rating
              </span>
              <span className="ab-cta-trust-sep" />
              <span className="ab-cta-trust-item">
                <Users  size={13} color="#38bdf8" /> 50+ verified tutors
              </span>
              <span className="ab-cta-trust-sep" />
              <span className="ab-cta-trust-item">
                <Zap    size={13} color="#34d399" /> Book in under 2 min
              </span>
              <span className="ab-cta-trust-sep" />
              <span className="ab-cta-trust-item">
                <Shield size={13} color="#a78bfa" /> Money-back guarantee
              </span>
            </div>

          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
