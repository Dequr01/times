"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/animation.config";

interface BeatingHeartProps {
    size?: number;
    className?: string;
}

export default function BeatingHeart({ size = 120, className = "" }: BeatingHeartProps) {
    const heartRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !heartRef.current) return;

        const anim = anime({
            targets: heartRef.current,
            scale: [1, 1.15, 1, 1.1, 1],
            duration: 1500,
            easing: "easeInOutSine",
            loop: true,
        });

        return () => anim.pause();
    }, []);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <svg
                ref={heartRef}
                viewBox="0 0 24 24"
                width={size}
                height={size}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Beating heart"
                role="img"
            >
                <defs>
                    <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E63946" />
                        <stop offset="50%" stopColor="#FF6B7A" />
                        <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                    <filter id="heartGlow">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#heartGrad)"
                    filter="url(#heartGlow)"
                />
            </svg>
        </div>
    );
}
