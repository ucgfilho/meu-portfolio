import { useState, useEffect, useCallback, useRef, CSSProperties } from "react";

/* =============================================================================
   TerminalAnimation — Monochromatic Test Runner

   Strictly follows the editorial design system:
   - Background #111111, border #2a2a2a, border-radius 12px
   - No color except macOS dots (red, yellow, green)
   - All terminal text is monochromatic grayscale
   - Typewriter command → progressive output → summary → fade → loop
   ============================================================================= */

interface TestLine {
  text: string;
  type: "pass" | "fail" | "blank" | "summary";
  delay: number;
}

const TEST_SEQUENCE: TestLine[] = [
  { text: "  PASS  src/auth/login.spec.ts", type: "pass", delay: 380 },
  { text: "    ✓ should authenticate with valid credentials (142ms)", type: "pass", delay: 190 },
  { text: "    ✓ should reject invalid password (89ms)", type: "pass", delay: 170 },
  { text: "    ✓ should lock after 5 failed attempts (201ms)", type: "pass", delay: 220 },
  { text: "", type: "blank", delay: 80 },
  { text: "  PASS  src/api/patients.spec.ts", type: "pass", delay: 340 },
  { text: "    ✓ GET /patients returns 200 (67ms)", type: "pass", delay: 180 },
  { text: "    ✓ POST /patients validates required fields (112ms)", type: "pass", delay: 200 },
  { text: "    ✕ PUT /patients/:id rejects malformed payload", type: "fail", delay: 280 },
  { text: "    ✓ DELETE /patients/:id returns 204 (54ms)", type: "pass", delay: 170 },
  { text: "", type: "blank", delay: 80 },
  { text: "  PASS  src/e2e/inventory.spec.ts", type: "pass", delay: 360 },
  { text: "    ✓ should list inventory items (234ms)", type: "pass", delay: 210 },
  { text: "    ✓ should filter by category (156ms)", type: "pass", delay: 190 },
  { text: "    ✓ should export report as PDF (312ms)", type: "pass", delay: 230 },
  { text: "", type: "blank", delay: 120 },
  { text: "Tests: 9 passed, 1 failed, 10 total — Time: 2.341s", type: "summary", delay: 300 },
];

const COMMAND = "npx cypress run --spec 'src/**/*.spec.ts'";

