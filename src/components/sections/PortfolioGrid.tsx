import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { projects } from '../../data/projects'
import { GalleryImage, PhotographyCategory } from '../../types'
import LightboxModal from '../common/LightboxModal'
import Reveal from '../common/Reveal'

const filters: Array<PhotographyCategory | 'All'> = [
  'All',
  'Weddings',
  'Sports',
  'Events',
  'Portraits',
  'Private',
  'Commercial',
]

const aspectCycle = ['aspect-[3/4]', 'aspect-[4/3]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]']

interface PortfolioGridProps {
  limit?: number
}

export default function PortfolioGrid({ limit }: PortfolioGridProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const initial = (searchParams.get('category') as PhotographyCategory) || 'All'
  const [active, setActive] = useState<PhotographyCategory | 'All'>(
    filters.includes(initial) ? initial : 'All',
  )

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const filtered = useMemo(() => {
    const list = active === 'All' ? projects : projects.filter((p) => p.category === active)
    return limit ? list.slice(0, limit) : list
  }, [active, limit])

  // Flattened images for the lightbox
  const lightboxImages: GalleryImage[] = useMemo(() => {
    return filtered.map((p) => ({
      src: p.coverImage,
      alt: p.title,
      aspect: 'landscape',
      caption: `${p.title} · ${p.category} (${p.location})`,
      exif: p.gallery[0]?.exif,
    }))
  }, [filtered])

  const openLightboxForProject = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div>
      {/* Category filter pills */}
      {!limit && (
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-line">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActive(f)
                setSearchParams(f === 'All' ? {} : { category: f })
              }}
              className={`text-xs font-mono tracking-wider uppercase px-4 py-2 rounded transition-all ${
                active === f
                  ? 'bg-blue text-white shadow-glowSm'
                  : 'bg-panel border border-line text-fog hover:text-white hover:border-line-light'
              }`}
              aria-pressed={active === f}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Columns */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 6) * 50} className="mb-5 break-inside-avoid">
            <div
              className={`group relative block w-full rounded-md overflow-hidden bg-panel border border-line-light shadow-card ${
                aspectCycle[i % aspectCycle.length]
              }`}
            >
              <img
                src={p.coverImage}
                alt={`${p.title} — ${p.category}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/75 transition-colors duration-300" />
              <div className="absolute inset-0 border border-transparent group-hover:border-blue/50 transition-colors pointer-events-none" />

              {/* Viewfinder frame corners on hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="vf-corner-tl" />
                <div className="vf-corner-tr" />
                <div className="vf-corner-bl" />
                <div className="vf-corner-br" />
              </div>

              {/* Overlay content on hover */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-[0.68rem] font-mono tracking-widest uppercase text-blue-glow px-2.5 py-0.5 rounded bg-blue/20 border border-blue/40">
                    {p.category}
                  </span>

                  {/* Lightbox Quick View button */}
                  <button
                    onClick={() => openLightboxForProject(i)}
                    className="w-8 h-8 rounded-full bg-ink/80 border border-line flex items-center justify-center text-white hover:border-blue hover:text-blue-glow transition-all"
                    title="Fullscreen Lightbox"
                    aria-label="View photo in fullscreen"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                  </button>
                </div>

                <div>
                  <h3 className="font-display font-bold uppercase text-lg text-white mb-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-fog mb-3">{p.location}</p>
                  <Link
                    to={`/portfolio/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-white border-b border-blue pb-0.5 hover:text-blue-glow transition-colors"
                  >
                    View Project Story →
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  )
}

