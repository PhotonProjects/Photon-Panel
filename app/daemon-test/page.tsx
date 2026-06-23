"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { daemon, pingDaemon, type Server, type Egg, type EggVariable } from "@/lib/daemon";

type PowerAction = "start" | "stop" | "restart" | "kill";

function parseRules(rules: string) {
  const parts = rules.split("|");
  const out: Record<string, string | true> = {};
  for (const p of parts) {
    const [k, ...rest] = p.split(":");
    out[k] = rest.length ? rest.join(":") : true;
  }
  return out;
}

function inputTypeForRules(rules: string) {
  const r = parseRules(rules);
  if (r["integer"] || r["numeric"]) return "number";
  if (r["boolean"]) return "checkbox";
  return "text";
}

function inputModeForRules(rules: string) {
  const r = parseRules(rules);
  if (r["integer"]) return "numeric";
  if (r["numeric"]) return "decimal";
  return undefined;
}

function ruleHints(rules: string): string {
  const r = parseRules(rules);
  const hints: string[] = [];
  if (r["required"]) hints.push("required");
  if (typeof r["max"] === "string") hints.push(`max ${r["max"]}`);
  if (typeof r["min"] === "string") hints.push(`min ${r["min"]}`);
  if (typeof r["between"] === "string") hints.push(`between ${r["between"]}`);
  if (typeof r["regex"] === "string") hints.push("regex");
  if (typeof r["not_regex"] === "string") hints.push("not_regex");
  if (r["url"]) hints.push("url");
  if (r["email"]) hints.push("email");
  if (typeof r["in"] === "string") hints.push("in");
  if (typeof r["digits"] === "string") hints.push(`digits:${r["digits"]}`);
  if (r["integer"]) hints.push("integer");
  if (r["numeric"]) hints.push("numeric");
  if (r["string"]) hints.push("string");
  return hints.length ? hints.join(" · ") : "";
}

function StartupPreview({ cmd, values, value, onChange }: { cmd: string; values: Record<string, string>; value: string; onChange: (v: string) => void }) {
  const resolved = cmd.replace(/\{\{(\w+)\}\}/g, (_, k) => values[k] || `<span style="color:#f87171">??</span>`);
  return (
    <textarea
      value={value || resolved}
      onChange={(e) => onChange(e.target.value)}
      rows={2}
      className="w-full bg-neutral-900/80 border border-neutral-700 rounded-[8px] px-3 py-2 text-[12px] font-mono leading-relaxed text-text-100 resize-none"
    />
  );
}

