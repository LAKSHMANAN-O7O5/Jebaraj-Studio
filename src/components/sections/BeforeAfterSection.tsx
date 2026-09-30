import { useState } from 'react'
import { beforeAfterItems } from '../../data/beforeAfter'
import BeforeAfterSlider from '../common/BeforeAfterSlider'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function BeforeAfterSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const current = beforeAfterItems[activeIndex]

  return (
    <section className="bg-panel py-24 md:py-32 border-t border-line relative overflow-hidden">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Craft &amp; Retouching"
          title="Raw Capture vs. Signature Color Grade"
          subtitle="True artistry isn't just pressing the shutter — it is mastering light, color harmony, and cinematic tones in post-production."
        />

        <div className="max-w-4xl mx-auto">
          {/* Tab selector */}
          <Reveal className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {beforeAfterItems.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(i)}
                className={`text-xs font-mono tracking-wider uppercase px-4 py-2.5 rounded transition-all ${
                  activeIndex === i
                    ? 'bg-blue text-white shadow-glowSm'
                    : 'bg-panel2 border border-line text-fog hover:text-white hover:border-line-light'
                }`}
              >
                {item.title} ({item.category})
              </button>
            ))}
          </Reveal>

          {/* Interactive slider */}
          <Reveal delay={80}>
            <BeforeAfterSlider
              rawImage={current.rawImage}
              gradedImage={current.gradedImage}
              title={current.title}
              description={current.description}
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

