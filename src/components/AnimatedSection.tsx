"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    direction?: "up" | "left" | "right" | "scale";
    delay?: number;
    className?: string;
    once?: boolean;
}

export default function AnimatedSection({
    children,
    direction = "up",
    delay = 0,
    className = "",
    once = true,
}: AnimatedSectionProps) {
    const shouldReduceMotion = useReducedMotion();

    const variants = {
        up: { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } },
        left: { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } },
        right: { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } },
        scale: {
            hidden: { opacity: 0, scale: 0.85 },
            visible: { opacity: 1, scale: 1 },
        },
    };

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.3 }}
            variants={variants[direction]}
            transition={{
                duration: 1.0,
                delay,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
