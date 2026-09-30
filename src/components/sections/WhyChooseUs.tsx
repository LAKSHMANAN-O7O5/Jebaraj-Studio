import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

const features = [
  {
    title: 'Documentary Storytelling',
    desc: 'We never stop genuine moments to demand stiff smiles. We observe quietly, capturing raw laughter, tears, and glances as they happen.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 12C4 12 7 5 12 5C17 5 20 12 20 12C20 12 17 19 12 19C7 19 4 12 4 12Z" />
      </svg>
    ),
  },
  {
    title: 'Proprietary Color Science',
    desc: 'Every image is individually graded to preserve natural South Indian skin tones, luminous fabrics, and filmic shadow detail.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      </svg>
    ),
  },
  {
    title: 'Fail-Safe Redundancy',
    desc: 'Dual-card in-camera backup, dual primary camera bodies on site, and automated triple-location cloud archiving so your memories are 100% secure.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'Calm, Effortless Guidance',
    desc: 'Most people feel awkward in front of a camera. We bring a relaxed, warm energy and subtle prompts that bring out your natural self.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-panel py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Jebaraj Standard"
          title="Why clients across South India trust our lens."
          subtitle="A disciplined blend of documentary intuition, cutting-edge equipment, and client-first hospitality."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="h-full p-8 rounded-md bg-panel2 border border-line-light hover:border-blue/50 transition-all duration-300 flex flex-col justify-between group shadow-card">
                <div>
                  <div className="w-12 h-12 rounded bg-ink border border-line flex items-center justify-center text-blue group-hover:text-blue-glow group-hover:border-blue group-hover:shadow-glowSm transition-all mb-6">
                    {f.icon}
                  </div>
                  <h3 className="font-display font-bold uppercase tracking-wider text-base text-white group-hover:text-blue-glow transition-colors mb-3">
                    {f.title}
                  </h3>
                  <p className="text-sm text-fog leading-relaxed font-light">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-line flex items-center gap-2 text-[0.68rem] font-mono tracking-widest text-silver/60 uppercase">
                  <span>PILLAR 0{i + 1}</span>
                  <span className="w-8 h-px bg-line group-hover:bg-blue transition-colors" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

