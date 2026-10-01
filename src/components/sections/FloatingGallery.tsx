import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { projects } from '../../data/projects'
import { GalleryImage } from '../../types'
import LightboxModal from '../common/LightboxModal'
import Reveal from '../common/Reveal'

/* ───────────────────────── Data ───────────────────────── */

interface FloatingPhoto {
  src: string
  alt: string
  caption?: string
  category: string
  index: number
  // Desktop spatial layout
  x: number       // left %
  y: number       // top %
  z: number       // translateZ px
  rotate: number  // slight rotation deg
  width: number   // card width px
  // Mobile / Tablet spatial layout
  mx: number      // left %
  my: number      // top %
  mw: number      // width %
  galleryImage: GalleryImage
}

/** Flatten all project gallery images into a single list for the floating gallery. */
function buildFloatingPhotos(): FloatingPhoto[] {
  const allImages: FloatingPhoto[] = []

  // Curated layout positions — exact desktop values preserved, + mobile percentage scaling
  const layouts: Array<{ x: number; y: number; z: number; rotate: number; width: number; mx: number; my: number; mw: number }> = [
    // Row 1 — top area
    { x: 2,  y: 12,  z: 50,   rotate: -2,    width: 300, mx: 2,  my: 3,  mw: 33 },
    { x: 38, y: 8,   z: -40,  rotate: 1.5,   width: 260, mx: 34, my: 1,  mw: 30 },
    { x: 68, y: 14,  z: 30,   rotate: -1.3,  width: 290, mx: 64, my: 5,  mw: 32 },

    // Row 2 — mid area
    { x: 15, y: 38,  z: -25,  rotate: 2,     width: 320, mx: 10, my: 26, mw: 34 },
    { x: 52, y: 35,  z: 55,   rotate: -2.5,  width: 280, mx: 42, my: 24, mw: 32 },
    { x: 78, y: 42,  z: -50,  rotate: 1.8,   width: 250, mx: 66, my: 28, mw: 30 },

    // Row 3 — lower area
    { x: 4,  y: 62,  z: 35,   rotate: -1.5,  width: 270, mx: 3,  my: 48, mw: 32 },
    { x: 35, y: 65,  z: -30,  rotate: 2.2,   width: 310, mx: 33, my: 50, mw: 34 },
    { x: 62, y: 60,  z: 45,   rotate: -2.8,  width: 260, mx: 63, my: 46, mw: 32 },

    // Row 4 — bottom scattered
    { x: 22, y: 82,  z: -55,  rotate: 1.2,   width: 240, mx: 15, my: 70, mw: 30 },
    { x: 50, y: 85,  z: 20,   rotate: -1,    width: 280, mx: 40, my: 72, mw: 32 },
    { x: 80, y: 78,  z: -35,  rotate: 2.5,   width: 250, mx: 65, my: 68, mw: 31 },
  ]

  projects.forEach((project) => {
    project.gallery.forEach((img) => {
      const idx = allImages.length
      if (idx >= layouts.length) return // cap at layout count
      const layout = layouts[idx]
      allImages.push({
        src: img.src,
        alt: img.alt,
        caption: img.caption,
        category: project.category,
        index: idx,
        galleryImage: img,
        ...layout,
      })
    })
  })

  return allImages
}

/* ───────────────────────── Component ───────────────────────── */

