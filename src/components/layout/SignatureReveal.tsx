"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Dancing_Script } from "next/font/google";
import { useMemo } from "react";

const dancingScript = Dancing_Script({
    subsets: ["latin"],
    weight: ["400", "700"],
});

interface SignatureRevealProps {
    text?: string;
    color?: string;
    className?: string;
    onComplete?: () => void;
}

export default function SignatureReveal({
    text = "Masoumeh Firouzzadeh",
    color = "#4facfe",
    className,
    onComplete,
}: SignatureRevealProps) {
    const prefersReducedMotion = useReducedMotion();
    const letters = useMemo(() => Array.from(text), [text]);

    const staggerStep = prefersReducedMotion ? 0 : 0.07;
    const startDelay = 0.15;

    const container: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: staggerStep,
                delayChildren: startDelay,
            },
        },
    };

    // Each letter drops from above, overshoots slightly past its resting spot,
    // then springs back up into place — gives it real weight instead of a flat fade.
    const letterVariant: Variants = {
        hidden: { opacity: 0, y: -90, scale: 0.6 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 9,
                stiffness: 180,
                mass: 0.6,
            },
        },
    };

    return (
        <div
            className={`h-screen w-full flex items-center justify-center bg-background/50 backdrop-blur-2xl ${className || ""}`}
        >
            <motion.h1
                variants={container}
                initial="hidden"
                animate="visible"
                onAnimationComplete={() => onComplete?.()}
                className={`${dancingScript.className} font-bold text-7xl md:text-8xl lg:text-9xl select-none flex`}
                style={{ color }}
            >
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        variants={letterVariant}
                        style={{
                            display: "inline-block",
                            willChange: "transform",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h1>
        </div>
    );
}
