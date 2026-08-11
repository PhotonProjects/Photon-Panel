"use client";

import clsx from "clsx/lite";
import { useContext } from "react";
import PanelIcon from "@/app/components/ui/PanelIcon";
import { SidebarContext } from "@/app/contexts/SidebarContext";
import { usePersistentState } from "@/app/hooks/usePersistentState";

interface SidebarCategoryProps {
    name: string;
    children: React.ReactNode;
}

export default function SidebarCategory({ name, children }: SidebarCategoryProps) {
    const storageKey = `photon-panel:sidebar-category:${name.toLowerCase()}`;
    const [isCategoryExpanded, setIsCategoryExpanded] = usePersistentState<boolean>(
        storageKey,
        true,
    );
    const { isExpanded: isSidebarExpanded } = useContext(SidebarContext);

    if (!isSidebarExpanded) {
        return (
            <div className="flex flex-col gap-xs">
                <div
                    className="flex items-center justify-center px-sm py-sm"
                    title={name}
                    aria-label={name}
                >
                    <div className="h-[var(--separator-height)] w-full bg-interface-separator" />
                </div>
                {children}
            </div>
        );
    }

    return (
        <section>
            <button
                type="button"
                onClick={() => setIsCategoryExpanded((currentValue) => !currentValue)}
                className="group flex min-h-[var(--interactive-size)] w-full items-center justify-between gap-md rounded-[var(--radius-default)] px-sm py-md inset-ring inset-ring-transparent hover:bg-interface-high-surface hover:inset-ring-interface-surface-ring/25"
                aria-expanded={isCategoryExpanded}
            >
                <span className="text-label text-text-700 uppercase group-hover:text-text-100">
                    {name}
                </span>
                <PanelIcon
                    icon="RightArrow"
                    className={clsx(
                        "shrink-0 text-text-700 group-hover:text-text-100",
                        isCategoryExpanded && "rotate-90",
                    )}
                />
            </button>

            {isCategoryExpanded && (
                <div className="flex flex-col gap-xs pt-xs">
                    {children}
                </div>
            )}
        </section>
    );
}
