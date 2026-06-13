"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx/lite";
import Icon from "../interface/icon";

export default function SidebarCategory({
	name,
	children,
}: {
	name: String,
	children: React.ReactNode,
}) {
	const [expanded, setExpanded] = useState(true);
	const [contentHeight, setContentHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef) {
			setContentHeight(contentRef.current?.scrollHeight ?? -1)
			console.info(contentHeight)
		} else {
			console.error("NO CONTENT REF !!!!!!!")
		}
	}, []);

	return (
		<>
			<button
				onClick={() => setExpanded(!expanded)}
				className="flex group items-center justify-between px-1.5 pb-3 pt-3 hover:bg-(--neutral-ghost-250) rounded-8 border border-transparent hover:border-(--neutral-ghost-250) transition-colors duration-100"
			>
				<p className="text-label text-[13px] text-(--on-neutral-450) uppercase group-hover:text-(--on-neutral-950) transition-colors duration-100">
					{name}
				</p>
				<Icon icon="RightArrow" size="18" className={clsx(
					"transition-all duration-100 text-(--on-neutral-450) group-hover:text-(--on-neutral-950)",
					expanded && "rotate-90"
				)} />
			</button>
			<div
				ref={contentRef}
				className={clsx("transition-all duration-250 overflow-hidden", expanded
					? "pointer-events-auto"
					: "pointer-events-none"
				)}
				style={{
					minHeight: expanded
						? contentHeight + "px"
						: "0px",
					maxHeight: expanded
						? contentHeight + "px"
						: "0px",
				}}
			>
				{children}
			</div>
		</>
	);
}