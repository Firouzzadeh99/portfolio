"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ProjectCategory } from "@/types/project";

const filters: ("All" | ProjectCategory)[] = [
    "All",
    "Frontend",
    "Backend",
    "Bot",
];

export default function ProjectFilter({
    active,
    onChange,
}: {
    active: string;
    onChange: (value: string) => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className="flex justify-center">
            {/* <div className="inline-flex mx-auto flex-wrap justify-center gap-1 rounded-full border border-slate-300/60 bg-slate-200/70 py-1.5 px-1 dark:border-white/10 dark:bg-sky-900/30">
                {filters.map((filter) => {
                    const isActive = active === filter;

                    return (
                        <button
                            key={filter}
                            onClick={() => onChange(filter)}
                            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                                isActive
                                    ? "text-white"
                                    : "text-slate-600 hover:text-slate-900 dark:text-blue-300/70 dark:hover:text-blue-200"
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="active-filter-pill"
                                    className="absolute inset-0 rounded-full bg-linear-to-r from-violet-500 to-purple-600 shadow-lg shadow-purple-500/30"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}

                            <span className="relative z-10">{filter}</span>
                        </button>
                    );
                })}
            </div> */}
        </div>
    );
}
