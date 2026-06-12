"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CategoryLabel({ label, isExpanded, collapsed, onClick }: { label: string; isExpanded?: boolean; collapsed?: boolean; onClick?: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: collapsed ? "6px" : "18px 6px 12px",
      flexShrink: 0,
      cursor: collapsed ? undefined : "pointer",
      borderRadius: 8,
      background: collapsed ? "transparent" : hovered ? "rgba(67,70,76,0.25)" : "transparent",
      border: collapsed ? "1px solid transparent" : hovered ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
      transition: "padding 0.2s ease, background 0.15s ease, border-color 0.15s ease",
      position: "relative",
    }}
      onClick={collapsed ? undefined : onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: "absolute", left: 6, right: 6, top: "50%", height: 1,
        background: "#26282b",
        opacity: collapsed ? 1 : 0,
        transition: "opacity 0.2s ease",
      }} />
      <div style={{
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxHeight: collapsed ? 0 : 50,
        opacity: collapsed ? 0 : 1,
        transition: "max-height 0.2s ease, opacity 0.2s ease",
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          color: "#90949d",
          whiteSpace: "nowrap",
        }}>
          {label}
        </span>
        <div style={{ width: 17, height: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ChevronDown 
            style={{ 
              color: "#90949d",
              width: "16px",
              height: "16px",
              transform: isExpanded ? "rotate(0deg)" : "rotate(-90deg)",
              transition: "transform 0.2s ease"
            }}
          />
        </div>
      </div>
    </div>
  );
}
