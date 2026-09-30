import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import { packages } from '../../data/packages'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function PricingPackages() {
  return (
    <section id="packages" className="bg-panel py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Investment &amp; Tiers"
          title="Transparent investment for unforgettable stories."
          subtitle="Every package includes full personal printing rights, private cloud gallery, and signature color grading."
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 60}>
              <div
                className={`h-full rounded-md p-7 flex flex-col justify-between transition-all duration-300 relative ${
                  pkg.isPopular
                    ? 'bg-panel2 border-2 border-blue shadow-glow'
                    : 'bg-panel2/60 border border-line-light hover:border-blue/50 shadow-card'
                }`}
              >
                {pkg.isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue text-white text-[0.65rem] font-mono tracking-widest uppercase font-bold shadow-glowSm">
                    MOST REQUESTED
                  </span>
                )}

                <div>
                  <span className="text-[0.68rem] font-mono tracking-widest uppercase text-blue-glow block mb-2">
                    {pkg.category}
                  </span>

                  <h3 className="font-display font-bold text-xl text-white uppercase mb-2">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-fog leading-relaxed mb-6 font-light min-h-[36px]">
                    {pkg.tagline}
                  </p>

                  <div className="mb-6 pb-6 border-b border-line">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-white">
                      {pkg.price}
                    </span>
                    {pkg.period && (
                      <span className="text-xs text-fog ml-1 font-mono block mt-1">
                        / {pkg.period}
                      </span>
                    )}
                  </div>

                  <p className="text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-3">
                    WHAT'S INCLUDED:
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {pkg.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs text-fog leading-snug">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          className="text-blue flex-shrink-0 mt-0.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5">
                  <Link
                    to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                    className={`w-full py-3 rounded text-center text-xs font-semibold uppercase tracking-wider block transition-all ${
                      pkg.isPopular
                        ? 'bg-blue text-white shadow-glowSm hover:bg-blue-accent'
                        : 'bg-panel border border-line text-white hover:border-blue hover:text-blue-glow'
                    }`}
                  >
                    Select Package
                  </Link>

                  <a
                    href={`https://wa.me/${siteConfig.whatsappClean}?text=Hi%20Jebaraj,%20I'd%20like%20to%20know%20more%20about%20the%20${encodeURIComponent(pkg.name)}%20package.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-center text-[0.7rem] font-mono uppercase text-fog hover:text-silver block transition-colors"
                  >
                    Inquire on WhatsApp →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

