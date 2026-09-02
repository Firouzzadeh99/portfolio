// components/ui/resume-button.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconChevronDown, IconEye, IconDownload } from "@tabler/icons-react";
import { assetPath } from "@/lib/asset-path";
import { cn } from "@/lib/utils";
import { ResumePreviewModal } from "./resume-preview-modal";

interface ResumeButtonProps {
    fileName?: string;
    className?: string;
    layoutId?: string;
    activeClassName?: string;
}

export function ResumeButton({
    fileName = "firouzzadeh-resume.pdf",
    layoutId = "navbar-active-pill",
    activeClassName = "bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-indigo-600 shadow-md shadow-blue-500/30",
    className,
}: ResumeButtonProps) {
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const resumePath = assetPath(`/${fileName}`);

    // Close the dropdown when clicking outside it
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div ref={ref} className={cn("relative", className)}>
                <button
                    onClick={() => setOpen((o) => !o)}
                    className={cn(
                        "relative font-semibold flex items-center gap-2 rounded-full px-3 py-1 md:py-1.5 text-sm transition-colors duration-300",
                        open
                            ? "text-foreground dark:text-white"
                            : "text-muted-foreground hover:text-foreground",
                    )}
                >
                    {open && (
                        <motion.span
                            {...(layoutId ? { layoutId } : {})}
                            className={cn(
                                "absolute inset-0 rounded-full",
                                activeClassName,
                            )}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                            }}
                        />
                    )}
                    <span
                        className={cn(
                            "relative z-10",
                            layoutId
                                ? "hidden sm:block"
                                : "block text-sm md:text-[16px] md:pt-0.5",
                        )}
                    >
                        Resume
                    </span>
                    <motion.span
                        className="relative z-10"
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <IconChevronDown className="h-3.5 w-3.5" />
                    </motion.span>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 md:-translate-x-1/4 w-38 md:w-44 rounded-xl border border-blue-400/20 dark:border-blue-500/15 bg-white/90 dark:bg-background/90 backdrop-blur-xl shadow-lg shadow-blue-500/10 overflow-hidden z-50"
                        >
                            {/* View - opens shared preview modal */}
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setModalOpen(true);
                                }}
                                className="w-full flex items-center gap-2.5 px-3 py-2 md:px-4 md:py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors text-left"
                            >
                                <IconEye className="h-4 w-4 shrink-0" />
                                View Resume
                            </button>
                            <div className="h-px bg-border/50 mx-3" />
                            {/* Download - forces file download */}
                            <a
                                href={resumePath}
                                download={fileName}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 md:px-4 md:py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                            >
                                <IconDownload className="h-4 w-4 shrink-0" />
                                Download
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <ResumePreviewModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                resumePath={resumePath}
                fileName={fileName}
            />
        </>
    );
}
