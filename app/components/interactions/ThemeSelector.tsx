"use client";

import clsx from "clsx";
import { Fragment, useState } from "react";
import PanelIcon, { type IconName } from "@/app/components/ui/PanelIcon";

type ThemePreference = "system" | "light" | "dark";

interface ThemeOption {
    id: ThemePreference;
    icon: IconName;
    label: string;
}

const THEME_OPTIONS: readonly ThemeOption[] = [
    { id: "system", icon: "Monitor", label: "Use system theme" },
    { id: "light", icon: "Settings", label: "Use light theme" },
    { id: "dark", icon: "Moon", label: "Use dark theme" },
];

const segmentRadiusStyles: Record<ThemePreference, string> = {
    system: "rounded-l-[var(--radius-medium)] rounded-r-none",
    light: "rounded-none",
    dark: "rounded-l-none rounded-r-[var(--radius-medium)]",
};

export default function ThemeSelector() {
    const [activeTheme, setActiveTheme] = useState<ThemePreference>("dark");

    return (
        <div
            className="relative flex h-[var(--authentication-utility-indicator-height)] w-[var(--authentication-utility-indicator-width)] items-center"
            role="group"
            aria-label="Theme preference"
        >
            <span className="pointer-events-none absolute inset-x-none h-[calc(var(--authentication-utility-indicator-height)-var(--spacing-xs))] rounded-[var(--radius-medium)] inset-ring inset-ring-[color:var(--authentication-control-ring)]" />

            {THEME_OPTIONS.map((option, index) => {
                const isActive = option.id === activeTheme;

                return (
                    <Fragment key={option.id}>
                        <button
                            type="button"
                            aria-label={option.label}
                            aria-pressed={isActive}
                            onClick={() => setActiveTheme(option.id)}
                            className={clsx(
                                "relative grid min-w-none place-items-center",
                                isActive
                                    ? "h-[var(--authentication-utility-indicator-height)] w-[var(--authentication-utility-indicator-height)] shrink-0 bg-[var(--authentication-primary-muted)] text-[var(--authentication-primary)] inset-ring inset-ring-[color:var(--authentication-primary-ring)]"
                                    : "h-[calc(var(--authentication-utility-indicator-height)-var(--spacing-xs))] flex-1 text-[var(--authentication-label)] hover:bg-[var(--authentication-elevated-surface)]",
                                segmentRadiusStyles[option.id],
                            )}
                        >
                            <PanelIcon icon={option.icon} size="var(--icon-size-compact)" />
                        </button>

                        {index < THEME_OPTIONS.length - 1 && (
                            <span
                                aria-hidden="true"
                                className="relative h-[calc(var(--authentication-utility-indicator-height)-var(--spacing-xs))] w-[var(--separator-height)] shrink-0 bg-[var(--authentication-control-ring)]"
                            />
                        )}
                    </Fragment>
                );
            })}
        </div>
    );
}
