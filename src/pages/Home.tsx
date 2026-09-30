import Layout from '../components/layout/Layout'
import HeroSection from '../components/sections/HeroSection'
import AboutPreview from '../components/sections/AboutPreview'
import ServicesGrid from '../components/sections/ServicesGrid'
import FeaturedStories from '../components/sections/FeaturedStories'
import FloatingGallery from '../components/sections/FloatingGallery'
import BeforeAfterSection from '../components/sections/BeforeAfterSection'
import PortfolioGrid from '../components/sections/PortfolioGrid'
import PricingPackages from '../components/sections/PricingPackages'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import InstagramShowcase from '../components/sections/InstagramShowcase'

import BookingSection from '../components/sections/BookingSection'
import SectionHeader from '../components/common/SectionHeader'

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutPreview />
      <ServicesGrid />
      <FeaturedStories />
      <FloatingGallery />
      <BeforeAfterSection />

      {/* Portfolio Quick Section */}
      <section className="bg-ink py-24 md:py-32 border-t border-line">
        <div className="container-x">
          <SectionHeader
            eyebrow="The Portfolio"
            title="A closer look through our lens."
            subtitle="Explore real weddings, sports competitions, portraits, and commercial campaigns."
            actionLink={{ to: '/portfolio', label: 'View Complete Gallery' }}
          />
          <PortfolioGrid limit={6} />
        </div>
      </section>

      <PricingPackages />
      <TestimonialsSection />
      <InstagramShowcase />

      <BookingSection />
    </Layout>
  )
}
