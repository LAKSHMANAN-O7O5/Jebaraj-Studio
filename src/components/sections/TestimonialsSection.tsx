import { useState } from 'react'
import { testimonials } from '../../data/testimonials'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-ink py-24 md:py-32 border-t border-line relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x max-w-4xl relative z-10">
        <SectionHeader
          eyebrow="Words from Clients"
          title="Stories that found their home."
          subtitle="Genuine words from couples, brands, and sports directors we have had the honor to photograph."
          align="center"
        />

        <Reveal delay={60}>
          <div className="p-8 sm:p-12 md:p-16 rounded-lg bg-panel border border-line-light relative shadow-card">
            {/* Viewfinder frame corners */}
            <div className="vf-corner-tl" />
            <div className="vf-corner-tr" />
            <div className="vf-corner-bl" />
            <div className="vf-corner-br" />

            {/* Stars */}
            <div className="flex items-center justify-center gap-1.5 mb-8" aria-label={`Rating: ${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#38BDF8" className="text-blue-glow">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-center text-silver leading-relaxed mb-10 max-w-2xl mx-auto">
              "{t.quote}"
            </blockquote>

            {/* Client Profile */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              {t.avatar && (
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue shadow-glowSm"
                />
              )}
              <div>
                <p className="font-display font-bold text-lg text-white">
                  {t.name}
                </p>
                <p className="text-xs text-blue-glow font-mono">
                  {t.role} · <span className="text-fog">{t.location}</span>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-line">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="w-10 h-10 rounded-full border border-line bg-panel2 flex items-center justify-center text-fog hover:text-white hover:border-blue hover:shadow-glowSm transition-all"
              >
                ←
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? 'w-8 bg-blue shadow-glowSm' : 'w-2 bg-line hover:bg-fog'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="w-10 h-10 rounded-full border border-line bg-panel2 flex items-center justify-center text-fog hover:text-white hover:border-blue hover:shadow-glowSm transition-all"
              >
                →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

