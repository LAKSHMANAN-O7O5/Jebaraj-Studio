import { siteConfig } from '../../config/siteConfig'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

const instagramPosts = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop',
    alt: 'Bridal floral canopy candid shot',
  },
  {
    src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop',
    alt: 'Football match winning moment',
  },
  {
    src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    alt: 'Concert lasers and audience energy',
  },
  {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    alt: 'Natural sunlight portrait study',
  },
  {
    src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop',
    alt: 'Silk saree couture fashion campaign',
  },
  {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    alt: 'East Coast seaside golden hour reflection',
  },
]

export default function InstagramShowcase() {
  return (
    <section className="bg-panel py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Real-Time Feed"
          title={`Follow @${siteConfig.socials.instagramHandle.replace('@', '')}`}
          subtitle="Daily unreleased frames, behind the scenes stories, and equipment breakdowns."
          actionLink={{ to: siteConfig.socials.instagram, label: 'Follow on Instagram' }}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramPosts.map((post, i) => (
            <Reveal key={post.src} delay={i * 40}>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square rounded overflow-hidden bg-ink border border-line-light shadow-card"
                aria-label={`View Instagram post: ${post.alt}`}
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Blue glow overlay with Instagram icon */}
                <div className="absolute inset-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue/90 text-white flex items-center justify-center shadow-glowSm scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

