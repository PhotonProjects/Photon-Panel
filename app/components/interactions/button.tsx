"use client";

import clsx from "clsx/lite";
import Icon from "../interface/icon";
import { useContext, useState } from "react";
import { SidebarContext } from "../nav/sidebarContext";

export default function Button({
	primary = false,
	filledicon = false,
	value = "",
	icon = "",
	onClick = () => {},
}: {
	primary?: boolean,
	filledicon?: boolean,
	value?: string,
	icon?: string,
	onClick?: () => void,
}) {
	const [hovered, setHovered] = useState(false);

	const textColor =
		primary ? "text-(--primary-250)" : "text-(--on-neutral-950)";
	const backgroundColor =
		primary ? "bg-(--primary-ghost-500) hover:bg-(--primary-ghost-250)" : "hover:bg-(--neutral-ghost-250)";
	const borderColor =
		primary ? "border-1 border-(--primary-500) hover:border-(--primary-250)" : "border-1 border-transparent hover:border-(--neutral-ghost-250)";

	const {sideBarExpanded, inSideBar} = useContext(SidebarContext);

	return (
		<button
			className={clsx(
				"rounded-8 py-2.75 px-2.75 gap-3 flex group transition-all duration-150", 
				borderColor, 
				backgroundColor,
				inSideBar && "w-full"
			)}
			title={!sideBarExpanded ? value : undefined}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
		>
			{icon !== "" && (
				<Icon
					filled={filledicon === true ? hovered : null}
					icon={icon}
					size="18"
					className={clsx(
						"transition-all duration-150",
						textColor
					)}
				/>
			)}
			{value !== "" && (
				<p className={clsx(
					"text-medium transition-opacity duration-150", 
					textColor,
					!sideBarExpanded && "opacity-0"
				)}>
					{value}
				</p>
			)}
		</button>
	);
}