export default function DaemonTestPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [error, setError] = useState("");
  const [uuid, setUuid] = useState("");
  const [serverName, setServerName] = useState("");
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null);
  const [serverDetail, setServerDetail] = useState<Server | null>(null);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [powering, setPowering] = useState<string | null>(null);
  const [daemonAlive, setDaemonAlive] = useState<boolean | null>(null);
  const [logs, setLogs] = useState("");
  const [loadingLogs, setLoadingLogs] = useState(false);

  const [eggText, setEggText] = useState("");
  const [egg, setEgg] = useState<Egg | null>(null);
  const [eggError, setEggError] = useState("");
  const [userVars, setUserVars] = useState<Record<string, string>>({});
  const [selectedImage, setSelectedImage] = useState("");
  const [customStartup, setCustomStartup] = useState("");

  const daemonUrl = process.env.NEXT_PUBLIC_DAEMON_URL || "http://localhost:8080";

  const handleError = useCallback((e: unknown) => {
    setError(e instanceof Error ? e.message : String(e));
  }, []);

  async function loadServers() {
    setLoading(true);
    setError("");
    try {
      const list = await daemon.listServers();
      setServers(list);
    } catch (e) {
      handleError(e);
    } finally {
      setLoading(false);
    }
  }

  const eggPlaceholders = useMemo(() => {
    if (!egg?.startup) return [];
    const matches = egg.startup.match(/\{\{(\w+)\}\}/g);
    return [...new Set(matches?.map((m) => m.slice(2, -2)) || [])];
  }, [egg]);

  function handleParseEgg() {
    setEggError("");
    try {
      const parsed = JSON.parse(eggText) as Egg;
      if (!parsed.name || !parsed.docker_images || !parsed.startup) {
        setEggError("Invalid egg: missing name, docker_images, or startup");
        return;
      }
      // Pterodactyl eggs officiels utilisent "variables" pas "environment"
      if (!parsed.environment || parsed.environment.length === 0) {
        parsed.environment = parsed.variables;
      }
      setEgg(parsed);
      const entries = Object.entries(parsed.docker_images);
      // Pterodactyl: {label: image}. Sample: {image: label}. Détecter le format.
      const firstKey = entries[0]?.[0] || "";
      const firstVal = entries[0]?.[1] || "";
      const keyLooksLikeImage = firstKey.includes("/") || firstKey.includes(":");
      setSelectedImage(keyLooksLikeImage ? firstKey : firstVal);
      const vars: Record<string, string> = {};
      for (const env of parsed.environment || []) {
        vars[env.env_variable] = env.default_value;
      }
      setUserVars(vars);
    } catch {
      setEggError("Invalid JSON");
    }
  }

  function updateVar(key: string, value: string) {
    setUserVars((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCreate() {
    if (!uuid.trim() || creating) return;
    setCreating(true);
    setError("");
    try {
      const s = await daemon.createServer(
        uuid,
        {
          name: serverName || uuid,
          invocation: customStartup || undefined,
          build: {
            memory_limit: egg?.feature_limits?.memory || 1024,
            cpu_limit: egg?.feature_limits?.cpu || 100,
            disk_limit: egg?.feature_limits?.disk || 0,
          },
          allocations: { default: { ip: "0.0.0.0", port: 25565 } },
          egg: egg ?? undefined,
          environment_variables: userVars,
        },
        { user_vars: userVars, selected_image: selectedImage }
      );
      setServers((prev) => [...prev, s]);
      setUuid("");
    } catch (e) {
      handleError(e);
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      await daemon.deleteServer(id);
      setServers((prev) => prev.filter((s) => s.UUID !== id));
      if (selectedUuid === id) {
        setSelectedUuid(null);
        setServerDetail(null);
      }
    } catch (e) {
      handleError(e);
    }
  }

  async function handlePower(action: PowerAction) {
    if (!selectedUuid || powering) return;
    setPowering(action);
    setError("");
    try {
      await daemon.powerAction(selectedUuid, action);
      const s = await daemon.getServer(selectedUuid);
      setServerDetail(s);
      loadServers();
    } catch (e) {
      handleError(e);
    } finally {
      setPowering(null);
    }
  }

  useEffect(() => {
    if (!selectedUuid) {
      setServerDetail(null);
      setLogs("");
      return;
    }
    daemon.getServer(selectedUuid).then(s => {
      setServerDetail(s);
      daemon.logs(selectedUuid, 50).then(r => setLogs(r.logs)).catch(() => {});
    }).catch(() => {});
    const interval = setInterval(() => {
      daemon.getServer(selectedUuid).then(s => {
        setServerDetail(s);
        if (s.state === "running" || s.state === "offline") {
          daemon.logs(selectedUuid, 50).then(r => setLogs(r.logs)).catch(() => {});
        }
      }).catch(() => {});
    }, 2000);
    return () => clearInterval(interval);
  }, [selectedUuid]);

  useEffect(() => {
    loadServers();
    pingDaemon().then(setDaemonAlive);
    const interval = setInterval(() => pingDaemon().then(setDaemonAlive), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full gap-menus p-menus overflow-hidden font-inter">
      <style>{`
        .dscroll::-webkit-scrollbar { width: 4px; }
        .dscroll::-webkit-scrollbar-track { background: transparent; }
        .dscroll::-webkit-scrollbar-thumb { background: #26282b; border-radius: 2px; }
        input::placeholder { color: #90949d; font-size: 13px; font-weight: 500; }
        input:focus, textarea:focus { outline: none; }

        .d-status-pending { color: #eab308; }
        .d-status-installing { color: #60a5fa; }
        .d-status-installed { color: #4ade80; }
        .d-status-starting { color: #22d3ee; }
        .d-status-running { color: #34d399; }
        .d-status-stopping { color: #fb923c; }
        .d-status-offline { color: #737373; }
        .d-status-suspended { color: #f87171; }

        .d-badge-connected { color: #34d399; background: rgba(6,78,59,0.3); padding: 2px 8px; border-radius: 5px; font-size: 11px; }
        .d-badge-unreachable { color: #f87171; background: rgba(127,29,29,0.3); padding: 2px 8px; border-radius: 5px; font-size: 11px; }
        .d-badge-running { color: #34d399; background: rgba(6,78,59,0.3); padding: 4px 10px; border-radius: 5px; font-size: 12px; font-family: monospace; font-weight: 500; }
        .d-badge-offline { color: #a3a3a3; background: rgba(64,64,64,0.5); padding: 4px 10px; border-radius: 5px; font-size: 12px; font-family: monospace; font-weight: 500; }
        .d-badge-other { color: #eab308; background: rgba(113,63,18,0.3); padding: 4px 10px; border-radius: 5px; font-size: 12px; font-family: monospace; font-weight: 500; }

        .d-error-box { background: rgba(127,29,29,0.2); border: 1px solid rgba(153,27,27,0.4); border-radius: 8px; padding: 10px 16px; }
        .d-error-text { color: #fca5a5; font-size: 13px; font-family: monospace; }

        .d-btn-power { flex: 1; padding: 8px 0; border-radius: 8px; font-size: 13px; font-weight: 500; border: 1px solid; transition: all 0.15s; cursor: pointer; }
        .d-btn-power:disabled { opacity: 0.3; cursor: default; }
        .d-btn-start { background: rgba(6,78,59,0.6); border-color: rgba(4,120,87,0.4); color: #6ee7b7; }
        .d-btn-start:hover:not(:disabled) { background: rgba(4,120,87,0.6); }
        .d-btn-stop { background: rgba(127,29,29,0.6); border-color: rgba(153,27,27,0.4); color: #fca5a5; }
        .d-btn-stop:hover:not(:disabled) { background: rgba(153,27,27,0.6); }
        .d-btn-restart { background: rgba(113,63,18,0.6); border-color: rgba(161,98,7,0.4); color: #fcd34d; }
        .d-btn-restart:hover:not(:disabled) { background: rgba(161,98,7,0.6); }
        .d-btn-kill { background: rgba(64,64,64,0.6); border-color: rgba(82,82,82,0.4); color: #a3a3a3; }
        .d-btn-kill:hover:not(:disabled) { background: rgba(127,29,29,0.6); color: #fca5a5; border-color: rgba(153,27,27,0.4); }

        .d-egg-error { color: #f87171; font-size: 11px; margin-top: 4px; }
        .d-startup { color: #d4d4d4; }
        .d-logs { color: #a3a3a3; white-space: pre-wrap; word-break: break-all; }
        .d-var-unfilled { color: #f87171; }
        .d-hover-red:hover { color: #f87171; }
        .d-border-invalid { border-color: rgba(153,27,27,0.5); }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-[15px] font-semibold text-text-100">Daemon Test</h1>
          <span className="text-[12px] text-text-250 font-mono bg-neutral-800 px-2 py-0.5 rounded-[5px]">{daemonUrl}</span>
          {daemonAlive === true && <span className="d-badge-connected">connected</span>}
          {daemonAlive === false && <span className="d-badge-unreachable">unreachable</span>}
          {daemonAlive === null && <span className="text-[11px] text-text-250 bg-neutral-800 px-2 py-0.5 rounded-[5px]">checking...</span>}
        </div>
        <button
          onClick={loadServers}
          disabled={loading}
          className="text-[13px] font-medium text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-40 cursor-pointer"
        >
          {loading ? "refreshing..." : "refresh"}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="d-error-box shrink-0">
          <p className="d-error-text">{error}</p>
        </div>
      )}

      <div className="flex gap-menus flex-1 min-h-0">
        {/* Left */}
        <div className="flex flex-col w-[460px] shrink-0 gap-content overflow-y-auto dscroll">
          {/* Egg paste */}
          <div className="bg-neutral-800/60 rounded-menus p-4 border border-neutral-700/50">
            <p className="text-label text-text-250 mb-2">Pterodactyl Egg</p>
            <textarea
              value={eggText}
              onChange={(e) => setEggText(e.target.value)}
              placeholder='Paste egg JSON here...'
              rows={4}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-content px-3 py-2 text-[12px] font-mono text-text-100 resize-none"
            />
            {eggError && <p className="d-egg-error">{eggError}</p>}
            <button
              onClick={handleParseEgg}
              disabled={!eggText.trim()}
              className="mt-2 text-[12px] font-medium text-primary-400 hover:text-primary-300 transition-colors disabled:opacity-30 cursor-pointer"
            >
              parse egg
            </button>

            {egg && (
              <div className="mt-3 space-y-3 border-t border-neutral-700/40 pt-3">
                <div>
                  <p className="text-[13px] font-semibold text-text-100">{egg.name}</p>
                  {egg.description && <p className="text-[11px] text-text-250 mt-0.5">{egg.description}</p>}
                </div>

                <div>
                  <p className="text-[11px] text-text-250 mb-1">Docker Image</p>
                  {Object.entries(egg.docker_images).map(([k, v]) => {
                    const isImg = (s: string) => s.includes("/") || s.includes(":");
                    const imageUrl = isImg(v) ? v : k;
                    const displayLabel = isImg(v) ? k : v;
                    return (
                      <label
                        key={k}
                        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-content cursor-pointer text-[12px] transition-colors ${
                          selectedImage === imageUrl
                            ? "bg-primary-600/20 text-primary-300"
                            : "hover:bg-neutral-700/40 text-text-250"
                        }`}
                      >
                        <input type="radio" name="docker-image" checked={selectedImage === imageUrl} onChange={() => setSelectedImage(imageUrl)} className="accent-primary-500" />
                        <span className="font-mono flex-1">{imageUrl}</span>
                        <span className="text-text-250">{displayLabel}</span>
                      </label>
                    );
                  })}
                </div>

                {egg.feature_limits && (
                  <div className="flex gap-3 text-[11px] text-text-250">
                    <span>mem: {egg.feature_limits.memory} MB</span>
                    <span>cpu: {egg.feature_limits.cpu}%</span>
                    <span>disk: {egg.feature_limits.disk} MB</span>
                  </div>
                )}

                <div>
                  <p className="text-[11px] text-text-250 mb-1">Startup</p>
                  <StartupPreview cmd={egg.startup} values={userVars} value={customStartup} onChange={setCustomStartup} />
                  {eggPlaceholders.length > 0 && (
                    <p className="text-[10px] mt-1" style={{ color: '#eab308' }}>
                      {eggPlaceholders.length} variable{eggPlaceholders.length > 1 ? "s" : ""} in startup
                      {eggPlaceholders.filter((v) => !userVars[v] || !userVars[v].trim()).length > 0 && (
                        <span className="d-var-unfilled">
                          {" · "}
                          {eggPlaceholders.filter((v) => !userVars[v] || !userVars[v].trim()).length} unfilled
                        </span>
                      )}
                      {customStartup && <span style={{ color: '#34d399' }}> {" · "}custom override</span>}
                    </p>
                  )}
                </div>

                {(egg.environment || []).length > 0 && (
                  <div>
                    <p className="text-[11px] text-text-250 mb-1.5">
                      Variables <span className="text-text-250">({egg.environment!.length})</span>
                    </p>
                    <div className="space-y-1.5">
                      {egg.environment!.map((env) => (
                        <VariableField key={env.env_variable} env={env} value={userVars[env.env_variable] ?? ""} onChange={(v) => updateVar(env.env_variable, v)} />
                      ))}
                    </div>
                  </div>
                )}

                {egg.config_files && egg.config_files.length > 0 && (
                  <div>
                    <p className="text-[11px] text-text-250 mb-1">Config Files</p>
                    {egg.config_files.map((cf) => (
                      <div key={cf.file} className="text-[11px] text-text-250 font-mono">{cf.file} <span className="text-text-250">({cf.parser})</span></div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Create server */}
          <div className="bg-neutral-800/60 rounded-menus p-4 border border-neutral-700/50">
            <p className="text-label text-text-250 mb-2.5">Create Server</p>
            <div className="flex gap-2">
              <input placeholder="UUID" value={uuid} onChange={(e) => setUuid(e.target.value)} className="flex-1 bg-neutral-900 border border-neutral-700 rounded-content px-3 py-2 text-[13px] text-text-100" />
              <input placeholder="Name" value={serverName} onChange={(e) => setServerName(e.target.value)} className="flex-1 bg-neutral-900 border border-neutral-700 rounded-content px-3 py-2 text-[13px] text-text-100" />
              <button onClick={handleCreate} disabled={!uuid.trim() || creating} className="bg-primary-600 hover:bg-primary-500 disabled:opacity-30 disabled:cursor-not-allowed text-[13px] font-medium text-on-primary px-4 rounded-content transition-colors shrink-0 cursor-pointer">
                {creating ? "..." : "Create"}
              </button>
            </div>
          </div>

          {/* Server list */}
          <div className="flex-1 bg-neutral-800/60 rounded-menus border border-neutral-700/50 overflow-hidden flex flex-col min-h-[200px]">
            <div className="px-4 py-3 border-b border-neutral-700/30">
              <p className="text-label text-text-250">Servers <span className="text-text-250">({servers.length})</span></p>
            </div>
            <div className="flex-1 overflow-y-auto dscroll">
              {servers.length === 0 && !loading && <p className="text-[13px] text-text-250 text-center py-8">No servers yet</p>}
              {servers.map((s) => {
                const stateClass = `d-status-${s.state}`;
                return (
                  <div
                    key={s.UUID}
                    onClick={() => setSelectedUuid(s.UUID)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer transition-colors border-b border-neutral-700/20 ${
                      selectedUuid === s.UUID ? "bg-primary-600/15 border-l-2 border-l-primary-500" : "hover:bg-neutral-700/30 border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-text-100 truncate">{s.Config?.name || s.UUID}</p>
                      <p className="text-[11px] text-text-250 font-mono truncate">{s.UUID}</p>
                    </div>
                    <span className={`text-[11px] font-mono font-medium ${stateClass}`}>{s.state}</span>
                    <button onClick={(e) => { e.stopPropagation(); handleDelete(s.UUID); }} className="text-text-250 d-hover-red text-[14px] transition-colors ml-1 shrink-0 cursor-pointer" title="Delete">&times;</button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — server detail */}
        <div className="flex-1 min-w-0">
          {serverDetail ? (
            <div className="bg-neutral-800/60 rounded-menus border border-neutral-700/50 h-full flex flex-col">
              <div className="px-5 py-4 border-b border-neutral-700/30">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-[15px] font-semibold text-text-100">{serverDetail.Config?.name || "Unnamed"}</h2>
                    <p className="text-[12px] text-text-250 font-mono mt-0.5">{serverDetail.UUID}</p>
                  </div>
                  <span className={
                    serverDetail.state === "running" ? "d-badge-running" :
                    serverDetail.state === "offline" ? "d-badge-offline" : "d-badge-other"
                  }>
                    {serverDetail.state}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto dscroll p-5 space-y-4">
                <div>
                  <p className="text-label text-text-250 mb-2">Properties</p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {[
                      ["Memory", `${serverDetail.Config?.build?.memory_limit || 0} MB`],
                      ["Swap", `${serverDetail.Config?.build?.swap || 0} MB`],
                      ["CPU", `${serverDetail.Config?.build?.cpu_limit || 0}%`],
                      ["Disk", `${serverDetail.Config?.build?.disk_limit || 0} MB`],
                      ["IP", serverDetail.Config?.allocations?.default?.ip || "-"],
                      ["Port", String(serverDetail.Config?.allocations?.default?.port || "-")],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between">
                        <span className="text-[12px] text-text-250">{l}</span>
                        <span className="text-[12px] text-text-250 font-mono">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-label text-text-250 mb-2">Power</p>
                  <div className="flex gap-2">
                    {(["start", "stop", "restart", "kill"] as PowerAction[]).map((action) => (
                      <button
                        key={action}
                        onClick={() => handlePower(action)}
                        disabled={!!powering}
                        className={`d-btn-power ${action === "start" ? "d-btn-start" : action === "stop" ? "d-btn-stop" : action === "restart" ? "d-btn-restart" : "d-btn-kill"}`}
                      >
                        {powering === action ? "..." : action}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-label text-text-250">Logs</p>
                    <button
                      onClick={() => {
                        if (!selectedUuid) return;
                        setLoadingLogs(true);
                        daemon.logs(selectedUuid, 100).then(r => setLogs(r.logs)).catch(() => {}).finally(() => setLoadingLogs(false));
                      }}
                      className="text-[11px] font-medium text-primary-400 hover:text-primary-300 transition-colors cursor-pointer"
                    >
                      {loadingLogs ? "..." : "refresh"}
                    </button>
                  </div>
                  <pre className="bg-neutral-950 border border-neutral-700 rounded-[8px] px-3 py-2 text-[11px] font-mono leading-relaxed d-logs overflow-x-auto max-h-[300px] overflow-y-auto">
                    {logs || <span className="text-text-250">No logs yet</span>}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-neutral-800/40 rounded-menus border border-neutral-700/30 h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-[14px] text-text-250">Select a server</p>
                <p className="text-[12px] text-text-250 mt-1">or create one to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VariableField({ env, value, onChange }: { env: EggVariable; value: string; onChange: (v: string) => void }) {
  const rules = parseRules(env.rules);
  const type = inputTypeForRules(env.rules);
  const mode = inputModeForRules(env.rules);
  const hints = ruleHints(env.rules);
  const isInvalid = rules["required"] && !value.trim();

  return (
    <div className={`px-2.5 py-1.5 rounded-content border ${isInvalid ? "d-border-invalid" : "border-transparent"}`}>
      <div className="flex items-center justify-between mb-0.5">
        <label className="text-[12px] font-medium text-text-250">{env.name || env.env_variable}</label>
        <span className="text-[10px] font-mono text-text-250">{env.env_variable}</span>
      </div>
      {env.description && <p className="text-[10px] text-text-250 mb-1">{env.description}</p>}
      <div className="flex items-center gap-2">
        {type === "checkbox" ? (
          <label className="flex items-center gap-2 text-[12px] text-text-250 cursor-pointer">
            <input type="checkbox" checked={value === "1" || value === "true"} onChange={(e) => onChange(e.target.checked ? "1" : "0")} className="accent-primary-500" />
            {value === "1" || value === "true" ? "enabled" : "disabled"}
          </label>
        ) : (
          <input type={type} inputMode={mode} value={value} onChange={(e) => onChange(e.target.value)} placeholder={env.default_value || env.env_variable} className="flex-1 bg-neutral-900/60 border border-neutral-700 rounded-[4px] px-2 py-1 text-[12px] font-mono text-text-100" />
        )}
        {hints && <span className="text-[9px] text-text-250 shrink-0">{hints}</span>}
      </div>
    </div>
  );
}
