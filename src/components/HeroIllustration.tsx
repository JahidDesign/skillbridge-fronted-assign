export default function HeroIllustration() {
  return (
    <div
      className="relative w-full select-none"
      style={{ fontFamily: "'Lexend', sans-serif" }}
      aria-hidden
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap');

        /* ══════════════════════════════════
           KEYFRAMES
        ══════════════════════════════════ */
        @keyframes hi-float-a   { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-8px)}  }
        @keyframes hi-float-b   { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-6px)}  }
        @keyframes hi-float-c   { 0%,100%{transform:translateY(0)}    50%{transform:translateY(-10px)} }
        @keyframes hi-pop-in    { from{opacity:0;transform:scale(.75)} to{opacity:1;transform:scale(1)} }
        @keyframes hi-spin-slow { from{transform:rotate(0deg)}        to{transform:rotate(360deg)}     }
        @keyframes hi-dash-flow { to{stroke-dashoffset:-24}                                            }
        @keyframes hi-blink     { 0%,100%{opacity:1} 50%{opacity:.15}                                 }
        @keyframes hi-pulse     { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }

        /* ══════════════════════════════════
           ANIMATION CLASSES
        ══════════════════════════════════ */
        .hi-fa   { animation: hi-float-a   4s   ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
        .hi-fb   { animation: hi-float-b   5s   ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
        .hi-fc   { animation: hi-float-c   3.5s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }
        .hi-spin { animation: hi-spin-slow 20s  linear     infinite; transform-origin:50% 50%; transform-box:fill-box; }
        .hi-flow { animation: hi-dash-flow 1.4s linear     infinite; }
        .hi-blink{ animation: hi-blink     1.6s ease-in-out infinite; }
        .hi-pulse{ animation: hi-pulse     2.2s ease-in-out infinite; transform-origin:center; transform-box:fill-box; }

        /* Pop-in stagger */
        .hi-p1 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .05s both; }
        .hi-p2 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .15s both; }
        .hi-p3 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .26s both; }
        .hi-p4 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .37s both; }
        .hi-p5 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .48s both; }
        .hi-p6 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .59s both; }
        .hi-p7 { animation: hi-pop-in .45s cubic-bezier(.34,1.56,.64,1) .70s both; }

        /* ══════════════════════════════════
           WRAPPER — responsive SVG
        ══════════════════════════════════ */
        .hi-wrap {
          position: relative;
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          padding: 0;
          box-sizing: border-box;
        }
        .hi-wrap svg {
          width: 100%;
          height: auto;
          overflow: visible;
          display: block;
        }

        /* ── All breakpoints: everything visible ──
           We use SVG <use> + viewBox scaling so every
           element scales proportionally on any screen. */

        /* Tiny phones: just ensure no clipping */
        @media (max-width: 360px) {
          .hi-wrap { padding: 0 4px; }
        }
      `}</style>

      <div className="hi-wrap">
        {/*
          LAYOUT CONCEPT — single viewBox 680 × 520
          ┌─────────────────────────────────────────┐
          │  [chip: 12k sessions]                   │
          │                                         │
          │  [Sarah R.]  ←  [HUB]  →  [Session]    │
          │  [James K.]  ←         →  [Review]      │
          │                                         │
          │  [online] [Math] [Coding] [Languages]   │
          └─────────────────────────────────────────┘
          All groups always rendered; SVG scales to container.
        */}
        <svg
          viewBox="0 0 680 520"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="SkillBridge platform illustration"
        >
          <defs>
            <marker id="hi-arr-orange" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#ea580c"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
            <marker id="hi-arr-amber" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M2 1L8 5L2 9" fill="none" stroke="#fb923c"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>

            <filter id="hi-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>

            <filter id="hi-shadow" x="-14%" y="-14%" width="140%" height="150%">
              <feDropShadow dx="0" dy="5" stdDeviation="7"
                floodColor="#ea580c" floodOpacity="0.09" />
            </filter>
          </defs>

          {/* ── Background blobs ── */}
          <ellipse cx="340" cy="255" rx="230" ry="190" fill="#fff7ed" opacity="0.45" />
          <ellipse cx="510" cy="170" rx="95" ry="72" fill="#fed7aa" opacity="0.14" />
          <ellipse cx="165" cy="340" rx="85" ry="65" fill="#ffedd5" opacity="0.18" />

          {/* ── Rings around hub ── */}
          <g className="hi-spin">
            <circle cx="340" cy="258" r="170" fill="none" stroke="#ea580c"
              strokeWidth="0.7" strokeDasharray="5 14" opacity="0.15" />
          </g>
          <circle cx="340" cy="258" r="128" fill="none" stroke="#fed7aa"
            strokeWidth="1" strokeDasharray="2 9" opacity="0.36" />
          <circle cx="340" cy="258" r="82" fill="none" stroke="#fdba74"
            strokeWidth="0.6" strokeDasharray="3 6" opacity="0.22" />

          {/* ══════════════════════════════════
              CONNECTOR LINES (hub ↔ cards)
          ══════════════════════════════════ */}
          {/* left-top card → hub */}
          <line x1="196" y1="192" x2="300" y2="236" stroke="#ea580c" strokeWidth="1.2"
            strokeDasharray="5 4" markerEnd="url(#hi-arr-orange)" opacity="0.4"
            className="hi-flow" />
          {/* left-bottom card → hub */}
          <line x1="196" y1="305" x2="300" y2="268" stroke="#fb923c" strokeWidth="1.2"
            strokeDasharray="5 4" markerEnd="url(#hi-arr-amber)" opacity="0.4"
            className="hi-flow" style={{ animationDelay: ".35s" }} />
          {/* hub → right-top card */}
          <line x1="381" y1="236" x2="482" y2="192" stroke="#ea580c" strokeWidth="1.2"
            strokeDasharray="5 4" markerEnd="url(#hi-arr-orange)" opacity="0.4"
            className="hi-flow" style={{ animationDelay: ".2s" }} />
          {/* hub → right-bottom card */}
          <line x1="381" y1="268" x2="482" y2="305" stroke="#fb923c" strokeWidth="1.2"
            strokeDasharray="5 4" markerEnd="url(#hi-arr-amber)" opacity="0.4"
            className="hi-flow" style={{ animationDelay: ".55s" }} />
          {/* hub → top chip */}
          <line x1="340" y1="210" x2="340" y2="138" stroke="#ea580c" strokeWidth="1.2"
            strokeDasharray="5 4" markerEnd="url(#hi-arr-orange)" opacity="0.3"
            className="hi-flow" style={{ animationDelay: ".7s" }} />

          {/* ══════════════════════════════════
              CENTRE HUB
          ══════════════════════════════════ */}
          <g className="hi-p1">
            <circle cx="340" cy="258" r="62" fill="#fff7ed" opacity="0.75" filter="url(#hi-glow)" />
            <circle cx="340" cy="258" r="56" fill="#fffbf7" stroke="#ea580c" strokeWidth="1.6" />
            <circle cx="340" cy="258" r="48" fill="none" stroke="#fed7aa" strokeWidth="1" opacity="0.6" />
            {/* Graduation cap */}
            <rect x="322" y="244" width="36" height="24" rx="3" fill="#ea580c" opacity="0.12" />
            <polygon points="340,236 360,247 340,254 320,247" fill="#ea580c" />
            <rect x="336" y="238" width="8" height="8" rx="1.5" fill="#c2410c" />
            <line x1="360" y1="247" x2="360" y2="260"
              stroke="#c2410c" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="360" cy="261" r="2.5" fill="#c2410c" />
            {/* Label */}
            <text x="340" y="282" textAnchor="middle"
              style={{
                fontSize: 8.5, fontWeight: 700, fill: "#c2410c",
                fontFamily: "'Lexend',sans-serif", letterSpacing: ".06em"
              }}>
              SKILLBRIDGE
            </text>
          </g>

          {/* ══════════════════════════════════
              TOP CHIP  — always visible
          ══════════════════════════════════ */}
          <g className="hi-fb hi-p2" style={{ animationDuration: "6s" }}>
            <rect x="268" y="84" width="144" height="34" rx="17"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="283" y="107"
              style={{ fontSize: 14, fontFamily: "'Lexend',sans-serif" }}>🎓</text>
            <text x="304" y="107"
              style={{
                fontSize: 10, fontWeight: 700, fill: "#c2410c",
                fontFamily: "'Lexend',sans-serif"
              }}>12,000+ sessions</text>
          </g>

          {/* ══════════════════════════════════
              LEFT CARDS
          ══════════════════════════════════ */}

          {/* Sarah R. — top-left */}
          <g className="hi-fa hi-p3" filter="url(#hi-shadow)">
            <rect x="44" y="138" width="122" height="88" rx="13"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="44" y="138" width="122" height="3.5" rx="2"
              fill="#ea580c" opacity="0.65" />
            {/* Avatar */}
            <circle cx="74" cy="166" r="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <circle cx="74" cy="161" r="7" fill="#ea580c" opacity="0.75" />
            <ellipse cx="74" cy="175" rx="10" ry="6" fill="#ea580c" opacity="0.45" />
            {/* Info */}
            <text x="96" y="158"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend',sans-serif" }}>
              Sarah R.
            </text>
            <text x="96" y="170"
              style={{ fontSize: 9, fontWeight: 500, fill: "#ea580c", fontFamily: "'Lexend',sans-serif" }}>
              Mathematics
            </text>
            {/* Stars */}
            <text x="58" y="200"
              style={{ fontSize: 10, fill: "#f97316", fontFamily: "'Lexend',sans-serif" }}>★★★★★</text>
            <text x="112" y="200"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>4.9</text>
          </g>

          {/* James K. — bottom-left */}
          <g className="hi-fb hi-p4" style={{ animationDelay: ".22s" }} filter="url(#hi-shadow)">
            <rect x="44" y="262" width="122" height="88" rx="13"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="44" y="262" width="122" height="3.5" rx="2"
              fill="#fb923c" opacity="0.65" />
            <circle cx="74" cy="290" r="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <circle cx="74" cy="285" r="7" fill="#fb923c" opacity="0.75" />
            <ellipse cx="74" cy="299" rx="10" ry="6" fill="#fb923c" opacity="0.45" />
            <text x="96" y="282"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend',sans-serif" }}>
              James K.
            </text>
            <text x="96" y="294"
              style={{ fontSize: 9, fontWeight: 500, fill: "#ea580c", fontFamily: "'Lexend',sans-serif" }}>
              Programming
            </text>
            <text x="58" y="324"
              style={{ fontSize: 10, fill: "#f97316", fontFamily: "'Lexend',sans-serif" }}>★★★★☆</text>
            <text x="112" y="324"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>4.7</text>
          </g>

          {/* ══════════════════════════════════
              RIGHT CARDS
          ══════════════════════════════════ */}

          {/* Session Booked — top-right */}
          <g className="hi-fc hi-p5" style={{ animationDelay: ".35s" }} filter="url(#hi-shadow)">
            <rect x="516" y="130" width="124" height="100" rx="13"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="516" y="130" width="124" height="3.5" rx="2"
              fill="#ea580c" opacity="0.65" />
            <text x="578" y="153" textAnchor="middle"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend',sans-serif" }}>
              Session Booked
            </text>
            <line x1="528" y1="160" x2="628" y2="160" stroke="#fed7aa" strokeWidth="0.8" />
            <text x="530" y="175"
              style={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Lexend',sans-serif" }}>Today · 4:00 PM</text>
            <text x="530" y="189"
              style={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Lexend',sans-serif" }}>Calculus · 60 min</text>
            {/* Confirmed badge */}
            <rect x="530" y="198" width="76" height="18" rx="9"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="0.8" />
            <circle cx="543" cy="207" r="5.5" fill="#ea580c" />
            <path d="M540 207l2.5 2.5 4.5-4.5" fill="none" stroke="#fff"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="552" y="211"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>
              Confirmed
            </text>
          </g>

          {/* New Review — bottom-right */}
          <g className="hi-fa hi-p6"
            style={{ animationDelay: ".5s", animationDuration: "5s" }} filter="url(#hi-shadow)">
            <rect x="516" y="264" width="124" height="86" rx="13"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="516" y="264" width="124" height="3.5" rx="2"
              fill="#fb923c" opacity="0.65" />

            {/* Title */}
            <text x="530" y="284"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend',sans-serif" }}>
              New Review
            </text>

            {/* Stars row — use textLength to fix star-to-rating gap */}
            <text x="530" y="302"
              style={{
                fontSize: 11, fill: "#f97316", fontFamily: "'Lexend',sans-serif",
                letterSpacing: "1px"
              }}>★★★★★</text>
            {/* Rating badge sits flush right after stars — fixed x position */}
            <rect x="594" y="292" width="28" height="14" rx="7"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="0.8" />
            <text x="608" y="303" textAnchor="middle"
              style={{ fontSize: 8.5, fontWeight: 700, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>
              5.0
            </text>

            {/* Review text */}
            <text x="530" y="321"
              style={{ fontSize: 8.5, fill: "#6b7280", fontFamily: "'Lexend',sans-serif", fontStyle: "italic" }}>
              "Amazing session!"
            </text>

            {/* Live dot */}
            <circle cx="628" cy="278" r="5" fill="#ea580c" className="hi-blink" />
            {/* Outer ring on live dot */}
            <circle cx="628" cy="278" r="8" fill="none" stroke="#ea580c"
              strokeWidth="0.8" opacity="0.3" className="hi-pulse" />
          </g>

          {/* ══════════════════════════════════
              BOTTOM BAR — always visible
          ══════════════════════════════════ */}

          {/* Online now pill */}
          <g className="hi-fc hi-p7" style={{ animationDuration: "4.5s" }}>
            <rect x="92" y="430" width="122" height="30" rx="15"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <circle cx="111" cy="445" r="5.5" fill="#ea580c" className="hi-pulse" />
            <text x="124" y="449"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>
              47 online now
            </text>
          </g>

          {/* Subject pills */}
          <g className="hi-p7" style={{ animationDelay: ".65s" }}>
            <rect x="224" y="430" width="56" height="28" rx="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="252" y="448" textAnchor="middle"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>Math</text>

            <rect x="290" y="430" width="68" height="28" rx="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="324" y="448" textAnchor="middle"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>Coding</text>

            <rect x="368" y="430" width="86" height="28" rx="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="411" y="448" textAnchor="middle"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>Languages</text>

            <rect x="464" y="430" width="78" height="28" rx="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="503" y="448" textAnchor="middle"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend',sans-serif" }}>Science</text>
          </g>

          {/* ══════════════════════════════════
              DECORATIVE DOTS
          ══════════════════════════════════ */}
          <circle cx="240" cy="92" r="3" fill="#fed7aa" opacity="0.55" />
          <circle cx="440" cy="92" r="3" fill="#fed7aa" opacity="0.55" />
          <circle cx="186" cy="390" r="3" fill="#fed7aa" opacity="0.55" />
          <circle cx="494" cy="390" r="3" fill="#fed7aa" opacity="0.55" />
          <circle cx="22" cy="258" r="2.5" fill="#fb923c" opacity="0.36" />
          <circle cx="658" cy="258" r="2.5" fill="#fb923c" opacity="0.36" />
          <circle cx="340" cy="490" r="2.5" fill="#fed7aa" opacity="0.45" />
          <circle cx="200" cy="468" r="2" fill="#fdba74" opacity="0.35" />
          <circle cx="480" cy="468" r="2" fill="#fdba74" opacity="0.35" />
        </svg>
      </div>
    </div>
  );
}
