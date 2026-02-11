"use client";

import { useState, useRef, useCallback, ReactNode } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/animation.config";
import { Sparkles } from "lucide-react";

interface MemoryCardProps {
    title: string;
    icon: ReactNode;
    note: string;
    gradient: string;
}

export default function MemoryCard({
    title,
    icon,
    note,
    gradient,
}: MemoryCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    const handleFlip = useCallback(() => {
        if (!innerRef.current) return;

        if (prefersReducedMotion()) {
            setIsFlipped(!isFlipped);
            return;
        }

        const targetRotation = isFlipped ? 0 : 180;

        anime({
            targets: innerRef.current,
            rotateY: targetRotation,
            duration: 800,
            easing: "easeInOutCubic",
            complete: () => {
                setIsFlipped(!isFlipped);
            },
        });
    }, [isFlipped]);

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer holographic-border rounded-2xl p-[1px]"
            style={{ perspective: "1200px" }}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            aria-label={`Memory card: ${title}. ${isFlipped ? "Press to close" : "Press to reveal"}`}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleFlip();
            }}
        >
            <div
                ref={innerRef}
                className="relative w-full h-[320px] sm:h-[360px] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-electric-fuchsia/20"
                style={{
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Front */}
                <div
                    className={`absolute inset-0 rounded-2xl ${gradient} glass-card flex flex-col items-center justify-center gap-6 p-6 transition-all duration-500`}
                    style={{ backfaceVisibility: "hidden" }}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-starlight-gold/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative transform transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                            {icon}
                        </div>
                    </div>

                    <div className="text-center space-y-2 relative z-10">
                        <h3 className="font-serif text-xl sm:text-2xl text-white font-medium text-glow-premium tracking-wide">
                            {title}
                        </h3>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-electric-fuchsia to-transparent mx-auto opacity-50 group-hover:opacity-100 transition-all duration-500" />
                    </div>

                    <p className="text-starlight-gold/60 text-xs tracking-widest uppercase mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                        <Sparkles className="w-3 h-3" /> Tap to reveal
                    </p>
                </div>

                {/* Back */}
                <div
                    className="absolute inset-0 rounded-2xl glass-premium flex flex-col items-center justify-center p-8 border border-white/10"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-b from-vivid-violet/20 to-deep-void/80 rounded-2xl" />

                    <div className="text-center space-y-6 relative z-10">
                        <div className="text-white/20 transform scale-75 opacity-50">
                            {icon}
                        </div>

                        <p className="font-serif text-lg sm:text-xl text-white/90 italic leading-relaxed drop-shadow-md">
                            &ldquo;{note}&rdquo;
                        </p>

                        <div className="pt-4">
                            <p className="text-rose-gold/40 text-xs tracking-widest uppercase hover:text-rose-gold transition-colors duration-300">
                                Close Memory
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
