import { Link } from 'react-router-dom'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function AboutPreview() {
  return (
    <section className="bg-ink py-24 md:py-32 border-t border-line relative overflow-hidden">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Storyteller"
          title="We don't just take photos. We capture living memories."
          actionLink={{ to: '/about', label: 'Read Jebaraj’s Full Story' }}
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photographer portrait with camera viewfinder */}
          <Reveal className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-line-light shadow-card group">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
                alt="Jebaraj Alex Robin — Lead Photographer holding camera in studio"
                className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-80" />

              {/* Viewfinder frame corners */}
              <div className="vf-corner-tl" />
              <div className="vf-corner-tr" />
              <div className="vf-corner-bl" />
              <div className="vf-corner-br" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-mono text-xs text-blue-glow tracking-widest uppercase">
                  LEAD PHOTOGRAPHER &amp; FOUNDER
                </span>
                <p className="font-display font-bold text-2xl text-white mt-1">Jebaraj Alex Robin</p>
                <p className="text-xs text-fog">Jebaraj Studio · Kallidaikurichi, India</p>
              </div>
            </div>

            {/* Glowing decorative frame background */}
            <div className="absolute -bottom-4 -right-4 w-40 h-40 border border-blue/30 rounded -z-10 hidden sm:block pointer-events-none" />
          </Reveal>

          {/* Bio text & values */}
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white mb-6 leading-snug">
                "A truly great photograph should pull you right back to the smell of the rain, the pulse of the crowd, or the flutter of a heart."
              </h3>

              <p className="text-silver leading-relaxed mb-8 font-light text-base md:text-lg">
                Over the past 12 years, I have documented over 250 weddings, athletic championships, and high-profile commercial campaigns across South India. My approach is rooted in photojournalism: remaining invisible when authentic moments happen, and providing confident, effortless art direction when needed.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-blue text-white text-xs font-semibold tracking-wider uppercase px-6 py-3.5 rounded shadow-glowSm hover:bg-blue-accent hover:shadow-glow transition-all"
                >
                  Book a Consultation <span aria-hidden>→</span>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="font-script text-3xl text-blue-glow select-none">Jebaraj Alex Robin</span>
                  <span className="text-xs text-fog tracking-wider uppercase font-mono border-l border-line pl-3">
                    Jebaraj Studio
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

