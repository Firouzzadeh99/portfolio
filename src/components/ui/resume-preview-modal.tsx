// components/ui/resume-preview-modal.tsx
"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { IconDownload, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface ResumePreviewModalProps {
    open: boolean;
    onClose: () => void;
    resumePath: string;
    fileName: string;
    imageSrc?: string;
}

export function ResumePreviewModal({
    open,
    onClose,
    resumePath,
    fileName,
    imageSrc = "/resume/resume-high-quality.png",
}: ResumePreviewModalProps) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Needed so createPortal only runs client-side (avoids SSR mismatch)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset the loading spinner each time the modal is reopened
    useEffect(() => {
        if (open) setImgLoaded(false);
    }, [open]);

    // Lock body scroll + close on Escape while open
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    key="resume-modal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
                >
                    <motion.div
                        key="resume-modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-3xl max-h-[88vh] rounded-2xl border border-blue-400/20 dark:border-blue-500/15 bg-white/95 dark:bg-background/95 backdrop-blur-xl shadow-2xl shadow-blue-500/20 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 shrink-0">
                            <span className="text-sm font-semibold text-foreground">
                                Resume Preview
                            </span>
                            <div className="flex items-center gap-2">
                                <a
                                    href={resumePath}
                                    download={fileName}
                                    className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                                >
                                    <IconDownload className="h-3.5 w-3.5" />
                                    Download
                                </a>
                                <button
                                    onClick={onClose}
                                    aria-label="Close resume preview"
                                    className="rounded-full p-1.5 text-muted-foreground hover:text-foreground hover:bg-blue-50/50 dark:hover:bg-blue-950/30 transition-colors"
                                >
                                    <IconX className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Image Preview */}
                        <div
                            data-lenis-prevent
                            className="relative min-h-0 flex-1 overflow-auto overscroll-contain bg-muted/30 flex items-start justify-center p-2 sm:p-4"
                        >
                            {!imgLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-8 w-8 rounded-full border-2 border-blue-400/30 border-t-blue-500 animate-spin" />
                                </div>
                            )}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageSrc}
                                alt="Resume preview"
                                onLoad={() => setImgLoaded(true)}
                                className={cn(
                                    "max-w-full w-auto h-auto rounded-md shadow-md transition-opacity duration-300",
                                    imgLoaded ? "opacity-100" : "opacity-0",
                                )}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
