import {
    IconHome,
    IconBrush,
    IconBriefcase2,
    IconPencil,
} from "@tabler/icons-react";

export const navItems = [
    {
        name: "Home",
        link: "hero",
        icon: (
            <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
    {
        name: "About",
        link: "about",
        icon: (
            <IconHome className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
    {
        name: "Skills",
        link: "skills",
        icon: (
            <IconPencil className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
    {
        name: "Projects",
        link: "projects",
        icon: (
            <IconBrush className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
    {
        name: "Experience",
        link: "experience",
        icon: (
            <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
    {
        name: "contact",
        link: "contact",
        icon: (
            <IconBriefcase2 className="subpixel-antialiased h-5 w-5 text-zinc-500 hover:text-zinc-950 dark:text-zinc-300 hover:dark:text-zinc-50 hover:animate-wiggle animate-wiggle transition-colors duration-100" />
        ),
    },
];
