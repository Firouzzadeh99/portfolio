"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { ResumePreviewModal } from "@/components/ui/resume-preview-modal";
import { useTransitionRouter } from "next-view-transitions";
import { IconMenu2, IconX, IconEye, IconDownload } from "@tabler/icons-react";
import { navItems } from "@/data/navItems";

// Adjust if your resume lives somewhere else under /public.
// This matches the `fileName` prop already passed to <ResumeButton /> on desktop.
const RESUME_FILE = "firouzzadeh-resume.pdf";

export const MobileNavbar = () => {
    const [open, setOpen] = useState(false);
    const [resumeModalOpen, setResumeModalOpen] = useState(false);
    const { resolvedTheme } = useTheme();
    const router = useTransitionRouter();
    const cardRef = useRef<HTMLDivElement>(null);

    const topBarRef = useRef<HTMLDivElement>(null);

    const lenis = useLenis();

    const resumePath = `/${RESUME_FILE}`;

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const handleLogoClick = () => {
        setOpen(false);
        router.push("/");
    };

    const handleNavClick = (link: string) => {
        setOpen(false);

        if (link.startsWith("/")) {
            router.push(link);
            return;
        }

        if (window.location.pathname !== "/") {
            router.push(`/#${link}`);
            return;
        }

        const scroll = () => {
            const target = document.getElementById(link);

            if (!target) return;

            if (lenis) {
                lenis.scrollTo(target, {
                    offset: -70,
                    duration: 1.1,
                });
            } else {
                const y =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    70;

                window.scrollTo({
                    top: y,
                    behavior: "smooth",
                });
            }

            window.history.replaceState(null, "", `#${link}`);
        };

        // صبر کن منو کامل بسته بشه
        setTimeout(scroll, 260);
    };

    return (
        <>
            <div className="sm:hidden fixed top-0 inset-x-0 z-50 px-4 pt-4">
                <motion.div
                    ref={cardRef}
                    layout
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={cn(
                        "rounded-2xl overflow-hidden",
                        "border border-blue-400/40 dark:border-blue-500/25",
                        "bg-white/80 dark:bg-background/20 backdrop-blur-3xl",
                        "shadow-sm shadow-blue-500/5 dark:shadow-blue-500/10",
                    )}
                >
                    {/* Top bar — always visible, height never changes (used for --nav-height) */}
                    <div
                        ref={topBarRef}
                        className="flex items-center justify-between px-3 py-2.5"
                    >
                        <AnimatedLogo
                            theme={resolvedTheme === "dark" ? "light" : "light"}
                            className="size-9"
                            onClick={handleLogoClick}
                        />

                        <div className="flex items-center gap-3">
                            <ModeToggle />

                            <button
                                type="button"
                                aria-label={open ? "Close menu" : "Open menu"}
                                aria-expanded={open}
                                onClick={() => setOpen((v) => !v)}
                                className="flex size-9 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-foreground"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {open ? (
                                        <motion.span
                                            key="close"
                                            initial={{
                                                rotate: -90,
                                                opacity: 0,
                                            }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="flex"
                                        >
                                            <IconX className="size-5" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.15 }}
                                            className="flex"
                                        >
                                            <IconMenu2 className="size-5" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>

                    {/* Expandable panel */}
                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                key="panel"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeInOut",
                                }}
                            >
                                <div className="px-3 pb-4 pt-1">
                                    <nav className="flex flex-col">
                                        {navItems.map((navItem, idx) => (
                                            <button
                                                key={`mobile-link-${idx}`}
                                                type="button"
                                                onClick={() =>
                                                    handleNavClick(navItem.link)
                                                }
                                                className="text-left text-muted-foreground hover:text-foreground text-lg font-medium py-2.5 transition-colors"
                                            >
                                                {navItem.name}
                                            </button>
                                        ))}
                                    </nav>

                                    <div className="h-px bg-border my-3" />

                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[11px] font-semibold tracking-widest text-muted-foreground/70">
                                            RESUME
                                        </span>

                                        <div className="flex items-center gap-1 rounded-full border border-blue-300/40 bg-blue-50/40 p-1 dark:border-blue-500/15 dark:bg-blue-950/20">
                                            {/* View - opens the shared preview modal */}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpen(false);
                                                    setResumeModalOpen(true);
                                                }}
                                                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                <IconEye className="size-3.5" />
                                                View
                                            </button>

                                            {/* Download - forces file download */}
                                            <a
                                                href={resumePath}
                                                download={RESUME_FILE}
                                                onClick={() => setOpen(false)}
                                                className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition-colors"
                                            >
                                                <IconDownload className="size-3.5" />
                                                Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            <ResumePreviewModal
                open={resumeModalOpen}
                onClose={() => setResumeModalOpen(false)}
                resumePath={resumePath}
                fileName={RESUME_FILE}
            />
        </>
    );
};
