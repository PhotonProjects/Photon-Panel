"use client";
import { Dispatch, SetStateAction } from "react";
import CategoryLabel from "./CategoryLabel";
import NavItem from "./NavItem";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  transitioning: boolean;
  setTransitioning: Dispatch<SetStateAction<boolean>>;
  expandedSections: Record<string, boolean>;
  toggleSection: (section: string) => void;
}

export default function Sidebar({ collapsed, setCollapsed, transitioning, setTransitioning, expandedSections, toggleSection }: SidebarProps) {
  return (
    <div style={{
      width: collapsed ? 76 : 267,
      minWidth: collapsed ? 76 : 267,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      flexShrink: 0,
      transition: "width 0.2s ease, min-width 0.2s ease",
    }}
      onTransitionEnd={() => setTransitioning(false)}
    >
      <div style={{
        background: "#18191b",
        border: "1px solid #1d1e20",
        borderRadius: 20,
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        flex: "1 0 0",
        minHeight: 0,
      }}>
        {/* Logo */}
        <div style={{
          background: "#1d1e20",
          borderRadius: 8,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}>
          <img src={"https://cdn.nicolas4tech.fr/logos/nobg/n4t_dark.svg"} alt="" style={{
            position: "absolute", height: 18, width: "auto", objectFit: "contain",
            opacity: collapsed ? 1 : 0,
            transition: "opacity 0.3s ease",
          }} />
          <img src={"https://cdn.nicolas4tech.fr/logos/nobg/nicolas4tech_dark.png"} alt="" style={{
            height: 18, width: "auto", objectFit: "contain",
            opacity: collapsed ? 0 : 1,
            transition: "opacity 0.3s ease",
          }} />
        </div>

        {/* Nav Items */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: "1 0 0",
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          pointerEvents: transitioning ? "none" : undefined,
        }}>
          <CategoryLabel label="OVERVIEW" isExpanded={expandedSections.overview} collapsed={collapsed} onClick={() => toggleSection("overview")} />
          <div style={{
            overflow: "hidden",
            maxHeight: (!collapsed && expandedSections.overview) || collapsed ? 200 : 0,
            opacity: (!collapsed && expandedSections.overview) || collapsed ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}>
            <NavItem icon={"/assets/test/box.svg"} label="Dashboard" active collapsed={collapsed} />
          </div>

          <CategoryLabel label="FILES" isExpanded={expandedSections.files} collapsed={collapsed} onClick={() => toggleSection("files")} />

          <CategoryLabel label="SERVER" isExpanded={expandedSections.server} collapsed={collapsed} onClick={() => toggleSection("server")} />
          <div style={{
            overflow: "hidden",
            maxHeight: (!collapsed && expandedSections.server) || collapsed ? 200 : 0,
            opacity: (!collapsed && expandedSections.server) || collapsed ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}>
            <NavItem icon={"/assets/test/start.svg"} label="Startup" collapsed={collapsed} />
            <NavItem icon={"/assets/test/calendar.svg"} label="Schedules" collapsed={collapsed} />
          </div>

          <CategoryLabel label="NETWORKING" isExpanded={expandedSections.networking} collapsed={collapsed} onClick={() => toggleSection("networking")} />
          <div style={{
            overflow: "hidden",
            maxHeight: (!collapsed && expandedSections.networking) || collapsed ? 200 : 0,
            opacity: (!collapsed && expandedSections.networking) || collapsed ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}>
            <NavItem icon={"/assets/test/tree.svg"} label="Allocations" collapsed={collapsed} />
            <NavItem icon={"/assets/test/globe.svg"} label="Subdomains" collapsed={collapsed} />
          </div>

          <CategoryLabel label="MANAGEMENT" isExpanded={expandedSections.management} collapsed={collapsed} onClick={() => toggleSection("management")} />
          <div style={{
            overflow: "hidden",
            maxHeight: (!collapsed && expandedSections.management) || collapsed ? 200 : 0,
            opacity: (!collapsed && expandedSections.management) || collapsed ? 1 : 0,
            transition: "max-height 0.3s ease, opacity 0.3s ease",
          }}>
            <NavItem icon={"/assets/test/settings.svg"} label="Settings" collapsed={collapsed} />
            <NavItem icon={"/assets/test/users.svg"} label="Users" collapsed={collapsed} />
            <NavItem icon={"/assets/test/console.svg"} label="Logs" collapsed={collapsed} />
          </div>
        </div>

        {/* Collapse button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "flex-end", flexShrink: 0 }}>
          <button
            onClick={() => { setCollapsed(c => !c); setTransitioning(true); }}
            style={{
              background: "rgba(16,17,20,0.25)",
              border: "1px solid #26282b",
              borderRadius: 8,
              height: 44,
              width: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}>
            <img src={collapsed ? "/assets/test/layout-open.svg" : "/assets/test/layout-close.svg"} alt="" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
