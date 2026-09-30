import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Reveal from '../components/common/Reveal'
import { blogPosts } from '../data/blog'

export default function Blog() {
  return (
    <Layout>
      <section className="pt-36 pb-24 md:pt-44 container-x">
        <Reveal className="mb-14 max-w-2xl">
          <p className="eyebrow mb-3">Field Notes &amp; Guides</p>
          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl mb-4">
            Notes from behind the camera.
          </h1>
          <p className="text-silver text-base sm:text-lg font-light">
            Insights on natural lighting, venue planning in Kallidaikurichi, gear breakdowns, and wedding photography secrets.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
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
                      <span className="text-[0.65rem] font-mono tracking-widest uppercase text-blue-glow px-2.5 py-0.5 rounded bg-ink/90 border border-blue/30">
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
                    {post.date} · By Jebaraj Alex Robin
                  </p>

                  <h2 className="font-display font-bold text-xl text-white group-hover:text-blue-glow transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>

                  <p className="text-sm text-fog leading-relaxed font-light mb-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center gap-2 text-xs font-medium text-white group-hover:text-blue-glow transition-colors">
                  <span>Read Complete Guide</span>
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Layout>
  )
}
