"use client";

import clsx from "clsx";
import Icon from "../interface/icon";
import { useContext, useState } from "react";
import { ButtonContext } from "./buttonContext";
import { SidebarContext } from "../nav/sidebarContext";

export default function Button({
	primary = false,
	success = false,
	danger = false,

	filled = false,
	outlined = false,

	filledicon = false,
	value = "",
	icon = "",
	title,
	ariaLabel,
	onClick = () => {},
}: {
	primary?: boolean,
	success?: boolean,
	danger?: boolean,

	filled?: boolean,
	outlined?: boolean,

	filledicon?: boolean,
	value?: string,
	icon?: string,
	title?: string,
	ariaLabel?: string,
	onClick?: () => void,
}) {
	const color = primary ? "primary" : success ? "success" : danger ? "danger" : "neutral";
	const variant = filled ? "filled" : outlined ? "outlined" : "transparent";

	const [hovered, setHovered] = useState(false);
	const {fillWholeWidth} = useContext(ButtonContext);
	const { inSidebar, isExpanded } = useContext(SidebarContext);
	const showLabel = value !== "" && (!inSidebar || isExpanded);
	const accessibleLabel = ariaLabel ?? value ?? undefined;
	const hoverLabel = title ?? value ?? undefined;

	const buttonStyle = [
		(variant === "filled" && color == "primary") 			&& "inset-ring inset-ring-transparent bg-primary-500 hover:bg-primary-400 hover:inset-ring-primary-400",
		(variant === "filled" && color == "success" )			&& "",
		(variant === "filled" && color == "danger") 			&& "",
		(variant === "outlined" && color == "primary")			&& "inset-ring inset-ring-primary-500 bg-primary-600/25 hover:bg-primary-500/25 hover:inset-ring-primary-400 hover:inset-ring-2 focus-visible:ring-2 focus-visible:ring-primary-500/50",
		(variant === "outlined" && color == "success") 			&& "",
		(variant === "outlined" && color == "danger") 			&& "",
		(variant === "transparent" && color == "neutral")		&& "inset-ring inset-ring-transparent hover:bg-neutral-400/25 hover:inset-ring-neutral-400/25",
	];
	const contentStyle = [
		(variant === "filled" && color == "primary") 			&& "text-on-primary",
		(variant === "filled" && color == "success" )			&& "",
		(variant === "filled" && color == "danger") 			&& "",
		(variant === "outlined" && color == "primary")			&& "text-primary-400 group-hover:text-primary-300",
		(variant === "outlined" && color == "success") 			&& "",
		(variant === "outlined" && color == "danger") 			&& "",
		(variant === "transparent" && color == "neutral")		&& "text-text-100",
	];

	return (
		<button
			className={clsx(
				"rounded-content p-content gap-content flex items-center group transition-all duration-250",
				inSidebar && !isExpanded && "justify-center aspect-square size-10.5 p-0",
				buttonStyle,
				fillWholeWidth && "w-full"
			)}
			aria-label={accessibleLabel}
			title={hoverLabel}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
		>
			{icon && 
				<Icon
					filled={filledicon === true ? hovered : null}
					icon={icon}
					size="18"
					className={clsx(contentStyle)}
				/>
			}
			{showLabel && 
				<p className={clsx(
					"text-medium",
					contentStyle
				)}>
					{value}
				</p>
			}
		</button>
	);
}
