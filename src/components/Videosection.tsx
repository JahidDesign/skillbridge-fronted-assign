"use client";

import { useState, useRef, useCallback } from "react";

interface VideoItem {
  id: string;
  embedSrc: string;
  title: string;
  subtitle: string;
  downloadUrl: string;
  tag: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: "x9_GudFGG2U",
    embedSrc: "https://www.youtube.com/embed/x9_GudFGG2U",
    title: "Getting Started with SkillBridge",
    subtitle: "Platform walkthrough · 3 min",
    downloadUrl: "https://youtu.be/x9_GudFGG2U",
    tag: "Tutorial",
  },
  {
    id: "A8RtMy_NGRw",
    embedSrc: "https://www.youtube.com/embed/A8RtMy_NGRw",
    title: "How to Find the Perfect Tutor",
    subtitle: "Tips & tricks · 5 min",
    downloadUrl: "https://youtu.be/A8RtMy_NGRw",
    tag: "Guide",
  },
  {
    id: "ctPMs-AM2mU",
    embedSrc: "https://www.youtube.com/embed/ctPMs-AM2mU",
    title: "Book Your First Session",
    subtitle: "Step-by-step · 4 min",
    downloadUrl: "https://youtu.be/ctPMs-AM2mU",
    tag: "Quick Start",
  },
];

/* ─── YouTube postMessage helper ─── */
function ytCmd(iframe: HTMLIFrameElement | null, func: string) {
  if (!iframe?.contentWindow) return;
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func, args: [] }),
    "https://www.youtube.com"
  );
}

/* ─── Build embed URL with all required params ─── */
function buildSrc(base: string): string {
  // Strip any existing ?si= or other params to start clean
  const clean = base.split("?")[0];
  const url = new URL(clean);
  url.searchParams.set("enablejsapi", "1");
  url.searchParams.set("autoplay", "1");
  url.searchParams.set("mute", "1");          // required for autoplay to work in browsers
  url.searchParams.set("playsinline", "1");
  url.searchParams.set("rel", "0");
  url.searchParams.set("modestbranding", "1");
  // origin is required for postMessage commands to be accepted by YouTube
  if (typeof window !== "undefined") {
    url.searchParams.set("origin", window.location.origin);
  }
  return url.toString();
}

