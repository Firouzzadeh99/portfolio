import { useEffect, useState } from "react";


export function useCountUp(target: string, active: boolean): string {
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (!active) return;

        const num = parseFloat(target.replace(/[^0-9.]/g, "")) || 0;
        const prefix = target.startsWith("$") ? "$" : "";
        const suffix = target.replace(/^[\$]?[0-9.]+/, "");

        const duration = 1400;
        const startTime = performance.now();
        let raf: number;

        const tick = (now: number) => {
            const t = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            const current = num * eased;

            const formatted =
                num % 1 === 0
                    ? Math.round(current).toString()
                    : current.toFixed(1);

            setDisplay(prefix + formatted + suffix);

            if (t < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, target]);

    return display;
}