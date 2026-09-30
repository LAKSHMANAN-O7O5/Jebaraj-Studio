import { useEffect } from 'react'
import { GalleryImage } from '../../types'

interface LightboxModalProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNavigate: (newIndex: number) => void
}

export default function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen || images.length === 0) return null

  const current = images[currentIndex]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 backdrop-blur-md select-none transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Photography Lightbox Viewer"
      onClick={onClose}
    >
      {/* Top action bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-ink/90 to-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4">
          <span className="font-display text-xs tracking-widest text-blue-glow uppercase px-3 py-1 rounded bg-blue/10 border border-blue/30">
            FRAME {currentIndex + 1} OF {images.length}
          </span>
          {current.caption && (
            <p className="hidden md:block text-sm text-silver font-medium max-w-lg truncate">
              {current.caption}
            </p>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full border border-line-light bg-panel/80 flex items-center justify-center text-white hover:border-blue hover:text-blue-glow hover:bg-blue/10 transition-all"
          aria-label="Close lightbox"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative max-w-6xl max-h-[85vh] p-4 flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative group max-h-[75vh] overflow-hidden rounded border border-line-light shadow-card bg-panel">
          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[75vh] w-auto max-w-full object-contain mx-auto"
          />

          {/* Camera Viewfinder Corners on lightbox image */}
          <div className="vf-corner-tl" />
          <div className="vf-corner-tr" />
          <div className="vf-corner-bl" />
          <div className="vf-corner-br" />
        </div>

        {/* Caption & EXIF metadata bar */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-3xl text-xs text-fog">
          <p className="md:hidden text-white text-sm">{current.caption || current.alt}</p>
          {current.exif && (
            <div className="flex flex-wrap items-center gap-2 text-[0.72rem] tracking-wider uppercase text-fog">
              {current.exif.camera && (
                <span className="px-2 py-1 rounded bg-panel2 border border-line">
                  📷 {current.exif.camera}
                </span>
              )}
              {current.exif.lens && (
                <span className="px-2 py-1 rounded bg-panel2 border border-line">
                  🔍 {current.exif.lens}
                </span>
              )}
              {current.exif.aperture && (
                <span className="px-2 py-1 rounded bg-panel2 border border-line">
                  {current.exif.aperture}
                </span>
              )}
              {current.exif.shutterSpeed && (
                <span className="px-2 py-1 rounded bg-panel2 border border-line">
                  {current.exif.shutterSpeed}
                </span>
              )}
              {current.exif.iso && (
                <span className="px-2 py-1 rounded bg-panel2 border border-line">
                  ISO {current.exif.iso}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((currentIndex - 1 + images.length) % images.length)
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-line-light bg-panel/80 backdrop-blur flex items-center justify-center text-white hover:border-blue hover:text-blue-glow hover:scale-105 transition-all shadow-glowSm"
            aria-label="Previous photograph"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNavigate((currentIndex + 1) % images.length)
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-line-light bg-panel/80 backdrop-blur flex items-center justify-center text-white hover:border-blue hover:text-blue-glow hover:scale-105 transition-all shadow-glowSm"
            aria-label="Next photograph"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

