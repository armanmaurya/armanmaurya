'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { IconType } from 'react-icons';

// Icon imports
import { 
  SiNextdotjs, 
  SiNestjs,
  SiExpress,
  SiDjango,
  SiFastapi,
  SiPython,
  SiJavascript,
  SiRust,
  SiSharp,
  SiPostgresql,
  SiGraphql,
  SiGit,
  SiDocker,
  SiMongodb,
  SiTypescript
} from 'react-icons/si';
import { MdApi } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Skill = {
  name: string;
  icon: IconType;
  color: string;
  progress: number; // Progress percentage (0-100)
};

type CategorizedSkill = Skill & { category: string };

const SKILLS: Record<string, Skill[]> = {
  'Frameworks': [
    { name: 'Next.js', icon: SiNextdotjs, color: '#000000', progress: 90 },
    { name: 'NestJS', icon: SiNestjs, color: '#E0234E', progress: 85 },
    { name: 'Express.js', icon: SiExpress, color: '#000000', progress: 88 },
    { name: 'Django', icon: SiDjango, color: '#092E20', progress: 82 },
    { name: 'FastAPI', icon: SiFastapi, color: '#009688', progress: 80 },
  ],
  'Languages': [
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', progress: 92 },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', progress: 87 },
    { name: 'Python', icon: SiPython, color: '#3776AB', progress: 88 },
    { name: 'Rust', icon: SiRust, color: '#000000', progress: 75 },
    { name: 'C#', icon: SiSharp, color: '#239120', progress: 70 },
  ],
  'Databases': [
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1', progress: 85 },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248', progress: 80 },
  ],
  'Tools & APIs': [
    { name: 'GraphQL', icon: SiGraphql, color: '#E10098', progress: 83 },
    { name: 'REST API', icon: MdApi, color: '#4CAF50', progress: 90 },
    { name: 'Git', icon: SiGit, color: '#F05032', progress: 88 },
    { name: 'Docker', icon: SiDocker, color: '#2496ED', progress: 78 },
  ],
};

type SkillsSectionProps = {
  id?: string;
  className?: string;
};

