"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, GithubIcon, Linkedin, Mail, Code2, Layers, Rocket, Sparkles, TrendingUp, Users } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SkillsSection } from "@/components/sections/skills";
import { ProjectsSection } from "@/components/sections/projects";
import { InteractiveBackgroundLayout } from "@/components/layout/interactive-background";

const NAV_ITEMS = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "#resume" },
];

const FOCUS_AREAS = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "System Thinking",
    description:
      "Component-driven architecture with reusable primitives, consistent theming, and motion design cohesion across surfaces.",
  },
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: "Delightful Experiences",
    description:
      "Micro-interactions, contextual states, and immersive backgrounds that bring personality without sacrificing clarity.",
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: "Robust Delivery",
    description:
      "Type-safe APIs, automated testing, and DevOps practices that support confident iteration and long-term maintainability.",
  },
];

const OUTCOME_HIGHLIGHTS = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    label: "Engagement +47%",
    detail:
      "Refined onboarding journeys, personalization, and progressive disclosure to drive sustained engagement metrics.",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Cross-team Enablement",
    detail:
      "Documented architecture decisions, playbooks, and reusable tooling that unlocked momentum for partner teams.",
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    label: "Confident Releases",
    detail:
      "Continuous deployment pipelines, preview environments, and release runbooks powering predictable launches.",
  },
];


