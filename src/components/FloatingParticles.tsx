"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { prefersReducedMotion } from "@/lib/animation.config";

export default function FloatingParticles() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion() || !containerRef.current) return;

        const container = containerRef.current;

        // Clear any existing particles
        container.innerHTML = '';

        const particles: HTMLDivElement[] = [];
        const shapes = ["✦", "★", "♥", "●", "✨"];
        const colors = [
            "text-starlight-gold",
            "text-electric-fuchsia",
            "text-vivid-violet",
            "text-white",
        ];
        // Increase count for more density
        const count = window.innerWidth < 768 ? 25 : 50;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement("div");
            const colorClass = colors[Math.floor(Math.random() * colors.length)];

            particle.className = `absolute select-none pointer-events-none ${colorClass}`;
            particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.fontSize = `${8 + Math.random() * 16}px`;
            particle.style.opacity = "0";

            // Random rotation
            particle.style.transform = `rotate(${Math.random() * 360}deg)`;

            container.appendChild(particle);
            particles.push(particle);
        }

        // Animate each particle individually for natural feel
        particles.forEach((particle, i) => {
            anime({
                targets: particle,
                translateY: [
                    { value: -100 - Math.random() * 200, duration: 4000 + Math.random() * 4000 },
                    { value: 100 + Math.random() * 200, duration: 4000 + Math.random() * 4000 },
                ],
                translateX: [
                    { value: -50 + Math.random() * 100, duration: 5000 + Math.random() * 3000 },
                    { value: 50 - Math.random() * 100, duration: 5000 + Math.random() * 3000 },
                ],
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 0.4 + Math.random() * 0.4, duration: 1000 },
                    { value: 0, duration: 1000, delay: 2000 + Math.random() * 1000 },
                ],
                scale: [
                    { value: 0, duration: 0 },
                    { value: 1, duration: 1000 },
                    { value: 0.5, duration: 2000 },
                ],
                rotate: {
                    value: Math.random() * 360,
                    duration: 10000,
                },
                easing: "easeInOutSine",
                duration: 5000 + Math.random() * 5000,
                delay: Math.random() * 2000,
                loop: true,
                direction: "alternate",
            });
        });

        return () => {
            anime.remove(particles);
            container.innerHTML = '';
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden z-0 mix-blend-screen"
            aria-hidden="true"
        />
    );
}
