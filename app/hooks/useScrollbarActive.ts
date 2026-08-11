"use client";

import { useEffect, useState } from "react";

export function useScrollbarActive(ref: React.RefObject<HTMLDivElement | null>) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return;
        }

        const root = document.documentElement;
        const previousScrollbarWidth = root.style.getPropertyValue("--scrollbar-width");
        const isFirefox = navigator.userAgent.toLowerCase().includes("firefox");

        if (isFirefox) {
            const firefoxScrollbarWidth = getComputedStyle(root)
                .getPropertyValue("--scrollbar-width-firefox")
                .trim();

            root.style.setProperty("--scrollbar-width", firefoxScrollbarWidth);
        }

        const updateScrollbarState = () => {
            setIsActive(element.scrollHeight > element.clientHeight);
        };

        const observer = new ResizeObserver(updateScrollbarState);
        const content = element.firstElementChild;

        updateScrollbarState();
        observer.observe(element);

        if (content) {
            observer.observe(content);
        }

        return () => {
            observer.disconnect();

            if (previousScrollbarWidth) {
                root.style.setProperty("--scrollbar-width", previousScrollbarWidth);
            } else {
                root.style.removeProperty("--scrollbar-width");
            }
        };
    }, [ref]);

    return isActive;
}
