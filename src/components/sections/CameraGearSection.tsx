import { gearItems } from '../../data/gear'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function CameraGearSection() {
  return (
    <section className="bg-ink py-24 md:py-32 border-t border-line relative overflow-hidden">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Arsenal"
          title="What's in our camera bag."
          subtitle="Precision instruments engineered to capture split-second emotion in challenging light."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gearItems.map((item, i) => (
            <Reveal key={item.id} delay={i * 60}>
              <div className="h-full p-6 rounded-md bg-panel border border-line-light hover:border-blue/50 transition-all shadow-card flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.68rem] font-mono tracking-widest uppercase text-blue-glow px-2.5 py-0.5 rounded bg-blue/10 border border-blue/30">
                      {item.category}
                    </span>
                    <span className="text-xs text-fog font-mono">PRO-GRADE</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-glow transition-colors mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-fog leading-relaxed mb-5 font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-line">
                  <p className="font-mono text-[0.7rem] text-silver/80 tracking-wide">
                    {item.specs}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

