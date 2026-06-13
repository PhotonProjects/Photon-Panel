"use client";

import clsx from "clsx";

export default function Icon({
    filled = null,
    icon,
    size,
    className = ""
}: {
    filled?: boolean | null,
    icon: string,
    size: string,
    className?: string
}) {
    const SvgIcon = require(`@/public/icons/${icon}.svg`).default
    if (filled !== null) {
        var SvgIconFilled = require(`@/public/icons/${icon}Filled.svg`).default
    }

    return (
        <div className="grid">
            <SvgIcon
                className={clsx("[grid-area:1/1]", className, filled ? "opacity-0" : "opacity-100")}
                width={size}
                height={size}
            />
            {filled !== null && (
                <SvgIconFilled
                    className={clsx("[grid-area:1/1]", className, filled ? "opacity-100" : "opacity-0")}
                    width={size}
                    height={size}
                />
            )}
        </div>
    )
}