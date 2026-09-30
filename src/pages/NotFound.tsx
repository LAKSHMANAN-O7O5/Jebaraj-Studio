import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

export default function NotFound() {
  return (
    <Layout>
      <section className="pt-48 pb-36 container-x text-center max-w-2xl">
        <div className="w-20 h-20 rounded-full bg-panel2 border border-line flex items-center justify-center mx-auto mb-6 text-blue-glow shadow-glow">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <p className="eyebrow justify-center mb-4">Error 404</p>
        <h1 className="heading-xl text-4xl md:text-5xl mb-4">This frame doesn't exist.</h1>
        <p className="text-silver text-base font-light mb-8 max-w-md mx-auto">
          The photograph or page you are searching for has moved or does not exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue text-white text-xs font-bold uppercase tracking-wider px-7 py-4 rounded shadow-glow hover:bg-blue-accent transition-all"
        >
          Return to Studio Home <span aria-hidden>→</span>
        </Link>
      </section>
    </Layout>
  )
}
