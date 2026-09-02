// src/data/stats.ts
import {
    FaUsers,
    FaPuzzlePiece,
    FaClock,
    FaClipboardCheck,
    FaBolt,
    FaSyncAlt,
} from "react-icons/fa";

export interface StatItem {
    value: string;
    label: string;
    icon: string;
}

export const stats: StatItem[] = [
    {
        value: "4+",
        label: "YEARS EXPERIENCE",
        icon: "💼",
    },
    {
        value: "12+",
        label: "PROJECTS",
        icon: "🚀",
    },
    {
        value: "15+",
        label: "TECHNOLOGIES",
        icon: "⚡",
    },
    {
        value: "80%",
        label: "PASSION FOR CODE",
        icon: "💻",
    },
];

export const softSkills = [
    { label: "Teamwork & Collaboration", icon: FaUsers },
    { label: "Problem Solving", icon: FaPuzzlePiece },
    { label: "Time Management", icon: FaClock },
    { label: "Commitment & Responsibility", icon: FaClipboardCheck },
    { label: "Fast Learner", icon: FaBolt },
    { label: "Adaptability", icon: FaSyncAlt },
];
