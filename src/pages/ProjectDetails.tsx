import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LightboxModal from '../components/common/LightboxModal'
import Reveal from '../components/common/Reveal'
import { projects } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!project) return <NotFound />

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <Layout>
      {/* Hero Cover */}
      <section className="relative h-[75vh] min-h-[460px] w-full overflow-hidden flex items-end">
        <img
          src={project.coverImage}
          alt={`${project.title} — full hero photograph`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

        <div className="relative z-10 container-x pb-14 w-full">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-glow px-3 py-1 rounded bg-blue/20 border border-blue/40">
                {project.category}
              </span>
              <span className="text-xs text-fog font-mono">
                {project.location} {project.date ? `· ${project.date}` : ''}
              </span>
            </div>

            <h1 className="heading-xl text-3xl sm:text-5xl md:text-6xl max-w-3xl mb-4">
              {project.title}
            </h1>

            {project.client && (
              <p className="text-sm font-mono text-silver tracking-wide">
                COMMISSIONED FOR: <span className="text-white">{project.client}</span>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Project Meta Bar & Intro */}
      <section className="border-b border-line bg-panel py-12">
        <div className="container-x grid md:grid-cols-12 gap-8 items-center">
          <Reveal className="md:col-span-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-blue-glow mb-2">
              PROJECT NARRATIVE
            </h2>
            <p className="text-silver leading-relaxed text-base sm:text-lg font-light">
              {project.intro}
            </p>
          </Reveal>

          {project.deliverables && (
            <Reveal delay={60} className="md:col-span-4 p-5 rounded bg-panel2 border border-line">
              <p className="text-xs font-mono uppercase text-fog tracking-wider mb-1">
                DELIVERABLES
              </p>
              <p className="text-sm text-white font-medium">
                {project.deliverables}
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Interactive Gallery with Lightbox Trigger */}
      <section className="container-x py-20 md:py-28">
        <Reveal className="mb-8 flex items-center justify-between">
          <p className="text-xs font-mono tracking-widest text-fog uppercase">
            CLICK ANY FRAME TO EXPAND TO FULLSCREEN
          </p>
          <span className="text-xs text-blue-glow font-mono">
            {project.gallery.length} PHOTOGRAPHS
          </span>
        </Reveal>

        <div className="columns-1 sm:columns-2 gap-6 [column-fill:_balance]">
          {project.gallery.map((img, i) => (
            <Reveal key={img.src} delay={i * 50} className="mb-6 break-inside-avoid">
              <div
                onClick={() => openLightbox(i)}
                className="group relative block w-full rounded-md overflow-hidden bg-panel border border-line-light cursor-pointer shadow-card"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors duration-300" />
                <div className="absolute inset-0 border border-transparent group-hover:border-blue/50 transition-colors" />

                {/* Viewfinder frame corners */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="vf-corner-tl" />
                  <div className="vf-corner-tr" />
                  <div className="vf-corner-bl" />
                  <div className="vf-corner-br" />
                </div>

                {/* Hover overlay metadata */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-end">
                    <span className="w-8 h-8 rounded-full bg-ink/80 border border-line flex items-center justify-center text-white text-xs">
                      🔍
                    </span>
                  </div>

                  <div>
                    {img.caption && (
                      <p className="text-sm font-medium text-white mb-2 leading-snug">
                        {img.caption}
                      </p>
                    )}
                    {img.exif && (
                      <p className="text-[0.68rem] font-mono text-blue-glow uppercase tracking-wider">
                        {img.exif.lens} · {img.exif.aperture} · {img.exif.shutterSpeed}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Component */}
      <LightboxModal
        images={project.gallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />

      {/* Bottom CTA */}
      <section className="border-t border-line py-16 bg-panel">
        <div className="container-x flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            to="/portfolio"
            className="text-sm font-mono uppercase tracking-wider text-fog hover:text-white transition-colors"
          >
            ← Back to All Portfolio Stories
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue text-white text-xs font-bold uppercase tracking-widest px-7 py-4 rounded shadow-glow hover:bg-blue-accent transition-all"
          >
            Commission a Shoot Like This <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </Layout>
  )
}
