"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Copy, Check, Terminal, FileCode2, Activity } from "lucide-react";

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
    "rendering": "Tailwind CSS v4 + Canvas / WebGL",
    "type_safety": "TypeScript 5.8 Strict"
  },
  "reliability": {
    "offline_first": true,
    "max_sensor_latency": "< 15ms",
    "crc_packet_verification": true
  }
}`;

export function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState<"daemon" | "config">("daemon");
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const terminalBodyRef = useRef<HTMLDivElement | null>(null);

  // Generador de logs simulados en tiempo real
  useEffect(() => {
    if (!isStreaming || activeTab !== "daemon") return;

    const samples: Array<{ level: LogEntry["level"]; message: string }> = [
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
        message: "UART frame #0942 validated with CRC-16 checksum match (0x7FA1)",
      },
    ];

    let sampleIndex = 0;

    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");
      const currentSample = samples[sampleIndex % samples.length];
      sampleIndex++;

      const newEntry: LogEntry = {
        id: `log-${Date.now()}`,
        timestamp: timeStr,
        level: currentSample.level,
        message: currentSample.message,
      };

      setLogs((prev) => {
        const next = [...prev, newEntry];
        return next.length > 8 ? next.slice(next.length - 8) : next;
      });

      if (terminalBodyRef.current) {
        terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isStreaming, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(ARCHITECTURE_CONFIG);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleResetLogs = () => {
    setLogs(INITIAL_LOGS);
  };

  return (
    <div className="group relative w-full rounded-2xl border border-zinc-800 bg-[#0d121c]/95 shadow-2xl backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.15)]">
      {/* Barra superior estilo macOS con pestañas interactivas */}
      <div className="flex flex-wrap items-center justify-between border-b border-zinc-800/90 bg-zinc-950/80 px-4 py-3">
        {/* Puntos de ventana macOS */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ef4444]/90 shadow-sm shadow-red-500/20" />
          <span className="h-3 w-3 rounded-full bg-[#eab308]/90 shadow-sm shadow-yellow-500/20" />
          <span className="h-3 w-3 rounded-full bg-[#22c55e]/90 shadow-sm shadow-green-500/20" />
          <span className="ml-2 hidden font-mono text-[11px] text-zinc-400 sm:inline">
            luis@arch-node: ~
          </span>
        </div>

        {/* Pestañas de consola */}
        <div className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("daemon")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer ${
              activeTab === "daemon"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Activity className="h-3 w-3 text-emerald-400" />
            <span>ecoplaza.daemon</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("config")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors cursor-pointer ${
              activeTab === "config"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileCode2 className="h-3 w-3 text-cyan-400" />
            <span>architecture.config</span>
          </button>
        </div>

        {/* Indicador de transmisión y controles */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          {activeTab === "daemon" ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="hidden sm:inline">LIVE 115200</span>
              </span>

              <button
                type="button"
                onClick={() => setIsStreaming(!isStreaming)}
                title={isStreaming ? "Pausar stream" : "Reanudar stream"}
                className="rounded-md border border-zinc-800 bg-zinc-900 p-1 text-zinc-400 hover:text-white hover:border-zinc-700 cursor-pointer transition-colors"
                aria-label={isStreaming ? "Pausar telemetría" : "Reanudar telemetría"}
              >
                {isStreaming ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 text-emerald-400" />}
              </button>

              <button
                type="button"
                onClick={handleResetLogs}
                title="Reiniciar consola"
                className="rounded-md border border-zinc-800 bg-zinc-900 p-1 text-zinc-400 hover:text-white hover:border-zinc-700 cursor-pointer transition-colors"
                aria-label="Reiniciar registros"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md border border-zinc-800 bg-zinc-900 px-2 py-1 text-zinc-400 hover:text-white hover:border-cyan-500/40 cursor-pointer transition-colors"
              aria-label="Copiar configuración de arquitectura"
            >
              {isCopied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copiar JSON</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Cuerpo de la consola */}
      <div
        ref={terminalBodyRef}
        className="h-[320px] sm:h-[350px] overflow-y-auto p-4 font-mono text-xs leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800"
      >
        {activeTab === "daemon" ? (
          <div className="space-y-2">
            <div className="text-zinc-500 text-[11px] pb-1 border-b border-zinc-800/60">
              # Telemetría de sensores en producción — ESP32 + Balanza HX711 + SQLite Edge
            </div>

            {logs.map((log) => {
              const badgeColors = {
                HARDWARE: "text-amber-400 bg-amber-950/40 border-amber-500/20",
                METRIC: "text-cyan-400 bg-cyan-950/40 border-cyan-500/20",
                SYNC: "text-emerald-400 bg-emerald-950/40 border-emerald-500/20",
                INFO: "text-zinc-300 bg-zinc-800/40 border-zinc-700/20",
              }[log.level];

              return (
                <div key={log.id} className="flex flex-wrap items-start gap-2">
                  <span className="text-zinc-600 select-none text-[10px] pt-0.5">
                    [{log.timestamp}]
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.2 text-[9px] font-bold border ${badgeColors} select-none`}
                  >
                    {log.level}
                  </span>
                  <span className="text-zinc-300 break-words flex-1">
                    {log.message}
                  </span>
                </div>
              );
            })}

            {/* Prompt de terminal interactivo con cursor parpadeante */}
            <div className="flex items-center gap-2 pt-2 text-zinc-400">
              <Terminal className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
              <span className="text-emerald-400">luis@ecoplaza-daemon:~$</span>
              <span className="inline-block h-3.5 w-2 bg-emerald-400 animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <pre className="text-zinc-300 text-xs font-mono leading-relaxed select-text">
              <code>
                {ARCHITECTURE_CONFIG.split("\n").map((line, i) => {
                  let formatted = <span key={i}>{line}</span>;
                  if (line.includes(":")) {
                    const [k, ...v] = line.split(":");
                    formatted = (
                      <span key={i}>
                        <span className="text-emerald-400">{k}:</span>
                        <span className="text-cyan-300">{v.join(":")}</span>
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
      <div className="flex items-center justify-between border-t border-zinc-800/80 bg-zinc-950/90 px-4 py-2 font-mono text-[10px] text-zinc-500">
        <div className="flex items-center gap-3">
          <span>MEM: 14.8MB RSS</span>
          <span className="text-zinc-700">|</span>
          <span className="text-emerald-400/90">UPTIME: 99.98%</span>
        </div>
        <div className="flex items-center gap-1.5 text-cyan-400">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>EDGE NODE: OK</span>
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminal;

