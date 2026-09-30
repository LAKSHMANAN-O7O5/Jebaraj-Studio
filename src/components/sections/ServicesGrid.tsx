import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function ServicesGrid() {
  return (
    <section className="bg-panel py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Disciplines &amp; Expertise"
          title="Mastery across every photographic medium."
          subtitle="Specialized expertise in fast low-light movement, emotional human moments, and precision lighting."
          actionLink={{ to: '/services', label: 'View All Pricing & Details' }}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {services.map((s, i) => {
            const isFourth = i === 3
            const isFifth = i === 4

            let colClass = 'lg:col-span-2'
            if (isFourth) {
              colClass = 'sm:col-span-1 lg:col-span-2 lg:col-start-2'
            } else if (isFifth) {
              colClass = 'sm:col-span-2 lg:col-span-2'
            }

            return (
              <Reveal key={s.slug} delay={i * 60} className={colClass}>
                <Link
                  to={`/portfolio?category=${s.category}`}
                  className="group relative block rounded-md overflow-hidden bg-panel2 border border-line-light hover:border-blue/70 transition-all duration-500 shadow-card flex flex-col h-full"
                >
                  {/* Image container */}
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={s.image}
                      alt={`${s.title} photography in Kallidaikurichi`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel2 via-panel2/40 to-transparent" />

                    <span className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded bg-ink/80 backdrop-blur border border-line text-[0.65rem] font-mono tracking-widest text-silver uppercase">
                      {s.startingPrice ? `FROM ${s.startingPrice}` : 'CUSTOM QUOTE'}
                    </span>

                    {/* Viewfinder frame corners on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="vf-corner-tl" />
                      <div className="vf-corner-tr" />
                      <div className="vf-corner-bl" />
                      <div className="vf-corner-br" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between bg-panel2">
                    <div>
                      <span className="text-[0.7rem] font-mono tracking-widest text-blue-glow uppercase block mb-1">
                        {s.category}
                      </span>
                      <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-blue-glow transition-colors mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-fog leading-relaxed line-clamp-2 mb-4">
                        {s.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-line flex items-center justify-between text-xs">
                      <span className="text-silver font-medium group-hover:text-white transition-colors">
                        View {s.category} Portfolio
                      </span>
                      <span className="w-7 h-7 rounded-full bg-ink border border-line flex items-center justify-center text-silver group-hover:border-blue group-hover:text-blue group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

