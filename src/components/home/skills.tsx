// app/components/skills.tsx
import Section from "@/components/layout/section";
import SectionHeader from "@/components/layout/section-header";
import SkillCard from "@/components/ui/skill-card";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { BlurFade } from "@/components/ui/blur-fade";

function SkillCategoryPanel({
    title,
    hint,
    icon,
    level,
    skills,
}: SkillCategory) {
    return (
        <article className="group relative glass-card overflow-hidden pt-1.5">
            {/* Glow effect */}
            <div className="absolute -inset-px rounded-xl bg-linear-to-br from-blue-500/10 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
                {/* Header: icon + title on the left, level badge on the right */}
                <div className="mb-4 -mx-6 -mt-2 flex items-center justify-between gap-2 rounded-t-xl border-b border-blue-200/60 bg-blue-50/60 px-6 pt-4 pb-2 dark:border-white/10 dark:bg-sky-900/25">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-300/50 bg-blue-100/70 text-base text-blue-700 dark:border-blue-400/20 dark:bg-blue-500/10 dark:text-blue-300">
                            {icon}
                        </span>
                        <h3 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-blue-100 sm:text-base">
                            {title}
                        </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-blue-300/50 bg-blue-100/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-blue-700 dark:border-white/10 dark:bg-white/5 dark:text-blue-300/50">
                        {level}
                    </span>
                </div>

                {hint ? (
                    <p className="mb-3 text-xs leading-relaxed text-slate-600/80 dark:text-blue-300/60">
                        {hint}
                    </p>
                ) : null}

                {/* Below: unchanged */}
                <ul
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label={`${title} skills`}
                >
                    {skills.map((skill, index) => (
                        <SkillCard
                            key={`${skill.name}-${index}`}
                            skill={skill}
                        />
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default function Skills() {
    return (
        <Section
            id="skills"
            className="h-full md:min-h-screen w-full scroll-mt-17 md:scroll-mt-28"
        >
            <SectionHeader
                title="02 — SKILLS"
                subtitle="Tools I build with."
                highlightWord="build with."
            />
            <BlurFade delay={0.005 * 1} inView>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                    {skillCategories.map((category) => (
                        <SkillCategoryPanel
                            key={category.title}
                            {...category}
                        />
                    ))}
                </div>
            </BlurFade>
        </Section>
    );
}
