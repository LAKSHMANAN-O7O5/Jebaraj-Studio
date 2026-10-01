import { useEffect, useRef, useState, useCallback } from 'react'
import { siteConfig } from '../../config/siteConfig'
import SectionHeader from '../common/SectionHeader'

import firstImg from '../../assets/instagram images/first img.jpg'
import secondImg from '../../assets/instagram images/second img.jpg'
import thirdImg from '../../assets/instagram images/third img.jpg'
import fourthImg from '../../assets/instagram images/fourth img.jpg'
import fifthImg from '../../assets/instagram images/fifth img.jpg'
import sixthImg from '../../assets/instagram images/sixth img.jpg'

const instagramPosts = [
  {
    src: firstImg,
    alt: 'Behind the scenes shoot by Jebaraj Studio',
    url: 'https://www.instagram.com/p/DdJawHgFKx2/?img_index=7&stkn=MXMxcDJtdzdndm9obA%3D%3D',
  },
  {
    src: secondImg,
    alt: 'Cinematic portrait by Jebaraj Alex Robin',
    objectPosition: 'center top',
    url: 'https://www.instagram.com/p/DRSIVsyESH9/?stkn=MTA3d2loaW0ya3Roaw%3D%3D',
  },
  {
    src: thirdImg,
    alt: 'Wedding ceremony moment in Kallidaikurichi',
    url: 'https://www.instagram.com/p/DdJawHgFKx2/?img_index=3&stkn=MXMxcDJtdzdndm9obA%3D%3D',
  },
  {
    src: fourthImg,
    alt: 'Action sports photograph by Jebaraj Studio',
    url: 'https://www.instagram.com/p/DcQ1atRFEhP/?img_index=14&stkn=MWx6dW83anZhODNxbg%3D%3D',
  },
  {
    src: fifthImg,
    alt: 'Commercial visual story frame',
    url: 'https://www.instagram.com/p/DcOQtlaEVVg/?img_index=10&stkn=https%3A%2F%2Fwww.instagram.com%2Fp%2FDRSIVsyESH9%2F%3Fstkn%3DMTA3d2loaW0ya3Roaw%3D%3DMmo3NDhpNmwzb3N5',
  },
  {
    src: sixthImg,
    alt: 'Equipment breakdown and setup frame',
    url: 'https://www.instagram.com/p/DRE-ndOETRa/?stkn=MWRzOTBiNGI3bDUyYw%3D%3D',
  },
]

export default function InstagramShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isInteracting, setIsInteracting] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Mouse & animation refs for 60fps lerp without triggering React re-renders
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const rafRef = useRef<number>(0)
  const isInteractingRef = useRef(false)
  isInteractingRef.current = isInteracting || hoveredIndex !== null

  // Check prefers-reduced-motion & touch environment
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mql.matches)
    const handleMqlChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mql.addEventListener('change', handleMqlChange)

    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    }
    checkTouch()

    return () => mql.removeEventListener('change', handleMqlChange)
  }, [])

  // IntersectionObserver for Scroll Reveal
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Mouse movement tracking for subtle desktop parallax
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalised -1 to 1 from center
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
  }, [])

  // RAF Animation Loop for desktop mouse parallax & slow auto-motion
  useEffect(() => {
    if (prefersReducedMotion || isTouchDevice) return

    const cards = containerRef.current?.querySelectorAll<HTMLElement>('.insta-card')
    if (!cards) return

    const animate = () => {
      // Lerp mouse coordinates smoothly
      const lerp = 0.08
      smoothMouseRef.current.x += (mouseRef.current.x - smoothMouseRef.current.x) * lerp
      smoothMouseRef.current.y += (mouseRef.current.y - smoothMouseRef.current.y) * lerp

      // Advance slow auto-motion time ONLY when user is NOT hovering/interacting
      if (!isInteractingRef.current) {
        timeRef.current += 0.012
      }

      const mx = smoothMouseRef.current.x
      const my = smoothMouseRef.current.y
      const t = timeRef.current

      cards.forEach((card, idx) => {
        // Subtle mouse parallax (max ~6px horizontal, ~4px vertical)
        const parallaxX = mx * (5 + (idx % 3) * 1.5)
        const parallaxY = my * (3.5 + (idx % 2) * 1.5)

        // Slow ambient sinus floating (max ~3px vertical offset)
        const autoY = isInteractingRef.current ? 0 : Math.sin(t + idx * 1.2) * 3

        card.style.transform = `translate3d(${parallaxX}px, ${parallaxY + autoY}px, 0)`
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [prefersReducedMotion, isTouchDevice])

  return (
    <section
      ref={sectionRef}
      className="bg-panel py-24 md:py-32 border-t border-line relative overflow-hidden"
    >
      <div className="container-x">
        {/* Header with reveal animation */}
        <div
          className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <SectionHeader
            eyebrow="Real-Time Feed"
            title={`Follow @${siteConfig.socials.instagramHandle.replace('@', '')}`}
            subtitle="Daily unreleased frames, behind the scenes stories, and equipment breakdowns."
            actionLink={{ to: siteConfig.socials.instagram, label: 'Follow on Instagram' }}
          />
        </div>

        {/* Instagram 2-Column Grid Layout (1 Column on Mobile) */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => {
            setIsInteracting(false)
            setHoveredIndex(null)
            mouseRef.current = { x: 0, y: 0 }
          }}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {instagramPosts.map((post, i) => {
            const isHovered = hoveredIndex === i
            const isAnyHovered = hoveredIndex !== null
            const isDimmed = isAnyHovered && !isHovered

            return (
              <div
                key={post.url + i}
                className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
                style={{
                  transitionDelay: prefersReducedMotion ? '0ms' : `${i * 70}ms`,
                }}
              >
                {/* Parallax wrapper div targetable by RAF animation */}
                <div className="insta-card w-full h-full transition-transform duration-300 ease-out">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className={`
                      group relative block aspect-[16/9] rounded-lg overflow-hidden bg-ink
                      border transition-all duration-500 ease-out cursor-pointer
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-glow focus-visible:ring-offset-2 focus-visible:ring-offset-ink
                      active:scale-[0.98]
                      ${
                        isHovered
                          ? 'border-blue-glow/80 shadow-[0_0_30px_-4px_rgba(56,189,248,0.45)] z-20 brightness-105'
                          : 'border-line-light shadow-card z-10'
                      }
                      ${isDimmed ? 'opacity-60 scale-[0.98]' : 'opacity-100'}
                    `}
                    aria-label={`View Instagram post: ${post.alt}`}
                  >
                    {/* Photograph */}
                    <img
                      src={post.src}
                      alt={post.alt}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      style={{ objectPosition: post.objectPosition || 'center' }}
                      loading="lazy"
                    />

                    {/* Subtle dark gradient overlay */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent
                        transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                      `}
                    >
                      {/* Top right Instagram icon */}
                      <div className="flex justify-end">
                        <div className="w-8 h-8 rounded-full bg-blue/90 text-white flex items-center justify-center shadow-glowSm transform transition-transform duration-300 group-hover:scale-110">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" />
                            <circle cx="12" cy="12" r="4" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                          </svg>
                        </div>
                      </div>

                      {/* Bottom view label */}
                      <div className="flex items-center justify-between text-xs font-mono tracking-wider uppercase text-blue-glow font-medium transform transition-transform duration-300 translate-y-1 group-hover:translate-y-0">
                        <span>VIEW ON INSTAGRAM</span>
                        <span>↗</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}