export const TerminalAnimation = () => {
  const [phase, setPhase] = useState<"typing" | "running" | "done" | "clearing">("typing");
  const [typedCommand, setTypedCommand] = useState("");
  const [visibleLines, setVisibleLines] = useState<TestLine[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ cancelled: boolean }>({ cancelled: false });
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Parallax tilt state
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, isHovered: false });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -8;   // max ±8deg
    const rotateY = ((x - cx) / cx) * 10;   // max ±10deg
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, glowX, glowY, isHovered: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, isHovered: false });
  }, []);

  // Auto-scroll terminal body
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [visibleLines, typedCommand]);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(interval);
  }, []);

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const runSequence = useCallback(async () => {
    const token = { cancelled: false };
    animationRef.current = token;
    const isCancelled = () => token.cancelled;

    // Phase 1: Type command
    setPhase("typing");
    setTypedCommand("");
    setVisibleLines([]);

    for (let i = 0; i <= COMMAND.length; i++) {
      if (isCancelled()) return;
      setTypedCommand(COMMAND.slice(0, i));
      await sleep(30 + Math.random() * 30);
    }

    await sleep(350);
    if (isCancelled()) return;

    // Phase 2: Show test output
    setPhase("running");

    for (const line of TEST_SEQUENCE) {
      if (isCancelled()) return;
      await sleep(line.delay + Math.random() * 60);
      if (isCancelled()) return;
      setVisibleLines((prev) => [...prev, line]);
    }

    // Phase 3: Done — stay here
    setPhase("done");
  }, []);

  useEffect(() => {
    runSequence();
    return () => {
      animationRef.current.cancelled = true;
    };
  }, [runSequence]);

  const renderSummaryLine = (text: string) => {
    const parts = text.split(/(\d+)/g);
    return parts.map((part, i) =>
      /^\d+$/.test(part) ? (
        <span key={i} className="text-[#ffffff]">{part}</span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const renderLine = (line: TestLine, index: number) => {
    if (line.type === "blank") {
      return <div key={index} className="h-2.5" />;
    }

    if (line.type === "summary") {
      return (
        <div key={index} className="text-[#666666] terminal-line-enter">
          {renderSummaryLine(line.text)}
        </div>
      );
    }

    if (line.type === "fail") {
      const crossIdx = line.text.indexOf("✕");
      if (crossIdx !== -1) {
        return (
          <div key={index} className="text-[#666666] terminal-line-enter">
            {line.text.slice(0, crossIdx)}
            <span style={{ color: "#ef4444" }}>✕</span>
            {line.text.slice(crossIdx + 1)}
          </div>
        );
      }
      return (
        <div key={index} className="text-[#666666] terminal-line-enter">
          {line.text}
        </div>
      );
    }

    const isHeader = line.text.includes("PASS");
    if (isHeader) {
      return (
        <div key={index} className="text-[#ffffff] font-bold terminal-line-enter">
          {line.text}
        </div>
      );
    }

    const checkIdx = line.text.indexOf("✓");
    if (checkIdx !== -1) {
      return (
        <div key={index} className="text-[#888888] terminal-line-enter">
          {line.text.slice(0, checkIdx)}
          <span style={{ color: "#22c55e" }}>✓</span>
          {line.text.slice(checkIdx + 1)}
        </div>
      );
    }

    return (
      <div key={index} className="text-[#888888] terminal-line-enter">
        {line.text}
      </div>
    );
  };

  const cursorBlock = (
    <span
      className={`inline-block w-[7px] h-[14px] bg-[#ffffff] align-middle ml-px ${
        showCursor ? "opacity-100" : "opacity-0"
      }`}
      style={{ transform: "translateY(1px)" }}
    />
  );

  return (
    <div
      ref={wrapperRef}
      className="terminal-float"
      aria-hidden="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "900px",
        animationPlayState: tilt.isHovered ? "paused" : "running",
      }}
    >
      <div
        className={`terminal-container ${phase === "clearing" ? "terminal-fade-out" : ""}`}
        style={{
          transform: tilt.isHovered
            ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(1.02)`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: tilt.isHovered
            ? "transform 0.08s ease-out, box-shadow 0.2s ease-out"
            : "transform 0.55s cubic-bezier(0.23,1,0.32,1), box-shadow 0.55s ease-out",
          boxShadow: tilt.isHovered
            ? `0 0 0 1px #3a3a3a, 0 20px 60px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.04), inset 0 0 60px rgba(255,255,255,0.01)`
            : "0 0 60px rgba(255,255,255,0.03)",
          transformStyle: "preserve-3d" as CSSProperties["transformStyle"],
          position: "relative" as CSSProperties["position"],
        }}
      >
        {/* Spotlight overlay */}
        {tilt.isHovered && (
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "12px",
              pointerEvents: "none",
              zIndex: 10,
              background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.01) 45%, transparent 70%)`,
              transition: "background 0.05s ease-out",
            }}
          />
        )}
        {/* Title bar */}
        <div className="terminal-titlebar">
          {/* Left spacer to balance the right buttons */}
          <div style={{ width: 138 }} />
          <span className="terminal-title">cypress — tests</span>
          {/* Windows-style action buttons */}
          <div className="flex items-center">
            <button className="terminal-win-btn" aria-label="Minimize" tabIndex={-1}>
              &#x2014;
            </button>
            <button className="terminal-win-btn" aria-label="Maximize" tabIndex={-1}>
              &#x2610;
            </button>
            <button className="terminal-win-btn close" aria-label="Close" tabIndex={-1}>
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="terminal-body" ref={terminalBodyRef}>
          {/* Command line */}
          <div className="terminal-prompt">
            <span className="text-[#888888]">~/portfolio</span>
            <span className="text-[#555555]">$</span>
            <span className="text-[#ffffff]">
              {typedCommand}
              {phase === "typing" && cursorBlock}
            </span>
          </div>

          {/* Test output */}
          {visibleLines.length > 0 && (
            <div className="mt-3 space-y-px">
              {visibleLines.map((line, i) => renderLine(line, i))}
              {phase === "running" && cursorBlock}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
