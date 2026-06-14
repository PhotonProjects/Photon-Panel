"use client";

import clsx from "clsx";

export default function Icon({
    filled = null,
    icon,
    size,
    className = "",
    style = {}
}: {
    filled?: boolean | null,
    icon: string,
    size: string,
    className?: string,
    style?: React.CSSProperties
}) {
    const SvgIcon = require(`@/public/icons/${icon}.svg`).default
    if (filled !== null) {
        var SvgIconFilled = require(`@/public/icons/${icon}Filled.svg`).default
    }

    return (
        <div className="grid">
            <SvgIcon
                className={clsx("[grid-area:1/1]", filled !== null && (filled ? "opacity-0" : "opacity-100"), className)}
                width={size}
                height={size}
                style={style}
            />
            {filled !== null && (
                <SvgIconFilled
                    className={clsx("[grid-area:1/1]", filled ? "opacity-100" : "opacity-0", className)}
                    width={size}
                    height={size}
                    style={style}
                />
            )}
        </div>
    )
}