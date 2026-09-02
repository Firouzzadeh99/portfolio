import { ReactNode } from "react";

export interface TechTag {
    name: string;
    icon: ReactNode;
}

export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    location: string;
    period: string;
    current?: boolean;
    initial: string;
    bullets: string[];
    tech: TechTag[];
    link?: string;
}