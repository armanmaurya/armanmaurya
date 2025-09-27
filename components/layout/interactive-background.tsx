'use client';

import { memo, useEffect, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

type MousePosition = {
  x: number;
  y: number;
};

type ClickEffect = {
  id: number;
  x: number;
  y: number;
};

type InteractiveBackgroundProps = {
  mousePosition: MousePosition;
  clicks: ClickEffect[];
};

type InteractiveBackgroundLayoutProps = {
  children: ReactNode;
  className?: string;
};

function InteractiveBackgroundComponent({ mousePosition, clicks }: InteractiveBackgroundProps) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute h-96 w-96 rounded-full bg-gradient-to-r from-[#f7b733]/10 to-blue-500/5 blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {clicks.map((click) => (
          <div
            key={click.id}
            className="absolute pointer-events-none"
            style={{
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="h-4 w-4 animate-ping rounded-full bg-[#f7b733]/50" />
            <div
              className="absolute inset-0 h-8 w-8 animate-pulse rounded-full border border-[#f7b733]/30"
              style={{ transform: 'translate(-25%, -25%)' }}
            />
            <div
              className="absolute inset-0 h-16 w-16 animate-ping rounded-full border border-white/20"
              style={{ transform: 'translate(-37.5%, -37.5%)', animationDelay: '0.2s' }}
            />
          </div>
        ))}

        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => {
            const particleX = ((i * 7 + 10) % 90) + 5;
            const particleY = ((i * 11 + 15) % 80) + 10;

            const distanceFromMouse = Math.sqrt(
              Math.pow(mousePosition.x - particleX, 2) + Math.pow(mousePosition.y - particleY, 2)
            );

            const scale = Math.max(0.5, Math.min(1.5, 1 + (50 - distanceFromMouse) / 100));
            const opacity = Math.max(0.1, Math.min(0.4, 0.1 + (50 - distanceFromMouse) / 200));

            return (
              <div
                key={i}
                className="absolute animate-float transition-all duration-300 ease-out"
                style={{
                  left: `${particleX}%`,
                  top: `${particleY}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${15 + ((i % 5) * 2)}s`,
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <div
                  className="h-1 w-1 rounded-full bg-white transition-all duration-300 ease-out"
                  style={{
                    boxShadow: `0 0 ${Math.max(4, 6 * scale)}px rgba(255,255,255,${Math.max(0.3, 0.5 * scale)})`,
                  }}
                />
              </div>
            );
          })}

          {[...Array(8)].map((_, i) => {
            const elementX = ((i * 13 + 12) % 85) + 7.5;
            const elementY = ((i * 17 + 20) % 75) + 12.5;

            const distanceFromMouse = Math.sqrt(
              Math.pow(mousePosition.x - elementX, 2) + Math.pow(mousePosition.y - elementY, 2)
            );

            const attraction = Math.max(0, Math.min(30, 40 - distanceFromMouse / 3));
            const moveX = Math.max(-20, Math.min(20, (mousePosition.x - elementX) * attraction * 0.005));
            const moveY = Math.max(-20, Math.min(20, (mousePosition.y - elementY) * attraction * 0.005));

            return (
              <div
                key={`large-${i}`}
                className="absolute animate-float-reverse transition-all duration-500 ease-out"
                style={{
                  left: `${elementX}%`,
                  top: `${elementY}%`,
                  animationDelay: `${i * 2}s`,
                  animationDuration: `${20 + ((i % 4) * 3)}s`,
                  transform: `translate(${moveX}px, ${moveY}px)`,
                }}
              >
                <div
                  className="h-2 w-2 rounded-full bg-gradient-to-r from-[#f7b733] to-white transition-all duration-500 ease-out"
                  style={{
                    boxShadow: `0 0 ${Math.max(8, 12 + attraction * 0.5)}px rgba(247,183,51,${Math.max(0.2, 0.3 + attraction * 0.01)})`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_58%),radial-gradient(circle_at_80%_20%,rgba(255,153,0,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(16,16,17,0))] opacity-35" />
      <div
        className="absolute -top-40 -left-40 h-80 w-80 animate-pulse-glow rounded-full bg-gradient-to-r from-[#f7b733]/20 to-transparent blur-3xl transition-all duration-1000"
        style={{
          transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
        }}
      />
      <div
        className="absolute -bottom-40 -right-40 h-80 w-80 animate-pulse-glow rounded-full bg-gradient-to-l from-[#f7b733]/20 to-transparent blur-3xl transition-all duration-1000"
        style={{
          animationDelay: '3s',
          transform: `translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-60 w-60 animate-pulse-glow rounded-full bg-white/5 blur-2xl transition-all duration-1000"
        style={{
          animationDelay: '6s',
          animationDuration: '12s',
          transform: `translate(-50%, -50%) translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
        }}
      />
      <div
        className="absolute top-1/4 right-1/4 h-40 w-40 animate-pulse-glow rounded-full bg-gradient-to-br from-[#f7b733]/15 to-blue-500/10 blur-2xl transition-all duration-1000"
        style={{
          animationDelay: '9s',
          animationDuration: '18s',
          transform: `translate(${mousePosition.x * -0.02}px, ${mousePosition.y * 0.04}px)`,
        }}
      />
    </>
  );
}

export const InteractiveBackground = memo(InteractiveBackgroundComponent);

export default InteractiveBackground;

const DEFAULT_LAYOUT_CLASSNAME =
  'relative min-h-screen overflow-hidden bg-[#101011] text-white cursor-crosshair';

export function InteractiveBackgroundLayout({
  children,
  className,
}: InteractiveBackgroundLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [clicks, setClicks] = useState<ClickEffect[]>([]);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const handleMouseMove = (event: MouseEvent) => {
      if (containerRef.current && animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
              x: ((event.clientX - rect.left) / rect.width) * 100,
              y: ((event.clientY - rect.top) / rect.height) * 100,
            });
          }
          animationFrameId = null;
        });
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const newClick: ClickEffect = {
          id: Date.now(),
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };

        setClicks((previous) => [...previous, newClick]);

        window.setTimeout(() => {
          setClicks((previous) => previous.filter((click) => click.id !== newClick.id));
        }, 1000);
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('click', handleClick);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('click', handleClick);
      }

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={cn(DEFAULT_LAYOUT_CLASSNAME, className)}>
      <InteractiveBackground mousePosition={mousePosition} clicks={clicks} />
      {children}
    </div>
  );
}
