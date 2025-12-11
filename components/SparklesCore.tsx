
"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "../lib/utils";

type SparklesProps = {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  speed?: number;
};

export const SparklesCore = ({
  id,
  className,
  background,
  minSize = 0.5,
  maxSize = 1.5,
  particleDensity = 100,
  particleColor = "#FFFFFF"
}: SparklesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      particles = [];
      // Ajuste de densidade baseado na área da tela
      const count = particleDensity;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * 0.5, // Velocidade lenta
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.5
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Fundo transparente ou cor definida
      if (background && background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      particles.forEach((p) => {
        // Movimento
        p.x += p.speedX;
        p.y += p.speedY;

        // Resetar posição se sair da tela (efeito infinito)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Desenhar
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [minSize, maxSize, particleDensity, particleColor, background]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("w-full h-full opacity-100 transition-opacity duration-1000", className)}
    />
  );
};
