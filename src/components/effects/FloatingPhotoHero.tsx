import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';
import { projects } from '../../data/projects';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const heroImages = projects
  .filter(p => p.gallery.some(img => img.aspect === 'landscape' || p.coverImage))
  .slice(0, 7)
  .map(p => {
    const landscapeImg = p.gallery.find(img => img.aspect === 'landscape');
    return {
      src: landscapeImg ? landscapeImg.src : p.coverImage,
      title: p.title
    };
  });

const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds
const TRANSITION_DURATION = 800; // ms

export default function FloatingPhotoHero({ progress }: { progress: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeIndexRef = useRef(0);
  activeIndexRef.current = activeIndex;

  const isTransitioningRef = useRef(false);
  isTransitioningRef.current = isTransitioning;

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload adjacent images
  useEffect(() => {
    const preload = (index: number) => {
      const img = new Image();
      img.src = heroImages[index].src;
    };
    preload((activeIndex + 1) % heroImages.length);
    preload((activeIndex - 1 + heroImages.length) % heroImages.length);
  }, [activeIndex]);

  // --- Core transition functions (loop: 07 → 01) ---

  const performTransition = useCallback((nextIdx: number, dir: 1 | -1) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);
    setDirection(dir);
    setPrevIndex(activeIndexRef.current);
    setActiveIndex(nextIdx);
    activeIndexRef.current = nextIdx;

    setTimeout(() => {
      setIsTransitioning(false);
      isTransitioningRef.current = false;
      setPrevIndex(null);
    }, TRANSITION_DURATION);
  }, []);

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return;
    const nextIdx = (activeIndexRef.current + 1) % heroImages.length;
    performTransition(nextIdx, 1);
  }, [performTransition]);

  const goToPrev = useCallback(() => {
    if (isTransitioningRef.current) return;
    const prevIdx = (activeIndexRef.current - 1 + heroImages.length) % heroImages.length;
    performTransition(prevIdx, -1);
  }, [performTransition]);

  // --- Autoplay timer management ---

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current !== null) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    clearAutoPlay();
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext();
      setTimeout(() => {
        startAutoPlay();
      }, TRANSITION_DURATION + 50);
    }, AUTO_PLAY_INTERVAL);
  }, [clearAutoPlay, goToNext]);

  // --- Initialize autoplay on mount ---
  useEffect(() => {
    startAutoPlay();
    return () => clearAutoPlay();
  }, [startAutoPlay, clearAutoPlay]);

  // --- Tab visibility: pause when hidden, resume when visible ---
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearAutoPlay();
      } else {
        startAutoPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [startAutoPlay, clearAutoPlay]);

  // --- Wheel handler: manual control that resets autoplay ---
  useEffect(() => {
    if (isMobile) return;

    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY > 20) return;
      if (Math.abs(e.deltaY) < 15) return;
      if (isTransitioningRef.current) return;

      if (e.deltaY > 0) {
        goToNext();
        setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50);
      } else if (e.deltaY < 0) {
        goToPrev();
        setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isMobile, goToNext, goToPrev, startAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioningRef.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaY = touchEndY - touchStartY.current;
    const deltaX = touchEndX - touchStartX.current;

    let triggered = false;
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < -50) { goToNext(); triggered = true; } // Swipe up -> next
      else if (deltaY > 50) { goToPrev(); triggered = true; } // Swipe down -> prev
    } else {
      if (deltaX < -50) { goToNext(); triggered = true; } // Swipe left -> next
      else if (deltaX > 50) { goToPrev(); triggered = true; } // Swipe right -> prev
    }
    if (triggered) {
      setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50);
    }
  };

  const getPhotoStyle = (i: number) => {
    const isCurrent = i === activeIndex;
    const isExiting = i === prevIndex && isTransitioning;

    if (isCurrent) {
      return {
        zIndex: 1, // Next/Current photo under the exiting one
        opacity: 1,
        transform: 'translate3d(0px, 0px, 0px) scale(1) rotateY(0deg)',
        transition: isTransitioning 
          ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s ease' 
          : 'none',
      };
    }

    if (isExiting) {
      return {
        zIndex: 2, // Exiting photo stays on top
        opacity: 0,
        transform: `translate3d(${-direction * 15}vw, 0, 50px) scale(0.95) rotateY(${direction * 8}deg)`,
        transition: 'transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.7s ease',
      };
    }

    // Idle position (ready for next transition)
    let relDir = i > activeIndex ? 1 : -1;
    if (activeIndex === 0 && i === heroImages.length - 1) relDir = -1;
    if (activeIndex === heroImages.length - 1 && i === 0) relDir = 1;

    return {
      zIndex: 0,
      opacity: 0,
      transform: `translate3d(${relDir * 20}vw, 0, -100px) scale(0.9) rotateY(${-relDir * 5}deg)`,
      transition: 'none',
    };
  };

  const p = prefersReducedMotion ? 0 : progress;
  const globalOpacity = p > 0.8 ? 1 - ((p - 0.8) * 5) : 1;
  const globalTransform = `translate3d(0, ${-p * 15}vh, ${-p * 100}px)`;

  return (
    <div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[#05070B] perspective-[1200px]"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ opacity: Math.max(0, globalOpacity) }}
    >
      {/* Background Glow */}
      <div 
        className="absolute inset-0 z-0 bg-blue-glow/5"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 112, 243, 0.08) 0%, rgba(5, 7, 11, 0) 70%)',
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none shadow-[inset_0_0_150px_rgba(5,7,11,1)]" />

      {/* Main Container affected by Scroll */}
      <div 
        className="relative z-10 w-full h-full flex flex-col items-center pt-24 md:pt-32 pb-8 transform-style-3d will-change-transform"
        style={{ transform: globalTransform }}
      >
        
        {/* Typography Top */}
        <div className="relative z-40 flex flex-col items-center text-center px-4 w-full max-w-5xl mb-6 md:mb-10 pointer-events-none">
          <span className="block font-script text-3xl sm:text-4xl md:text-5xl text-blue-glow mb-4 select-none drop-shadow-md">
            Candid. Cinematic. Timeless.
          </span>
          <h1 className="heading-xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] drop-shadow-2xl">
            YOUR MOMENTS.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-silver to-blue-glow">
              OUR VISUAL LEGACY.
            </span>
          </h1>
        </div>

        {/* Single Photo Gallery Area */}
        <div className="relative w-[90vw] md:w-[65vw] h-[35vh] md:h-[48vh] flex items-center justify-center perspective-[1200px] pointer-events-none">
          {heroImages.map((item, i) => (
            <div
              key={i}
              className="absolute w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl will-change-transform"
              style={{
                ...getPhotoStyle(i),
                boxShadow: '0 30px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(0, 112, 243, 0.1)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
              <div 
                className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(0,0,0,0.8) 100%)`
                }}
              />
            </div>
          ))}
        </div>

        {/* Counter and Caption */}
        <div className="mt-6 md:mt-8 flex flex-col items-center z-40 transition-opacity duration-300 pointer-events-none">
          <span className="text-silver font-mono text-xs md:text-sm tracking-widest">
            {String(activeIndex + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
          </span>
          <span className="text-white/70 text-xs md:text-sm tracking-wide mt-2 font-light">
            {heroImages[activeIndex].title}
          </span>
        </div>

        {/* Buttons Bottom */}
        <div className="mt-auto pt-6 flex flex-wrap items-center justify-center gap-4 md:gap-5 z-40">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2.5 bg-blue text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded shadow-glow hover:bg-blue-accent hover:shadow-glowCyan hover:scale-[1.02] transition-all"
          >
            Explore Portfolio <span aria-hidden>→</span>
          </Link>

          <a
            href={`https://wa.me/${siteConfig.whatsappClean}?text=Hi%20Jebaraj,%20I'm%20viewing%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20shoot!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-3.5 rounded hover:bg-white/10 hover:scale-[1.02] transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Quick WhatsApp
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 pointer-events-none">
          <span className="text-[9px] md:text-[10px] uppercase tracking-widest font-mono">Scroll</span>
          <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
        
      </div>
    </div>
  );
}
