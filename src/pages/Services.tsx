import Layout from '../components/layout/Layout'
import ServicesGrid from '../components/sections/ServicesGrid'
import PricingPackages from '../components/sections/PricingPackages'
import BookingSection from '../components/sections/BookingSection'
import Reveal from '../components/common/Reveal'

export default function ServicesPage() {
  return (
    <Layout>
      <section className="pt-36 pb-12 md:pt-44 container-x">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-3">Disciplines &amp; Investment</p>
          <h1 className="heading-xl text-4xl sm:text-5xl md:text-6xl mb-4">
            Services tailored to your milestone.
          </h1>
          <p className="text-silver text-base sm:text-lg font-light">
            Transparent investment, clear deliverables, and unwavering commitment to cinematic quality.
          </p>
        </Reveal>
      </section>

      <ServicesGrid />
      <PricingPackages />
      <BookingSection />
    </Layout>
  )
}
