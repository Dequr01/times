"use client";

import { useState, useRef, useCallback } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/animation.config";
import { Heart } from "lucide-react";

interface EnvelopeOpenProps {
    onComplete: () => void;
}

export default function EnvelopeOpen({ onComplete }: EnvelopeOpenProps) {
    const [isOpening, setIsOpening] = useState(false);
    const [isLetterReady, setIsLetterReady] = useState(false); // New state: Letter is out and waiting
    const [isComplete, setIsComplete] = useState(false);

    const envelopeRef = useRef<HTMLDivElement>(null);
    const flapRef = useRef<HTMLDivElement>(null);
    const letterRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Dynamic Names from Environment Variables
    const womanName = process.env.NEXT_PUBLIC_WOMAN_NAME || "My Love";

    // Step 1: Open Envelope and Extract Letter (Auto or Click)
    const handleOpen = useCallback(() => {
        if (isOpening || isComplete || isLetterReady) return;
        setIsOpening(true);

        if (prefersReducedMotion()) {
            setIsLetterReady(true);
            return;
        }

        const tl = anime.timeline({
            easing: "easeInOutQuad",
        });

        // Background blur overlay
        tl.add({
            targets: overlayRef.current,
            opacity: [0, 1],
            duration: 600,
        });

        // Envelope lifts and tilts
        tl.add(
            {
                targets: envelopeRef.current,
                translateY: -30,
                scale: 1.05,
                rotateX: 10,
                duration: 600,
                easing: "easeOutBack",
            },
            "-=400"
        );

        // Flap snaps open
        tl.add({
            targets: flapRef.current,
            rotateX: -180,
            duration: 800,
            easing: "spring(1, 80, 10, 0)",
        });

        // Letter "Rolls Out" to a readable position
        tl.add(
            {
                targets: letterRef.current,
                translateY: -220, // Slide out
                rotateZ: [0, -2], // Slight tilt
                scale: [0.9, 1.1], // Scale up slightly to be readable
                opacity: [0, 1],
                duration: 900,
                easing: "easeOutExpo",
                complete: () => setIsLetterReady(true), // Ready for user interaction
            },
            "-=600"
        );

        // Glow pulse on envelope to highlight interaction
        tl.add({
            targets: envelopeRef.current,
            boxShadow: [
                "0 0 100px rgba(217,70,239,0.4), 0 0 140px rgba(251,191,36,0.3)",
            ],
            duration: 800,
        });

    }, [isOpening, isComplete, isLetterReady]);

    // Step 2: Unfold Letter and Transition (Triggered by Clicking Letter)
    const handleLetterClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent bubbling causing issues
        if (!isLetterReady || isComplete) return;

        const tl = anime.timeline({
            easing: "easeInOutCubic",
            complete: () => {
                setIsComplete(true);
                onComplete(); // Mount StoryScroll
            }
        });

        // 1. Envelope and background fade out + scale down (Vanishing)
        tl.add({
            targets: [envelopeRef.current, overlayRef.current],
            opacity: 0,
            scale: 0.9,
            duration: 600,
            easing: "easeInQuad",
        });

        // 2. Letter "Unfolds" (Expands to fill screen)
        // We simulate this by scaling it up massively
        tl.add({
            targets: letterRef.current,
            scale: [1.1, 10], // Massive scale to fill screen
            rotateZ: 0, // Straighten
            translateY: -300, // Move up
            filter: "brightness(2) opacity(0)", // Fade to white/transparent
            duration: 1000,
            offset: "-=500"
        });

    }, [isLetterReady, isComplete, onComplete]);

    if (isComplete) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Overlay */}
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-md opacity-0 pointer-events-auto transition-opacity"
            />

            {/* Envelope Container */}
            <div
                className="pointer-events-auto relative cursor-pointer group hover:scale-105 transition-transform duration-500 scale-[0.85] sm:scale-100 lg:scale-125 perspective-1000"
                onClick={handleOpen}
            >
                <div
                    ref={envelopeRef}
                    className="relative w-80 h-48 bg-gradient-to-br from-[#1e1b4b] to-[#0f0720] rounded-lg envelope-shadow envelope-texture border border-white/10"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Flap (Front) */}
                    <div
                        ref={flapRef}
                        className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[100px] border-t-[#271a42] border-r-[160px] border-r-transparent origin-top z-40 drop-shadow-2xl"
                        style={{
                            transformStyle: "preserve-3d",
                            borderTopColor: "#2e1065",
                            filter: "brightness(1.1)",
                        }}
                    >
                        {/* Gold Foil Seal */}
                        <div className="absolute -top-[90px] -left-[24px] w-12 h-12 rounded-full gold-foil shadow-xl flex items-center justify-center border border-yellow-200/40 z-50 group-hover:scale-110 transition-transform duration-300">
                            <Heart className="w-5 h-5 text-yellow-900 fill-yellow-900/80" />
                        </div>
                    </div>

                    {/* The Letter (Interactive) */}
                    <div
                        ref={letterRef}
                        className={`absolute left-3 right-3 top-2 h-40 bg-[#fff1f2] rounded shadow-md flex items-center justify-center z-50 origin-center texture-paper border border-rose-100/50 ${isLetterReady ? 'cursor-pointer hover:scale-105 hover:rotate-0 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.6)]' : ''}`}
                        style={{
                            boxShadow: "inset 0 0 20px rgba(0,0,0,0.05)",
                        }}
                        onClick={handleLetterClick} // CLICK HANDLER
                    >
                        <div className="text-center p-6 w-full pointer-events-none"> {/* Text non-interactive */}
                            <p className="font-serif text-slate-800 font-bold text-xl tracking-wide mb-2 opacity-90">
                                For {womanName}
                            </p>
                            <div className="h-px w-12 bg-rose-300 mx-auto mb-2" />
                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium opacity-70">
                                {isLetterReady ? "Click to Read" : "Open Me"}
                            </p>
                        </div>
                    </div>

                    {/* Envelope Body (Pocket Front) */}
                    <div
                        className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-b-[100px] border-b-[#1e1b4b] border-r-[160px] border-r-transparent z-30 pointer-events-none envelope-texture"
                        style={{ borderBottomColor: "#1e1b4b" }}
                    />

                    {/* Side Flaps (Pocket Depth) */}
                    <div className="absolute top-0 left-0 w-0 h-0 border-l-[40px] border-l-[#170e2e] border-b-[96px] border-b-transparent z-20" />
                    <div className="absolute top-0 right-0 w-0 h-0 border-r-[40px] border-r-[#170e2e] border-b-[96px] border-b-transparent z-20" />

                    {/* Inner Shadow for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 rounded-lg pointer-events-none mix-blend-multiply" />
                </div>

                <div className={`mt-16 text-center space-y-2 opacity-80 transition-opacity duration-300 ${isLetterReady ? 'opacity-0' : 'opacity-100'}`}>
                    <p className="text-starlight-gold/60 text-sm tracking-widest uppercase animate-pulse">
                        Tap Envelope
                    </p>
                </div>
            </div>
        </div>
    );
}
