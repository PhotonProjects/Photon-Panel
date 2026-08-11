import type { IconName } from "@/app/components/ui/PanelIcon";

export interface SidebarItem {
    label: string;
    icon: IconName;
    active?: boolean;
}

export interface SidebarSection {
    label: string;
    items: readonly SidebarItem[];
}

export const SIDEBAR_SECTIONS: readonly SidebarSection[] = [
    {
        label: "Overview",
        items: [{ label: "Dashboard", icon: "ConsoleFilled", active: true }],
    },
    {
        label: "Files",
        items: [
            { label: "Files", icon: "Folder" },
            { label: "Databases", icon: "Database" },
            { label: "Backups", icon: "Box" },
        ],
    },
    {
        label: "Server",
        items: [
            { label: "Startup", icon: "Start" },
            { label: "Schedules", icon: "Calendar" },
        ],
    },
    {
        label: "Networking",
        items: [
            { label: "Allocations", icon: "Tree" },
            { label: "Subdomains", icon: "Globe" },
        ],
    },
    {
        label: "Management",
        items: [
            { label: "Settings", icon: "Settings" },
            { label: "Users", icon: "Users" },
            { label: "Logs", icon: "Clock" },
        ],
    },
];
