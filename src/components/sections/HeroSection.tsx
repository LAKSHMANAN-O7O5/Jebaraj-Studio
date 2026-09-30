import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import Reveal from '../common/Reveal'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Hero Photography with cinematic color wash */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1920&auto=format&fit=crop"
          alt="Jebaraj Alex Robin Photography — Candid wedding moment captured in Kallidaikurichi"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          loading="eager"
        />
        {/* Multi-layer gradient overlays for rich deep black and blue tone */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent" />
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
      </div>

      {/* Viewfinder crosshairs overlay */}
      <div className="absolute inset-8 md:inset-16 pointer-events-none z-10 border border-white/5">
        <div className="vf-corner-tl" />
        <div className="vf-corner-tr" />
        <div className="vf-corner-bl" />
        <div className="vf-corner-br" />

        {/* Subtle camera focal mark in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 border border-blue-glow/30 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-blue-glow animate-ping" />
        </div>
      </div>

      <div className="container-x relative z-10 w-full flex flex-col justify-center py-16 md:py-24">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-panel2/80 backdrop-blur border border-line-light text-xs font-mono tracking-widest text-silver mb-5 shadow-glowSm">
            <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
            <span>JEBARAJ ALEX ROBIN PHOTOGRAPHY · KALLIDAIKURICHI</span>
          </div>

          <span className="block font-script text-3xl sm:text-4xl md:text-5xl text-blue-glow mb-3 -rotate-1 select-none font-medium">
            Candid. Cinematic. Timeless.
          </span>

          <h1 className="heading-xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight max-w-5xl leading-[1.02]">
            Your Moments.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-silver to-blue-glow">
              Our Visual Legacy.
            </span>
          </h1>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2.5 bg-blue text-white text-xs sm:text-sm font-semibold tracking-wider uppercase px-7 py-4 rounded shadow-glow hover:bg-blue-accent hover:shadow-glowCyan hover:scale-[1.02] transition-all"
            >
              Explore Portfolio <span aria-hidden>→</span>
            </Link>

            <a
              href={`https://wa.me/${siteConfig.whatsappClean}?text=Hi%20Jebaraj,%20I'm%20viewing%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20shoot!`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-silver hover:text-white px-4 py-4 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-400">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Quick WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

