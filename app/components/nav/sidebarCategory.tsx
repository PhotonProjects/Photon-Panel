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
			<div className="flex flex-col gap-[var(--shell-sidebar-section-gap)]">
				<div
					className="flex items-center justify-center px-[var(--sidebar-category-collapsed-padding-x)] py-[var(--sidebar-category-collapsed-padding-y)]"
					title={name}
					aria-label={name}
				>
					<div className="h-px w-full rounded-full bg-interface-separator" />
				</div>
				{children}
			</div>
		);
	}

	return (
		<>
			<button
				onClick={() => setExpanded(!expanded)}
				className="flex w-full group items-center justify-between rounded-content inset-ring inset-ring-transparent hover:bg-interface-high-surface hover:inset-ring-interface-surface-ring/25"
				/* Keep category spacing tokenized so layout tuning stays centralized. */
				style={{
					gap: "var(--sidebar-category-gap)",
					paddingInline: "var(--sidebar-category-padding-x)",
					paddingBlock: "var(--content-spacing)",
				}}
				aria-expanded={expanded}
			>
				<p className="text-label text-text-700 uppercase group-hover:text-text-100">
					{name}
				</p>
				<Icon icon="RightArrow" size="18" className={clsx(
					"shrink-0 text-text-700 group-hover:text-text-100 transition-transform duration-250",
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
					<div className="flex flex-col gap-[var(--shell-sidebar-section-gap)] pt-[var(--sidebar-category-expanded-inner-padding-top)]">
						{children}
					</div>
				</div>
			</div>
		</>
	);
}