export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<number | null>(null);
  const [previousHoveredNav, setPreviousHoveredNav] = useState<number | null>(null);
  const [navItemPositions, setNavItemPositions] = useState<Array<{ left: number; width: number }>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textAnimationStep, setTextAnimationStep] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  // Helper functions for improved hover effects
  const handleNavHover = (index: number) => {
    setPreviousHoveredNav(hoveredNav);
    setHoveredNav(index);
  };

  const handleNavLeave = () => {
    setPreviousHoveredNav(hoveredNav);
    setHoveredNav(null);
  };

  // Get current nav position for animation
  const getCurrentNavPosition = () => {
    if (hoveredNav !== null && navItemPositions[hoveredNav]) {
      return navItemPositions[hoveredNav];
    } else if (previousHoveredNav !== null && navItemPositions[previousHoveredNav]) {
      return navItemPositions[previousHoveredNav];
    }
    return { left: 0, width: 0 };
  };

  // Calculate nav item positions for sliding effect
  useEffect(() => {
    const updateNavPositions = () => {
      if (navRef.current && navItemRefs.current.length > 0) {
        const navRect = navRef.current.getBoundingClientRect();
        const positions = navItemRefs.current.map((item) => {
          if (item) {
            const itemRect = item.getBoundingClientRect();
            return {
              left: itemRect.left - navRect.left,
              width: itemRect.width,
            };
          }
          return { left: 0, width: 0 };
        });
        setNavItemPositions(positions);
      }
    };

    // Update positions on mount and resize
    updateNavPositions();
    window.addEventListener('resize', updateNavPositions);
    
    return () => {
      window.removeEventListener('resize', updateNavPositions);
    };
  }, []);

  // Text animation sequence
  useEffect(() => {
    setIsLoaded(true);
    
    const animationSequence = [
      () => setTextAnimationStep(1), // Header
      () => setTextAnimationStep(2), // Description
      () => setTextAnimationStep(3), // Buttons
    ];

    animationSequence.forEach((fn, index) => {
      setTimeout(fn, (index + 1) * 200);
    });
  }, []);

  return (
    <InteractiveBackgroundLayout>
  <header className="fixed top-0 left-0 right-0 z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 pt-10 sm:px-10 cursor-default">
        <Link
          href="#"
          className={`text-lg font-semibold tracking-[0.08em] text-[#f7b733] transition-all duration-1000 ease-out hover:text-white hover:scale-105 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          &lt;HelloWorld/&gt;
        </Link>
        <nav 
          ref={navRef}
          className={`hidden relative items-center gap-3 text-sm font-medium text-white/70 md:flex transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          {/* Sliding Background */}
          <div
            className="absolute top-0 bottom-0 rounded-full border border-[#f7b733]/40 bg-gradient-to-r from-[#f7b733]/15 to-[#f7b733]/10 backdrop-blur-sm transition-all duration-300 ease-out shadow-lg"
            style={{
              left: `${getCurrentNavPosition().left - 4}px`,
              width: `${getCurrentNavPosition().width + 8}px`,
              top: `-4px`,
              bottom: `-4px`,
              opacity: hoveredNav !== null ? 1 : 0,
              transform: hoveredNav !== null ? 'scale(1)' : 'scale(0.95)',
              transformOrigin: previousHoveredNav !== null 
                ? `${navItemPositions[previousHoveredNav]?.left + navItemPositions[previousHoveredNav]?.width / 2 || 0}px center`
                : 'center',
            }}
          />
          
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              ref={(el) => {
                navItemRefs.current[index] = el;
              }}
              href={item.href}
              className="relative z-10 inline-flex items-center rounded-full border border-white/15 bg-black/30 px-4 py-2 text-white/70 transition-all duration-200 hover:border-white/35 hover:text-white hover:bg-black/40"
              onMouseEnter={() => handleNavHover(index)}
              onMouseLeave={handleNavLeave}
            >
              <span className="relative z-10 transition-colors duration-200">
                {item.label}
              </span>
            </a>
          ))}
        </nav>
        <div 
          className={`flex items-center gap-3 text-white/70 transition-all duration-1000 ease-out ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          <Link
            href="https://github.com/armanmaurya"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/30 text-sm font-semibold hover:border-white/35 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="relative flex w-full flex-col gap-16 pb-20 cursor-default">
        <div className="mx-auto w-full max-w-6xl">
          <section
            id="portfolio"
            className="grid h-screen gap-12 scroll-mt-32 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center"
          >
            <div className="space-y-8 z-10">
              <h1 
                className={`text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl transition-all duration-1000 ease-out ${
                  textAnimationStep >= 1 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="inline-block">
                  {"Hey! I'm Arman".split(' ').map((word, index) => (
                    <span 
                      key={index}
                      className={`inline-block mr-4 transition-all duration-700 ease-out ${
                        textAnimationStep >= 1 
                          ? 'opacity-100 translate-y-0' 
                          : 'opacity-0 translate-y-4'
                      }`}
                      style={{ 
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
              <p 
                className={`max-w-xl text-base text-white/70 md:text-lg transition-all duration-1000 ease-out ${
                  textAnimationStep >= 2 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '400ms' }}
              >
                Building user-centered digital products, prioritizing usability,
                accessibility, and thoughtful design across all platforms.
              </p>
              <div 
                className={`flex flex-wrap items-center gap-5 transition-all duration-1000 ease-out ${
                  textAnimationStep >= 3 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <Button
                  variant="outline"
                  className="rounded-full border border-white/25 bg-transparent px-7 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                  asChild
                >
                  <Link href="mailto:mauryaarman5@gmail.com">Contact me</Link>
                </Button>
                <div className="flex items-center gap-3 text-white/70">
                  <Link
                    href="mailto:mauryaarman5@gmail.com"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 transition hover:border-white/35 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/arman-maurya-2391aa263/"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 transition hover:border-white/35 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Link>
                  <Link
                    href="https://github.com/armanmaurya"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30 transition hover:border-white/35 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute translate-x-80 w-full hidden overflow-hidden rounded-[32px] md:block">
              <Image
                src="/my-image.png"
                alt="Portrait"
                width={1080}
                height={1920}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </section>
        </div>

        <div className="w-full">
          <SkillsSection id="skills" className="z-10"/>
        </div>

        {/* <ProjectsSection id="projects" className="mx-auto w-full max-w-none" /> */}

        <div className="w-full px-4 sm:px-8">
          <section
            id="project-highlights"
            className="relative overflow-hidden rounded-[36px] border border-white/10 bg-black/25 px-6 py-16 sm:px-10 lg:px-16"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(247,183,51,0.12),transparent_55%)] opacity-80" />
            <div className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[140%] bg-[conic-gradient(from_120deg_at_70%_40%,rgba(252,74,26,0.15),transparent_45%)]" />

            <div className="relative flex flex-col gap-12">
              <div className="grid gap-10 xl:grid-cols-12 xl:items-start">
                <div className="space-y-6 xl:col-span-5">
                  <div className="space-y-3">
                    <Badge className="w-fit">Craft</Badge>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                      Focused on systems, craft, and momentum
                    </h2>
                    <p className="max-w-2xl text-white/70">
                      Every initiative is anchored in thoughtful systems, purposeful motion, and engineering maturity—
                      delivering experiences that feel alive while staying dependable at scale.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:max-w-sm md:max-w-md lg:max-w-none">
                    {['Design Systems', 'Motion Language', 'Platform Strategy', 'Operational Excellence'].map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/50"
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:col-span-7 xl:grid-cols-3">
                  {FOCUS_AREAS.map((area, index) => (
                    <div
                      key={area.title}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.1] via-black/20 to-black/50 p-6 backdrop-blur-md transition-transform duration-500 hover:-translate-y-2 hover:border-white/30"
                    >
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="h-full w-full bg-gradient-to-br from-[#f7b733]/20 via-transparent to-transparent" />
                      </div>
                      <div className="relative flex h-full flex-col gap-4">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#f7b733]">
                          {area.icon}
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-lg font-semibold text-white">{area.title}</h3>
                          <p className="text-sm text-white/70 leading-relaxed">{area.description}</p>
                        </div>
                        <span className="mt-auto inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#f7b733]/70">
                          Pillar {index + 1}
                          <span className="h-2 w-2 rounded-full bg-[#f7b733]/70" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {OUTCOME_HIGHLIGHTS.map((highlight, index) => (
                  <div
                    key={highlight.label}
                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition duration-500 hover:-translate-y-2 hover:border-[#f7b733]/30"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#fc4a1a]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="relative flex h-full flex-col gap-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-[#f7b733]">
                          {highlight.icon}
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-white/50">
                          Result {index + 1}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                          {highlight.label}
                        </span>
                        <p className="text-sm text-white/70 leading-relaxed">{highlight.detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mx-auto w-full max-w-6xl px-6">
          <section
            id="resume"
            className="scroll-mt-32 rounded-3xl border border-white/10 bg-black/30 p-10 text-center backdrop-blur-sm"
          >
            <h2 
              className={`text-3xl font-semibold text-white sm:text-4xl transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Resume &amp; Contact
            </h2>
            <p 
              className={`mt-4 text-white/70 transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Interested in collaborating or learning more about my experience? Download my resume or reach out directly.
            </p>
            <div 
              className={`mt-6 flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <Button
                variant="outline"
                className="rounded-full border border-white/25 bg-transparent px-7 py-2 text-sm font-semibold text-white transition hover:border-white/40"
                asChild
              >
                <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  View Resume
                </Link>
              </Button>
              <Button className="rounded-full bg-[#f7b733] px-7 py-2 text-sm font-semibold text-black transition hover:bg-[#f7b733]/90" asChild>
                <Link href="mailto:hello@example.com">Say Hello</Link>
              </Button>
            </div>
          </section>
        </div>

        {/* <div className="mx-auto w-full max-w-6xl px-6">
          <section className="border-t border-white/10 pt-10">
            <div 
              className={`flex flex-wrap items-center justify-center gap-10 text-xs uppercase tracking-[0.4em] text-white/30 transition-all duration-1000 ease-out ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              {BRANDS.map((brand, index) => (
                <span 
                  key={brand} 
                  className={`transition-all duration-700 ease-out hover:text-white/60 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                  style={{ transitionDelay: `${1000 + index * 100}ms` }}
                >
                  {brand}
                </span>
              ))}
            </div>
          </section>
        </div> */}
      </main>
    </InteractiveBackgroundLayout>
  );
}
