"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Copy, Check, Terminal, FileCode2, Activity } from "lucide-react";
import { useTranslations } from "next-intl";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "METRIC" | "SYNC" | "HARDWARE";
  message: string;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: "log-1",
    timestamp: "10:14:02.108",
    level: "HARDWARE",
    message: "ESP32-WROOM-32D handshake ACK on /dev/ttyUSB0 (baud: 115200)",
  },
  {
    id: "log-2",
    timestamp: "10:14:03.420",
    level: "METRIC",
    message: "Sensor HC-SR04 ultrasonic echo: 18.2 cm | BinCap: 78.4%",
  },
  {
    id: "log-3",
    timestamp: "10:14:05.890",
    level: "HARDWARE",
    message: "HX711 24-bit ADC scale calibrated: tare 0.00kg, net 42.85kg (stable)",
  },
  {
    id: "log-4",
    timestamp: "10:14:08.115",
    level: "SYNC",
    message: "Local SQLite WAL delta committed (batch #1240, latency: 4ms)",
  },
  {
    id: "log-5",
    timestamp: "10:14:10.950",
    level: "INFO",
    message: "Tauri 2 IPC bridge: telemetry buffer dispatched to React 19 UI",
  },
];

const ARCHITECTURE_CONFIG = `{
  "system": "EcoPlaza IoT & Desktop Architecture",
  "version": "2.4.0-stable",
  "edge_runtime": {
    "core": "Tauri 2 (Rust FFI)",
    "embedded": "ESP32-WROOM (C++ FreeRTOS)",
    "bus": ["UART", "I2C", "GPIO_INTERRUPT"],
    "persistence": "SQLite 3 with WAL Mode"
  },
  "client_ui": {
    "framework": "Next.js 16 (App Router)",
    "engine": "React 19 + Turbopack",
    "rendering": "Tailwind CSS v4 + Monochromatic Tokens",
    "type_safety": "TypeScript 5.8 Strict"
  },
  "reliability": {
    "offline_first": true,
    "max_sensor_latency": "< 15ms",
    "crc_packet_verification": true
  }
}`;

const STREAM_SAMPLES: Array<{ level: LogEntry["level"]; message: string }> = [
  {
    level: "METRIC",
    message: "Sensor HC-SR04 telemetry update: 17.8 cm | FillRate: +0.4%/min",
  },
  {
    level: "HARDWARE",
    message: "HX711 differential read: 43.10kg | Vibration filter: ACTIVE",
  },
  {
    level: "SYNC",
    message: "Sync daemon: Cloud PostgreSQL mirror ACK received (lat: 12ms)",
  },
  {
    level: "INFO",
    message: "Health check OK: Heap memory 14.8MB RSS | Zero frame drops",
  },
  {
    level: "HARDWARE",
    message: "ESP32 heartbeat keepalive (uptime: 14h 22m 04s, RSSI: -48dBm)",
  },
];

