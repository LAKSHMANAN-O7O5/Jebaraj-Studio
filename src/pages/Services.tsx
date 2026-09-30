import Layout from '../components/layout/Layout'
import ServicesGrid from '../components/sections/ServicesGrid'
import PricingPackages from '../components/sections/PricingPackages'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import BookingSection from '../components/sections/BookingSection'
import Reveal from '../components/common/Reveal'
import SectionHeader from '../components/common/SectionHeader'

const faqs = [
  {
    q: 'How far in advance should we book our wedding date?',
    a: 'Peak wedding dates between October and March often book out 6 to 9 months in advance. We recommend checking availability as soon as your muhurtham or venue is finalized.',
  },
  {
    q: 'What is your turnaround time for the final photographs?',
    a: 'We deliver an express curated preview gallery of 20 to 30 highlight frames within 48 to 72 hours for your social media. The complete, color-graded gallery and flush-mount album design are delivered within 4 weeks.',
  },
  {
    q: 'Do you travel outside Kallidaikurichi for destination weddings or shoots?',
    a: 'Yes! While based in Kallidaikurichi, we frequently travel across Bangalore, Hyderabad, Kerala, Goa, and international destinations. Client covers economy airfare and local accommodation.',
  },
  {
    q: 'Do you provide raw unedited files?',
    a: 'We shoot in uncompressed RAW, but deliver high-resolution, color-graded JPEG masters. RAW files are unfinished digital negatives; our artistry is defined by our proprietary color grading and signature finish.',
  },
]

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
      <WhyChooseUs />

      {/* FAQ Section */}
      <section className="bg-ink py-24 md:py-32 border-t border-line">
        <div className="container-x max-w-4xl">
          <SectionHeader
            eyebrow="Frequently Asked Questions"
            title="Everything you need to know before booking."
            align="center"
          />

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 60}>
                <div className="p-7 rounded-md bg-panel border border-line-light">
                  <h3 className="font-display font-bold text-lg text-white mb-2">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-fog leading-relaxed font-light">
                    {faq.a}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BookingSection />
    </Layout>
  )
}
