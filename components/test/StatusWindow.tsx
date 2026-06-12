"use client";

export default function StatusWindow() {
  return (
    <div style={{ background: "#18191b", border: "1px solid #1d1e20", borderRadius: 20, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "#1d1e20", height: 63, display: "flex", alignItems: "center", gap: 18, padding: "0 18px" }}>
        <img src={"/assets/test/clock.svg"} alt="" style={{ width: 22, height: 22, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, color: "#fff", whiteSpace: "nowrap" }}>
          Status
        </span>
        <div style={{ flex: "1 0 0" }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(227,39,64,0.25)", border: "1px solid #e32740", borderRadius: 9, padding: "3px 9px", flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#e64157", flexShrink: 0 }} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#e64157", whiteSpace: "nowrap" }}>
            Offline
          </span>
        </div>
      </div>

      {/* Buttons row */}
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button className="status-btn" style={{ padding: "0 12px", flexShrink: 0, cursor: "not-allowed" }}>
            <img src={"/assets/test/stop.svg"} alt="" style={{ width: 20, height: 20, filter: "brightness(0.58)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#90949d" }}>Stop</span>
          </button>

          <button className="status-btn" style={{ padding: "0 12px", flexShrink: 0, cursor: "not-allowed" }}>
            <img src={"/assets/test/skull.svg"} alt="" style={{ width: 20, height: 20, filter: "brightness(0.58)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#90949d" }}>Kill</span>
          </button>

          <button className="status-btn" style={{ padding: "0 12px", flexShrink: 0, cursor: "not-allowed" }}>
            <img src={"/assets/test/restart.svg"} alt="" style={{ width: 20, height: 20, filter: "brightness(0.58)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#90949d" }}>Restart</span>
          </button>

          <div style={{ width: 1, height: 20, background: "#26282b", borderRadius: 1, flexShrink: 0 }} />

          <button className="status-btn-start" style={{ padding: "0 12px", flex: "1 0 0", minWidth: 0 }}>
            <img src={"/assets/test/play.svg"} alt="" style={{ width: 20, height: 20, filter: "brightness(0)" }} />
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 16, color: "#000" }}>Start</span>
          </button>
        </div>
      </div>
    </div>
  );
}
