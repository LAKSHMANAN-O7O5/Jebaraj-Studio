import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import Reveal from '../common/Reveal'
import SectionHeader from '../common/SectionHeader'

export default function JournalSection() {
  return (
    <section className="bg-ink py-24 md:py-32 border-t border-line relative">
      <div className="container-x">
        <SectionHeader
          eyebrow="The Field Journal"
          title="Notes from behind the camera."
          subtitle="Lighting guides, venue secrets, and technical breakdowns from our recent shoots."
          actionLink={{ to: '/blog', label: 'Explore All Articles' }}
        />

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 80}>
              <Link to={`/blog/${post.slug}`} className="group block h-full flex flex-col justify-between">
                <div>
                  <div className="aspect-[16/10] rounded-md overflow-hidden mb-5 border border-line-light bg-panel relative shadow-card">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60" />

                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span className="text-[0.65rem] font-mono tracking-widest uppercase text-blue-glow px-2 py-0.5 rounded bg-ink/90 border border-blue/30">
                        {post.category}
                      </span>
                      {post.readTime && (
                        <span className="text-[0.65rem] font-mono text-silver px-2 py-0.5 rounded bg-ink/70">
                          {post.readTime}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs font-mono text-fog uppercase tracking-wider mb-2">
                    {post.date}
                  </p>

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-blue-glow transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm text-fog leading-relaxed font-light line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-blue-glow transition-colors">
                  <span>Read Article</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

