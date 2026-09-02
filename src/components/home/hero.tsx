"use client";
import Image from "next/image";
import profilePicHover from "@/assets/images/profile-final.png";
import { BlurFade } from "@/components/ui/blur-fade";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ShimmerBorder } from "@/components/ui/shimmer-border";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { contactData } from "@/data/contact";
import { ResumeButton } from "../ui/resume-button";

// ===== STATUS CONFIGURATION =====
const IS_OPEN_TO_WORK = true;

export default function Hero() {
    const { status, dotColor } = getStatus();
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => setIsMobile(window.innerWidth < 640);
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const handleCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const el = ctaRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    return (
        <div
            className="relative flex flex-col-reverse lg:flex-row items-center justify-center overflow-hidden min-h-screen lg:h-screen gap-7 sm:gap-10 lg:gap-16 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-0"
            id="hero"
        >
            {/* Left Content */}
            <div className=" flex flex-col justify-center">
                <TooltipProvider delayDuration={200}>
                    <BlurFade delay={0.005} inView>
                        <div className="flex flex-col space-y-4 sm:space-y-5">
                            {/* Status Button */}
                            <div className="relative flex flex-col items-start">
                                <ShimmerButton className="z-50 mt-1 sm:mt-4">
                                    <div className="z-50 relative flex items-center justify-center">
                                        <div
                                            className={`absolute size-1.5 rounded-full border ${
                                                dotColor === "green"
                                                    ? "border-green-600/80 bg-green-500 animate-ping"
                                                    : "border-red-600/80 bg-red-500 animate-ping"
                                            } mr-1.5`}
                                        />
                                        <div
                                            className={`relative size-1 rounded-full border ${
                                                dotColor === "green"
                                                    ? "border-green-600/80 bg-green-500 animate-pulse"
                                                    : "border-red-600/80 bg-red-500 animate-pulse"
                                            } mr-1.5`}
                                        />
                                    </div>
                                    <span className="whitespace-pre-wrap text-center leading-none text-muted-foreground text-xs sm:text-sm py-0.5">
                                        {status}
                                    </span>
                                </ShimmerButton>
                            </div>

                            {/* Hero Text */}
                            <div className="w-full space-y-3 sm:space-y-4 md:space-y-6">
                                <BlurFade delay={0.005 * 1} inView>
                                    <div className="subpixel-antialiased text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-left space-y-1">
                                        <div className="bg-linear-to-b from-slate-500 to-slate-900 dark:from-slate-300 dark:to-white bg-clip-text text-transparent">
                                            Hello. I&apos;m
                                        </div>
                                        <div className="bg-linear-to-b from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
                                            <span className="font-script font-normal text-[1.08em] leading-none align-baseline">
                                                Masoumeh Firouzzadeh
                                            </span>
                                        </div>
                                    </div>
                                </BlurFade>

                                <BlurFade delay={0.005 * 2} inView>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl tracking-tight font-medium text-left text-foreground/90">
                                        A FullStack Developer who likes{" "}
                                        <span className="font-script font-normal text-[1.08em] leading-none align-baseline text-blue-600 dark:text-cyan-300">
                                            building things
                                        </span>
                                    </p>
                                </BlurFade>

                                {/* Contact + CTA */}
                                <BlurFade
                                    delay={0.005 * 2}
                                    direction="down"
                                    inView
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                                        <ContactIcons isMobile={isMobile} />
                                        <span
                                            className="hidden sm:block w-px h-5 bg-border"
                                            aria-hidden
                                        />
                                        <div className="flex gap-3 w-full sm:w-auto">
                                            <a
                                                ref={ctaRef}
                                                onMouseMove={handleCtaMove}
                                                href="#projects"
                                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-border bg-background/40 backdrop-blur-sm px-5 py-2.5 text-sm font-medium hover:text-foreground text-foreground/80 flex-1 sm:flex-none justify-center sm:justify-start"
                                            >
                                                <span
                                                    aria-hidden
                                                    className="pointer-events-none absolute inset-0 rounded-full text-foreground opacity-0 transition-opacity group-hover:opacity-20"
                                                    style={{
                                                        background:
                                                            "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), currentColor, transparent 60%)",
                                                    }}
                                                />
                                                <span className="relative whitespace-nowrap">
                                                    View my work
                                                </span>
                                                <IconArrowRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                                <ShimmerBorder />
                                            </a>

                                            <ResumeButton
                                                fileName="firouzzadeh-resume.pdf"
                                                activeClassName="bg-background shadow-none"
                                                className="rounded-full border border-border bg-background/80 backdrop-blur-sm px-5 py-1.5 md:py-2 text-sm font-medium"
                                                layoutId=""
                                            />
                                        </div>
                                    </div>
                                </BlurFade>
                            </div>
                        </div>
                    </BlurFade>
                </TooltipProvider>
            </div>

            {/* Profile Image - Improved for mobile */}
            {/* <BlurFade delay={0.005} inView>
                <div className="relative flex justify-center lg:justify-end shrink-0 ">
                    <div className="size-52 sm:size-64 md:size-72 lg:size-80 xl:size-96 rounded-full shadow-xl overflow-hidden">
                        <Image
                            src={profilePicHover}
                            alt="Masoumeh Firouzzadeh - Profile"
                            className="size-full object-cover rounded-full hover:scale-105 transition-transform duration-500"
                            width={500}
                            height={500}
                            loading="eager"
                            priority
                        />
                    </div>
                </div>
            </BlurFade> */}
        </div>
    );
}

// ===== Helper Functions & Sub-Components =====
const getStatus = () => {
    if (IS_OPEN_TO_WORK) {
        return { status: "Open to Work", dotColor: "green" };
    } else {
        return { status: "Not Available", dotColor: "red" };
    }
};

const ContactIcons = ({ isMobile }: { isMobile: boolean }) => {
    return (
        <div className="flex flex-row items-center justify-center sm:justify-start gap-6 text-foreground">
            {contactData.hero.map((link) => {
                const Icon = link.icon;
                return (
                    <Tooltip key={link.label}>
                        <TooltipTrigger asChild>
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={link.label}
                                className="inline-block text-foreground hover:text-primary transition-colors"
                            >
                                <Icon
                                    className="hover:scale-125 hover:animate-wiggle transition-transform duration-200"
                                    size={isMobile ? 26 : 28}
                                />
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="z-50">
                            {link.label}
                        </TooltipContent>
                    </Tooltip>
                );
            })}
        </div>
    );
};
