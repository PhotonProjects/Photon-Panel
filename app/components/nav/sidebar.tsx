"use client";

import { useRef } from "react";
import Button from "../interactions/button";
import clsx from "clsx";
import Image from "next/image";
import { ButtonContext } from "../interactions/buttonContext";
import { useScrollbarActive } from "@/app/functions/isScrollbarActive";
import { SidebarContext } from "./sidebarContext";
import { usePersistentState } from "@/app/functions/usePersistentState";

export default function Sidebar({ children }: { children: React.ReactNode }) {
	const [isExpanded, setIsExpanded] = usePersistentState("photon-panel:sidebar-expanded", true);
	const scrollRef = useRef<HTMLDivElement>(null);
	const isScrollbar = useScrollbarActive(scrollRef);
	const toggleSidebar = () => setIsExpanded((currentValue) => !currentValue);
	const logoSrc = isExpanded ? "/logos/dark/nobg.png" : "/logos/dark/icon.png";
	const toggleIcon = isExpanded ? "LayoutClose" : "LayoutOpen";
	const toggleLabel = isExpanded ? "Collapse sidebar" : "Expand sidebar";

	return (
		<SidebarContext.Provider value={{ isExpanded, inSidebar: true, toggleSidebar }}>
			<div
				className={clsx(
					"h-full bg-surface-background rounded-menus inset-ring inset-ring-[color:var(--surface-outline)] p-content flex flex-col items-end transition-all duration-250",
					"gap-[var(--shell-sidebar-gap)]",
					isExpanded ? "w-[var(--shell-sidebar-width-expanded)]" : "w-[var(--shell-sidebar-width-collapsed)]"
				)}
			>
				<div className="flex h-[var(--shell-sidebar-logo-height)] w-full justify-center">
					<div className={clsx(
						"bg-neutral-800 rounded-content relative flex justify-center items-center w-full overflow-hidden",
						!isExpanded ? "h-[var(--shell-sidebar-logo-height-collapsed)]" : "h-full"
					)}>
						<Image
							src={logoSrc}
							alt="Photon Panel"
							fill
							priority
							className={clsx(
								"transition-all duration-250",
								isExpanded ? "object-contain" : "object-contain"
							)}
						/>
					</div>
				</div>
				<div className="relative w-full flex-1 overflow-y-clip">
					<div ref={scrollRef} className={clsx(
						"absolute inset-0 flex flex-col overflow-y-auto scrollbar-thumb-text-500 scrollbar-track-transparent justify-stretch scrollbar-thin",
						"gap-[var(--shell-sidebar-section-gap)] pb-[var(--shell-sidebar-scroll-padding-bottom)]",
						// Keep the content aligned when Firefox renders a visible thin scrollbar.
						isScrollbar && "pr-(--scrollbar-width)"
					)}>
						<ButtonContext.Provider value={{ fillWholeWidth: true }}>
							{children}
						</ButtonContext.Provider>
					</div>
				</div>
				<Button
					icon={toggleIcon}
					title={toggleLabel}
					ariaLabel={toggleLabel}
					filledicon
					onClick={toggleSidebar}
				/>
			</div>
		</SidebarContext.Provider>
	);
}
