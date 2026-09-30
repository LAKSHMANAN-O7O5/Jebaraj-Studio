import Layout from '../components/layout/Layout'
import BookingSection from '../components/sections/BookingSection'
import Reveal from '../components/common/Reveal'
import { siteConfig } from '../config/siteConfig'

export default function ContactPage() {
  return (
    <Layout>
      <section className="pt-36 pb-6 md:pt-44 container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Get in Touch</p>
          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl mb-4">
            Let's talk about your shoot.
          </h1>
          <p className="text-silver text-base sm:text-lg font-light">
            We are based in Kallidaikurichi, and travel worldwide for destination weddings and athletic commissions.
          </p>
        </Reveal>
      </section>

      <BookingSection />

      {/* Studio Location & Map Card */}
      <section className="pb-24 container-x">
        <Reveal className="p-8 sm:p-10 rounded-lg bg-panel border border-line flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-glow block mb-1">
              VISIT OUR STUDIO
            </span>
            <h3 className="font-display font-bold text-2xl text-white mb-2">
              Jebaraj Studio HQ
            </h3>
            <p className="text-sm text-fog max-w-md leading-relaxed mb-3">
              {siteConfig.address}
            </p>
            <p className="text-xs text-silver font-mono">
              Working Hours: {siteConfig.workingHours} (By Prior Appointment)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line-light bg-panel2 text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded hover:border-blue hover:text-blue-glow transition-all"
            >
              Get Directions ↗
            </a>
            <a
              href={`tel:${siteConfig.phoneClean}`}
              className="inline-flex items-center gap-2 bg-blue text-white text-xs font-semibold uppercase tracking-wider px-6 py-3.5 rounded shadow-glowSm hover:bg-blue-accent transition-all"
            >
              Call Studio →
            </a>
          </div>
        </Reveal>
      </section>
    </Layout>
  )
}
