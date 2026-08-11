"use client";

import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import Button from "@/app/components/ui/Button";
import { ButtonContext } from "@/app/contexts/ButtonContext";
import { SidebarContext } from "@/app/contexts/SidebarContext";
import { usePersistentState } from "@/app/hooks/usePersistentState";
import { useScrollbarActive } from "@/app/hooks/useScrollbarActive";

interface SidebarProps {
    children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const [isExpanded, setIsExpanded] = usePersistentState<boolean>(
        "photon-panel:sidebar-expanded",
        true,
    );
    const scrollRef = useRef<HTMLDivElement>(null);
    const isScrollbarActive = useScrollbarActive(scrollRef);
    const logoSrc = isExpanded ? "/logos/dark/nobg.png" : "/logos/dark/icon.png";
    const toggleIcon = isExpanded ? "LayoutClose" : "LayoutOpen";
    const toggleLabel = isExpanded ? "Collapse sidebar" : "Expand sidebar";

    const toggleSidebar = () => {
        setIsExpanded((currentValue) => !currentValue);
    };

    return (
        <SidebarContext.Provider value={{ isExpanded, inSidebar: true }}>
            <aside
                aria-label="Server navigation"
                className={clsx(
                    "flex h-full flex-col items-end gap-md rounded-[var(--radius-default)] bg-interface-surface p-md inset-ring inset-ring-[color:var(--interface-surface-ring)]",
                    isExpanded
                        ? "w-[var(--shell-sidebar-width-expanded)]"
                        : "w-[var(--shell-sidebar-width-collapsed)]",
                )}
            >
                <div className="flex h-[var(--shell-sidebar-logo-height)] w-full justify-center">
                    <div
                        className={clsx(
                            "relative flex w-full items-center justify-center overflow-hidden rounded-[var(--radius-default)] bg-interface-high-surface",
                            !isExpanded
                                ? "h-[var(--shell-sidebar-logo-height-collapsed)]"
                                : "h-full",
                        )}
                    >
                        <Image
                            src={logoSrc}
                            alt="Photon Panel"
                            fill
                            priority
                            className="object-contain"
                        />
                    </div>
                </div>

                <div className="relative w-full flex-1 overflow-y-clip">
                    <div
                        ref={scrollRef}
                        className={clsx(
                            "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-text-500 absolute inset-none overflow-y-auto",
                            isScrollbarActive && "pr-[var(--scrollbar-width)]",
                        )}
                    >
                        <div className="flex flex-col gap-xs pb-xs">
                            <ButtonContext.Provider value={{ fillWholeWidth: true }}>
                                {children}
                            </ButtonContext.Provider>
                        </div>
                    </div>
                </div>

                <Button
                    icon={toggleIcon}
                    title={toggleLabel}
                    ariaLabel={toggleLabel}
                    onClick={toggleSidebar}
                />
            </aside>
        </SidebarContext.Provider>
    );
}
