import { Link } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'
import { services } from '../../data/services'

export default function Footer() {
  return (
    <footer className="bg-ink border-t border-line pt-20 pb-10 relative overflow-hidden">
      {/* Background subtle radial glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        {/* Brand Column */}
        <div className="lg:col-span-2">
          <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-panel2 border border-line flex items-center justify-center group-hover:border-blue transition-colors">
              <img
                src="/logo.png"
                alt="Jebaraj Studio Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="block font-display font-bold text-lg tracking-tight text-white">
                JEBARAJ ALEX ROBIN
              </span>
              <span className="block text-[0.6rem] tracking-[0.25em] text-fog uppercase">
                JEBARAJ STUDIO · KALLIDAIKURICHI
              </span>
            </div>
          </Link>

          <p className="text-fog text-sm leading-relaxed max-w-sm mb-6">
            Cinematic visual narratives crafted with intention and emotion. Specializing in high-end wedding storytelling, dynamic sports action, and commercial brand aesthetics.
          </p>

          <div className="flex items-center gap-3 text-xs text-silver">
            <span className="w-2 h-2 rounded-full bg-blue animate-pulse" />
            <span>Currently booking for 2026 &amp; 2027 seasons</span>
          </div>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 className="text-xs font-display font-semibold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Explore
          </h4>
          <ul className="space-y-3 text-sm">
            {siteConfig.navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-fog hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-xs font-display font-semibold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Disciplines
          </h4>
          <ul className="space-y-3 text-sm">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/portfolio?category=${s.category}`}
                  className="text-fog hover:text-white hover:translate-x-1 inline-block transition-all"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Studio Column */}
        <div>
          <h4 className="text-xs font-display font-semibold tracking-widest uppercase text-white mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            Studio HQ
          </h4>
          <ul className="space-y-3 text-sm text-fog">
            <li>
              <a
                href={`tel:${siteConfig.phoneClean}`}
                className="hover:text-blue-glow transition-colors block text-white"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-blue-glow transition-colors block truncate"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="pt-2 text-xs leading-relaxed text-muted border-t border-line">
              {siteConfig.address}
            </li>
          </ul>

          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded bg-panel2 border border-line flex items-center justify-center text-fog hover:text-white hover:border-blue hover:shadow-glowSm transition-all"
              aria-label="Instagram profile"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded bg-panel2 border border-line flex items-center justify-center text-fog hover:text-white hover:border-blue hover:shadow-glowSm transition-all"
              aria-label="YouTube channel"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded bg-panel2 border border-line flex items-center justify-center text-fog hover:text-white hover:border-blue hover:shadow-glowSm transition-all"
              aria-label="WhatsApp direct chat"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container-x border-t border-line pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
        <p>© {new Date().getFullYear()} Jebaraj Alex Robin Photography (Jebaraj Studio). All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Crafted for high-impact visual storytelling</span>
          <span className="w-1 h-1 rounded-full bg-blue" />
          <span>Kallidaikurichi</span>
        </p>
      </div>
    </footer>
  )
}

