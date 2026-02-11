"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import StoryScroll from "@/components/StoryScroll";

// Dynamic imports for animation-heavy components
const FloatingParticles = dynamic(
  () => import("@/components/FloatingParticles"),
  { ssr: false }
);
const EnvelopeOpen = dynamic(() => import("@/components/EnvelopeOpen"), {
  ssr: false,
});

type Scene = "landing" | "envelope" | "story";

export default function HomePage() {
  const [scene, setScene] = useState<Scene>("landing");

  const handleCTAClick = () => {
    setScene("envelope");
  };

  const handleEnvelopeComplete = () => {
    setScene("story");
  };

  return (
    <main className="relative">
      {/* ═══════════════════════════════════════════════ */}
      {/*  SCENE 1: LANDING                              */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {scene === "landing" && (
          <motion.section
            key="landing"
            className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden romantic-gradient"
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8 } }}
          >
            <FloatingParticles />

            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
              {/* Staggered headline */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.15 } },
                }}
              >
                {["A", "Story", "Written", "in the", "Stars"].map(
                  (word, i) => (
                    <motion.span
                      key={i}
                      className="inline-block font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-white mr-3 sm:mr-4 text-glow-premium hover:text-electric-fuchsia transition-colors duration-500"
                      variants={{
                        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
                        visible: {
                          opacity: 1,
                          y: 0,
                          filter: "blur(0px)",
                          transition: {
                            duration: 1,
                            ease: [0.25, 0.1, 0.25, 1],
                          },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  )
                )}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                className="mt-6 sm:mt-8 text-starlight-gold/80 text-base sm:text-lg md:text-xl font-light tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                A love letter, crafted just for you
              </motion.p>

              {/* CTA Button */}
              <motion.button
                className="mt-10 sm:mt-14 px-8 sm:px-12 py-4 sm:py-5 rounded-full glass-premium border border-starlight-gold/30
                           text-white font-serif text-lg sm:text-xl font-medium
                           hover:bg-electric-fuchsia/20 hover:border-starlight-gold hover:scale-105
                           active:scale-95
                           transition-all duration-500 glow-purple
                           group relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                onClick={handleCTAClick}
                whileHover={{
                  boxShadow:
                    "0 0 40px rgba(217,70,239,0.4), 0 0 80px rgba(139,92,246,0.2)",
                }}
              >
                <span className="relative z-10">Open Your Letter <span className="inline-block transform group-hover:rotate-12 transition-transform">❤️</span></span>
                <div className="absolute inset-0 bg-gradient-to-r from-vivid-violet/20 to-electric-fuchsia/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.button>

              {/* Scroll indicator */}
              <motion.div
                className="mt-16 sm:mt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.div
                  className="w-6 h-10 rounded-full border-2 border-white/20 mx-auto flex justify-center"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    className="w-1.5 h-3 rounded-full bg-white/50 mt-2"
                    animate={{ y: [0, 12, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SCENE 2: ENVELOPE OPENING                     */}
      {/* ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {scene === "envelope" && (
          <motion.div
            key="envelope"
            className="fixed inset-0 z-50 romantic-gradient"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FloatingParticles />
            <div className="absolute inset-0 flex items-center justify-center">
              <EnvelopeOpen onComplete={handleEnvelopeComplete} />
            </div>

            <div className="absolute bottom-10 left-0 right-0 text-center">
              <motion.p
                className="text-starlight-gold/50 text-xs font-light tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                Tap the envelope using your heart
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════ */}
      {/*  SCENE 3: SCROLL STORY                        */}
      {/* ═══════════════════════════════════════════════ */}
      {scene === "story" && <StoryScroll />}
    </main>
  );
}
