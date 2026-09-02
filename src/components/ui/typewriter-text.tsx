"use client";

import {
    Children,
    cloneElement,
    isValidElement,
    ReactNode,
    useEffect,
    useMemo,
    useState,
} from "react";
import { motion } from "motion/react";

type Props = {
    children: ReactNode;
    speed?: number;
    className?: string;
};

function flatten(node: ReactNode): ReactNode[] {
    return Children.toArray(node).flatMap((child): ReactNode[] => {
        if (typeof child === "string") {
            return child.split(/(\s+)/).filter(Boolean);
        }

        if (isValidElement(child)) {
            const words = flatten(
                (child as React.ReactElement<{ children: ReactNode }>).props
                    .children,
            );

            return words.map((word, i) =>
                cloneElement(child as React.ReactElement, { key: i }, word),
            );
        }

        return [];
    });
}

export default function TypewriterText({
    children,
    speed = 80,
    className,
}: Props) {
    const words = useMemo(() => flatten(children), [children]);

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((v) => {
                if (v >= words.length) {
                    clearInterval(interval);
                    return v;
                }

                return v + 1;
            });
        }, speed);

        return () => clearInterval(interval);
    }, [words.length, speed]);

    return (
        <div className={`relative ${className}`}>
            <div className="invisible">{children}</div>

            <div className="absolute inset-0">
                {words.slice(0, count).map((w, i) => (
                    <span key={i}>{w}</span>
                ))}

                {count < words.length && (
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                        }}
                        className="text-blue-400"
                    >
                        |
                    </motion.span>
                )}
            </div>
        </div>
    );
}
