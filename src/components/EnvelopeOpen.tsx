"use client";

import { useState, useRef, useCallback } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/animation.config";

interface EnvelopeOpenProps {
    onComplete: () => void;
}

export default function EnvelopeOpen({ onComplete }: EnvelopeOpenProps) {
    const [isOpening, setIsOpening] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const envelopeRef = useRef<HTMLDivElement>(null);
    const flapRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const handleOpen = useCallback(() => {
        if (isOpening || isComplete) return;
        setIsOpening(true);

        if (prefersReducedMotion()) {
            setIsComplete(true);
            setTimeout(onComplete, 300);
            return;
        }

        const tl = anime.timeline({
            easing: "easeInOutQuad",
        });

        // Step 1: Background blur overlay
        tl.add({
            targets: overlayRef.current,
            opacity: [0, 1],
            duration: 600,
        });

        // Step 2: Envelope lifts slightly
        tl.add(
            {
                targets: envelopeRef.current,
                translateY: -20,
                scale: 1.05,
                duration: 500,
                easing: "easeOutCubic",
            },
            "-=400"
        );

        // Step 3: Flap opens (rotateX)
        tl.add({
            targets: flapRef.current,
            rotateX: -180,
            duration: 900,
            easing: "easeInOutCubic",
        });

        // Step 4: Letter slides up
        tl.add(
            {
                targets: letterRef.current,
                translateY: -200,
                opacity: [0, 1],
                duration: 1000,
                easing: "easeOutCubic",
            },
            "-=400"
        );

        // Step 5: Letter paper unfolds (scaleY) - Optional visual flair
        // In this simplified version, we just slide it up, but we could add unfolding logic

        // Step 6: Glow pulse
        tl.add({
            targets: envelopeRef.current,
            boxShadow: [
                "0 30px 60px -12px rgba(0, 0, 0, 0.6)",
                "0 0 80px rgba(251,191,36,0.3), 0 0 120px rgba(217,70,239,0.2)",
            ],
            duration: 600,
        });

        // Step 7: Everything fades out → transition
        tl.add({
            targets: [envelopeRef.current, overlayRef.current],
            opacity: 0,
            scale: [1.05, 1.2],
            duration: 800,
            easing: "easeInCubic",
            complete: () => {
                setIsComplete(true);
                onComplete();
            },
        });
    }, [isOpening, isComplete, onComplete]);

    if (isComplete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Pointer events only on interactive elements */}
            {/* Blur overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 pointer-events-auto"
            />

            {/* Envelope Container Wrapper with Responsive Scaling */}
            <div
                className="pointer-events-auto relative cursor-pointer group hover:scale-105 transition-transform duration-500 scale-[0.85] sm:scale-100"
                onClick={handleOpen}
            >
                <div
                    ref={envelopeRef}
                    className="relative w-80 h-48 bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-lg envelope-shadow envelope-texture border border-white/5"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Flap */}
                    <div
                        ref={flapRef}
                        className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[100px] border-t-indigo-800 border-r-[160px] border-r-transparent origin-top z-30 drop-shadow-xl"
                        style={{
                            transformStyle: "preserve-3d",
                            filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                        }}
                    >
                        {/* Seal - Gold Foil Effect */}
                        <div className="absolute -top-[90px] -left-[24px] w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-700 shadow-lg flex items-center justify-center border border-yellow-200">
                            <span className="text-yellow-900 text-xl font-serif font-bold">♥</span>
                        </div>
                    </div>

                    {/* Letter (Hidden inside initially) - Premium Paper Texture */}
                    <div
                        ref={letterRef}
                        className="absolute left-4 right-4 top-2 h-40 bg-[#fff1f2] rounded shadow-sm flex items-center justify-center z-10 origin-bottom"
                        style={{
                            backgroundImage: "linear-gradient(to bottom, #fff1f2 0%, #fff0f5 100%)",
                        }}
                    >
                        <div className="text-center p-4">
                            <p className="font-serif text-indigo-950 font-bold text-lg">For You</p>
                            <div className="w-8 h-px bg-indigo-200 mx-auto my-2"></div>
                            <p className="text-xs text-indigo-800/60 uppercase tracking-widest">Open Me</p>
                        </div>
                    </div>

                    {/* Envelope Body (Front) */}
                    <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-b-[100px] border-b-indigo-900 border-r-[160px] border-r-transparent z-20 pointer-events-none envelope-texture opacity-95" />

                    {/* Side Flaps for depth */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-indigo-950/40 border-b-[96px] border-b-transparent z-10" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-r-[40px] border-r-indigo-950/40 border-b-[96px] border-b-transparent z-10" />
                </div>

                <div className="mt-12 text-center space-y-2 opacity-80">
                    <p className="text-starlight-gold/60 text-sm tracking-widest uppercase animate-pulse">Tap to open</p>
                </div>
            </div>
        </div>
    );
}
