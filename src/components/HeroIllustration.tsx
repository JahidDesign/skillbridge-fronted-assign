import './hero.css';
export default function HeroIllustration() {
  return (
    <div
      className="relative w-full select-none"
      style={{ fontFamily: "'Lexend', sans-serif" }}
      aria-hidden
    >

      <div className="hi-wrap">
        <svg
          viewBox="0 0 560 420"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="SkillBridge platform illustration"
        >
          <defs>
            {/* Arrow markers */}
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

            {/* Hub glow */}
            <filter id="hi-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Card drop shadow */}
            <filter id="hi-shadow" x="-10%" y="-10%" width="130%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6"
                floodColor="#ea580c" floodOpacity="0.10" />
            </filter>
          </defs>

          {/* ════════════════════════════
              BACKGROUND BLOBS
          ════════════════════════════ */}
          <ellipse cx="280" cy="200" rx="190" ry="160" fill="#fff7ed" opacity="0.5" />
          <ellipse cx="420" cy="140" rx="80" ry="60" fill="#fed7aa" opacity="0.18" />
          <ellipse cx="140" cy="270" rx="70" ry="55" fill="#ffedd5" opacity="0.22" />

          {/* ════════════════════════════
              RINGS (hidden ≤480px)
          ════════════════════════════ */}
          <g className="hi-rings">
            {/* Spinning outer ring */}
            <g className="hi-spin">
              <circle cx="280" cy="200" r="148" fill="none"
                stroke="#ea580c" strokeWidth="0.7"
                strokeDasharray="6 12" opacity="0.18" />
            </g>
            {/* Static inner dashed ring */}
            <circle cx="280" cy="200" r="110" fill="none"
              stroke="#fed7aa" strokeWidth="1"
              strokeDasharray="2 8" opacity="0.4" />
          </g>

          {/* ════════════════════════════
              CONNECTOR LINES (hidden ≤860px)
          ════════════════════════════ */}
          <g className="hi-connectors">
            <line x1="148" y1="150" x2="246" y2="183"
              stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5 4"
              markerEnd="url(#hi-arr-orange)" opacity="0.45" className="hi-flow" />
            <line x1="148" y1="250" x2="246" y2="215"
              stroke="#fb923c" strokeWidth="1.2" strokeDasharray="5 4"
              markerEnd="url(#hi-arr-amber)" opacity="0.45" className="hi-flow"
              style={{ animationDelay: ".35s" }} />
            <line x1="316" y1="183" x2="412" y2="150"
              stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5 4"
              markerEnd="url(#hi-arr-orange)" opacity="0.45" className="hi-flow"
              style={{ animationDelay: ".2s" }} />
            <line x1="316" y1="215" x2="412" y2="250"
              stroke="#fb923c" strokeWidth="1.2" strokeDasharray="5 4"
              markerEnd="url(#hi-arr-amber)" opacity="0.45" className="hi-flow"
              style={{ animationDelay: ".55s" }} />
            <line x1="280" y1="162" x2="280" y2="96"
              stroke="#ea580c" strokeWidth="1.2" strokeDasharray="5 4"
              markerEnd="url(#hi-arr-orange)" opacity="0.35" className="hi-flow"
              style={{ animationDelay: ".7s" }} />
          </g>

          {/* ════════════════════════════
              CENTRE HUB (always visible)
          ════════════════════════════ */}
          <g className="hi-p1">
            {/* Glow */}
            <circle cx="280" cy="200" r="52"
              fill="#fff7ed" opacity="0.8" filter="url(#hi-glow)" />
            {/* Main circle */}
            <circle cx="280" cy="200" r="46"
              fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
            {/* Inner ring */}
            <circle cx="280" cy="200" r="38"
              fill="none" stroke="#fed7aa" strokeWidth="1" opacity="0.7" />
            {/* Graduation cap — background board */}
            <rect x="265" y="188" width="30" height="20" rx="3"
              fill="#ea580c" opacity="0.15" />
            {/* Cap brim */}
            <polygon points="280,182 296,190 280,196 264,190" fill="#ea580c" />
            {/* Cap top */}
            <rect x="276" y="184" width="8" height="8" rx="1" fill="#c2410c" />
            {/* Tassel */}
            <line x1="296" y1="190" x2="296" y2="200"
              stroke="#c2410c" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="296" cy="201" r="2" fill="#c2410c" />
            {/* Label */}
            <text x="280" y="223" textAnchor="middle"
              style={{
                fontSize: 9, fontWeight: 700,
                fill: "#c2410c",
                fontFamily: "'Lexend', sans-serif",
                letterSpacing: ".04em",
              }}>
              SKILLBRIDGE
            </text>
          </g>

          {/* ════════════════════════════
              SIDE CARDS (hidden ≤860px)
          ════════════════════════════ */}

          {/* — Tutor top-left — */}
          <g className="hi-fa hi-p2 hi-side-left" filter="url(#hi-shadow)">
            <rect x="26" y="100" width="108" height="80" rx="12"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="26" y="100" width="108" height="3" rx="2"
              fill="#ea580c" opacity="0.7" />
            {/* Avatar */}
            <circle cx="52" cy="124" r="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <circle cx="52" cy="120" r="6" fill="#ea580c" opacity="0.8" />
            <ellipse cx="52" cy="132" rx="9" ry="5" fill="#ea580c" opacity="0.5" />
            {/* Info */}
            <text x="72" y="118"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend', sans-serif" }}>
              Sarah R.
            </text>
            <text x="72" y="130"
              style={{ fontSize: 9, fontWeight: 500, fill: "#ea580c", fontFamily: "'Lexend', sans-serif" }}>
              Mathematics
            </text>
            {/* Stars */}
            <text x="35" y="158"
              style={{ fontSize: 10, fill: "#ea580c", fontFamily: "'Lexend', sans-serif" }}>
              ★★★★★
            </text>
            <text x="88" y="158"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
              4.9
            </text>
          </g>

          {/* — Tutor bottom-left — */}
          <g className="hi-fb hi-p3 hi-side-left"
            style={{ animationDelay: ".2s" }} filter="url(#hi-shadow)">
            <rect x="26" y="210" width="108" height="80" rx="12"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="26" y="210" width="108" height="3" rx="2"
              fill="#fb923c" opacity="0.7" />
            <circle cx="52" cy="234" r="14"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <circle cx="52" cy="230" r="6" fill="#fb923c" opacity="0.8" />
            <ellipse cx="52" cy="242" rx="9" ry="5" fill="#fb923c" opacity="0.5" />
            <text x="72" y="228"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend', sans-serif" }}>
              James K.
            </text>
            <text x="72" y="240"
              style={{ fontSize: 9, fontWeight: 500, fill: "#ea580c", fontFamily: "'Lexend', sans-serif" }}>
              Programming
            </text>
            <text x="35" y="268"
              style={{ fontSize: 10, fill: "#ea580c", fontFamily: "'Lexend', sans-serif" }}>
              ★★★★☆
            </text>
            <text x="88" y="268"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
              4.7
            </text>
          </g>

          {/* — Session booked top-right — */}
          <g className="hi-fc hi-p4 hi-side-right"
            style={{ animationDelay: ".35s" }} filter="url(#hi-shadow)">
            <rect x="424" y="96" width="114" height="88" rx="12"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="424" y="96" width="114" height="3" rx="2"
              fill="#ea580c" opacity="0.7" />
            <text x="481" y="117" textAnchor="middle"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend', sans-serif" }}>
              Session Booked
            </text>
            <line x1="436" y1="123" x2="526" y2="123"
              stroke="#fed7aa" strokeWidth="0.8" />
            <text x="438" y="137"
              style={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Lexend', sans-serif" }}>
              Today · 4:00 PM
            </text>
            <text x="438" y="150"
              style={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Lexend', sans-serif" }}>
              Calculus · 60 min
            </text>
            {/* Confirmed badge */}
            <rect x="438" y="158" width="64" height="18" rx="9"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="0.8" />
            <circle cx="450" cy="167" r="5" fill="#ea580c" />
            <path d="M447 167l2.5 2.5 4-4" fill="none" stroke="#fff"
              strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            <text x="458" y="171"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
              Confirmed
            </text>
          </g>

          {/* — New review bottom-right — */}
          <g className="hi-fa hi-p5 hi-side-right"
            style={{ animationDelay: ".5s", animationDuration: "5s" }} filter="url(#hi-shadow)">
            <rect x="424" y="216" width="114" height="74" rx="12"
              fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
            <rect x="424" y="216" width="114" height="3" rx="2"
              fill="#fb923c" opacity="0.7" />
            <text x="438" y="235"
              style={{ fontSize: 10, fontWeight: 700, fill: "#1a1a1a", fontFamily: "'Lexend', sans-serif" }}>
              New Review
            </text>
            <text x="438" y="250"
              style={{ fontSize: 11, fill: "#ea580c", fontFamily: "'Lexend', sans-serif" }}>
              ★★★★★
            </text>
            <text x="473" y="250"
              style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
              5.0
            </text>
            <text x="438" y="264"
              style={{ fontSize: 9, fill: "#6b7280", fontFamily: "'Lexend', sans-serif", fontStyle: "italic" }}>
              "Amazing session!"
            </text>
            {/* Live dot */}
            <circle cx="524" cy="230" r="5" fill="#ea580c" className="hi-blink" />
          </g>

          {/* ════════════════════════════
              TOP CHIP (hidden ≤480px)
          ════════════════════════════ */}
          <g className="hi-top-chip hi-fb hi-p2" style={{ animationDuration: "6s" }}>
            <rect x="218" y="38" width="124" height="30" rx="15"
              fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
            <text x="231" y="58"
              style={{ fontSize: 12, fontFamily: "'Lexend', sans-serif" }}>🎓</text>
            <text x="247" y="58"
              style={{ fontSize: 10, fontWeight: 700, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
              12,000+ sessions
            </text>
          </g>

          {/* ════════════════════════════
              BOTTOM CHIPS (hidden ≤480px)
          ════════════════════════════ */}
          <g className="hi-bottom-chips">
            {/* Online now pill */}
            <g className="hi-fc hi-p6" style={{ animationDuration: "4.5s" }}>
              <rect x="134" y="346" width="106" height="28" rx="14"
                fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
              <circle cx="150" cy="360" r="5" fill="#ea580c" className="hi-pulse" />
              <text x="162" y="364"
                style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
                47 online now
              </text>
            </g>

            {/* Subject pills */}
            <g className="hi-p6" style={{ animationDelay: ".65s" }}>
              <rect x="248" y="346" width="52" height="26" rx="13"
                fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
              <text x="274" y="363" textAnchor="middle"
                style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
                Math
              </text>

              <rect x="308" y="346" width="62" height="26" rx="13"
                fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
              <text x="339" y="363" textAnchor="middle"
                style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
                Coding
              </text>

              <rect x="378" y="346" width="78" height="26" rx="13"
                fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
              <text x="417" y="363" textAnchor="middle"
                style={{ fontSize: 9, fontWeight: 600, fill: "#c2410c", fontFamily: "'Lexend', sans-serif" }}>
                Languages
              </text>
            </g>
          </g>

          {/* ════════════════════════════
              DECORATIVE DOTS (hidden ≤480px)
          ════════════════════════════ */}
          <g className="hi-dots">
            <circle cx="200" cy="72" r="3" fill="#fed7aa" opacity="0.6" />
            <circle cx="360" cy="72" r="3" fill="#fed7aa" opacity="0.6" />
            <circle cx="160" cy="310" r="3" fill="#fed7aa" opacity="0.6" />
            <circle cx="400" cy="310" r="3" fill="#fed7aa" opacity="0.6" />
            <circle cx="88" cy="195" r="2.5" fill="#fb923c" opacity="0.4" />
            <circle cx="472" cy="195" r="2.5" fill="#fb923c" opacity="0.4" />
          </g>

        </svg>
      </div>
    </div>
  );
}