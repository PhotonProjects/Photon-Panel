import Button from "@/app/components/ui/Button";
import Sidebar from "@/app/components/navigation/Sidebar";
import SidebarCategory from "@/app/components/navigation/SidebarCategory";
import Topbar from "@/app/components/navigation/Topbar";
import { SIDEBAR_SECTIONS } from "@/app/config/sidebar";

export default function PanelPage() {
    return (
        <div className="flex h-full min-h-[var(--spacing-none)]">
            <Sidebar>
                {SIDEBAR_SECTIONS.map((section) => (
                    <SidebarCategory key={section.label} name={section.label}>
                        {section.items.map((item) => (
                            <Button
                                key={item.label}
                                label={item.label}
                                icon={item.icon}
                                tone={item.active ? "primary" : "neutral"}
                                variant={item.active ? "ringed" : "ghost"}
                                fillIconOnHover={!item.active}
                            />
                        ))}
                    </SidebarCategory>
                ))}
            </Sidebar>
            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar />
            </div>
        </div>
    );
}
