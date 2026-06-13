"use client";

import { useState } from "react";
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
			<div className={clsx("overflow-hidden transition-all duration-150", expanded ? "max-h-50" : "max-h-0")}>
				{children}
			</div>
		</>
	);
}