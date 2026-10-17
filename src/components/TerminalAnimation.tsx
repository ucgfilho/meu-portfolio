import {useCallback, useEffect, useRef, useState} from "react";

/* =============================================================================
   TerminalAnimation — Architectural Test Runner Console
   - Flat, razor-sharp technical surface (no 3D parallax tilt or floating levitation)
   - Respects prefers-reduced-motion by rendering output immediately
   - Fully responsive width across all breakpoints
   ============================================================================= */

interface TestLine {
    text: string;
    type: "pass" | "fail" | "blank" | "summary";
    delay: number;
}

const TEST_SEQUENCE: TestLine[] = [
    {text: "  RUN   target: GetCertificate", type: "pass", delay: 320},
    {text: "    ✓ task and audit context loaded", type: "pass", delay: 160},
    {text: "    ✓ browser session initialized", type: "pass", delay: 150},
    {text: "    ✓ portal flow completed", type: "pass", delay: 190},
    {text: "", type: "blank", delay: 60},
    {text: "  STORE artifact", type: "pass", delay: 280},
    {text: "    ✓ PDF download captured", type: "pass", delay: 150},
    {text: "    ✓ artifact persisted to Amazon S3", type: "pass", delay: 170},
    {text: "    ✓ input file registered", type: "pass", delay: 220},
    {text: "    ✓ response.s3id confirmed", type: "pass", delay: 150},
    {text: "", type: "blank", delay: 60},
    {text: "  READ  readContentFile", type: "pass", delay: 300},
    {text: "    ✓ document target identified", type: "pass", delay: 180},
    {text: "    ✓ PDF content extracted", type: "pass", delay: 160},
    {text: "    ✓ business payload validated", type: "pass", delay: 190},
    {text: "", type: "blank", delay: 90},
    {text: "Emission verified with persisted artifact", type: "summary", delay: 240},
];

const COMMAND = "PRINT_STEPS=1 jest crawler.test.ts";

export const TerminalAnimation = () => {
    const [phase, setPhase] = useState<"typing" | "running" | "done">("typing");
    const [typedCommand, setTypedCommand] = useState("");
    const [visibleLines, setVisibleLines] = useState<TestLine[]>([]);
    const [showCursor, setShowCursor] = useState(true);
    const terminalBodyRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<{ cancelled: boolean }>({cancelled: false});

    // Auto-scroll terminal body
    useEffect(() => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    }, [visibleLines, typedCommand]);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => setShowCursor((c) => !c), 530);
        return () => clearInterval(interval);
    }, []);

    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const runSequence = useCallback(async () => {
        const token = {cancelled: false};
        animationRef.current = token;
        const isCancelled = () => token.cancelled;

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            setTypedCommand(COMMAND);
            setVisibleLines(TEST_SEQUENCE);
            setPhase("done");
            return;
        }

        // Phase 1: Type command
        setPhase("typing");
        setTypedCommand("");
        setVisibleLines([]);

        for (let i = 0; i <= COMMAND.length; i++) {
            if (isCancelled()) return;
            setTypedCommand(COMMAND.slice(0, i));
            await sleep(25 + Math.random() * 20);
        }

        await sleep(280);
        if (isCancelled()) return;

        // Phase 2: Show test output
        setPhase("running");

        for (const line of TEST_SEQUENCE) {
            if (isCancelled()) return;
            await sleep(line.delay);
            if (isCancelled()) return;
            setVisibleLines((prev) => [...prev, line]);
        }

        // Phase 3: Done
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
                <span key={i} className="text-foreground font-semibold">{part}</span>
            ) : (
                <span key={i}>{part}</span>
            )
        );
    };

    const renderLine = (line: TestLine, index: number) => {
        if (line.type === "blank") {
            return <div key={index} className="h-2.5"/>;
        }

        if (line.type === "summary") {
            return (
                <div key={index} className="text-muted-foreground pt-1 border-t border-border/60 terminal-line-enter">
                    {renderSummaryLine(line.text)}
                </div>
            );
        }

        if (line.type === "fail") {
            const crossIdx = line.text.indexOf("✕");
            if (crossIdx !== -1) {
                return (
                    <div key={index} className="text-muted-foreground terminal-line-enter">
                        {line.text.slice(0, crossIdx)}
                        <span className="text-destructive">✕</span>
                        {line.text.slice(crossIdx + 1)}
                    </div>
                );
            }
            return (
                <div key={index} className="text-muted-foreground terminal-line-enter">
                    {line.text}
                </div>
            );
        }

        const isHeader = /\b(RUN|STORE|READ)\b/.test(line.text);
        if (isHeader) {
            return (
                <div key={index} className="text-foreground font-semibold terminal-line-enter">
                    {line.text}
                </div>
            );
        }

        const checkIdx = line.text.indexOf("✓");
        if (checkIdx !== -1) {
            return (
                <div key={index} className="text-muted-foreground terminal-line-enter">
                    {line.text.slice(0, checkIdx)}
                    <span className="text-status-online">✓</span>
                    {line.text.slice(checkIdx + 1)}
                </div>
            );
        }

        return (
            <div key={index} className="text-muted-foreground terminal-line-enter">
                {line.text}
            </div>
        );
    };

    const cursorBlock = (
        <span
            className={`inline-block w-[7px] h-[14px] bg-foreground align-middle ml-1 ${
                showCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{transform: "translateY(1px)"}}
        />
    );

    return (
        <div className="terminal-wrapper" aria-hidden="true">
            <div className="terminal-container">
                {/* Architectural Console Header */}
                <div className="terminal-titlebar">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-status-online"/>
                        <span className="terminal-title">crawler.test.ts</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {phase === "done" ? "PASS" : "EXEC"}
                    </span>
                </div>

                {/* Body */}
                <div className="terminal-body" ref={terminalBodyRef}>
                    {/* Command line */}
                    <div className="terminal-prompt">
                        <span className="text-muted-foreground">~/portfolio</span>
                        <span className="text-muted-foreground/60">$</span>
                        <span className="text-foreground font-medium">
                            {typedCommand}
                            {phase === "typing" && cursorBlock}
                        </span>
                    </div>

                    {/* Test output */}
                    {visibleLines.length > 0 && (
                        <div className="mt-3 space-y-0.5">
                            {visibleLines.map((line, i) => renderLine(line, i))}
                            {phase === "running" && cursorBlock}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

