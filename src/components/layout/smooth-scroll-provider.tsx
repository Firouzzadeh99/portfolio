"use client";

import { ReactLenis } from "lenis/react";
import { useLayoutEffect, useState } from "react";

// باید با breakpoint `sm` تیلویند (640px) که MobileNavbar هم استفاده می‌کنه یکی باشه
const MOBILE_BREAKPOINT = 640;

export function SmoothScrollProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobile, setIsMobile] = useState(false);

    // useLayoutEffect به جای useEffect تا قبل از پینت اول مقدار درست ست شه
    // و فلیکر (یک فریم Lenis فعال بشه بعد خاموش بشه) رو نداشته باشیم
    useLayoutEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // روی موبایل اصلاً Lenis رندر نمی‌شه => اسکرول کاملاً native مرورگر
    if (isMobile) {
        return <>{children}</>;
    }

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05,
                duration: 0.8,
                wheelMultiplier: 1.2,
                touchMultiplier: 2.0,
                smoothWheel: true,
                prevent: (node) => node.hasAttribute("data-lenis-prevent"),
            }}
        >
            {children}
        </ReactLenis>
    );
}
