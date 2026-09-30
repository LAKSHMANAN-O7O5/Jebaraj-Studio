import { useState, useRef, useCallback } from 'react'

interface BeforeAfterSliderProps {
  rawImage: string
  gradedImage: string
  title: string
  description?: string
  aspectRatio?: string
}

export default function BeforeAfterSlider({
  rawImage,
  gradedImage,
  title,
  description,
  aspectRatio = 'aspect-[16/10]',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }, [])

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-md select-none border border-line-light cursor-ew-resize group shadow-card`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* Under layer: RAW / SOOC image */}
        <img
          src={rawImage}
          alt={`RAW unedited capture — ${title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-ink/80 backdrop-blur border border-line text-[0.68rem] tracking-widest text-fog uppercase font-mono">
          RAW / SOOC
        </div>

        {/* Top layer: Graded / Signature Edit image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={gradedImage}
            alt={`Color graded signature finish — ${title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded bg-blue/80 backdrop-blur border border-blue text-[0.68rem] tracking-widest text-white uppercase font-mono shadow-glowSm">
            JEBARAJ ALEX ROBIN SIGNATURE GRADE
          </div>
        </div>

        {/* Moving divider line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-white pointer-events-none shadow-[0_0_10px_rgba(37,99,235,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-panel border-2 border-blue flex items-center justify-center text-white shadow-glowSm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M8 7l-5 5 5 5" />
              <path d="M16 7l5 5-5 5" />
            </svg>
          </div>
        </div>

        {/* Camera Viewfinder markers */}
        <div className="vf-corner-tl" />
        <div className="vf-corner-tr" />
        <div className="vf-corner-bl" />
        <div className="vf-corner-br" />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-fog">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue animate-pulse" />
          Drag slider or touch horizontally to inspect color grading
        </span>
        <span className="font-mono text-white text-[0.7rem]">
          {sliderPosition.toFixed(0)}% SPLIT
        </span>
      </div>

      {description && (
        <p className="mt-2 text-sm text-fog leading-relaxed">{description}</p>
      )}
    </div>
  )
}

