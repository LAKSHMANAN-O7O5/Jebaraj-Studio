import { siteConfig } from '../../config/siteConfig'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

import firstImg from '../../assets/instagram images/first img.jpg'
import secondImg from '../../assets/instagram images/second img.jpg'
import thirdImg from '../../assets/instagram images/third img.jpg'
import fourthImg from '../../assets/instagram images/fourth img.jpg'
import fifthImg from '../../assets/instagram images/fifth img.jpg'
import sixthImg from '../../assets/instagram images/sixth img.jpg'

const instagramPosts = [
  {
    src: firstImg,
    alt: 'First Instagram post',
    url: 'https://www.instagram.com/p/DdJawHgFKx2/?img_index=7&stkn=MXMxcDJtdzdndm9obA%3D%3D',
  },
  {
    src: secondImg,
    alt: 'Second Instagram post',
    objectPosition: 'center top',
    url: 'https://www.instagram.com/p/DRSIVsyESH9/?stkn=MTA3d2loaW0ya3Roaw%3D%3D',
  },
  {
    src: thirdImg,
    alt: 'Third Instagram post',
    url: 'https://www.instagram.com/p/DdJawHgFKx2/?img_index=3&stkn=MXMxcDJtdzdndm9obA%3D%3D',
  },
  {
    src: fourthImg,
    alt: 'Fourth Instagram post',
    url: 'https://www.instagram.com/p/DcQ1atRFEhP/?img_index=14&stkn=MWx6dW83anZhODNxbg%3D%3D',
  },
  {
    src: fifthImg,
    alt: 'Fifth Instagram post',
    url: 'https://www.instagram.com/p/DcOQtlaEVVg/?img_index=10&stkn=https%3A%2F%2Fwww.instagram.com%2Fp%2FDRSIVsyESH9%2F%3Fstkn%3DMTA3d2loaW0ya3Roaw%3D%3DMmo3NDhpNmwzb3N5',
  },
  {
    src: sixthImg,
    alt: 'Sixth Instagram post',
    url: 'https://www.instagram.com/p/DRE-ndOETRa/?stkn=MWRzOTBiNGI3bDUyYw%3D%3D',
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
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[16/9] rounded overflow-hidden bg-ink border border-line-light shadow-card cursor-pointer"
                aria-label={`View Instagram post: ${post.alt}`}
              >
                <img
                  src={post.src}
                  alt={post.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: post.objectPosition || 'center' }}
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


