"use client";

import { motion } from "motion/react";
import { useActiveSection } from "@/hooks/userActiveSection";

const SECTION_IDS = [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
];

export default function SectionNav() {
    const items = [
        { id: "hero", label: "Home", href: "#" },
        { id: "about", label: "About", href: "#about" },
        { id: "skills", label: "Skills", href: "#skills" },
        { id: "projects", label: "Projects", href: "#projects" },
        { id: "experience", label: "Experience", href: "#experience" },
        { id: "contact", label: "Contact", href: "#contact" },
    ];

    const active = useActiveSection(SECTION_IDS);

    return (
        <nav
            aria-label="Section navigation"
            className="hidden lg:flex fixed inset-e-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4"
        >
            {items.map((item) => {
                const isActive = active === item.id;
                return (
                    <a
                        key={item.id}
                        href={item.href}
                        aria-label={item.label}
                        aria-current={isActive ? "true" : undefined}
                        className="group relative flex items-center justify-center w-4 h-4"
                    >
                        <span
                            className="pointer-events-none absolute inset-e-full me-3 whitespace-nowrap rounded-md
                           bg-white/90 dark:bg-neutral-900/90 backdrop-blur px-2 py-1
                           text-[11px] font-medium text-slate-700 dark:text-slate-200
                           border border-black/6 dark:border-white/8 shadow-sm
                           opacity-0 translate-x-1
                           group-hover:opacity-100 group-hover:translate-x-0
                           transition-all duration-200"
                        >
                            {item.label}
                        </span>

                        <motion.span
                            className="block rounded-full"
                            animate={{
                                height: isActive ? 18 : 8,
                                width: 8,
                                backgroundColor: isActive
                                    ? "rgb(59,130,246)"
                                    : "rgba(148,163,184,0.45)",
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 380,
                                damping: 28,
                            }}
                        />
                    </a>
                );
            })}
        </nav>
    );
}
