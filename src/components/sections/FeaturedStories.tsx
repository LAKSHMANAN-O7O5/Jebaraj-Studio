import { Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function FeaturedStories() {
  return (
    <section className="bg-ink py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="Featured Assignments"
          title="Documentary stories told in full."
          subtitle="A selection of recent commissions exploring love, adrenaline, and design."
          actionLink={{ to: '/portfolio', label: 'View All Projects' }}
        />

        <div className="grid md:grid-cols-12 gap-5">
          {/* Main Large Feature */}
          <Reveal className="md:col-span-8 md:row-span-2">
            <StoryCard project={projects[0]} aspect="aspect-[4/5] md:aspect-[16/11]" large />
          </Reveal>

          {/* Secondary Features */}
          <Reveal delay={80} className="md:col-span-4">
            <StoryCard project={projects[1]} aspect="aspect-[4/3] md:aspect-[1/1]" />
          </Reveal>

          <Reveal delay={120} className="md:col-span-4">
            <StoryCard project={projects[2]} aspect="aspect-[4/3] md:aspect-[1/1]" />
          </Reveal>

          {/* Wide Feature */}
          {projects[3] && (
            <Reveal delay={160} className="md:col-span-12">
              <StoryCard project={projects[3]} aspect="aspect-[16/9] md:aspect-[24/9]" wide />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function StoryCard({
  project,
  aspect,
  large = false,
  wide = false,
}: {
  project: (typeof projects)[number]
  aspect: string
  large?: boolean
  wide?: boolean
}) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group relative block ${aspect} rounded-md overflow-hidden bg-panel border border-line-light shadow-card`}
    >
      <img
        src={project.coverImage}
        alt={`${project.title} — ${project.category}`}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-transparent" />
      <div className="absolute inset-0 border border-transparent group-hover:border-blue/60 transition-colors" />

      {/* Viewfinder frame corners on hover */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="vf-corner-tl" />
        <div className="vf-corner-tr" />
        <div className="vf-corner-bl" />
        <div className="vf-corner-br" />
      </div>

      {/* Story Overlay Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[0.68rem] font-mono tracking-widest uppercase text-blue-glow px-2.5 py-0.5 rounded bg-blue/20 border border-blue/40">
              {project.category}
            </span>
            <span className="text-xs text-fog font-mono">
              {project.location}
            </span>
          </div>

          <h3
            className={`font-display font-bold uppercase tracking-tight text-white group-hover:text-blue-glow transition-colors ${
              large ? 'text-2xl sm:text-3xl md:text-4xl' : wide ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
          >
            {project.title}
          </h3>

          <p className="hidden md:block mt-2 text-xs text-silver/80 line-clamp-2 font-light">
            {project.intro}
          </p>
        </div>

        <span className="hidden sm:flex w-10 h-10 rounded-full bg-ink/80 border border-line flex-shrink-0 items-center justify-center text-white group-hover:border-blue group-hover:text-blue group-hover:translate-x-1 transition-all">
          →
        </span>
      </div>
    </Link>
  )
}

