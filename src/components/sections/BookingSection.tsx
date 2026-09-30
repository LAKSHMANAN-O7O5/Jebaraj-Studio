import { FormEvent, useState } from 'react'
import { siteConfig } from '../../config/siteConfig'
import Reveal from '../common/Reveal'

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Weddings',
    date: '',
    location: '',
    budget: '',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hi Jebaraj! I'd like to check your photography availability.\n\n*Name:* ${formData.name || 'Client'}\n*Discipline:* ${formData.category}\n*Date:* ${formData.date || 'To be decided'}\n*Location:* ${formData.location || 'Kallidaikurichi'}\n*Details:* ${formData.message || 'Looking forward to discussing!'}`
    )
    window.open(`https://wa.me/${siteConfig.whatsappClean}?text=${text}`, '_blank')
  }

  return (
    <section id="contact" className="bg-panel py-24 md:py-32 border-t border-line relative overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Direct Info */}
        <Reveal className="lg:col-span-5">
          <p className="eyebrow mb-3">Begin Your Story</p>
          <h2 className="heading-xl text-3xl sm:text-4xl lg:text-5xl mb-6">
            Let's create something unforgettable.
          </h2>

          <p className="text-silver text-base leading-relaxed mb-8 font-light">
            We accept a limited number of commissions each season to ensure every project receives Jebaraj Alex Robin's undivided creative attention, meticulous planning, and bespoke color grading.
          </p>

          <div className="p-6 rounded-md bg-panel2 border border-line mb-8 space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-blue-glow uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>Instant WhatsApp Inquiry Available</span>
            </div>
            <p className="text-xs text-fog leading-relaxed">
              Prefer a rapid response? Send us shoot dates directly on WhatsApp for real-time availability check within 2 business hours.
            </p>
            <button
              onClick={handleWhatsAppDirect}
              className="w-full py-3 rounded bg-blue text-white text-xs font-semibold uppercase tracking-wider shadow-glowSm hover:bg-blue-accent transition-all flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Chat on WhatsApp Now
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-4">
              <span className="text-blue text-lg">📞</span>
              <div>
                <p className="text-xs font-mono uppercase text-fog">Phone</p>
                <a href={`tel:${siteConfig.phoneClean}`} className="text-white hover:text-blue-glow transition-colors font-medium">
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-blue text-lg">✉️</span>
              <div>
                <p className="text-xs font-mono uppercase text-fog">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-white hover:text-blue-glow transition-colors font-medium">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-blue text-lg">📍</span>
              <div>
                <p className="text-xs font-mono uppercase text-fog">Studio Address</p>
                <p className="text-silver leading-snug">{siteConfig.address}</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right Column: Inquiry Form */}
        <Reveal delay={100} className="lg:col-span-7">
          <div className="p-8 sm:p-10 rounded-lg bg-panel2 border border-line-light shadow-card relative">
            <div className="vf-corner-tl" />
            <div className="vf-corner-tr" />
            <div className="vf-corner-bl" />
            <div className="vf-corner-br" />

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue/20 border border-blue text-blue flex items-center justify-center mx-auto shadow-glow">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-2xl text-white uppercase tracking-tight">
                  Inquiry Received!
                </h3>
                <p className="text-silver text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Jebaraj Alex Robin will review your shoot date and get in touch within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleWhatsAppDirect}
                    className="inline-flex items-center gap-2 bg-blue text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded shadow-glowSm hover:bg-blue-accent transition-all"
                  >
                    Speed up via WhatsApp →
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ananya & Karthik"
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white placeholder:text-muted focus:border-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 00000"
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white placeholder:text-muted focus:border-blue outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="youremail@example.com"
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white placeholder:text-muted focus:border-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Photography Discipline *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white focus:border-blue outline-none transition-colors"
                    >
                      {siteConfig.categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat} Photography
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Tentative Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white focus:border-blue outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                      Shoot Location / Venue
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Leela Palace, ECR, Studio"
                      className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white placeholder:text-muted focus:border-blue outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.7rem] font-mono tracking-wider uppercase text-silver mb-2">
                    Message / Vision for Your Shoot
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the schedule, expected guests, outfit changes, or any specific moments you care most about..."
                    className="w-full px-4 py-3 rounded bg-ink border border-line text-sm text-white placeholder:text-muted focus:border-blue outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded bg-blue text-white text-xs font-bold uppercase tracking-widest shadow-glow hover:bg-blue-accent hover:shadow-glowCyan transition-all flex items-center justify-center gap-2"
                >
                  Send Booking Request <span aria-hidden>→</span>
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

