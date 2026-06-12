"use client";
import { ChevronRight } from "lucide-react";

export default function Topbar() {
  return (
    <div style={{
      background: "#18191b",
      border: "1px solid #1d1e20",
      borderRadius: 20,
      height: 84,
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 12,
      flexShrink: 0,
    }}>
      {/* Arrow left */}
      <div style={{ width: 60, height: 60, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <button className="topbar-btn" style={{ height: 44, width: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <img src={"/assets/test/arrow-left.svg"} alt="" style={{ width: 20, height: 20 }} />
        </button>
      </div>

      {/* Separator */}
      <div style={{ width: 1, height: 20, background: "#26282b", flexShrink: 0, borderRadius: 1 }} />

      {/* Server block */}
      <div className="topbar-interactive" style={{ display: "flex", alignItems: "center", gap: 12, height: 60, padding: "0 8px", borderRadius: 8, flexShrink: 0 }}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", padding: "8px 0" }}>
          <div style={{ width: 38, height: 38, borderRadius: 8, overflow: "hidden", position: "relative", flexShrink: 0 }}>
            <img src={"https://cdn.nicolas4tech.fr/services/minecraft.svg"} alt="" style={{
              position: "absolute", left: "-7.89%", top: "-7.89%", width: "115.79%", height: "115.79%", objectFit: "cover", maxWidth: "none",
            }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", height: 40, justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap", lineHeight: 1 }}>
            Serveur Minecraft
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(227,39,64,0.25)", border: "1px solid #e32740", borderRadius: 5, padding: "1px 6px", flexShrink: 0, alignSelf: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#e64157", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#e64157", whiteSpace: "nowrap" }}>Offline</span>
          </div>
        </div>
        <ChevronRight style={{ width: 18, height: 18, flexShrink: 0, color: "#90949d" }} />
      </div>

      {/* Spacer */}
      <div style={{ flex: "1 0 0", minWidth: 0 }} />

      {/* Notification bell */}
      <button className="topbar-btn" style={{ height: 44, width: 44, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <img src={"/assets/test/notification.svg"} alt="" style={{ width: 20, height: 20 }} />
      </button>

      {/* Separator */}
      <div style={{ width: 1, height: 20, background: "#26282b", flexShrink: 0, borderRadius: 1 }} />

      {/* Profile block */}
      <div className="topbar-interactive" style={{ display: "flex", alignItems: "center", gap: 12, height: 60, padding: "0 8px", margin: "0 2px 2px 2px", borderRadius: 8, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", height: 45, justifyContent: "space-between", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#fff", whiteSpace: "nowrap" }}>
            Jamesfrench
          </span>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(39,99,227,0.25)", border: "1px solid #2763e3", borderRadius: 5, padding: "1px 6px", flexShrink: 0, alignSelf: "flex-end" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4a7ce8", flexShrink: 0 }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 13, color: "#4a7ce8", whiteSpace: "nowrap" }}>User</span>
          </div>
        </div>
        <div style={{ width: 44, height: 44, borderRadius: 8, overflow: "hidden", flexShrink: 0 }}>
          <img src={"https://cdn.discordapp.com/avatars/1094693285416685690/da8f052dd8635f8f06e68b9b56c11bd8.webp?size=1024"} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
}
