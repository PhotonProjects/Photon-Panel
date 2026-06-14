"use client";

import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx/lite";
import Icon from "../interface/icon";
import { SidebarContext } from "./sidebarContext";

export default function SidebarCategory({
	name,
	children,
}: {
	name: string,
	children: React.ReactNode,
}) {
	const [expanded, setExpanded] = useState(true);
	const [contentHeight, setContentHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);
	const {sideBarExpanded} = useContext(SidebarContext);

	useEffect(() => {
		if (contentRef) {
			setContentHeight(contentRef.current?.scrollHeight ?? 0)
		}
	}, []);

	return (
		<>
			<button
				onClick={() => setExpanded(!expanded)}
				title={!sideBarExpanded ? name.toUpperCase() : undefined}
				disabled={!sideBarExpanded}
				className={clsx(
					"flex group items-center justify-between px-1.5 pb-3 pt-3 rounded-8 border border-transparent transition-colors duration-100",
					sideBarExpanded && "hover:bg-(--neutral-ghost-250) hover:border-(--neutral-ghost-250)"
				)}
			>
				<p 
					style={{transition: "color 150ms ease, opacity 150ms ease"}}
					className={clsx(
						"text-label text-[13px] text-(--on-neutral-450) uppercase group-hover:text-(--on-neutral-950)",
						sideBarExpanded ? "opacity-100" : "opacity-0 w-0"
				)}>
					{name}
				</p>
				<div 
					style={{transition: "opacity 250ms ease"}}
					className={clsx(
						"bg-(--on-neutral-350) h-0.5",
						sideBarExpanded ? "opacity-0 w-0" : "opacity-100 w-3"
				)}/>
				<Icon style={{transition: "color 150ms ease, opacity 150ms ease, rotate 150ms ease"}} icon="RightArrow" size="18" className={clsx(
					"text-(--on-neutral-450) group-hover:text-(--on-neutral-950)",
					expanded && "rotate-90",
					sideBarExpanded ? "opacity-100" : "opacity-0 w-0"
				)} />
			</button>
			<div
				ref={contentRef}
				className={clsx("transition-all duration-250 overflow-hidden", (expanded || !sideBarExpanded)
					? "pointer-events-auto"
					: "pointer-events-none"
				)}
				style={{
					minHeight: (expanded || !sideBarExpanded)
						? contentHeight + "px"
						: "0px",
					maxHeight: (expanded || !sideBarExpanded)
						? contentHeight + "px"
						: "0px",
				}}
			>
				{children}
			</div>
		</>
	);
}