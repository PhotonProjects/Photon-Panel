"use client";
import { RefObject } from "react";

type LogEntry = { text: string; type: "info" | "warn" | "success" | "plain" };

function LogLine({ line }: { line: LogEntry }) {
  const color =
    line.type === "warn" ? "#ffd365" :
    line.type === "success" ? "#79f962" :
    "#ededed";

  if (line.type === "success") {
    const idx = line.text.indexOf("1 placeholder");
    const prefix = line.text.slice(0, idx);
    const highlight = line.text.slice(idx);
    return (
      <p style={{ color: "#ededed", marginBottom: 0, wordBreak: "break-all" }}>
        <span>{prefix}</span>
        <span style={{ color: "#79f962" }}>{highlight}</span>
      </p>
    );
  }

  return (
    <p style={{ color, marginBottom: 0, wordBreak: "break-all" }}>
      {line.text}
    </p>
  );
}

export default function ConsoleWindow({
  logs,
  command,
  setCommand,
  handleSend,
  consoleEndRef,
}: {
  logs: LogEntry[];
  command: string;
  setCommand: (v: string) => void;
  handleSend: () => void;
  consoleEndRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div style={{
      flex: "1 0 0",
      minWidth: 0,
      display: "flex",
      flexDirection: "column",
      background: "#18191b",
      border: "1px solid #1d1e20",
      borderRadius: 20,
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ background: "#1d1e20", height: 63, display: "flex", alignItems: "center", gap: 18, paddingLeft: 18, flexShrink: 0 }}>
        <img src={"/assets/test/console.svg"} alt="" style={{ width: 22, height: 22, flexShrink: 0 }} />
        <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 500, fontSize: 18, color: "#fff", whiteSpace: "nowrap" }}>
          Console
        </span>
        <div style={{ flex: "1 0 0", minWidth: 0 }} />
        <div style={{ width: 63, height: 63, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 12, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ width: 4, height: 4, background: "#90949d", borderRadius: "50%" }} />
              <div style={{ width: 4, height: 4, background: "#90949d", borderRadius: "50%" }} />
              <div style={{ width: 4, height: 4, background: "#90949d", borderRadius: "50%" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Log area */}
      <div className="console-scroll" style={{ background: "#090a0b", height: 900, overflowY: "auto", padding: "0 8px 22px" }}>
        <div style={{ fontFamily: "'Sometype Mono', 'Cascadia Mono', monospace", fontWeight: 600, fontSize: 16, lineHeight: 1.5 }}>
          {logs.map((line, i) => <LogLine key={i} line={line} />)}
          <div ref={consoleEndRef} />
        </div>
      </div>

      {/* Command input */}
      <div style={{ display: "flex", gap: 16, alignItems: "center", padding: 16, flexShrink: 0 }}>
        <div style={{ flex: "1 0 0", minWidth: 0, height: 44, background: "rgba(16,17,20,0.25)", border: "1px solid #26282b", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, padding: "0 12px", overflow: "hidden" }}>
          <img src={"/assets/test/chevron-right.svg"} alt="" style={{ width: 20, height: 20, flexShrink: 0 }} />
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Enter your command here..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 500 }}
          />
        </div>
        <button onClick={handleSend} style={{ background: "#2763e3", border: "none", borderRadius: 8, height: 44, width: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <img src={"/assets/test/send.svg"} alt="" style={{ width: 22, height: 22 }} />
        </button>
      </div>
    </div>
  );
}
