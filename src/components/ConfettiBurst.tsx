"use client";

import { useCallback } from "react";

export default function ConfettiBurst() {
    const fireConfetti = useCallback(async () => {
        const confetti = (await import("canvas-confetti")).default;

        // Heart-shaped confetti from center
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0.6,
            decay: 0.94,
            startVelocity: 20,
            colors: ["#E63946", "#FFB6C1", "#FFD700", "#FF6B7A", "#FFF0F3"],
        };

        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 1.2,
            shapes: ["circle"],
            origin: { x: 0.5, y: 0.5 },
        });

        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 30,
                scalar: 0.8,
                shapes: ["circle"],
                origin: { x: 0.3, y: 0.6 },
            });
        }, 200);

        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 30,
                scalar: 0.8,
                shapes: ["circle"],
                origin: { x: 0.7, y: 0.6 },
            });
        }, 400);
    }, []);

    return (
        <button
            onClick={fireConfetti}
            className="relative px-10 py-5 rounded-full bg-gradient-to-r from-romantic-red via-deep-rose to-romantic-red text-cream font-serif text-xl sm:text-2xl font-bold
                 shadow-lg hover:shadow-2xl glow-red
                 transition-all duration-500 hover:scale-105 active:scale-95
                 focus:outline-none focus:ring-4 focus:ring-soft-pink/50"
            aria-label="Will you be my Valentine? Click for a surprise!"
        >
            <span className="relative z-10">Will You Be My Valentine? 💝</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gold/20 via-transparent to-gold/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
        </button>
    );
}
