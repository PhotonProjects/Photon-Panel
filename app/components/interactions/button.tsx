"use client";

import clsx from "clsx/lite";
import Icon from "../interface/icon";
import { useContext, useState } from "react";
import { ButtonContext } from "./buttonContext";

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
		primary ? "text-primary-400 group-hover:text-primary-300" : "text-text-100";
	const backgroundColor =
		primary ? "bg-primary-500/25 hover:bg-primary-400/25" : "hover:bg-neutral-400/25";
	const borderColor =
		primary ? "border-1 border-primary-500 hover:border-primary-400" : "border border-transparent hover:border-neutral-400/25";

	const {fillWholeWidth} = useContext(ButtonContext);

	return (
		<button
			className={clsx(
				"rounded-content p-content gap-content flex items-center group", 
				borderColor, 
				backgroundColor,
				fillWholeWidth && "w-full"
			)}
			title={undefined}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={onClick}
		>
			{icon && 
				<Icon
					filled={filledicon === true ? hovered : null}
					icon={icon}
					size="18"
					className={textColor}
				/>
			}
			{value && 
				<p className={clsx(
					"text-medium",
					textColor
				)}>
					{value}
				</p>
			}
		</button>
	);
}