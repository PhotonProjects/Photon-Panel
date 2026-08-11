"use client";

import clsx from "clsx";
import { useContext, type MouseEventHandler } from "react";
import { ButtonContext } from "@/app/contexts/ButtonContext";
import { SidebarContext } from "@/app/contexts/SidebarContext";
import PanelIcon, { type IconName } from "@/app/components/ui/PanelIcon";

type ButtonTone = "neutral" | "primary";
type ButtonVariant = "filled" | "ghost" | "ringed";

interface ButtonProps {
    tone?: ButtonTone;
    variant?: ButtonVariant;
    fillIconOnHover?: boolean;
    label?: string;
    icon?: IconName;
    title?: string;
    ariaLabel?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const buttonStyles: Record<ButtonTone, Record<ButtonVariant, string>> = {
    neutral: {
        filled: "inset-ring inset-ring-inputs-secondary-ring bg-inputs-secondary hover:bg-inputs-secondary-hover",
        ghost: "inset-ring inset-ring-transparent hover:bg-interface-high-surface hover:inset-ring-interface-surface-ring/25",
        ringed: "inset-ring inset-ring-inputs-secondary-ring hover:bg-interface-high-surface",
    },
    primary: {
        filled: "inset-ring inset-ring-transparent bg-inputs-primary hover:bg-inputs-primary-hover hover:inset-ring-inputs-primary-ring",
        ghost: "inset-ring inset-ring-transparent text-primary-400 hover:bg-primary-600/25",
        ringed: "inset-ring inset-ring-inputs-primary bg-primary-600/25 hover:bg-primary-500/25 hover:inset-ring-2 hover:inset-ring-inputs-primary-ring",
    },
};

const contentStyles: Record<ButtonTone, Record<ButtonVariant, string>> = {
    neutral: {
        filled: "text-inputs-on-secondary",
        ghost: "text-text-100",
        ringed: "text-text-100",
    },
    primary: {
        filled: "text-inputs-on-primary",
        ghost: "text-primary-400 group-hover:text-primary-300",
        ringed: "text-primary-400 group-hover:text-primary-300",
    },
};

export default function Button({
    tone = "neutral",
    variant = "ghost",
    fillIconOnHover = false,
    label = "",
    icon,
    title,
    ariaLabel,
    className = "",
    onClick,
}: ButtonProps) {
    const { fillWholeWidth } = useContext(ButtonContext);
    const { inSidebar, isExpanded } = useContext(SidebarContext);
    const showLabel = Boolean(label) && (!inSidebar || isExpanded);
    const accessibleLabel = ariaLabel ?? (label || undefined);
    const hoverLabel = title ?? (label || undefined);
    const contentClassName = contentStyles[tone][variant];

    return (
        <button
            type="button"
            className={clsx(
                "group flex min-h-[var(--interactive-size)] min-w-[var(--interactive-size)] items-center gap-md rounded-[var(--radius-default)] p-md",
                buttonStyles[tone][variant],
                inSidebar &&
                    !isExpanded &&
                    "aspect-square size-[var(--interactive-size)] justify-center p-none",
                fillWholeWidth && "w-full",
                className,
            )}
            aria-label={accessibleLabel}
            title={hoverLabel}
            onClick={onClick}
        >
            {icon && (
                <PanelIcon
                    icon={icon}
                    fillOnHover={fillIconOnHover}
                    className={contentClassName}
                />
            )}
            {showLabel && <span className={clsx("text-medium", contentClassName)}>{label}</span>}
        </button>
    );
}
