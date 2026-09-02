"use client";

import { useState, useEffect } from "react";
import { motion, animate } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;

            setIsVisible(scrollY > 300);
            const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        animate(window.scrollY, 0, {
            duration: 0.6,
            ease: [0.32, 0.72, 0, 1],
            onUpdate: (value) => window.scrollTo(0, value),
        });
    };

    const radius = 24;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - scrollProgress * circumference;

    return (
        <motion.button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-2 md:bottom-4 inset-s-4  md:inset-s-6 z-40 size-14 md:size-16 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            <div className="relative w-14 h-14">
                <svg className="w-14 h-14 -rotate-90">
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="rgba(59, 130, 246, 0.1)"
                        strokeWidth="3"
                        fill="none"
                    />
                    <circle
                        cx="28"
                        cy="28"
                        r={radius}
                        stroke="rgb(59, 130, 246)"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-[stroke-dashoffset] duration-150"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-200">
                        <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
                    </div>
                </div>
            </div>
        </motion.button>
    );
}
