"use client";
import { useMemo, useState } from "react";
import Section from "@/components/layout/section";
import SectionHeader from "@/components/layout/section-header";
import { BlurFade } from "@/components/ui/blur-fade";
import ProjectCard from "@/components/ui/project-card";
import ProjectFilter from "@/components/ui/project-filter";
import { projects } from "@/data/projects";

export default function Projects() {
    const [filter, setFilter] = useState("All");

    const filtered = useMemo(
        () =>
            filter === "All"
                ? projects
                : projects.filter((p) => p.category === filter),
        [filter],
    );

    return (
        <Section
            id="projects"
            className="h-full md:min-h-screen w-full  md:scroll-mt-28 md:mb-20"
        >
            <SectionHeader
                title="03 - FEATURED PROJECTS"
                subtitle="Check out some of my recent work."
                highlightWord="my recent work."
            />

            <BlurFade delay={0.005} inView>
                <ProjectFilter active={filter} onChange={setFilter} />
            </BlurFade>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, i) => (
                    <BlurFade key={project.id} delay={0.05 * (i + 1)} inView>
                        <ProjectCard project={project} />
                    </BlurFade>
                ))}
            </div>
        </Section>
    );
}
