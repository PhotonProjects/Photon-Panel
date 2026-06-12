"use client";
import StatusWindow from "./StatusWindow";
import InfoWindow from "./InfoWindow";

export default function RightSidebar() {
  return (
    <div style={{ width: 506, minWidth: 506, display: "flex", flexDirection: "column", gap: 16, flexShrink: 0 }}>
      <StatusWindow />
      <InfoWindow />
    </div>
  );
}
