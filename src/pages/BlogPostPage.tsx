import { Link, useParams } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Reveal from '../components/common/Reveal'
import { blogPosts } from '../data/blog'
import NotFound from './NotFound'

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) return <NotFound />

  return (
    <Layout>
      <article className="pt-36 pb-24 md:pt-44 container-x max-w-3xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-glow px-2.5 py-0.5 rounded bg-blue/20 border border-blue/40">
              {post.category}
            </span>
            <span className="text-xs text-fog font-mono">
              {post.date} · {post.readTime || '5 min read'}
            </span>
          </div>

          <h1 className="heading-xl text-3xl sm:text-4xl md:text-5xl mb-6">
            {post.title}
          </h1>

          <p className="text-silver text-lg font-light leading-relaxed mb-8">
            {post.excerpt}
          </p>
        </Reveal>

        {/* Featured Image */}
        <Reveal delay={60} className="relative aspect-[16/9] rounded-md overflow-hidden border border-line-light shadow-card mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="vf-corner-tl" />
          <div className="vf-corner-tr" />
          <div className="vf-corner-bl" />
          <div className="vf-corner-br" />
        </Reveal>

        {/* Article Body */}
        <Reveal delay={100} className="space-y-6 text-silver leading-relaxed font-light text-base md:text-lg">
          {post.content ? (
            post.content.map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))
          ) : (
            <p>{post.excerpt}</p>
          )}
        </Reveal>

        {/* Author Box */}
        <Reveal delay={140} className="mt-14 p-6 sm:p-8 rounded-lg bg-panel border border-line flex flex-col sm:flex-row items-center gap-6">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
            alt="Jebaraj Alex Robin — Lead Photographer"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue shadow-glowSm flex-shrink-0"
          />
          <div>
            <p className="font-display font-bold text-lg text-white">Jebaraj Alex Robin</p>
            <p className="text-xs text-blue-glow font-mono mb-2">Lead Photographer &amp; Director · Jebaraj Studio</p>
            <p className="text-xs text-fog leading-relaxed">
              Kallidaikurichi-based visual storyteller with 12+ years of experience across South Indian weddings, athletic championships, and commercial fashion.
            </p>
          </div>
        </Reveal>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-line flex items-center justify-between">
          <Link
            to="/blog"
            className="text-sm font-mono uppercase tracking-wider text-fog hover:text-white transition-colors"
          >
            ← Back to All Articles
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-blue text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded shadow-glowSm hover:bg-blue-accent transition-all"
          >
            Book a Shoot →
          </Link>
        </div>
      </article>
    </Layout>
  )
}