export function InteractiveTerminal() {
  const t = useTranslations("Terminal");
  const [activeTab, setActiveTab] = useState<"daemon" | "config">("daemon");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  // Generador de logs simulados en tiempo real
  useEffect(() => {
    if (!isStreaming || activeTab !== "daemon") return;

    const interval = setInterval(() => {
      const sample = STREAM_SAMPLES[Math.floor(Math.random() * STREAM_SAMPLES.length)];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(
        now.getMilliseconds()
      ).padStart(3, "0")}`;

      setLogs((prev) => [
        ...prev.slice(-14),
        {
          id: `log-${Date.now()}-${Math.random()}`,
          timestamp: timeStr,
          level: sample.level,
          message: sample.message,
        },
      ]);
    }, 2400);

    return () => clearInterval(interval);
  }, [isStreaming, activeTab]);

  // Auto-scroll al final del terminal cuando entran nuevos logs
  useEffect(() => {
    if (terminalBodyRef.current && activeTab === "daemon") {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [logs, activeTab]);

  const handleCopyConfig = async () => {
    try {
      await navigator.clipboard.writeText(ARCHITECTURE_CONFIG);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback silencioso si el navegador bloquea clipboard
    }
  };

  const handleResetLogs = () => {
    setLogs(INITIAL_LOGS);
  };

  return (
    <div className="w-full max-w-xl rounded-2xl border border-border bg-[#0c0d12] text-zinc-100 shadow-xl overflow-hidden font-mono text-xs">
      {/* Barra de título con controles tipo macOS y pestañas */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-[#12131a] px-4 py-2.5 select-none">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="ml-2 font-mono text-[11px] font-medium text-zinc-400">
            ecoplaza-telemetry.daemon
          </span>
        </div>

        {/* Pestañas de modo */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("daemon")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
              activeTab === "daemon"
                ? "bg-accent-muted text-accent font-medium border border-accent/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Activity className="h-3 w-3 text-emerald-400" />
            <span>{t("telemetryTab")}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
              activeTab === "config"
                ? "bg-accent-muted text-accent font-medium border border-accent/30"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileCode2 className="h-3 w-3 text-cyan-400" />
            <span>{t("architectureTab")}</span>
          </button>
        </div>

        {/* Acciones de control */}
        <div className="flex items-center gap-1.5">
          {activeTab === "daemon" ? (
            <>
              <button
                type="button"
                onClick={() => setIsStreaming(!isStreaming)}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
                aria-label={isStreaming ? t("pauseStreaming") : t("resumeStreaming")}
                title={isStreaming ? t("pause") : t("resume")}
              >
                {isStreaming ? (
                  <Pause className="h-3.5 w-3.5 text-zinc-300" />
                ) : (
                  <Play className="h-3.5 w-3.5 text-emerald-400" />
                )}
              </button>
              <button
                type="button"
                onClick={handleResetLogs}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer"
                aria-label={t("resetLogs")}
                title={t("resetConsole")}
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleCopyConfig}
              className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-zinc-300 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label={t("copyJson")}
            >
              {isCopied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">{t("copied")}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>{t("copy")}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Cuerpo principal del terminal */}
      <div
        ref={terminalBodyRef}
        className="h-[280px] overflow-y-auto p-4 font-mono text-xs leading-relaxed bg-[#0c0d12]"
      >
        {activeTab === "daemon" ? (
          <div className="space-y-2">
            {logs.map((log) => {
              let badgeColors = "border-zinc-700 bg-zinc-800/80 text-zinc-300";
              if (log.level === "HARDWARE") {
                badgeColors = "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
              } else if (log.level === "METRIC") {
                badgeColors = "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
              } else if (log.level === "SYNC") {
                badgeColors = "border-indigo-500/30 bg-indigo-500/10 text-indigo-300";
              }

              return (
                <div key={log.id} className="flex items-start gap-2.5 font-mono text-[11px]">
                  <span className="text-zinc-500 select-none text-[10px] pt-0.5 shrink-0">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold border ${badgeColors} select-none shrink-0`}
                  >
                    {log.level}
                  </span>
                  <span className="text-zinc-200 break-words flex-1">
                    {log.message}
                  </span>
                </div>
              );
            })}

            {/* Prompt de terminal interactivo con cursor parpadeante */}
            <div className="flex items-center gap-2 pt-2 text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
              <span className="text-zinc-300">luis@ecoplaza-daemon:~$</span>
              <span className="inline-block h-3.5 w-2 bg-zinc-200 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <pre className="text-zinc-200 text-xs font-mono leading-relaxed select-text">
              <code>
                {ARCHITECTURE_CONFIG.split("\n").map((line, i) => {
                  let formatted = <span key={i}>{line}</span>;
                  if (line.includes(":")) {
                    const [k, ...v] = line.split(":");
                    formatted = (
                      <span key={i}>
                        <span className="text-zinc-100 font-semibold">{k}:</span>
                        <span className="text-zinc-400">{v.join(":")}</span>
                      </span>
                    );
                  }
                  return <div key={i}>{formatted}</div>;
                })}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Barra de pie de consola con estado de memoria y uptime */}
      <div className="flex items-center justify-between border-t border-zinc-800/80 bg-[#0a0a0f] px-4 py-2 font-mono text-[10px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span>MEM: 14.8MB RSS</span>
          <span className="text-zinc-700">|</span>
          <span className="text-zinc-300">UPTIME: 99.98%</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>EDGE NODE: OK</span>
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminal;
