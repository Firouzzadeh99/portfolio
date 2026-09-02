"use client";

import { useEffect, useState } from "react";


export function useActiveSection(ids: string[]): string | null {
    const [active, setActive] = useState<string | null>(null);

    useEffect(() => {
        const sections = ids
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);
        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                // Pick the entry nearest the centre band that's intersecting.
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
        );

        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [ids]);

    return active;
}
