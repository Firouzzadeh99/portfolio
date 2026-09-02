interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    highlightWord?: string;
    highlightClassName?: string;
    className?: string;
}

export default function SectionHeader({
    title,
    subtitle,
    highlightWord,
    highlightClassName = "text-cyan-600 dark:text-cyan-400",
    className = "",
}: SectionHeaderProps) {
    const renderSubtitle = () => {
        if (!subtitle) return null;
        if (!highlightWord) return subtitle;

        const parts = subtitle.split(new RegExp(`(${highlightWord})`, "gi"));

        return parts.map((part, index) => {
            if (part.toLowerCase() === highlightWord.toLowerCase()) {
                return (
                    <span key={index} className={highlightClassName}>
                        {part}
                    </span>
                );
            }
            return part;
        });
    };
    return (
        <div
            className={`
            mb-6 px-1 sm:mb-8 lg:mb-10
            text-left 

            ${className}
        `}
        >
            {/* Title */}
            <h2 className="relative mb-1 md:mb-3 inline-block font-mono text-cyan-700 dark:text-cyan-300 text-md tracking-widest">
                {title}
            </h2>

            {/* Subtitle - with the "Let's build something together." vibe */}
            {subtitle && (
                <div className="mt-2 md:mt-4 text-left text-slate-900 dark:text-white sm:text-base reveal font-display text-3xl md:text-6xl font-bold tracking-tight">
                    {renderSubtitle()}
                </div>
            )}
        </div>
    );
}
