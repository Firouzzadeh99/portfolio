"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import { AnimatedLogo } from "@/components/ui/logo-animation";
import { useTransitionRouter } from "next-view-transitions";
import { IconBrandGithub, IconStar } from "@tabler/icons-react";
// import { useGitHubStars } from "@/hooks/useGitHubStars";
import { navItems } from "@/data/navItems";
import { ResumeButton } from "../ui/resume-button";
import { useActiveSection } from "@/hooks/userActiveSection";
import { useLenis } from "lenis/react";

const FALLBACK_REPO_URL = "https://github.com/Firouzzadeh99/Next.js-Portfolio";

// Section IDs for active section detection
const SECTION_IDS = [
    "hero",
    "about",
    "skills",
    "experience",
    "projects",
    "contact",
];

export const Navbar = () => {
    const { resolvedTheme } = useTheme();
    // const { data: starsData } = useGitHubStars();

    // const repoUrl = starsData?.url ?? FALLBACK_REPO_URL;
    // const stars = starsData?.stars ?? 0;

    const { scrollY } = useScroll();

    const [visible, setVisible] = useState(true);
    const [disableHide, setDisableHide] = useState(false);
    const [activeLink, setActiveLink] = useState<string>("");
    const lenis = useLenis();
    const navRef = useRef<HTMLDivElement>(null);

    const router = useTransitionRouter();

    // Get active section from hook
    const activeSection = useActiveSection(SECTION_IDS);

    // Update activeLink when activeSection changes
    useEffect(() => {
        if (activeSection) {
            setActiveLink(activeSection);
        }
    }, [activeSection]);

    // useMotionValueEvent(scrollY, "change", (current) => {
    //     if (disableHide) {
    //         setVisible(true);
    //         return;
    //     }

    //     if (typeof current === "number") {
    //         const previous = scrollY.getPrevious();
    //         const direction = previous !== undefined ? current - previous : 0;

    //         if (current < 50) {
    //             setVisible(true);
    //         } else {
    //             setVisible(direction < 0);
    //         }
    //     }
    // });

    const handleNavClick = (link: string) => {
        setActiveLink(link);
        setDisableHide(true);
        setVisible(true);

        const unlock = () => {
            setTimeout(() => setDisableHide(false), 700);
        };

        if (link.startsWith("/")) {
            router.push(link);
            unlock();
            return;
        }

        if (window.location.pathname !== "/") {
            router.push(`/#${link}`);
            unlock();
            return;
        }

        // ← این بخش عوض می‌شه
        const navHeight =
            parseFloat(
                getComputedStyle(document.documentElement).getPropertyValue(
                    "--nav-height",
                ),
            ) || 96;

        lenis?.scrollTo(`#${link}`, {
            offset: -navHeight,
            duration: 1.2,
        });

        if (window.history?.pushState) {
            window.history.pushState(null, "", `#${link}`);
        }

        unlock();
    };

    const handleLogoClick = () => {
        router.push("/");
    };

    useEffect(() => {
        const updateNavHeight = () => {
            const height = navRef.current?.offsetHeight ?? 0;
            const extraGap = 24; // فاصله اضافه برای نفس کشیدن محتوا
            document.documentElement.style.setProperty(
                "--nav-height",
                `${height + extraGap}px`,
            );
        };

        updateNavHeight();

        const observer = new ResizeObserver(updateNavHeight);
        if (navRef.current) observer.observe(navRef.current);
        window.addEventListener("resize", updateNavHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateNavHeight);
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    initial={{
                        opacity: 1,
                        y: -100,
                    }}
                    animate={{
                        y: visible ? 0 : -100,
                        opacity: visible ? 1 : 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className={cn(
                        "hidden sm:flex max-w-6xl w-full justify-self-center backdrop-blur-3xl fixed top-0 sm:top-4 inset-x-0 mx-auto md:rounded-lg bg-white/70 dark:bg-background/10 sm:bg-white/80 sm:dark:bg-background/20 z-50 pr-4 pl-6 py-2 items-center justify-between border border-blue-400/40 dark:border-blue-500/25 shadow-sm shadow-blue-500/5 dark:shadow-blue-500/10 transition-colors",
                    )}
                >
                    <div className="flex items-center mr-4 sm:mr-16 text-foreground">
                        <AnimatedLogo
                            theme={resolvedTheme === "dark" ? "light" : "light"}
                            className="size-5 sm:size-9"
                            onClick={handleLogoClick}
                        />
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6 ml-auto mr-0 sm:mr-4">
                        <div className="flex items-center gap-1 rounded-full border border-blue-300/40 bg-blue-50/40 p-1 dark:border-blue-500/15 dark:bg-blue-950/20">
                            {navItems.map((navItem, idx) => {
                                const isActive = activeLink === navItem.link;

                                return (
                                    <button
                                        key={`link=${idx}`}
                                        onClick={() =>
                                            handleNavClick(navItem.link)
                                        }
                                        className={cn(
                                            "relative font-semibold items-center flex space-x-1 rounded-full px-3 py-1.5 transition-colors duration-300",
                                            isActive
                                                ? "text-white"
                                                : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="navbar-active-pill"
                                                className="absolute inset-0 rounded-full bg-linear-to-r from-blue-500 to-blue-600 dark:from-blue-500 dark:to-indigo-600 shadow-md shadow-blue-500/30"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}

                                        <span className="relative z-10 block sm:hidden">
                                            {navItem.icon}
                                        </span>

                                        <span className="relative z-10 hidden sm:block text-sm">
                                            {navItem.name}
                                        </span>
                                    </button>
                                );
                            })}
                            <ResumeButton fileName="firouzzadeh-resume.pdf" />
                        </div>

                         <span
                            aria-hidden
                            className="h-5 w-px self-center bg-border"
                        />

                        <a
                            href={"https://github.com/Firouzzadeh99/"}
                            target="_blank"
                            rel="noopener noreferrer"
                             className="group inline-flex items-center gap-1.5 rounded-md border border-border/60 bg-background/40 hover:bg-background/70 hover:border-border px-2 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <IconBrandGithub className="h-3.5 w-3.5" />

                            <span className="flex items-center gap-0.5 tabular-nums">
                                <IconStar className="h-3 w-3 transition-colors group-hover:text-primary group-hover:animate-spin-grow" />
                               
                            </span>
                        </a>  

                        <ModeToggle />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
