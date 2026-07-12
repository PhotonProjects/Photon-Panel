import { useEffect, useState } from "react";

export function useScrollbarActive(ref: React.RefObject<HTMLDivElement | null>) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const updateScrollbarState = () => {
            setIsActive(element.scrollHeight > element.clientHeight);
        };

        const observer = new ResizeObserver(() => {
            updateScrollbarState();
        });

        updateScrollbarState();
        observer.observe(element);
        return () => observer.disconnect();
    }, [ref]);

    return isActive;
}
