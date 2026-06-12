"use client";

export default function InfoWindow() {
  return (
    <div style={{ background: "#18191b", border: "1px solid #1d1e20", borderRadius: 20, height: 205, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#1d1e20", height: 63, display: "flex", alignItems: "center", gap: 18, padding: "0 18px", flexShrink: 0 }}>
        <img src={"/assets/test/info.svg"} alt="" style={{ width: 22, height: 22, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, color: "#fff", whiteSpace: "nowrap" }}>
          Informations
        </span>
      </div>
      <div style={{ flex: 1 }} />
    </div>
  );
}
