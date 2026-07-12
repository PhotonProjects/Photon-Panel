"use client";

import clsx from "clsx";
import type { SVGProps } from "react";
import ArrowLeft from "@/public/icons/ArrowLeft.svg";
import Box from "@/public/icons/Box.svg";
import BoxFilled from "@/public/icons/BoxFilled.svg";
import Calendar from "@/public/icons/Calendar.svg";
import CalendarFilled from "@/public/icons/CalendarFilled.svg";
import ChevronRight from "@/public/icons/ChevronRight.svg";
import Clock from "@/public/icons/Clock.svg";
import ClockFilled from "@/public/icons/ClockFilled.svg";
import Console from "@/public/icons/Console.svg";
import ConsoleFilled from "@/public/icons/ConsoleFilled.svg";
import Database from "@/public/icons/Database.svg";
import DatabaseFilled from "@/public/icons/DatabaseFilled.svg";
import Folder from "@/public/icons/Folder.svg";
import FolderFilled from "@/public/icons/FolderFilled.svg";
import Frequency from "@/public/icons/Frequency.svg";
import Globe from "@/public/icons/Globe.svg";
import GlobeFilled from "@/public/icons/GlobeFilled.svg";
import Info from "@/public/icons/Info.svg";
import LayoutClose from "@/public/icons/LayoutClose.svg";
import LayoutOpen from "@/public/icons/LayoutOpen.svg";
import Notification from "@/public/icons/Notification.svg";
import Play from "@/public/icons/Play.svg";
import Restart from "@/public/icons/Restart.svg";
import RightArrow from "@/public/icons/RightArrow.svg";
import Send from "@/public/icons/Send.svg";
import Settings from "@/public/icons/Settings.svg";
import SettingsFilled from "@/public/icons/SettingsFilled.svg";
import Skull from "@/public/icons/Skull.svg";
import Start from "@/public/icons/Start.svg";
import StartFilled from "@/public/icons/StartFilled.svg";
import Stop from "@/public/icons/Stop.svg";
import ThreeDotsVertical from "@/public/icons/ThreeDotsVertical.svg";
import Tree from "@/public/icons/Tree.svg";
import TreeFilled from "@/public/icons/TreeFilled.svg";
import Users from "@/public/icons/Users.svg";
import UsersFilled from "@/public/icons/UsersFilled.svg";
import X from "@/public/icons/X.svg";

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element;

const iconMap = {
    ArrowLeft,
    Box,
    BoxFilled,
    Calendar,
    CalendarFilled,
    ChevronRight,
    Clock,
    ClockFilled,
    Console,
    ConsoleFilled,
    Database,
    DatabaseFilled,
    Folder,
    FolderFilled,
    Frequency,
    Globe,
    GlobeFilled,
    Info,
    LayoutClose,
    LayoutOpen,
    Notification,
    Play,
    Restart,
    RightArrow,
    Send,
    Settings,
    SettingsFilled,
    Skull,
    Start,
    StartFilled,
    Stop,
    ThreeDotsVertical,
    Tree,
    TreeFilled,
    Users,
    UsersFilled,
    X,
} satisfies Record<string, IconComponent>;

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
    const SvgIcon = iconMap[icon];
    const SvgIconFilled = filled !== null ? iconMap[`${icon}Filled`] : undefined;
    const canSwapToFilledIcon = filled !== null && Boolean(SvgIconFilled);

    if (!SvgIcon) {
        return null;
    }

    return (
        <div className="grid">
            <SvgIcon
                className={clsx(
                    "[grid-area:1/1]",
                    canSwapToFilledIcon && (filled ? "opacity-0" : "opacity-100"),
                    className
                )}
                width={size}
                height={size}
                style={style}
            />
            {canSwapToFilledIcon && SvgIconFilled && (
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
