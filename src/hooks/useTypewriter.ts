import {useEffect, useRef, useState} from "react";

interface UseTypewriterOptions {
    text: string;
    speed?: number;
    startDelay?: number;
    enabled?: boolean;
}

export const useTypewriter = ({
                                  text,
                                  speed = 40,
                                  startDelay = 0,
                                  enabled = true,
                              }: UseTypewriterOptions) => {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!enabled || hasStarted.current) return;
        hasStarted.current = true;

        setDisplayedText("");
        setIsDone(false);

        const startTimeout = setTimeout(() => {
            setIsTyping(true);
            let index = 0;

            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayedText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                    setIsDone(true);
                }
            }, speed);

            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(startTimeout);
    }, [enabled, text, speed, startDelay]);

    return {displayedText, isTyping, isDone};
};

