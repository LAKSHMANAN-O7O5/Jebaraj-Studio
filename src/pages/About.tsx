import Layout from '../components/layout/Layout'
import Reveal from '../components/common/Reveal'
import SectionHeader from '../components/common/SectionHeader'
import CameraGearSection from '../components/sections/CameraGearSection'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import BookingSection from '../components/sections/BookingSection'
import { siteConfig } from '../config/siteConfig'

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-20 container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-3">About The Artist</p>
          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl mb-6">
            12 Years of Unscripted Moments &amp; Visual Legacies.
          </h1>
          <p className="text-silver text-lg font-light leading-relaxed">
            Founded by photographer Jebaraj Alex Robin, Jebaraj Studio has been preserving intimate South Indian weddings, athletic triumphs, and commercial brand aesthetics with a clean, cinematic eye.
          </p>
        </Reveal>
      </section>

      {/* Narrative Section with dual portraits */}
      <section className="pb-24 md:pb-32 container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Reveal className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden border border-line-light shadow-card group">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop"
                alt="Jebaraj Alex Robin — Lead Photographer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-60" />
              <div className="vf-corner-tl" />
              <div className="vf-corner-tr" />
              <div className="vf-corner-bl" />
              <div className="vf-corner-br" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-4 rounded bg-panel2 border border-line shadow-card hidden sm:block">
              <p className="text-2xl font-bold font-display text-white">250+</p>
              <p className="text-[0.65rem] font-mono uppercase text-fog tracking-wider">Weddings Documented</p>
            </div>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-6">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-6 uppercase tracking-tight">
              "We photograph for your grandchildren."
            </h2>

            <div className="space-y-5 text-fog leading-relaxed font-light text-base">
              <p>
                When I picked up my first camera in Kallidaikurichi over a decade ago, I quickly realized that the photography trends that fade the fastest are the ones built on heavy staging and forced poses.
              </p>

              <p>
                My philosophy is simple: <strong className="text-white font-medium">listen before you shoot</strong>. Whether documenting the sacred fire rituals of a morning Muhurtham or the split-second counterattack on a football pitch, my mission is to anticipate emotion before it disappears.
              </p>

              <p>
                Every frame produced by Jebaraj Studio undergoes custom digital color grading. We do not apply generic commercial presets; we hand-balance shadows, skin tones, and highlight rolloff to ensure your photos feel timeless forty years from today.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-line flex items-center justify-between">
              <div>
                <span className="font-script text-3xl text-blue-glow block mb-1">Jebaraj Alex Robin</span>
                <span className="text-xs font-mono tracking-widest text-silver uppercase">
                  Lead Storyteller · Jebaraj Studio
                </span>
              </div>
              <span className="text-xs font-mono text-fog uppercase">Kallidaikurichi, TN</span>
            </div>
          </Reveal>
        </div>
      </section>

      <WhyChooseUs />
      <CameraGearSection />
      <TestimonialsSection />
      <BookingSection />
    </Layout>
  )
}
