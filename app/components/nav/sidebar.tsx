"use client";

import { useRef, useState } from "react";
import Button from "../interactions/button";
import clsx from "clsx";
import { ButtonContext } from "../interactions/buttonContext";
import { isScrollbarActive } from "@/app/functions/isScrollbarActive";

export default function Sidebar({ children }: { children: React.ReactNode }) {
	const [sideBarExpanded, setSidebarExpanded] = useState(true);
	const scrollRef = useRef<HTMLDivElement>(null);
	const isScrollbar = isScrollbarActive(scrollRef);

	return (
		<div
			className={clsx(
				"h-full bg-neutral-700 rounded-menus inset-ring inset-ring-neutral-600 p-content flex flex-col gap-3 transition-all duration-250 items-end",
				sideBarExpanded ? "w-66" : "w-16.5"
			)}
		>
			<div className="w-full h-15 flex justify-center">
				<div className={clsx(
					"bg-neutral-600 rounded-content py-5.25 flex justify-center w-full",
					!sideBarExpanded ? "h-14.5" : "h-full"
				)}>

				</div>
			</div>
			<div className="relative w-full flex-1 overflow-y-clip">
				<div ref={scrollRef} className={clsx(
					"absolute inset-0 flex flex-col gap-0.5 overflow-y-scroll scrollbar-thumb-text-500 scrollbar-track-transparent justify-stretch scrollbar-thin",
					isScrollbar && "pr-(--scrollbar-width)"
				)}>
					<ButtonContext.Provider value={{ fillWholeWidth: true }}>
						{children}
					</ButtonContext.Provider>
				</div>
			</div>
			<Button icon="LayoutOpen" onClick={() => setSidebarExpanded(!sideBarExpanded)} />
		</div>
	);
}
