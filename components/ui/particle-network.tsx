"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  colorIndex: number;
  pulsePhase: number;
}

interface DataPacket {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

export interface ParticleNetworkProps {
  className?: string;
  nodeCount?: number;
  maxDistance?: number;
}

const DARK_COLORS = ["#fafafa", "#e4e4e7", "#d4d4d8", "#a1a1aa"];
const LIGHT_COLORS = ["#09090b", "#18181b", "#27272a", "#52525b"];

export function ParticleNetwork({
  className = "w-full h-full",
  nodeCount = 48,
  maxDistance = 95,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef<boolean>(resolvedTheme === "dark");

  useEffect(() => {
    isDarkRef.current = resolvedTheme === "dark";
  }, [resolvedTheme]);

  const [metrics, setMetrics] = useState({
    activeNodes: nodeCount,
    linksCount: 0,
    fps: 60,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 120,
      isHovered: false,
    };

    const particles: Particle[] = [];
    const packets: DataPacket[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);

      ctx.scale(dpr, dpr);

      if (particles.length === 0) {
        for (let i = 0; i < nodeCount; i++) {
          const r = Math.random() * 2 + 1.8;
          particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.75,
            vy: (Math.random() - 0.5) * 0.75,
            radius: r,
            baseRadius: r,
            colorIndex: Math.floor(Math.random() * DARK_COLORS.length),
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }
      } else {
        particles.forEach((p) => {
          if (p.x > width) p.x = Math.random() * width;
          if (p.y > height) p.y = Math.random() * height;
        });
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.isHovered = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let lastMetricsUpdate = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const isDark = isDarkRef.current;
      const palette = isDark ? DARK_COLORS : LIGHT_COLORS;
      const lineBaseColor = isDark ? "255, 255, 255" : "9, 9, 11";
      const packetColor = isDark ? "#ffffff" : "#09090b";

      frameCount++;

      // Actualizar física de partículas
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) p.vx *= -1;
        if (p.y <= 0 || p.y >= height) p.vy *= -1;

        if (mouse.isHovered) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 3;
            p.y -= Math.sin(angle) * force * 3;
          }
        }

        p.pulsePhase += 0.04;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.6;
      }

      // Trazar conexiones
      let activeLinks = 0;
      const connectedPairs: [number, number][] = [];

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            activeLinks++;
            connectedPairs.push([i, j]);
            const alpha = 1 - dist / maxDistance;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${alpha * (isDark ? 0.22 : 0.16)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.isHovered) {
          const dx = mouse.x - particles[i].x;
          const dy = mouse.y - particles[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const alpha = 1 - dist / mouse.radius;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${lineBaseColor}, ${alpha * (isDark ? 0.45 : 0.3)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Paquetes de datos
      if (connectedPairs.length > 0 && packets.length < 8 && Math.random() < 0.05) {
        const pair = connectedPairs[Math.floor(Math.random() * connectedPairs.length)];
        packets.push({
          fromIndex: pair[0],
          toIndex: pair[1],
          progress: 0,
          speed: Math.random() * 0.03 + 0.015,
        });
      }

      for (let k = packets.length - 1; k >= 0; k--) {
        const pkt = packets[k];
        pkt.progress += pkt.speed;

        if (pkt.progress >= 1) {
          packets.splice(k, 1);
          continue;
        }

        const pFrom = particles[pkt.fromIndex];
        const pTo = particles[pkt.toIndex];
        if (!pFrom || !pTo) {
          packets.splice(k, 1);
          continue;
        }

        const pktX = pFrom.x + (pTo.x - pFrom.x) * pkt.progress;
        const pktY = pFrom.y + (pTo.y - pFrom.y) * pkt.progress;

        ctx.beginPath();
        ctx.arc(pktX, pktY, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = packetColor;
        ctx.shadowColor = packetColor;
        ctx.shadowBlur = isDark ? 6 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Dibujar nodos
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const color = palette[p.colorIndex % palette.length];

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${lineBaseColor}, ${isDark ? 0.08 : 0.05})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = isDark ? 5 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Actualizar métricas una vez por segundo (evita re-renders en rAF)
      if (time - lastMetricsUpdate > 1000) {
        setMetrics({
          activeNodes: particles.length,
          linksCount: activeLinks,
          fps: Math.round((frameCount * 1000) / (time - lastMetricsUpdate)),
        });
        frameCount = 0;
        lastMetricsUpdate = time;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [nodeCount, maxDistance]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className={className}
        style={{ display: "block" }}
      />

      {/* Indicadores de telemetría superpuestos en tiempo real */}
      <div className="pointer-events-none absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-foreground animate-pulse" />
          <span>NODOS: {metrics.activeNodes}</span>
          <span className="opacity-40">|</span>
          <span className="text-foreground font-semibold">ENLACES: {metrics.linksCount}</span>
        </div>
        <div className="flex items-center gap-1.5 opacity-75">
          <span>TX: 115200 BAUD</span>
        </div>
      </div>
    </div>
  );
}

export default ParticleNetwork;
