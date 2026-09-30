import { useState } from 'react'

interface ImgProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function Img({ src, alt, className = '', loading = 'lazy' }: ImgProps) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-panel2 to-ink border border-line text-center p-4 select-none ${className}`}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="text-blue/60 mb-2"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <path d="M21 15L16 10L5 21" strokeWidth="1.5" />
        </svg>
        <span className="font-display text-[0.65rem] tracking-widest text-fog uppercase max-w-[90%] truncate">
          {src.split('/').pop() || alt}
        </span>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Subtle skeleton shimmer before image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-panel animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}

