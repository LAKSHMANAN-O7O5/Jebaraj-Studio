import React, { useEffect, useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop',
    title: 'Floral Jasmine Mandapam & Seaside Rituals',
  },
  {
    src: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1600&auto=format&fit=crop',
    title: 'Decisive Field-Side Derby Strike',
  },
  {
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1600&auto=format&fit=crop',
    title: 'Cyan & Sapphire Arena Laser Storm',
  },
  {
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1600&auto=format&fit=crop',
    title: 'Golden Hour Coastal Granite Reflections',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop',
    title: 'Sculpted High-Fashion Silk Atelier',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop',
    title: 'Dawn Meditation Along the Colonial Coast',
  },
  {
    src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=1600&auto=format&fit=crop',
    title: 'Post-Ceremony Twilight Seaside Portrait',
  },
]

const AUTO_PLAY_INTERVAL = 4500 // 4.5 seconds
const TRANSITION_DURATION = 800 // ms

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [animPhase, setAnimPhase] = useState<'idle' | 'animating'>('idle')

  const activeIndexRef = useRef(0)
  activeIndexRef.current = activeIndex

  const isTransitioningRef = useRef(false)
  isTransitioningRef.current = isTransitioning

  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  // Preload adjacent images
  useEffect(() => {
    const preload = (index: number) => {
      const img = new Image()
      img.src = heroImages[index].src
    }
    preload((activeIndex + 1) % heroImages.length)
    preload((activeIndex - 1 + heroImages.length) % heroImages.length)
  }, [activeIndex])

  // --- Core transition functions (loop: 07 → 01) ---

  const performTransition = useCallback((nextIdx: number, dir: 1 | -1) => {
    if (isTransitioningRef.current) return
    isTransitioningRef.current = true
    setIsTransitioning(true)
    setDirection(dir)
    setPrevIndex(activeIndexRef.current)
    setActiveIndex(nextIdx)
    activeIndexRef.current = nextIdx
    setAnimPhase('animating')

    setTimeout(() => {
      setIsTransitioning(false)
      isTransitioningRef.current = false
      setPrevIndex(null)
      setAnimPhase('idle')
    }, TRANSITION_DURATION)
  }, [])

  const goToNext = useCallback(() => {
    if (isTransitioningRef.current) return
    const nextIndex = (activeIndexRef.current + 1) % heroImages.length
    performTransition(nextIndex, 1)
  }, [performTransition])

  const goToPrev = useCallback(() => {
    if (isTransitioningRef.current) return
    const prevIdx = (activeIndexRef.current - 1 + heroImages.length) % heroImages.length
    performTransition(prevIdx, -1)
  }, [performTransition])

  // --- Autoplay timer management ---

  const clearAutoPlay = useCallback(() => {
    if (autoPlayTimerRef.current !== null) {
      clearTimeout(autoPlayTimerRef.current)
      autoPlayTimerRef.current = null
    }
  }, [])

  const startAutoPlay = useCallback(() => {
    clearAutoPlay()
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext()
      // After the transition completes, start the next autoplay cycle
      // We schedule the next startAutoPlay after the transition finishes
      setTimeout(() => {
        startAutoPlay()
      }, TRANSITION_DURATION + 50)
    }, AUTO_PLAY_INTERVAL)
  }, [clearAutoPlay, goToNext])

  // --- Initialize autoplay on mount ---
  useEffect(() => {
    startAutoPlay()
    return () => clearAutoPlay()
  }, [startAutoPlay, clearAutoPlay])

  // --- Tab visibility: pause when hidden, resume when visible ---
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearAutoPlay()
      } else {
        startAutoPlay()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [startAutoPlay, clearAutoPlay])

  // --- Wheel handler: manual control that resets autoplay ---
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If user has scrolled down into the page, allow natural scrolling
      if (window.scrollY > 20) return

      // Ignore micro-deltas / trackpad noise
      if (Math.abs(e.deltaY) < 15) return

      // Don't block during transition
      if (isTransitioningRef.current) return

      if (e.deltaY > 0) {
        goToNext()
        // Reset autoplay after manual scroll
        setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50)
      } else if (e.deltaY < 0) {
        goToPrev()
        // Reset autoplay after manual scroll
        setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [goToNext, goToPrev, startAutoPlay])

  // --- Touch Swipe for Mobile ---
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isTransitioningRef.current) return
    const touchEndY = e.changedTouches[0].clientY
    const touchEndX = e.changedTouches[0].clientX
    const deltaY = touchEndY - touchStartY.current
    const deltaX = touchEndX - touchStartX.current

    let triggered = false
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < -50) { goToNext(); triggered = true }
      else if (deltaY > 50) { goToPrev(); triggered = true }
    } else {
      if (deltaX < -50) { goToNext(); triggered = true }
      else if (deltaX > 50) { goToPrev(); triggered = true }
    }
    // Reset autoplay after touch swipe
    if (triggered) {
      setTimeout(() => startAutoPlay(), TRANSITION_DURATION + 50)
    }
  }

  return (
    <section
      className="hero relative w-full min-h-screen pt-28 pb-12 px-4 flex flex-col items-center justify-between bg-[#05070B] overflow-hidden text-center select-none z-10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <style>{`
        @keyframes heroEnterNext {
          0% {
            opacity: 0;
            transform: translate3d(90px, 0, 30px) rotateY(6deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateY(0deg) scale(1);
          }
        }
        @keyframes heroEnterPrev {
          0% {
            opacity: 0;
            transform: translate3d(-90px, 0, 30px) rotateY(-6deg) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotateY(0deg) scale(1);
          }
        }
      `}</style>

      {/* Background Glow & Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(0, 112, 243, 0.12) 0%, rgba(5, 7, 11, 0) 70%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 shadow-[inset_0_0_120px_rgba(5,7,11,0.9)]" />

      {/* 1. HERO CONTENT */}
      <div className="hero-content relative z-10 flex flex-col items-center max-w-4xl mb-2 md:mb-4">
        <span className="font-script text-2xl sm:text-3xl md:text-4xl text-blue-glow mb-2 tracking-wide drop-shadow">
          Candid. Cinematic. Timeless.
        </span>
        <h1 className="heading-xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
          YOUR MOMENTS.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-silver to-blue-glow">
            OUR VISUAL LEGACY.
          </span>
        </h1>
      </div>

      {/* 2. HERO PHOTO STAGE */}
      <div className="hero-photo-stage relative z-10 w-[90vw] md:w-[62vw] max-w-[900px] aspect-[16/9] mx-auto my-3 md:my-5 flex items-center justify-center perspective-[1000px]">
        {/* Exiting Photo during transition */}
        {isTransitioning && prevIndex !== null && (
          <div
            className="hero-photo absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden pointer-events-none z-10"
            style={{
              transform:
                direction === 1
                  ? 'translate3d(-90px, 0, -30px) rotateY(-6deg) scale(0.95)'
                  : 'translate3d(90px, 0, -30px) rotateY(6deg) scale(0.95)',
              opacity: 0,
              transition:
                'transform 800ms cubic-bezier(0.25, 1, 0.5, 1), opacity 700ms ease',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow:
                '0 25px 50px -12px rgba(0,0,0,0.9), 0 0 35px rgba(0, 112, 243, 0.15)',
            }}
          >
            <img
              src={heroImages[prevIndex].src}
              alt={heroImages[prevIndex].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        )}

        {/* Active Photo */}
        <div
          key={activeIndex}
          className="hero-photo absolute inset-0 rounded-xl md:rounded-2xl overflow-hidden z-20 shadow-2xl"
          style={{
            animation:
              animPhase === 'animating'
                ? `${direction === 1 ? 'heroEnterNext' : 'heroEnterPrev'} 800ms cubic-bezier(0.25, 1, 0.5, 1) forwards`
                : undefined,
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow:
              '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 112, 243, 0.18)',
          }}
        >
          <img
            src={heroImages[activeIndex].src}
            alt={heroImages[activeIndex].title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 3. HERO META */}
      <div className="hero-meta relative z-10 flex flex-col items-center mt-2 md:mt-4 text-center">
        <span className="font-mono text-xs md:text-sm tracking-widest text-silver">
          {String(activeIndex + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
        </span>
        <span className="text-xs md:text-sm text-white/70 font-light mt-1 tracking-wide max-w-md">
          {heroImages[activeIndex].title}
        </span>
      </div>

      {/* 4. HERO ACTIONS */}
      <div className="hero-actions relative z-10 flex flex-wrap items-center justify-center gap-4 mt-5 md:mt-6">
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
    </section>
  )
}

