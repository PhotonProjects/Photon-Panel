"use client";

import { useContext } from "react";
import clsx from "clsx/lite";
import Icon from "../interface/icon";
import { SidebarContext } from "./sidebarContext";
import { usePersistentState } from "@/app/functions/usePersistentState";

export default function SidebarCategory({
	name,
	children,
}: {
	name: string,
	children: React.ReactNode,
}) {
	const storageKey = `photon-panel:sidebar-category:${name.toLowerCase()}`;
	const [expanded, setExpanded] = usePersistentState(storageKey, true);
	const { isExpanded } = useContext(SidebarContext);

	if (!isExpanded) {
		return (
			<div className="flex flex-col gap-0.5">
				<div
					className="flex items-center justify-center px-2 py-2"
					title={name}
					aria-label={name}
				>
					<div className="h-px w-full rounded-full bg-[#4F4D51]" />
				</div>
				{children}
			</div>
		);
	}

	return (
		<>
			<button
				onClick={() => setExpanded(!expanded)}
				className="flex w-full group items-center justify-between gap-3 px-1.5 py-content rounded-content inset-ring inset-ring-transparent hover:bg-neutral-400/25 hover:inset-ring-neutral-400/25"
				aria-expanded={expanded}
			>
				<p className="text-label text-text-750 uppercase group-hover:text-text-100">
					{name}
				</p>
				<Icon icon="RightArrow" size="18" className={clsx(
					"shrink-0 text-text-750 group-hover:text-text-100 transition-transform duration-250",
					expanded && "rotate-90"
				)} />
			</button>
			<div
				className={clsx(
					"grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out",
					expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
				)}
			>
				<div className="min-h-0">
					<div className="flex flex-col gap-0.5 pt-0.5">
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
