"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    Heart,
    Stars,
    Music,
    Camera,
    MapPin,
    Sparkles,
    Quote,
    Infinity as InfinityIcon,
    Sun,
    CloudRain,
    Utensils,
    Laugh
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import MemoryCard from "@/components/MemoryCard";
import TypewriterText from "@/components/TypewriterText";
import BeatingHeart from "@/components/BeatingHeart";
import dynamic from "next/dynamic";

const ConfettiBurst = dynamic(() => import("@/components/ConfettiBurst"), {
    ssr: false,
});

const memories = [
    {
        title: "Our First Laugh",
        icon: <Laugh className="w-12 h-12 text-starlight-gold" />,
        note: "That moment when our eyes met and the world around us faded into nothing but your smile.",
        gradient: "bg-gradient-to-br from-electric-fuchsia/20 to-vivid-violet/20",
    },
    {
        title: "Starlit Walks",
        icon: <Stars className="w-12 h-12 text-vivid-violet" />,
        note: "Walking under the stars, hand in hand, feeling like the universe was ours to explore.",
        gradient: "bg-gradient-to-br from-deep-void/40 to-cosmic-purple/40",
    },
    {
        title: "Rainy Day In",
        icon: <CloudRain className="w-12 h-12 text-electric-fuchsia" />,
        note: "Wrapped in blankets, listening to the rain, needing nothing more than each other.",
        gradient: "bg-gradient-to-br from-cosmic-purple/30 to-electric-fuchsia/20",
    },
    {
        title: "First Adventure",
        icon: <MapPin className="w-12 h-12 text-rose-gold" />,
        note: "Getting lost together and realizing that with you, I'm always exactly where I belong.",
        gradient: "bg-gradient-to-br from-rose-gold/20 to-starlight-gold/20",
    },
    {
        title: "Kitchen Chaos",
        icon: <Utensils className="w-12 h-12 text-starlight-gold" />,
        note: "Flour on your nose, burnt pancakes, and the most perfect breakfast we ever had.",
        gradient: "bg-gradient-to-br from-starlight-gold/20 to-vivid-violet/20",
    },
    {
        title: "Sunset Promise",
        icon: <Sun className="w-12 h-12 text-electric-fuchsia" />,
        note: "Watching the sun dip below the horizon, knowing every ending with you is a new beginning.",
        gradient: "bg-gradient-to-br from-vivid-violet/30 to-rose-gold/20",
    },
];

const loveReasons = [
    "The way you laugh when you think no one is watching",
    "How you make even ordinary moments feel extraordinary",
    "Your kindness that touches everyone around you",
    "The warmth of your hand reaching for mine",
    "How you believe in me, even when I don't",
    "Your voice — my favorite sound in any room",
];

