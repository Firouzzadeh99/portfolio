"use client";

import Section from "@/components/layout/section";
import SectionHeader from "@/components/layout/section-header";
import { BlurFade } from "@/components/ui/blur-fade";
import { experiences } from "@/data/experience";
import type { ExperienceItem } from "@/types/experience";
import { article, div } from "motion/react-m";
import { TbExternalLink } from "react-icons/tb";

function ExperienceCard({
    item,
    isLast,
}: {
    item: ExperienceItem;
    isLast: boolean;
}) {
    const {
        role,
        company,
        location,
        period,
        current,
        initial,
        bullets,
        tech,
        link,
    } = item;

    return (
        <div className="relative flex gap-4 sm:gap-6">
            {/* Timeline column: dot + connecting line down to the next item */}
            <div className="flex w-3 shrink-0 flex-col items-center pt-7">
                <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
                {!isLast && (
                    <span className="mt-2 w-px flex-1 bg-emerald-400/25" />
                )}
            </div>

            <article className="group relative glass-card mb-6 flex-1 overflow-hidden">
                <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-base font-bold text-white">
                            {initial}
                        </span>
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                                {role}
                            </h3>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                                {link ? (
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 font-medium text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
                                    >
                                        {company}
                                        <TbExternalLink className="h-3.5 w-3.5" />
                                    </a>
                                ) : (
                                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                                        {company}
                                    </span>
                                )}
                                <span className="text-slate-400 dark:text-slate-500">
                                    ·
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">
                                    {location}
                                </span>
                                {current ? (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        Current
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-slate-400 dark:text-slate-500">
                        {period}
                    </span>
                </div>

                <ul className="mt-4 space-y-2.5">
                    {bullets.map((bullet, i) => (
                        <li
                            key={i}
                            className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300/80"
                        >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-2" role="list">
                    {tech.map((t) => (
                        <li
                            key={t.name}
                            className="flex items-center gap-1.5 rounded-md border border-slate-300/60 bg-slate-100/60 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                        >
                            <span className="text-emerald-500 dark:text-emerald-400">
                                {t.icon}
                            </span>
                            {t.name}
                        </li>
                    ))}
                </ul>
            </article>
        </div>
    );
}

export default function Experience() {
    return (
        <Section
            id="experience"
            className="h-full md:min-h-screen w-full  md:scroll-mt-28 md:mb-8"
        >
            <SectionHeader
                title="03 — EXPERIENCE"
                subtitle="Where I've shipped code."
                highlightWord="shipped"
            />
            <div className="mt-6">
                {experiences.map((item, index) => (
                    <BlurFade key={item.id} delay={0.05 * (index + 1)} inView>
                        <ExperienceCard
                            item={item}
                            isLast={index === experiences.length - 1}
                        />
                    </BlurFade>
                ))}
            </div>
        </Section>
    );
}
