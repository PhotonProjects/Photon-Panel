"use client";
import { useState } from "react";

export default function NavItem({ icon, label, active, collapsed }: { icon: string; label: string; active?: boolean; collapsed?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const activeIcon = icon.replace(".svg", "-active.svg");
  const showActive = active || hovered;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: collapsed ? "center" : undefined,
      gap: 12,
      padding: collapsed ? 12 : 12,
      borderRadius: 8,
      cursor: "pointer",
      background: active ? "rgba(39,99,227,0.25)" : hovered ? "rgba(67,70,76,0.25)" : "transparent",
      border: active ? "1px solid #2763e3" : hovered ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      transition: "background 0.15s ease, border 0.15s ease",
      flexShrink: 0,
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ width: 20, height: 20, position: "relative", flexShrink: 0 }}>
        <img src={activeIcon} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          filter: active ? "none" : "brightness(0) saturate(100%) invert(1)",
          opacity: showActive ? 1 : 0,
          transition: "opacity 0.2s ease",
        }} />
        <img src={icon} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          filter: "brightness(0) saturate(100%) invert(1)",
          opacity: showActive ? 0 : 1,
          transition: "opacity 0.2s ease",
        }} />
      </div>
      {!collapsed && (
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: 16,
          color: active ? "#4a7ce8" : "#fff",
          transition: "color 0.2s ease",
          whiteSpace: "nowrap",
        }}>
          {label}
        </span>
      )}
    </div>
  );
}