export default function StoryScroll() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Parallax transforms
    const ch1Parallax1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
    const ch1Parallax2 = useTransform(scrollYProgress, [0, 0.25], [0, -60]);
    const ch3Parallax1 = useTransform(scrollYProgress, [0.4, 0.7], [50, -80]);
    const ch3Parallax2 = useTransform(scrollYProgress, [0.5, 0.75], [40, -60]);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
        >
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-vivid-violet via-electric-fuchsia to-starlight-gold z-50 origin-left"
                style={{ scaleX: scrollYProgress }}
            />

            {/* ──── CHAPTER 1: The Day We Met ──── */}
            <section className="relative min-h-screen flex items-center chapter-1-bg overflow-hidden">
                <motion.div
                    className="absolute top-20 right-10 opacity-30 text-starlight-gold"
                    style={{ y: ch1Parallax1 }}
                >
                    <Sparkles size={120} strokeWidth={1} className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]" />
                </motion.div>
                <motion.div
                    className="absolute bottom-20 left-10 opacity-20 text-electric-fuchsia"
                    style={{ y: ch1Parallax2 }}
                >
                    <Stars size={180} strokeWidth={0.5} className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]" />
                </motion.div>

                <div className="container mx-auto px-6 sm:px-8 py-20 sm:py-32 max-w-5xl">
                    <AnimatedSection>
                        <p className="text-electric-fuchsia/80 text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-6">
                            Chapter One
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className="font-serif text-5xl sm:text-7xl md:text-9xl font-bold text-white text-glow-premium leading-tight">
                            The Day
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-fuchsia to-vivid-violet">
                                We Met
                            </span>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4}>
                        <div className="mt-8 sm:mt-12 h-px w-24 sm:w-32 bg-gradient-to-r from-electric-fuchsia to-transparent" />
                    </AnimatedSection>

                    <AnimatedSection delay={0.5} direction="left">
                        <p className="mt-10 sm:mt-16 text-white/80 text-lg sm:text-2xl leading-relaxed max-w-3xl font-light tracking-wide">
                            There are moments that change everything — a glance, a smile,
                            a heartbeat that whispers{" "}
                            <span className="text-starlight-gold italic">&quot;this is it.&quot;</span>{" "}
                            The day we met wasn&apos;t just a date on a calendar. It was the
                            beginning of forever.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.7} direction="left">
                        <p className="mt-8 text-white/50 text-base sm:text-xl leading-relaxed max-w-3xl font-light">
                            I remember the way the light caught your eyes, how the world
                            went quiet for just a moment, and how something deep inside me
                            knew — I was home.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.9} direction="scale">
                        <div className="mt-16 sm:mt-24 glass-premium rounded-3xl p-8 sm:p-12 max-w-2xl glow-purple relative overflow-hidden group border border-white/10">
                            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-vivid-violet to-electric-fuchsia" />
                            <Quote className="absolute top-6 right-6 text-white/10 w-12 h-12 sm:w-16 sm:h-16" />
                            <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 italic text-center leading-relaxed relative z-10">
                                &quot;Some love stories don&apos;t start with a bang — they start with
                                a quiet knowing.&quot;
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* ──── CHAPTER 2: Our Favorite Memories ──── */}
            <section className="relative min-h-screen chapter-2-bg overflow-hidden">
                <div className="container mx-auto px-6 sm:px-8 py-20 sm:py-32 max-w-7xl">
                    <AnimatedSection>
                        <p className="text-starlight-gold/80 text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-6 text-center">
                            Chapter Two
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className="font-serif text-5xl sm:text-7xl md:text-9xl font-bold text-white text-glow-gold text-center leading-tight">
                            Our Favorite
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-starlight-gold to-rose-gold">
                                Memories
                            </span>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <p className="mt-10 sm:mt-16 text-white/60 text-center text-lg sm:text-2xl max-w-2xl mx-auto font-light">
                            Every moment with you is a treasure. Here are just a few of
                            the countless memories I hold close to my heart.
                        </p>
                    </AnimatedSection>

                    {/* Memory Cards Grid */}
                    <div className="mt-20 sm:mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 px-4 sm:px-0">
                        {memories.map((memory, i) => (
                            <AnimatedSection
                                key={memory.title}
                                delay={0.1 * i}
                                direction="scale"
                            >
                                <div className="transform hover:scale-105 transition-transform duration-500">
                                    <MemoryCard {...memory} />
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── CHAPTER 3: Why I Love You ──── */}
            <section className="relative min-h-screen chapter-3-bg overflow-hidden">
                <motion.div
                    className="absolute top-32 left-8 opacity-20 text-electric-fuchsia"
                    style={{ y: ch3Parallax1 }}
                >
                    <Heart size={140} strokeWidth={1} className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px]" />
                </motion.div>
                <motion.div
                    className="absolute bottom-32 right-8 opacity-20 text-vivid-violet"
                    style={{ y: ch3Parallax2 }}
                >
                    <Heart size={100} strokeWidth={1} fill="currentColor" className="w-[80px] h-[80px] sm:w-[150px] sm:h-[150px]" />
                </motion.div>

                <div className="container mx-auto px-6 sm:px-8 py-20 sm:py-32 max-w-5xl">
                    <AnimatedSection>
                        <p className="text-rose-gold/80 text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-6 text-center">
                            Chapter Three
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className="font-serif text-5xl sm:text-7xl md:text-9xl font-bold text-white text-glow-premium text-center leading-tight">
                            Why I
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold to-electric-fuchsia">
                                Love You
                            </span>
                        </h2>
                    </AnimatedSection>

                    <div className="mt-20 sm:mt-24 space-y-8 sm:space-y-12">
                        {loveReasons.map((reason, i) => (
                            <AnimatedSection
                                key={i}
                                delay={0.1 * i}
                                direction={i % 2 === 0 ? "left" : "right"}
                            >
                                <div className="glass-card rounded-3xl p-8 sm:p-12 hover:border-electric-fuchsia/50 transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-gradient-to-r from-vivid-violet/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="flex items-start gap-6 sm:gap-8 relative z-10">
                                        <Heart className="text-electric-fuchsia w-10 h-10 sm:w-14 sm:h-14 mt-1 group-hover:scale-110 group-hover:fill-electric-fuchsia/20 transition-all duration-300 flex-shrink-0" />
                                        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-white/90 italic leading-relaxed">
                                            {reason}
                                        </p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ──── CHAPTER 4: Forever? (Finale) ──── */}
            <section className="relative min-h-screen chapter-4-bg overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,39,119,0.2),transparent_70%)]" />

                <div className="relative z-10 container mx-auto px-6 sm:px-8 py-20 sm:py-32 max-w-4xl text-center">
                    <AnimatedSection>
                        <p className="text-starlight-gold/80 text-xs sm:text-sm tracking-[0.4em] uppercase font-medium mb-6">
                            The Final Chapter
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <h2 className="font-serif text-5xl sm:text-7xl md:text-9xl font-bold text-white text-glow-gold leading-tight">
                            Forever
                            <span className="text-starlight-gold">?</span>
                        </h2>
                    </AnimatedSection>

                    <AnimatedSection delay={0.4} direction="scale">
                        <div className="mt-20 sm:mt-24 relative">
                            <div className="absolute inset-0 blur-3xl bg-electric-fuchsia/20 rounded-full scale-150 animate-pulse" />
                            <BeatingHeart size={200} className="relative z-10 drop-shadow-2xl w-[150px] h-[150px] sm:w-[250px] sm:h-[250px]" />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.6}>
                        <div className="mt-16 sm:mt-24">
                            <TypewriterText
                                text="Every love story is beautiful, but ours is my favorite. You are my today and all of my tomorrows. I choose you — and I'll keep choosing you, every single day."
                                speed={40}
                                className="font-serif text-2xl sm:text-3xl md:text-4xl text-white/90 italic leading-relaxed px-4"
                            />
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.8}>
                        <div className="mt-16 sm:mt-24 flex items-center justify-center gap-6 sm:gap-8 opacity-60">
                            <div className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent to-starlight-gold" />
                            <InfinityIcon className="text-starlight-gold w-10 h-10 sm:w-12 sm:h-12" />
                            <div className="h-px w-24 sm:w-32 bg-gradient-to-l from-transparent to-starlight-gold" />
                        </div>
                    </AnimatedSection>

                    {/* Confetti CTA */}
                    <AnimatedSection delay={1.0} direction="scale">
                        <div className="mt-16 sm:mt-20">
                            <ConfettiBurst />
                        </div>
                    </AnimatedSection>

                    {/* Footer signature */}
                    <AnimatedSection delay={1.2}>
                        <div className="mt-24 sm:mt-32 space-y-3 sm:space-y-4">
                            <p className="text-white/40 text-sm sm:text-base font-light tracking-widest uppercase">
                                Made with <Heart className="inline w-4 h-4 text-electric-fuchsia mx-1 fill-current" /> for {process.env.NEXT_PUBLIC_WOMAN_NAME || "You"} by {process.env.NEXT_PUBLIC_MAN_NAME || "Me"}
                            </p>
                            <p className="text-white/20 text-xs sm:text-sm">
                                Happy Valentine&apos;s Day 2026
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </motion.div>
    );
}
