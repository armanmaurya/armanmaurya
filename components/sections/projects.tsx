'use client';

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";

import { cn } from "@/lib/utils";

export const PROJECTS = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with user authentication, payment integration, and admin dashboard.",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/ecommerce",
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates and team collaboration features.",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/task-manager",
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather application with location-based forecasts and interactive data visualizations.",
    image:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
    technologies: ["React", "Chart.js", "Weather API", "CSS3"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/weather-app",
  },
  {
    title: "AI Writing Assistant",
    description:
      "A productivity tool leveraging AI to help users draft, refine, and organize written content with collaboration features.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Supabase"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/ai-writer",
  },
  {
    title: "Fitness Tracking Platform",
    description:
      "A cross-platform fitness tracker featuring workout plans, habit tracking, and progress analytics dashboards.",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07f?auto=format&fit=crop&w=800&q=80",
    technologies: ["React Native", "Expo", "Firebase", "Recharts"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/fit-track",
  },
  {
    title: "Cybersecurity Monitoring Suite",
    description:
      "An enterprise-grade monitoring dashboard for threat detection, log aggregation, and automated alerting pipelines.",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=800&q=80",
    technologies: ["Next.js", "TypeScript", "AWS", "Kafka"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/armanmaurya/cyber-monitor",
  },
];

type ProjectsSectionProps = {
  id?: string;
  className?: string;
};

type GlowPosition = {
  x: number;
  y: number;
};

type CarouselMetrics = {
  cardWidth: number;
  gap: number;
  visible: number;
};

export function ProjectsSection({ id, className }: ProjectsSectionProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [glowPosition, setGlowPosition] = useState<GlowPosition>({ x: 0, y: 0 });

  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const repeatedProjects = useMemo(
    () => Array.from({ length: 3 }, () => PROJECTS).flat(),
    []
  );

  const baseLength = PROJECTS.length;
  const TRANSITION_MS = 450;
  const AUTOPLAY_DELAY = 6000;

  const [currentIndex, setCurrentIndex] = useState(baseLength);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const [metrics, setMetrics] = useState<CarouselMetrics>({
    cardWidth: 0,
    gap: 0,
    visible: 1,
  });

  const handleCardMouseMove = useCallback(
    (index: number, event: MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setGlowPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
      setHoveredCard(index);
    },
    []
  );

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null);
  }, []);

  const goTo = useCallback(
    (direction: 1 | -1) => {
      if (!metrics.cardWidth) return;
      setIsTransitionEnabled(true);
      setCurrentIndex((prev) => prev + direction);
    },
    [metrics.cardWidth]
  );

  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true);
  }, []);

  const handleInteractionEnd = useCallback(() => {
    setIsInteracting(false);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !carouselRef.current || !trackRef.current) {
      return;
    }

    const computeMetrics = () => {
      if (!carouselRef.current || !trackRef.current) {
        return;
      }

      const containerWidth = carouselRef.current.offsetWidth;
      const style = window.getComputedStyle(trackRef.current);
      const gapValue = parseFloat(style.columnGap || style.gap || "0") || 0;
      const visible = containerWidth >= 1024 ? 3 : containerWidth >= 768 ? 2 : 1;
      const cardWidth =
        visible > 0 ? (containerWidth - gapValue * (visible - 1)) / visible : containerWidth;

      setMetrics({ cardWidth, gap: gapValue, visible });
    };

    computeMetrics();

    const resizeObserver = new ResizeObserver(() => computeMetrics());
    resizeObserver.observe(carouselRef.current);
    window.addEventListener("resize", computeMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", computeMetrics);
    };
  }, []);

  useEffect(() => {
    if (!metrics.cardWidth || isInteracting) {
      return;
    }

    const intervalId = window.setInterval(() => {
      goTo(1);
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [metrics.cardWidth, isInteracting, goTo]);

  useEffect(() => {
    if (!isTransitionEnabled) {
      return;
    }

    const upperThreshold = baseLength * 2;
    let timeoutId: number | undefined;

    if (currentIndex >= upperThreshold) {
      timeoutId = window.setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex((prev) => prev - baseLength);
      }, TRANSITION_MS);
    } else if (currentIndex < baseLength) {
      timeoutId = window.setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex((prev) => prev + baseLength);
      }, TRANSITION_MS);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [currentIndex, isTransitionEnabled, baseLength, TRANSITION_MS]);

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }

    const id = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [isTransitionEnabled]);

  const translateX = -(metrics.cardWidth + metrics.gap) * currentIndex;
  const centerOffset = Math.floor(metrics.visible / 2);

  const trackStyle: CSSProperties = {
    transform: `translate3d(${Number.isFinite(translateX) ? translateX : 0}px, 0, 0)`,
    transition: isTransitionEnabled
      ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
      : "none",
  };

  return (
    <section id={id} className={cn("space-y-12 scroll-mt-32 w-full", className)}>
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-white sm:text-4xl">Featured Projects</h2>
        <p className="mt-4 text-white/70">Some of the projects I&apos;ve worked on recently</p>
      </div>

      <div className="relative" onMouseEnter={handleInteractionStart} onMouseLeave={handleInteractionEnd}>
        <button
          type="button"
          aria-label="Previous projects"
          className="group absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition hover:border-white/40 hover:bg-black/80"
          onClick={() => goTo(-1)}
        >
          <ChevronLeft className="h-5 w-5 transition group-hover:-translate-x-1" />
        </button>

        <div
          ref={carouselRef}
          className="overflow-hidden"
          onFocusCapture={handleInteractionStart}
          onBlurCapture={handleInteractionEnd}
        >
          <div ref={trackRef} className="flex gap-6" style={trackStyle}>
            {repeatedProjects.map((project, index) => {
              const isActive = hoveredCard === index;
              const relativeIndex = index - currentIndex;
              const distanceFromCenter = Math.abs(relativeIndex - centerOffset);
              const scale = distanceFromCenter === 0 ? 1 : Math.max(0.82, 1 - distanceFromCenter * 0.08);
              const elevation = Math.max(0, 12 - distanceFromCenter * 4);

              const baseStyle: CSSProperties = metrics.cardWidth
                ? { flex: `0 0 ${metrics.cardWidth}px`, width: `${metrics.cardWidth}px` }
                : { flex: "0 0 100%" };

              const transitionDuration = isTransitionEnabled ? "420ms" : "0ms";

              const cardStyle: CSSProperties = {
                ...baseStyle,
                transform: `scale(${scale})`,
                transition: `transform ${transitionDuration} cubic-bezier(0.34, 1.56, 0.64, 1)`,
                zIndex: Math.max(0, 20 - distanceFromCenter),
                boxShadow: `0 ${elevation}px ${elevation * 3}px rgba(0,0,0,${0.15 + distanceFromCenter * 0.05})`,
                transformOrigin: "center bottom",
                willChange: "transform",
              };

              return (
                <div
                  key={`${project.title}-${index}`}
                  className="group relative flex h-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/20 transition duration-500 hover:border-white/40"
                  style={cardStyle}
                  onMouseEnter={(event) => handleCardMouseMove(index, event)}
                  onMouseMove={(event) => handleCardMouseMove(index, event)}
                  onMouseLeave={handleCardLeave}
                >
                  <Image
                    fill
                    priority={index === baseLength}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                  />

                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-75 transition duration-700 group-hover:opacity-60" />
                    <div
                      className="absolute h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[#f7b733]/40 via-[#f7b733]/20 to-transparent blur-3xl transition-all duration-500 ease-out"
                      style={{
                        left: `${glowPosition.x}px`,
                        top: `${glowPosition.y}px`,
                        opacity: isActive ? 1 : 0,
                        transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.4})`,
                      }}
                    />
                    <div
                      className="absolute h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-2xl transition-all duration-500 ease-out"
                      style={{
                        left: `${glowPosition.x}px`,
                        top: `${glowPosition.y}px`,
                        opacity: isActive ? 0.4 : 0,
                        transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.5})`,
                      }}
                    />
                  </div>

                  <div className="relative mt-auto flex h-full flex-col justify-end">
                    <div className="pointer-events-none absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-70" />

                    <div className="relative p-6">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/60 transition-all duration-500 group-hover:text-white/80">
                        <span>Featured</span>
                        <span>{String((index % baseLength) + 1).padStart(2, "0")}</span>
                      </div>

                      <h3 className="mt-6 text-2xl font-semibold text-white transition-colors duration-500 group-hover:text-white">
                        {project.title}
                      </h3>

                      <p className="mt-4 text-sm leading-relaxed text-white/80 transition-colors duration-500 group-hover:text-white/90">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs text-white/60 transition duration-300 group-hover:border-white/30 group-hover:text-white"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-[#f7b733] transition duration-300 hover:text-white"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </Link>
                        <Link
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-white/70 transition duration-300 hover:text-white"
                        >
                          <Github className="h-4 w-4" />
                          Code
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          aria-label="Next projects"
          className="group absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/60 p-3 text-white transition hover:border-white/40 hover:bg-black/80"
          onClick={() => goTo(1)}
        >
          <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}

export default ProjectsSection;
