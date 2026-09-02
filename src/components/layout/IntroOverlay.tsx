"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SignatureReveal from "./SignatureReveal";

interface IntroOverlayProps {
    text?: string;
}

export default function IntroOverlay({
    text = "Masoumeh Firouzzadeh",
}: IntroOverlayProps) {
    const [show, setShow] = useState(true);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Lock page scroll while the intro is visible
    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    // Clean up any pending timeout if the component unmounts early
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const handleComplete = () => {
        timeoutRef.current = setTimeout(() => {
            setShow(false);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-500 flex items-center justify-center"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1, ease: "easeIn" }}
                >
                    <SignatureReveal text={text} onComplete={handleComplete} />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
