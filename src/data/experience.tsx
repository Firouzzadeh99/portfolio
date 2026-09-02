import { FaReact } from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMui,
  SiStorybook,
  SiDocker,
  SiJira,
  SiReactquery,
  SiNestjs,
  SiPostgresql,
} from "react-icons/si";

import type { ExperienceItem } from "@/types/experience";

export const experiences: ExperienceItem[] = [
  {
    id: "freelance-fullstack",
    role: "Freelance Full Stack Developer",
    company: "Self-Employed / Freelance",
    location: "Tehran, Iran",
    period: "Apr 2025 — Present",
    current: true,
    initial: "F",
    bullets: [
      "Developing scalable and user-friendly web applications using React, Next.js, TypeScript, and modern frontend technologies",
      "Working across the full development lifecycle, from technical planning and architecture to implementation, testing, and deployment",
      "Building production-ready applications with Next.js App Router, server-side rendering, static generation, and performance optimization",
      "Designing reusable and maintainable frontend architectures with modular components, state management, and API integration",
      "Developing Progressive Web Applications (PWAs) with a focus on responsive design and mobile-first user experiences",
      "Integrating REST APIs and backend services while handling authentication, authorization, caching, and data synchronization",
      "Collaborating with international and cross-functional teams to deliver features based on business and technical requirements",
      "Working with Docker, Git, CI/CD pipelines, and Linux-based deployment environments",
    ],
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "NestJS", icon: <SiNestjs /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Docker", icon: <SiDocker /> },
    ],
  },

  {
    id: "avinmedia",
    role: "Frontend Developer",
    company: "AvinMedia",
    location: "Tehran, Iran",
    period: "Mar 2024 — Feb 2025",
    initial: "A",
    bullets: [
      "Worked as part of a collaborative development team on multiple IT projects using modern frontend technologies",
      "Planned, developed, and implemented new features based on project requirements and technical specifications",
      "Fixed production bugs and improved application usability, stability, and overall user experience",
      "Used Jira for task management, sprint planning, issue tracking, and collaboration across development teams",
      "Led the complete frontend implementation of a project using Next.js and established a scalable component-based architecture",
      "Developed a Progressive Web Application (PWA) optimized for iOS devices with a responsive and mobile-first user experience",
      "Implemented reusable UI components and frontend patterns to improve development speed and maintainability",
      "Collaborated closely with backend developers, designers, and other teams throughout the development lifecycle",
    ],
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "Jira", icon: <SiJira /> },
    ],
  },

  {
    id: "hamdasystem",
    role: "Frontend Developer",
    company: "HamdaSystem",
    location: "Babol, Iran",
    period: "Mar 2022 — Jun 2024",
    initial: "H",
    bullets: [
      "Refactored the Hamda software platform, a tax support system designed for doctors and pharmacists, using React and Material UI",
      "Implemented React Query for efficient server-state management, API communication, caching, and improved application performance",
      "Restructured the frontend Store architecture to improve scalability, maintainability, and state management",
      "Designed and documented reusable UI components with Storybook to establish a consistent component system",
      "Fully developed the examination panel for both admin and jobseeker sections",
      "Implemented complex forms, data-driven interfaces, role-based workflows, and reusable frontend components",
      "Improved the overall frontend architecture by separating reusable UI, business logic, and data-access concerns",
      "Collaborated with backend developers and other team members to integrate APIs and deliver new product features",
    ],
    tech: [
      { name: "React", icon: <FaReact /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "Material UI", icon: <SiMui /> },
      { name: "React Query", icon: <SiReactquery /> },
      { name: "Storybook", icon: <SiStorybook /> },
    ],
  },
];