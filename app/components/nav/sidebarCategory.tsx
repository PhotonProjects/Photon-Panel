"use client";

import { useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx/lite";
import Icon from "../interface/icon";

export default function SidebarCategory({
	name,
	children,
}: {
	name: string,
	children: React.ReactNode,
}) {
	const [expanded, setExpanded] = useState(true);

	return (
		<>
			<button
				onClick={() => setExpanded(!expanded)}
				className="flex group items-center justify-between px-1.5 py-content rounded-content border hover:bg-neutral-400/25 border-transparent hover:border-neutral-400/25"
			>
				<p className="text-label text-text-750 uppercase group-hover:text-text-100">
					{name}
				</p>
				<div className="bg-on-neutral-350 h-0.5"/>
				<Icon icon="RightArrow" size="18" className={clsx(
					"text-text-750 group-hover:text-text-100",
					expanded && "rotate-90"
				)} />
			</button>
			<div className="overflow-hidden">
				{children}
			</div>
		</>
	);
}