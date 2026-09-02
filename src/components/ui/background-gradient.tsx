import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
    children,
    className,
    containerClassName,
    animate = true,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
    animate?: boolean;
}) => {
    const variants = {
        initial: {
            backgroundPosition: "0% 50%",
        },
        animate: {
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        },
    };

    return (
        <div
            className={cn("relative p-1 group", containerClassName)}
            suppressHydrationWarning
        >
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "reverse",
                          }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-1 rounded-full z-1 blur-md transition duration-500 will-change-transform",
                    "bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 opacity-30",
                )}
                suppressHydrationWarning
            />
            <motion.div
                variants={animate ? variants : undefined}
                initial={animate ? "initial" : undefined}
                animate={animate ? "animate" : undefined}
                transition={
                    animate
                        ? {
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "reverse",
                          }
                        : undefined
                }
                style={{
                    backgroundSize: animate ? "400% 400%" : undefined,
                }}
                className={cn(
                    "absolute inset-3 blur-md rounded-full z-1 will-change-transform",
                    "bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 opacity-20",
                )}
                suppressHydrationWarning
            />

            <div className={cn("relative z-10", className)}>{children}</div>
        </div>
    );
};
