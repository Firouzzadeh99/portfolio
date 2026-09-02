"use client";

import Section from "@/components/layout/section";
import SectionHeader from "@/components/layout/section-header";
import { softSkills, stats, type StatItem } from "@/data/about";
import TypewriterText from "@/components/ui/typewriter-text";
import { useCountUp } from "@/hooks/useCountUp";
import { useEffect, useRef, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

const StatCard = ({ value, label, icon }: StatItem) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [active, setActive] = useState(false);

    const animatedValue = useCountUp(value, active);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setActive(true);
                obs.disconnect();
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`
                relative glass-card p-2 sm:p-4 md:p-6 text-center cursor-default group
            `}
        >
            <div className="absolute top-2 left-3 text-lg opacity-60 group-hover:opacity-100">
                {icon}
            </div>

            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {animatedValue}
            </div>

            <div className="text-xs text-slate-500 dark:text-gray-400 mt-1 font-medium tracking-wider">
                {label}
            </div>
        </div>
    );
};

const StatsGrid = () => (
    <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 w-full">
        {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
        ))}
    </div>
);

const SoftSkills = () => (
    <div className="flex flex-col gap-4 md:mt-2">
        {softSkills.map((skill, i) => {
            const Icon = skill.icon;

            return (
                <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-4 glass-card "
                >
                    <Icon className="text-blue-600 dark:text-blue-400 text-lg" />
                    <span className="text-slate-700 dark:text-gray-200 text-sm md:text-base">
                        {skill.label}
                    </span>
                </div>
            );
        })}
    </div>
);

const AboutText = () => (
    <div className="flex-1">
        <TypewriterText
            speed={30}
            className="whitespace-pre-line text-lg md:text-xl text-slate-700 dark:text-gray-200 leading-relaxed font-light mt-1"
        >
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Full-Stack Developer
            </span>{" "}
            with 4+ years of experience building scalable web applications
            across frontend and backend systems. Specializing in{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                React
            </span>
            ,{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                Next.js
            </span>
            , and{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
                NestJS
            </span>
            .{"\n"}
            Experienced in building financial dashboards, market analysis tools,
            and backend-driven platforms with a strong focus on{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
                performance
            </span>{" "}
            and{" "}
            <span className="text-blue-600 dark:text-blue-400 font-medium">
                scalability
            </span>
            . Comfortable working across the full stack from{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                UI development
            </span>{" "}
            to API design and database structure.
            {"\n"}
            Strong{" "}
            <span className="text-purple-600 dark:text-purple-400 font-medium">
                problem-solving mindset
            </span>{" "}
            with a focus on writing{" "}
            <span className="text-green-600 dark:text-green-400 font-medium">
                clean
            </span>
            , maintainable, and testable code. Continuously learning new
            technologies and applying them in real-world production systems.
        </TypewriterText>
    </div>
);

export default function About() {
    return (
        <Section
            id="about"
            className="h-full md:min-h-screen max-md:px-4 md:py-20 md:scroll-mt-28"
        >
            <SectionHeader
                title="01 — ABOUT"
                subtitle="Builder ships real-time, scalable products"
                highlightWord="real-time, scalable"
            />

            <div className="flex flex-col lg:flex-row gap-10 max-w-7xl mx-auto mt-8">
                {/* LEFT */}
                <div className="flex flex-col gap-5 flex-2">
                    <AboutText />
                    <BlurFade delay={0.005 * 1} inView>
                        <StatsGrid />
                    </BlurFade>
                </div>

                {/* RIGHT */}
                <BlurFade delay={0.005 * 1} inView>
                    <div className="flex-1">
                        <h3 className="text-slate-900 dark:text-white text-xl font-semibold mb-4">
                            Soft Skills
                        </h3>
                        <SoftSkills />
                    </div>
                </BlurFade>
            </div>
        </Section>
    );
}
