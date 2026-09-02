import { type ReactNode } from "react";

interface SectionProps {
    id?: string;
    children: ReactNode;
    className?: string;
}

export default function Section({
    id,
    children,
    className = "",
}: SectionProps) {
    return (
        <section
            id={id}
            // className={`relative z-10 scroll-mt-(--nav-height) px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 md:px-10 lg:px-8 lg:pt-6 lg:pb-16 xl:px-12 xl:pb-20 ${className}`}
            className={`relative z-10  px-4 pt-4 pb-10 sm:px-6 sm:pt-5 sm:pb-12 md:px-10 lg:px-8 lg:pt-6 lg:pb-16 xl:px-12 xl:pb-20 ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl min-w-0">{children}</div>
        </section>
    );
}
