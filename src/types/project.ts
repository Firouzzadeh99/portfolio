export type ProjectCategory = "Bot" | "Frontend" | "Backend" | "Fullstack" | "Other";

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    category: ProjectCategory;
    techStack: string[];
    codeUrl: string;
    liveUrl: string;
}