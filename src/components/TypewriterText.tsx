"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { prefersReducedMotion } from "@/lib/animation.config";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    onComplete?: () => void;
}

export default function TypewriterText({
    text,
    speed = 50,
    className = "",
    onComplete,
}: TypewriterTextProps) {
    const [displayText, setDisplayText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const hasStarted = useRef(false);

    useEffect(() => {
        if (!isInView || hasStarted.current) return;
        hasStarted.current = true;

        if (prefersReducedMotion()) {
            setDisplayText(text);
            setIsComplete(true);
            onComplete?.();
            return;
        }

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayText(text.slice(0, index + 1));
                index++;
            } else {
                clearInterval(interval);
                setIsComplete(true);
                onComplete?.();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [isInView, text, speed, onComplete]);

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
        >
            <span>{displayText}</span>
            {!isComplete && <span className="typewriter-cursor" />}
        </motion.div>
    );
}
