import { useState, useEffect, useCallback, useRef } from "react";

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

    while (true) {
      if (isCancelled()) return;

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

      // Phase 3: Done — hold
      setPhase("done");
      await sleep(2500);
      if (isCancelled()) return;

      // Phase 4: Clear
      setPhase("clearing");
      await sleep(500);
      if (isCancelled()) return;
    }
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
      return (
        <div key={index} className="text-[#444444] terminal-line-enter">
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
          <span className="text-[#ffffff]">✓</span>
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
    <div className="terminal-float" aria-hidden="true">
      <div className={`terminal-container ${phase === "clearing" ? "terminal-fade-out" : ""}`}>
        {/* Title bar */}
        <div className="terminal-titlebar">
          <div className="flex items-center gap-[6px]">
            <span className="w-[12px] h-[12px] rounded-full bg-[#ff5f57]" />
            <span className="w-[12px] h-[12px] rounded-full bg-[#febc2e]" />
            <span className="w-[12px] h-[12px] rounded-full bg-[#28c840]" />
          </div>
          <span className="terminal-title">cypress — tests</span>
          <div className="w-[54px]" />
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
