import { useEffect, useState } from "react";

export function isScrollbarActive(ref: React.RefObject<HTMLDivElement | null>) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new ResizeObserver((element) => {
            setIsActive(element[0].target.scrollHeight > element[0].target.clientHeight);

        })

        observer.observe(element);
        return () => observer.disconnect();
    }, [])

    return isActive;
}
/* Ce code est par Claude, mais écrit à la main et à moitié compris, je croit ? */