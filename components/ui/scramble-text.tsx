"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: "view" | "hover";
  characters?: string;
  as?: React.ElementType;
}

const DEFAULT_CHARACTERS = "01ABCDEF_#/><[]*$!";

export function ScrambleText({
  text,
  className,
  trigger = "view",
  characters = DEFAULT_CHARACTERS,
  as: Component = "span",
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const elementRef = useRef<HTMLElement | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const hasTriggeredViewRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (typeof window === "undefined") return;

    // Respetar preferencias de reducción de movimiento
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(text);
      return;
    }

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    isAnimatingRef.current = true;
    const duration = 700; // Lapso óptimo entre 0.6s y 0.8s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const solvedCount = Math.floor(progress * text.length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") {
            return " ";
          }
          if (index < solvedCount) {
            return text[index];
          }
          const randomChar =
            characters[Math.floor(Math.random() * characters.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayText(text);
        isAnimatingRef.current = false;
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animate);
  }, [text, characters]);

  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement || trigger !== "view") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasTriggeredViewRef.current) {
          hasTriggeredViewRef.current = true;
          startScramble();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [trigger, startScramble]);

  useEffect(() => {
    if (!isAnimatingRef.current) {
      setDisplayText(text);
    }
  }, [text]);

  const handleMouseEnter = () => {
    if (trigger === "hover" || !isAnimatingRef.current) {
      startScramble();
    }
  };

  return (
    <Component
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ position: "relative", display: "inline-block" }}
      aria-label={text}
    >
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0">
        {displayText}
      </span>
    </Component>
  );
}

export default ScrambleText;
