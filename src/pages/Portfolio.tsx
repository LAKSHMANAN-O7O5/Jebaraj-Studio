import Layout from '../components/layout/Layout'
import PortfolioGrid from '../components/sections/PortfolioGrid'
import Reveal from '../components/common/Reveal'
import BookingSection from '../components/sections/BookingSection'

export default function Portfolio() {
  return (
    <Layout>
      <section className="pt-36 pb-20 md:pt-44 container-x">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Portfolio Archives</p>
          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl mb-4">
            Every story, captured in full fidelity.
          </h1>
          <p className="text-silver text-base sm:text-lg font-light">
            Filter through our weddings, sports events, editorial portraits, and commercial assignments. Click any image to launch the high-resolution lightbox.
          </p>
        </Reveal>

        <PortfolioGrid />
      </section>

      <BookingSection />
    </Layout>
  )
}
