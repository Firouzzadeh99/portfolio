"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

export function BackgroundOrbs() {
    const { resolvedTheme } = useTheme();

    const [mounted, setMounted] = useState(false);
    const [mobile, setMobile] = useState(false);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setMounted(true);

        const update = () => {
            setMobile(window.innerWidth < 768);
        };

        update();

        requestAnimationFrame(() => {
            setReady(true);
        });

        window.addEventListener("resize", update);

        return () => {
            window.removeEventListener("resize", update);
        };
    }, []);

    const isDark = !mounted || resolvedTheme === "dark";

    const config = useMemo(
        () => ({
            blur: mobile ? 90 : 140,
            auroraBlur: mobile ? 70 : 120,
            move: mobile ? 35 : 90,
            duration: mobile ? 38 : 28,
        }),
        [mobile],
    );

    if (!ready) {
        return (
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" />
        );
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Aurora */}
            <motion.div
                className="
                    absolute
                    -left-[25%]
                    top-[-8%]
                    h-[24rem]
                    w-[32rem]
                    md:h-[52rem]
                    md:w-[72rem]
                    transform-gpu
                    will-change-transform
                "
                style={{
                    background: isDark
                        ? "linear-gradient(135deg, rgba(79,70,229,.18), rgba(139,92,246,.14), rgba(6,182,212,.12))"
                        : "linear-gradient(135deg, rgba(236,72,153,.10), rgba(99,102,241,.08), rgba(59,130,246,.08))",
                    filter: `blur(${config.auroraBlur}px)`,
                }}
                animate={{
                    x: [0, config.move, -config.move / 2, 0],
                    y: [0, config.move / 2, 0],
                }}
                transition={{
                    duration: config.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 1 */}
            <motion.div
                className="
                    absolute
                    -left-32
                    top-16
                    size-[18rem]
                    md:size-[40rem]
                    rounded-full
                    transform-gpu
                    will-change-transform
                "
                style={{
                    background: isDark
                        ? "rgba(59,130,246,.18)"
                        : "rgba(236,72,153,.10)",
                    filter: `blur(${config.blur}px)`,
                }}
                animate={{
                    x: [0, config.move, 0],
                    y: [0, config.move * 0.6, 0],
                }}
                transition={{
                    duration: config.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Orb 2 */}
            <motion.div
                className="
                    absolute
                    right-[-5rem]
                    top-[20%]
                    size-[20rem]
                    md:size-[42rem]
                    rounded-full
                    transform-gpu
                    will-change-transform
                "
                style={{
                    background: isDark
                        ? "rgba(139,92,246,.16)"
                        : "rgba(99,102,241,.08)",
                    filter: `blur(${config.blur}px)`,
                }}
                animate={{
                    x: [0, -config.move, 0],
                    y: [0, config.move * 0.5, 0],
                }}
                transition={{
                    duration: config.duration + 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {ready && !mobile && (
                <motion.div
                    className="
                        absolute
                        bottom-[-12rem]
                        left-1/3
                        size-[34rem]
                        rounded-full
                        transform-gpu
                        will-change-transform
                    "
                    style={{
                        background: "rgba(6,182,212,.12)",
                        filter: `blur(${config.blur}px)`,
                    }}
                    animate={{
                        x: [0, 60, -40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 32,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            )}

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-60"
                style={{
                    backgroundImage: `
                        linear-gradient(
                            ${
                                isDark
                                    ? "rgba(255,255,255,.035)"
                                    : "rgba(99,102,241,.05)"
                            } 1px,
                            transparent 1px
                        ),
                        linear-gradient(
                            90deg,
                            ${
                                isDark
                                    ? "rgba(255,255,255,.035)"
                                    : "rgba(99,102,241,.05)"
                            } 1px,
                            transparent 1px
                        )
                    `,
                    backgroundSize: mobile ? "72px 72px" : "64px 64px",
                    maskImage:
                        "radial-gradient(circle at center, black, transparent 90%)",
                    WebkitMaskImage:
                        "radial-gradient(circle at center, black, transparent 90%)",
                }}
            />
        </div>
    );
}
