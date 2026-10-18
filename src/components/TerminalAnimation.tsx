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
    const [typedLength, setTypedLength] = useState(0);
    const [visibleCount, setVisibleCount] = useState(0);
    const animationRef = useRef<{ cancelled: boolean }>({cancelled: false});

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
            setTypedLength(COMMAND.length);
            setVisibleCount(TEST_SEQUENCE.length);
            setPhase("done");
            return;
        }

        // Phase 1: Type command (pre-allocated width prevents layout shift)
        setPhase("typing");
        setTypedLength(0);
        setVisibleCount(0);

        for (let i = 1; i <= COMMAND.length; i++) {
            if (isCancelled()) return;
            setTypedLength(i);
            await sleep(25 + Math.random() * 20);
        }

        await sleep(280);
        if (isCancelled()) return;

        // Phase 2: Reveal test output lines in reserved slots (zero CLS, zero forced reflow)
        setPhase("running");

        for (let idx = 0; idx < TEST_SEQUENCE.length; idx++) {
            if (isCancelled()) return;
            await sleep(TEST_SEQUENCE[idx].delay);
            if (isCancelled()) return;
            setVisibleCount(idx + 1);
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

    const renderLine = (line: TestLine, index: number, isVisible: boolean) => {
        const visibilityClass = isVisible ? "visible" : "invisible select-none";

        if (line.type === "blank") {
            return <div key={index} className={`h-2.5 ${visibilityClass}`}/>;
        }

        if (line.type === "summary") {
            return (
                <div key={index} className={`text-muted-foreground pt-1 border-t border-border/60 ${visibilityClass}`}>
                    {renderSummaryLine(line.text)}
                </div>
            );
        }

        if (line.type === "fail") {
            const crossIdx = line.text.indexOf("✕");
            if (crossIdx !== -1) {
                return (
                    <div key={index} className={`text-muted-foreground ${visibilityClass}`}>
                        {line.text.slice(0, crossIdx)}
                        <span className="text-destructive">✕</span>
                        {line.text.slice(crossIdx + 1)}
                    </div>
                );
            }
            return (
                <div key={index} className={`text-muted-foreground ${visibilityClass}`}>
                    {line.text}
                </div>
            );
        }

        const isHeader = /\b(RUN|STORE|READ)\b/.test(line.text);
        if (isHeader) {
            return (
                <div key={index} className={`text-foreground font-semibold ${visibilityClass}`}>
                    {line.text}
                </div>
            );
        }

        const checkIdx = line.text.indexOf("✓");
        if (checkIdx !== -1) {
            return (
                <div key={index} className={`text-muted-foreground ${visibilityClass}`}>
                    {line.text.slice(0, checkIdx)}
                    <span className="text-status-online">✓</span>
                    {line.text.slice(checkIdx + 1)}
                </div>
            );
        }

        return (
            <div key={index} className={`text-muted-foreground ${visibilityClass}`}>
                {line.text}
            </div>
        );
    };

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
                <div className="terminal-body">
                    {/* Command line with pre-reserved width to prevent layout shifts */}
                    <div className="terminal-prompt">
                        <span className="text-muted-foreground shrink-0">~/portfolio</span>
                        <span className="text-muted-foreground shrink-0">$</span>
                        <span className="text-foreground font-medium truncate">
                            <span>{COMMAND.slice(0, typedLength)}</span>
                            <span className="invisible select-none">{COMMAND.slice(typedLength)}</span>
                        </span>
                    </div>

                    {/* Pre-allocated test output lines */}
                    <div className="mt-3 space-y-0.5">
                        {TEST_SEQUENCE.map((line, i) => renderLine(line, i, i < visibleCount))}
                    </div>
                </div>
            </div>
        </div>
    );
};

