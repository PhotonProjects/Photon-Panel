const DAEMON_URL = process.env.NEXT_PUBLIC_DAEMON_URL || "http://localhost:8080";
const DAEMON_TOKEN = process.env.NEXT_PUBLIC_DAEMON_TOKEN || "test-token";

async function request<T>(path: string, init?: RequestInit, timeoutMs = 8000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${DAEMON_URL}${path}`, {
      signal: controller.signal,
      ...init,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DAEMON_TOKEN}`,
        ...init?.headers,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`${res.status} ${res.statusText}: ${body}`);
    }
    if (res.status === 204) return undefined as T;
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}

export interface BuildConfig {
  memory_limit?: number;
  swap?: number;
  cpu_limit?: number;
  io_weight?: number;
  disk_limit?: number;
  oom_disabled?: boolean;
}

export interface Allocation {
  ip: string;
  port: number;
}

export interface ServerConfig {
  name: string;
  suspended?: boolean;
  skip_egg_scripts?: boolean;
  invocation?: string;
  environment_variables?: Record<string, string>;
  build?: BuildConfig;
  allocations?: {
    default: Allocation;
    additional?: Allocation[];
  };
  egg?: unknown;
}

export interface EggVariable {
  name: string;
  description?: string;
  env_variable: string;
  default_value: string;
  user_viewable?: boolean;
  user_editable?: boolean;
  rules: string;
  field_type?: string;
}

export interface Egg {
  name: string;
  description?: string;
  author?: string;
  docker_images: Record<string, string>;
  startup: string;
  environment?: EggVariable[];
  variables?: EggVariable[];
  scripts: {
    installation: {
      script: string;
      container_image?: string;
      container?: string;
      entrypoint: string;
    };
  };
  config_files?: {
    file: string;
    parser: string;
    replace: { match: string; replace_with: string }[];
  }[];
  feature_limits?: {
    memory: number;
    cpu: number;
    disk: number;
  };
  features?: string[];
}

export interface Server {
  UUID: string;
  Config: ServerConfig;
  state: string;
}

export function pingDaemon(): Promise<boolean> {
  return request<unknown>("/api/servers", undefined, 3000)
    .then(() => true)
    .catch(() => false);
}

export const daemon = {
  listServers: () => request<Server[]>("/api/servers"),

  getServer: (uuid: string) => request<Server>(`/api/servers/${uuid}`),

  createServer: (
    uuid: string,
    config: ServerConfig,
    opts?: { user_vars?: Record<string, string>; selected_image?: string }
  ) =>
    request<Server>(`/api/servers?uuid=${uuid}`, {
      method: "POST",
      body: JSON.stringify({
        config,
        user_vars: opts?.user_vars,
        selected_image: opts?.selected_image,
      }),
    }),

  deleteServer: (uuid: string) =>
    request<void>(`/api/servers/${uuid}`, { method: "DELETE" }),

  powerAction: (uuid: string, action: "start" | "stop" | "restart" | "kill") =>
    request<{ status: string }>(`/api/servers/${uuid}/power`, {
      method: "POST",
      body: JSON.stringify({ action }),
    }, 300_000),

  install: (uuid: string) =>
    request<{ status: string }>(`/api/servers/${uuid}/install`, {
      method: "POST",
    }, 300_000),

  sync: (uuid: string) =>
    request<{ status: string }>(`/api/servers/${uuid}/sync`, {
      method: "POST",
    }),

  logs: (uuid: string, tail = 100) =>
    request<{ logs: string }>(`/api/servers/${uuid}/logs?tail=${tail}`),
};
