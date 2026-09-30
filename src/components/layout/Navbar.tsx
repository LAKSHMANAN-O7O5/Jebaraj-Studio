import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { siteConfig } from '../../config/siteConfig'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile drawer on route change
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink/90 backdrop-blur-md border-b border-line shadow-card py-3.5'
          : 'bg-gradient-to-b from-ink/90 via-ink/40 to-transparent py-5'
      }`}
    >
      <nav className="container-x flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group focus-visible:outline-none"
          aria-label="Jebaraj Alex Robin Photography home"
        >
          <div className="relative w-10 h-10 rounded bg-panel2 border border-line flex items-center justify-center group-hover:border-blue group-hover:shadow-glowSm transition-all">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-blue group-hover:text-blue-glow transition-colors"
            >
              <rect x="2" y="6" width="20" height="14" rx="2" strokeWidth="1.6" />
              <circle cx="12" cy="13" r="4" strokeWidth="1.6" />
              <circle cx="12" cy="13" r="1.5" fill="#38BDF8" />
              <path d="M8 6L9.5 3.5H14.5L16 6" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue animate-pulse" />
          </div>

          <div className="leading-tight">
            <span className="block font-display font-bold text-lg tracking-tight text-white group-hover:text-silver transition-colors">
              JEBARAJ ALEX ROBIN
            </span>
            <span className="block text-[0.62rem] tracking-[0.25em] text-fog uppercase">
              JEBARAJ STUDIO · KALLIDAIKURICHI
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8">
          {siteConfig.navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `relative text-sm font-medium tracking-wider uppercase py-1 transition-all ${
                    isActive
                      ? 'text-white'
                      : 'text-fog hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue via-blue-glow to-blue rounded-full shadow-[0_0_8px_#2563EB]" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.whatsappClean}?text=Hi%20Jebaraj,%20I'd%20like%20to%20inquire%20about%20a%20photoshoot!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase text-silver border border-line-light px-4 py-2.5 rounded hover:border-blue/60 hover:text-white transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            WhatsApp
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue text-white text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded shadow-glowSm hover:bg-blue-accent hover:shadow-glow transition-all"
          >
            Book Shoot <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded text-white border border-line bg-panel focus-visible:outline-none"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path d="M6 6L18 18M6 18L18 6" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 6H20" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H20" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 18H20" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden bg-ink/98 border-b border-line shadow-2xl backdrop-blur-lg">
          <div className="container-x py-6 flex flex-col gap-4">
            <div className="pb-3 border-b border-line flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-fog tracking-widest">
                MENU NAVIGATION
              </span>
              <span className="text-xs text-blue-glow font-medium">Kallidaikurichi, TN</span>
            </div>

            <ul className="flex flex-col gap-3">
              {siteConfig.navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2 text-base font-display font-medium tracking-wide transition-colors ${
                        isActive
                          ? 'text-blue-glow pl-2 border-l-2 border-blue'
                          : 'text-silver hover:text-white'
                      }`
                    }
                  >
                    <span>{l.label}</span>
                    <span className="text-xs text-fog">→</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-line grid grid-cols-2 gap-3">
              <a
                href={`https://wa.me/${siteConfig.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded bg-panel2 border border-line text-xs font-semibold uppercase tracking-wider text-white"
              >
                WhatsApp
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded bg-blue text-xs font-semibold uppercase tracking-wider text-white shadow-glowSm"
              >
                Book Shoot
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