export default function FloatingGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)

  // Track window width for responsive layout mode
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  )

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mouse + scroll state (mutable refs for animation loop — no re-renders)
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })
  const scrollProgress = useRef(0)
  const smoothScroll = useRef(0)
  const rafId = useRef<number>(0)
  const prefersReduced = useRef(false)

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Hovered card index
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const photos = useMemo(() => buildFloatingPhotos(), [])
  const allGalleryImages = useMemo(
    () => photos.map((p) => p.galleryImage),
    [photos],
  )

  /* ── Detect prefers-reduced-motion ── */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.current = mql.matches
    const handler = (e: MediaQueryListEvent) => {
      prefersReduced.current = e.matches
    }
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  /* ── Mouse & Touch movement tracking ── */
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0]?.clientX ?? 0 : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY ?? 0 : e.clientY
      // Normalised -1 to 1
      mouseRef.current.x = ((clientX - rect.left) / rect.width) * 2 - 1
      mouseRef.current.y = ((clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('touchmove', handlePointerMove)
    }
  }, [])

  /* ── Scroll tracking ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionH = rect.height
      const viewH = window.innerHeight
      // 0 when section top is at bottom of viewport, 1 when section bottom is at top
      const raw = 1 - (rect.top + sectionH) / (sectionH + viewH)
      scrollProgress.current = Math.max(0, Math.min(1, raw))
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* ── Animation loop — smooth lerping ── */
  useEffect(() => {
    const cards = sceneRef.current?.querySelectorAll<HTMLElement>('.floating-card')
    if (!cards) return

    const animate = () => {
      if (prefersReduced.current) {
        // Static position, no animation
        cards.forEach((card) => {
          card.style.transform = card.dataset.staticTransform || ''
        })
        rafId.current = requestAnimationFrame(animate)
        return
      }

      // Smooth mouse interpolation (lerp factor)
      const lerpFactor = 0.06
      smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * lerpFactor
      smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * lerpFactor
      smoothScroll.current += (scrollProgress.current - smoothScroll.current) * lerpFactor

      const mx = smoothMouse.current.x
      const my = smoothMouse.current.y
      const sp = smoothScroll.current
      const time = performance.now() * 0.001
      const isDesktop = window.innerWidth >= 1024
      const zScale = isDesktop ? 1 : 0.35

      cards.forEach((card) => {
        const depth = parseFloat(card.dataset.depth || '0')
        const baseRotate = parseFloat(card.dataset.rotate || '0')
        const floatOffset = parseFloat(card.dataset.floatOffset || '0')
        const isHovered = card.dataset.hovered === 'true'

        // Depth-based parallax — cards with larger |z| move more
        const depthFactor = (depth * zScale) / 100
        const parallaxX = mx * depthFactor * (isDesktop ? 25 : 10)
        const parallaxY = my * depthFactor * (isDesktop ? 18 : 8)

        // Gentle organic floating
        const floatY = Math.sin(time * 0.4 + floatOffset) * (isDesktop ? 8 : 3)
        const floatX = Math.cos(time * 0.3 + floatOffset * 1.5) * (isDesktop ? 4 : 2)

        // Scroll influence — shift entire field upward
        const scrollShift = sp * (isDesktop ? 60 : 25)

        // Subtle rotation from mouse
        const rotateY = mx * depthFactor * 4
        const rotateX = -my * depthFactor * 3

        // If hovered, reduce movement and bring forward
        const hoverZ = isHovered ? (isDesktop ? 80 : 25) : 0
        const moveDampen = isHovered ? 0.15 : 1
        const hoverScale = isHovered ? 1.08 : 1

        const tx = (parallaxX + floatX) * moveDampen
        const ty = (parallaxY + floatY - scrollShift) * moveDampen
        const tz = depth * zScale + hoverZ

        card.style.transform = `
          translate3d(${tx}px, ${ty}px, ${tz}px)
          rotateY(${(baseRotate + rotateY) * moveDampen}deg)
          rotateX(${rotateX * moveDampen}deg)
          scale(${hoverScale})
        `
      })

      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [hoveredIndex])

  /* ── Photo click → lightbox ── */
  const openLightbox = useCallback((idx: number) => {
    setLightboxIndex(idx)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setLightboxOpen(false), [])
  const navigateLightbox = useCallback((idx: number) => setLightboxIndex(idx), [])

  /* ── Keyboard accessibility ── */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openLightbox(idx)
      }
    },
    [openLightbox],
  )

  const isDesktop = windowWidth >= 1024

  return (
    <>
      <section
        ref={sectionRef}
        id="floating-gallery"
        className="relative w-full overflow-hidden bg-ink border-t border-line"
        aria-label="Floating Photography Gallery — Visual Stories by Jebaraj Studio"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue/[0.04] blur-[120px]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-ink to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-ink to-transparent z-10" />
        </div>

        {/* Section header */}
        <div className="relative z-20 container-x pt-24 md:pt-32 pb-8 md:pb-12">
          <Reveal>
            <p className="eyebrow mb-3">Visual Stories</p>
            <h2 className="heading-xl text-3xl md:text-5xl lg:text-6xl max-w-2xl">
              Moments captured
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-glow via-white to-blue-glow">
                as they happen.
              </span>
            </h2>
            <p className="mt-5 text-fog text-base md:text-lg max-w-xl leading-relaxed">
              Browse through our cinematic collection — each photograph a story
              suspended in time.
            </p>
          </Reveal>
        </div>

        {/* ── 3D Floating Scene ── */}
        <div
          className="relative z-10 w-full floating-scene-wrapper overflow-hidden px-2 sm:px-4"
          style={{
            height: isDesktop
              ? 'clamp(600px, 75vh, 1000px)'
              : 'clamp(480px, 125vw, 680px)',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          <div
            ref={sceneRef}
            className="absolute inset-0"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {photos.map((photo, idx) => (
              <div
                key={`${photo.src}-${idx}`}
                className="floating-card absolute cursor-pointer group focus-visible:outline-2 focus-visible:outline-blue-glow focus-visible:outline-offset-4"
                tabIndex={0}
                role="button"
                aria-label={`View photograph: ${photo.alt}. Category: ${photo.category}`}
                data-depth={photo.z}
                data-rotate={photo.rotate}
                data-float-offset={idx * 1.7}
                data-hovered={hoveredIndex === idx ? 'true' : 'false'}
                data-static-transform={`translate3d(0px, 0px, ${photo.z}px) rotateY(${photo.rotate}deg)`}
                style={{
                  left: isDesktop ? `${photo.x}%` : `${photo.mx}%`,
                  top: isDesktop ? `${photo.y}%` : `${photo.my}%`,
                  width: isDesktop ? `${photo.width}px` : `${photo.mw}%`,
                  maxWidth: isDesktop ? '42vw' : '36vw',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                  transition: hoveredIndex === idx
                    ? 'box-shadow 0.4s ease, filter 0.4s ease'
                    : 'box-shadow 0.4s ease, filter 0.4s ease',
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                {/* Photo card */}
                <div
                  className={`
                    relative overflow-hidden rounded-sm
                    border transition-all duration-500
                    ${hoveredIndex === idx
                      ? 'border-blue-glow/50 shadow-[0_0_40px_-8px_rgba(56,189,248,0.35)]'
                      : 'border-white/[0.06] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.9)]'
                    }
                  `}
                >
                  {/* Image */}
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Gradient overlay on hover */}
                  <div
                    className={`
                      absolute inset-0 transition-opacity duration-500
                      bg-gradient-to-t from-ink/80 via-transparent to-transparent
                      ${hoveredIndex === idx ? 'opacity-100' : 'opacity-0'}
                    `}
                  />

                  {/* Category + index badge (visible on hover) */}
                  <div
                    className={`
                      absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between
                      transition-all duration-500
                      ${hoveredIndex === idx
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                      }
                    `}
                  >
                    <div>
                      <span className="block text-[0.6rem] font-mono tracking-[0.25em] uppercase text-blue-glow/80 mb-0.5">
                        {String(photo.index + 1).padStart(2, '0')}
                      </span>
                      <span className="block text-[0.68rem] font-display tracking-widest uppercase text-white/90">
                        {photo.category}
                      </span>
                    </div>

                    {/* Small expand icon */}
                    <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* Viewfinder corners (visible on hover) */}
                  <div
                    className={`transition-opacity duration-300 ${
                      hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="vf-corner-tl" />
                    <div className="vf-corner-tr" />
                    <div className="vf-corner-bl" />
                    <div className="vf-corner-br" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent z-20 pointer-events-none" />
      </section>

      {/* Lightbox */}
      <LightboxModal
        images={allGalleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNavigate={navigateLightbox}
      />
    </>
  )
}