export function SkillsSection({ id, className }: SkillsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('Frameworks');
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const allSkills = useMemo<CategorizedSkill[]>(
    () =>
      Object.entries(SKILLS).flatMap(([category, skills]) =>
        skills.map((skill) => ({ ...skill, category }))
      ),
    []
  );

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to update indicator position and size
  const updateIndicator = () => {
    const tabsContainer = tabsRef.current;
    if (!tabsContainer) return;

    const activeButton = tabsContainer.querySelector(`[data-category="${activeTab}"]`) as HTMLElement;
    if (!activeButton) return;

    const containerRect = tabsContainer.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setIndicatorStyle({
      width: buttonRect.width,
      left: buttonRect.left - containerRect.left,
    });
  };

  // Update indicator when activeTab changes
  useLayoutEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      updateIndicator();
    }, 10);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [activeTab]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(updateIndicator, 10);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial indicator setup when component mounts
  useLayoutEffect(() => {
    const timeoutId = setTimeout(() => {
      updateIndicator();
    }, 50);

    return () => clearTimeout(timeoutId);
  }, []);

  // Function to check scroll buttons availability
  const checkScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  // Scroll left function
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 280 + 24; // card width + gap
    container.scrollBy({
      left: -cardWidth * 2, // Scroll 2 cards at a time
      behavior: 'smooth',
    });
  };

  // Scroll right function
  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = 280 + 24; // card width + gap
    container.scrollBy({
      left: cardWidth * 2, // Scroll 2 cards at a time
      behavior: 'smooth',
    });
  };

  // Function to scroll to specific category
  const scrollToCategory = (category: string) => {
    const container = scrollRef.current;
    if (!container || isTransitioning) return;

    setIsTransitioning(true);
    setActiveTab(category);
    setIsPaused(true);

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    // Find the first card of the target category
    const targetCard = container.querySelector(`[data-category="${category}"]`) as HTMLElement;
    
    if (targetCard) {
      const scrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.clientWidth / 2);
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }

    // Wait for scroll animation to complete
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsPaused(false);
      resumeTimeoutRef.current = null;
    }, 3000);
  };

  // Effect to detect visible category and update active tab
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const detectVisibleCategory = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      // Get all skill cards
      const skillCards = Array.from(container.querySelectorAll('.skill-card')) as HTMLElement[];
      
      let closestCard: HTMLElement | null = null;
      let closestDistance = Infinity;

      skillCards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestCard = card;
        }
      });

      if (closestCard) {
        const category = (closestCard as HTMLElement).getAttribute('data-category');
        if (category && category !== activeTab && !isPaused) {
          setActiveTab(category);
        }
      }
    };

    const handleScroll = () => {
      detectVisibleCategory();
      checkScrollButtons();
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    checkScrollButtons();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [activeTab, isPaused]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div id={id} className={cn('', className)}>
      <div className="w-full relative">
        {/* Header */}
        <div className="text-center mb-16 z-10">
          <h2 className="text-4xl font-bold text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Full-stack technologies I work with to build scalable applications
          </p>
        </div>

        <div className="relative">
          {/* Scroll Navigation Buttons */}
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            className={cn(
              "absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-lg transition-all duration-300",
              canScrollLeft
                ? "border-white/20 bg-white/10 text-white hover:border-orange-400/40 hover:bg-orange-500/20 hover:text-orange-300"
                : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
            )}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            className={cn(
              "absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-lg transition-all duration-300",
              canScrollRight
                ? "border-white/20 bg-white/10 text-white hover:border-orange-400/40 hover:bg-orange-500/20 hover:text-orange-300"
                : "border-white/10 bg-white/5 text-white/30 cursor-not-allowed"
            )}
          >
            <ChevronRight size={20} />
          </button>

          {/* Category Tabs */}
          <div className="flex justify-center mb-8">
            <div ref={tabsRef} className="relative flex gap-2 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg">
              {/* Animated background indicator */}
              <div 
                className="absolute top-2 bottom-2 rounded-xl bg-gradient-to-r from-[#f7b733] to-[#fc4a1a] shadow-lg shadow-orange-500/25 transition-all duration-300 ease-out"
                style={{
                  width: `${indicatorStyle.width}px`,
                  transform: `translateX(${indicatorStyle.left}px)`,
                }}
              />
              
              {Object.keys(SKILLS).map((category) => (
                <button
                  key={category}
                  data-category={category}
                  onClick={() => scrollToCategory(category)}
                  disabled={isTransitioning}
                  className={cn(
                    "relative z-10 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                    "hover:text-white disabled:cursor-not-allowed",
                    activeTab === category 
                      ? "text-white transform scale-105" 
                      : "text-white/60 hover:text-white/80 hover:scale-102"
                  )}
                >
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </div>
          </div>

          <div
            ref={scrollRef}
            className={cn(
              'skills-marquee relative flex w-full gap-6 overflow-x-scroll px-8 py-6',
              'rounded-3xl'
            )}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {allSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              const isActiveCategory = skill.category === activeTab;
              return (
                <div
                  key={`${skill.name}-${index}`}
                  className={cn(
                    "skill-card group relative flex min-w-[280px] flex-col items-center justify-center gap-5 rounded-3xl border backdrop-blur-lg px-10 py-12 text-center transition-all duration-500 ease-out",
                    "border-white/10 bg-white/5 scale-100"
                  )}
                  data-category={skill.category}
                >
                  <div
                    className={cn(
                      "flex h-24 w-24 items-center justify-center rounded-2xl transition-all duration-300",
                      isActiveCategory 
                        ? "bg-black/60 scale-110 shadow-lg" 
                        : "bg-black/40 group-hover:scale-110"
                    )}
                    style={{ color: skill.color }}
                  >
                    <IconComponent size={60} />
                  </div>
                  <div className="space-y-3 w-full">
                    <p className={cn(
                      "text-xl font-bold transition-colors duration-300",
                      isActiveCategory ? "text-white" : "text-white/90"
                    )}>
                      {skill.name}
                    </p>
                    <p className={cn(
                      "text-sm uppercase tracking-[0.2em] transition-colors duration-300 mb-2",
                      isActiveCategory ? "text-orange-300/70" : "text-white/50"
                    )}>
                      {skill.category}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span className={cn(
                          "text-sm font-medium transition-colors duration-300",
                          isActiveCategory ? "text-white/90" : "text-white/70"
                        )}>
                          Proficiency
                        </span>
                        <span className={cn(
                          "text-sm font-semibold transition-colors duration-300",
                          isActiveCategory ? "text-orange-300" : "text-white/60"
                        )}>
                          {skill.progress}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-black/30 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out",
                            isActiveCategory 
                              ? "bg-gradient-to-r from-[#f7b733] to-[#fc4a1a]" 
                              : "bg-gradient-to-r from-white/40 to-white/20"
                          )}
                          style={{ 
                            width: `${skill.progress}%`,
                            boxShadow: isActiveCategory ? '0 0 10px rgba(247, 183, 51, 0.5)' : 'none'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f7b733]/10 via-transparent to-transparent transition-opacity duration-300",
                    isActiveCategory ? "opacity-30" : "opacity-0 group-hover:opacity-100"
                  )} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .skills-marquee {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
        }

        .skills-marquee::-webkit-scrollbar {
          display: none;
        }

        .skill-card {
          scroll-snap-align: center;
          transition: transform 0.4s ease, border 0.4s ease, box-shadow 0.4s ease;
        }

        .skill-card:hover {
          transform: translateY(-6px) scale(1.03);
          border-color: rgba(247, 183, 51, 0.6);
          box-shadow: 0 20px 40px rgba(247, 183, 51, 0.2);
        }
      `}</style>
    </div>
  );
}

export default SkillsSection;