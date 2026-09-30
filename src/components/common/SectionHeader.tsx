import { Link } from 'react-router-dom'
import Reveal from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  subtitle?: string
  actionLink?: {
    to: string
    label: string
  }
  align?: 'left' | 'center'
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  actionLink,
  align = 'left',
}: SectionHeaderProps) {
  if (align === 'center') {
    return (
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-18">
        <Reveal>
          <p className="eyebrow mb-3 justify-center">{eyebrow}</p>
          <h2 className="heading-xl text-3xl md:text-4xl lg:text-5xl">{title}</h2>
          {subtitle && <p className="mt-4 text-fog text-base md:text-lg leading-relaxed">{subtitle}</p>}
        </Reveal>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
      <Reveal className="max-w-2xl">
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="heading-xl text-3xl md:text-4xl lg:text-5xl">{title}</h2>
        {subtitle && <p className="mt-4 text-fog text-base md:text-lg leading-relaxed">{subtitle}</p>}
      </Reveal>

      {actionLink && (
        <Reveal delay={60}>
          <Link
            to={actionLink.to}
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-white border-b border-blue pb-1 hover:text-blue-glow hover:border-blue-glow transition-all group"
          >
            {actionLink.label}
            <span className="transition-transform group-hover:translate-x-1" aria-hidden>
              →
            </span>
          </Link>
        </Reveal>
      )}
    </div>
  )
}