/* ─── Single Video Card ─── */
function VideoCard({ video }: { video: VideoItem }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activated, setActivated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);
  const [muted, setMuted] = useState(true);

  const thumb = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const duration = video.subtitle.split("·")[1]?.trim() ?? "";
  const tagColor = {
    Tutorial: "#6366f1",
    Guide: "#0ea5e9",
    "Quick Start": "#10b981",
  }[video.tag] ?? "#ea580c";

  /* When thumbnail is clicked — load the iframe */
  const handleThumbClick = useCallback(() => {
    setActivated(true);
    setPlaying(true);
    // playing state will be confirmed once iframe fires onLoad
  }, []);

  /* iframe onLoad fires once the player is ready */
  const handleIframeLoad = useCallback(() => {
    setIframeReady(true);
    setPlaying(true);
  }, []);

  /* Toggle play / pause */
  const togglePlay = useCallback(() => {
    if (!iframeReady) return;
    if (playing) {
      ytCmd(iframeRef.current, "pauseVideo");
      setPlaying(false);
    } else {
      ytCmd(iframeRef.current, "playVideo");
      setPlaying(true);
    }
  }, [playing, iframeReady]);

  /* Toggle mute */
  const toggleMute = useCallback(() => {
    if (!iframeReady) return;
    if (muted) {
      ytCmd(iframeRef.current, "unMute");
      setMuted(false);
    } else {
      ytCmd(iframeRef.current, "mute");
      setMuted(true);
    }
  }, [muted, iframeReady]);

  return (
    <div className="vc-card">

      {/* ── Video area (strict 16:9) ── */}
      <div className="vc-video-wrap">

        {/* iframe — rendered once activated */}
        {activated && (
          <iframe
            ref={iframeRef}
            className="vc-iframe"
            src={buildSrc(video.embedSrc)}
            title={video.title}
            onLoad={handleIframeLoad}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        )}

        {/* Thumbnail overlay — fades out once activated */}
        <div
          className={`vc-thumb${activated ? " vc-thumb--hidden" : ""}`}
          style={{ backgroundImage: `url(${thumb})` }}
          onClick={!activated ? handleThumbClick : undefined}
          role={!activated ? "button" : undefined}
          tabIndex={activated ? -1 : 0}
          aria-label={`Play ${video.title}`}
          onKeyDown={(e) => !activated && e.key === "Enter" && handleThumbClick()}
        >
          <div className="vc-scrim" />

          {/* Tag pill on thumbnail */}
          <div
            className="vc-thumb-tag"
            style={{ background: tagColor }}
          >
            {video.tag}
          </div>

          {/* Duration badge */}
          <div className="vc-duration">{duration}</div>

          {/* Big play button */}
          {!activated && (
            <div className="vc-big-play" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            </div>
          )}
        </div>

        {/* In-video controls overlay (visible once activated) */}
        {activated && (
          <div className="vc-overlay-controls">
            {/* Play / Pause */}
            <button
              className="vc-ctrl-btn"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              title={playing ? "Pause" : "Play"}
            >
              {playing ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
              )}
            </button>

            {/* Mute / Unmute */}
            <button
              className="vc-ctrl-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              title={muted ? "Unmute (video starts muted)" : "Mute"}
            >
              {muted ? (
                /* muted icon */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                /* unmuted icon */
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>

            {muted && (
              <span className="vc-mute-hint">Tap 🔊 to unmute</span>
            )}
          </div>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="vc-body">
        <div className="vc-tag-label" style={{ color: tagColor }}>{video.tag}</div>
        <div className="vc-title">{video.title}</div>
        <div className="vc-subtitle">{video.subtitle}</div>

        <div className="vc-actions">
          {/* Play / Pause button */}
          <button
            className={`vc-pp-btn${activated ? (playing ? " vc-pp-btn--playing" : " vc-pp-btn--paused") : ""}`}
            onClick={activated ? togglePlay : handleThumbClick}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
                {activated ? "Resume" : "Play"}
              </>
            )}
          </button>

          {/* Watch on YouTube */}
          <a
            href={video.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="vc-yt-btn"
          >
            <svg width="13" height="13" viewBox="0 0 24 24">
              <path fill="#ea580c" d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
            </svg>
            YouTube
          </a>
        </div>
      </div>

    </div>
  );
}

/* ─── Section ─── */
export default function VideoSection() {
  return (
    <section className="vs-section">
      <style>{`
        /* ════════════════════════════
           FONTS
        ════════════════════════════ */
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700;800&display=swap');

        /* ════════════════════════════
           SECTION
        ════════════════════════════ */
        .vs-section {
          padding: 80px 24px;
          background: #faf8f5;
          border-top: 1px solid #ede8e0;
          font-family: 'Lexend', sans-serif;
        }
        @media (max-width: 768px) { .vs-section { padding: 60px 20px; } }
        @media (max-width: 480px) { .vs-section { padding: 44px 16px; } }

        .vs-inner { max-width: 1140px; margin: 0 auto; }

        /* Header */
        .vs-head { text-align: center; margin-bottom: 52px; }
        @media (max-width: 600px) { .vs-head { margin-bottom: 36px; } }

        .vs-badge {
          display: inline-flex; align-items: center; gap: 7px;
          background: #fff7ed; color: #c2410c;
          border: 1px solid #fed7aa; border-radius: 100px;
          padding: 5px 14px; font-size: 12px; font-weight: 700;
          margin-bottom: 14px; letter-spacing: .05em; text-transform: uppercase;
        }
        .vs-title {
          font-size: clamp(26px, 4vw, 42px); font-weight: 800;
          letter-spacing: -.02em; color: #0f0f0f; margin-bottom: 12px;
        }
        .vs-sub {
          font-size: clamp(14px, 2vw, 16px); color: #9ca3af;
          max-width: 460px; margin: 0 auto; line-height: 1.7;
        }

        /* ════════════════════════════
           GRID
        ════════════════════════════ */
        .vs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1023px) {
          .vs-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 639px) {
          .vs-grid { grid-template-columns: 1fr; gap: 18px; }
        }

        /* ════════════════════════════
           CARD
        ════════════════════════════ */
        .vc-card {
          background: #fff;
          border: 1.5px solid #ede8e0;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow .3s ease, transform .3s ease;
          will-change: transform;
        }
        .vc-card:hover {
          box-shadow: 0 20px 50px rgba(15,15,15,.1), 0 4px 12px rgba(234,88,12,.08);
          transform: translateY(-4px);
        }

        /* ════════════════════════════
           VIDEO WRAP — strict 16:9
        ════════════════════════════ */
        .vc-video-wrap {
          position: relative;
          width: 100%;
          padding-top: 56.25%; /* 16:9 */
          background: #111;
          overflow: hidden;
          flex-shrink: 0;
        }

        .vc-iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          z-index: 1;
        }

        /* ════════════════════════════
           THUMBNAIL
        ════════════════════════════ */
        .vc-thumb {
          position: absolute;
          inset: 0;
          z-index: 2;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity .4s ease;
        }
        .vc-thumb--hidden {
          opacity: 0;
          pointer-events: none;
          z-index: 0;
        }

        .vc-scrim {
          position: absolute; inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,.15) 0%,
            rgba(0,0,0,.05) 40%,
            rgba(0,0,0,.45) 100%
          );
          transition: background .25s;
        }
        .vc-thumb:hover .vc-scrim {
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,.25) 0%,
            rgba(0,0,0,.1) 40%,
            rgba(0,0,0,.6) 100%
          );
        }

        /* Tag pill on thumbnail */
        .vc-thumb-tag {
          position: absolute; top: 12px; left: 12px; z-index: 3;
          color: #fff;
          font-size: 9px; font-weight: 700;
          padding: 3px 10px; border-radius: 100px;
          letter-spacing: .08em; text-transform: uppercase;
          pointer-events: none;
          font-family: 'Lexend', sans-serif;
          box-shadow: 0 2px 8px rgba(0,0,0,.25);
        }

        /* Duration */
        .vc-duration {
          position: absolute; bottom: 10px; right: 10px; z-index: 3;
          background: rgba(0,0,0,.8); color: #fff;
          font-size: 10px; font-weight: 600;
          padding: 2px 8px; border-radius: 5px;
          pointer-events: none;
          font-family: 'Lexend', sans-serif;
        }

        /* Big play circle */
        .vc-big-play {
          position: relative; z-index: 3;
          width: 58px; height: 58px; border-radius: 50%;
          background: rgba(234,88,12,.9);
          border: 2.5px solid rgba(255,255,255,.3);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 24px rgba(234,88,12,.5);
          transition: transform .2s ease, box-shadow .2s ease, background .2s;
          pointer-events: none;
        }
        .vc-thumb:hover .vc-big-play {
          transform: scale(1.1);
          background: rgba(194,65,12,.95);
          box-shadow: 0 12px 36px rgba(234,88,12,.7);
        }

        /* ════════════════════════════
           IN-VIDEO OVERLAY CONTROLS
           (play/pause + mute — sit
            bottom-left of the iframe)
        ════════════════════════════ */
        .vc-overlay-controls {
          position: absolute;
          bottom: 10px;
          left: 10px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 6px;
          pointer-events: auto;
        }

        .vc-ctrl-btn {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: rgba(0,0,0,.65);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,.15);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background .15s, transform .15s;
          flex-shrink: 0;
        }
        .vc-ctrl-btn:hover {
          background: rgba(234,88,12,.85);
          transform: scale(1.08);
        }

        .vc-mute-hint {
          font-size: 10px;
          color: rgba(255,255,255,.85);
          background: rgba(0,0,0,.6);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255,255,255,.12);
          padding: 3px 8px;
          border-radius: 100px;
          font-family: 'Lexend', sans-serif;
          font-weight: 500;
          pointer-events: none;
          white-space: nowrap;
        }

        /* ════════════════════════════
           CARD BODY
        ════════════════════════════ */
        .vc-body {
          padding: 18px 18px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .vc-tag-label {
          font-size: 10px; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          font-family: 'Lexend', sans-serif;
        }
        .vc-title {
          font-size: 14px; font-weight: 700; color: #111;
          line-height: 1.45; margin-top: 2px;
          font-family: 'Lexend', sans-serif;
        }
        .vc-subtitle {
          font-size: 12px; color: #b0aaa5;
          font-family: 'Lexend', sans-serif;
        }

        /* ════════════════════════════
           ACTIONS ROW
        ════════════════════════════ */
        .vc-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 14px;
        }

        /* Play / Pause / Resume */
        .vc-pp-btn {
          flex: 1;
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          background: #f5f0eb;
          color: #555;
          border: 1.5px solid #e8e2d9;
          border-radius: 10px;
          padding: 8px 14px;
          font-size: 12px; font-weight: 700;
          font-family: 'Lexend', sans-serif;
          cursor: pointer;
          transition: all .18s ease;
        }
        .vc-pp-btn:hover {
          background: #eae4db;
          color: #111;
          border-color: #d6cfc5;
        }
        /* While playing → dark */
        .vc-pp-btn--playing {
          background: #111; color: #fff;
          border-color: #111;
          box-shadow: 0 3px 12px rgba(0,0,0,.2);
        }
        .vc-pp-btn--playing:hover {
          background: #222;
          border-color: #222;
        }
        /* Paused → orange */
        .vc-pp-btn--paused {
          background: #ea580c; color: #fff;
          border-color: #ea580c;
          box-shadow: 0 3px 12px rgba(234,88,12,.3);
        }
        .vc-pp-btn--paused:hover {
          background: #c2410c;
          border-color: #c2410c;
        }

        /* YouTube link button */
        .vc-yt-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff7ed; color: #c2410c;
          border: 1.5px solid #fdd4aa; border-radius: 10px;
          padding: 8px 13px;
          font-size: 12px; font-weight: 600;
          font-family: 'Lexend', sans-serif;
          text-decoration: none;
          transition: all .18s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .vc-yt-btn:hover {
          background: #ea580c; color: #fff;
          border-color: #ea580c;
          box-shadow: 0 3px 14px rgba(234,88,12,.3);
        }
        .vc-yt-btn:hover svg path { fill: #fff !important; }
        .vc-yt-btn:hover svg polygon { fill: #ea580c !important; }

        /* ════════════════════════════
           TINY PHONE
        ════════════════════════════ */
        @media (max-width: 360px) {
          .vc-pp-btn { padding: 7px 10px; font-size: 11px; }
          .vc-yt-btn  { padding: 7px 9px; font-size: 11px; }
        }
      `}</style>

      <div className="vs-inner">
        {/* Header */}
        <div className="vs-head">
          <div className="vs-badge">▶ Video Library</div>
          <h2 className="vs-title">Watch &amp; Learn</h2>
          <p className="vs-sub">
            Explore our tutorials and guides — everything you need to get the most out of SkillBridge.
          </p>
        </div>

        {/* Cards */}
        <div className="vs-grid">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} video={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
