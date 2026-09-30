import { Service } from '../types'

export const services: Service[] = [
  {
    slug: 'weddings',
    title: 'Weddings & Celebrations',
    category: 'Weddings',
    description:
      'Candid rituals, quiet glances, and grand celebrations documented as they happen without awkward staged poses.',
    fullDescription:
      'We believe wedding photography should feel like an heirloom documentary. From intimate morning blessings to vibrant sangeet dance floors and the quiet emotion of the vows, we preserve the unscripted magic of your day.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹85,000',
    features: [
      'Pre-wedding consultation & timeline planning',
      'Candid documentary coverage',
      'Cinematic couple creative session',
      'Artisanal handcrafted flush-mount album',
    ],
  },
  {
    slug: 'sports',
    title: 'Sports & High Action',
    category: 'Sports',
    description:
      'Peak athletic intensity, explosive agility, and decisive championship moments captured at 1/2000s.',
    fullDescription:
      'Fast-paced games demand instinct and precision. With high-speed burst equipment and sports-tested positioning, we capture the raw grit, sweat, and glory on the pitch, court, and track.',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹45,000',
    features: [
      'High-speed continuous tracking',
      'Field-side access coordination',
      'Same-day express press & social media delivery',
      'Commercial sports licensing',
    ],
  },
  {
    slug: 'events',
    title: 'Concerts & Gala Events',
    category: 'Events',
    description:
      'The electric atmosphere, stage lighting, and audience euphoria preserved frame by frame from empty floor to finale.',
    fullDescription:
      'Whether a high-energy music festival, an upscale brand gala, or an exclusive cultural summit, we capture both the grand ambiance and key speakers in their best light.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹40,000',
    features: [
      'Low-light prime optics for neon/stage environments',
      'VIP & keynote speaker closeups',
      'Atmospheric wide venue documentation',
      'Fast turnaround for PR and press release',
    ],
  },
  {
    slug: 'portraits',
    title: 'Editorial & Studio Portraits',
    category: 'Portraits',
    description:
      'Personal, expressive, and cinematic portraits sculpted with intentional lighting to reveal genuine character.',
    fullDescription:
      'No stiff expressions or generic backgrounds. We design every portrait session around your personal aesthetic, whether that calls for golden beach light along the East Coast Road or dramatic chiaroscuro studio lighting.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹25,000',
    features: [
      'Creative moodboard & wardrobe guidance',
      'Choice of natural outdoor light or studio strobes',
      'Magazine-quality skin retouching',
      'High-resolution digital master files',
    ],
  },
  {
    slug: 'private-shoots',
    title: 'Private & Destination Shoots',
    category: 'Private',
    description:
      'Custom travel commissions, intimate family milestones, and anniversary sessions shot at your chosen sanctuary.',
    fullDescription:
      'Have an exotic getaway or a deeply meaningful location? We travel with compact, cinema-grade gear to craft an exclusive, personalized photo narrative of your shared journey.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹55,000',
    features: [
      'Available across India and international destinations',
      'Bespoke travel itinerary shooting schedule',
      'Drone aerial landscape integration',
      'Private encrypted gallery delivery',
    ],
  },
  {
    slug: 'commercial',
    title: 'Commercial & Brand Campaigns',
    category: 'Commercial',
    description:
      'Compelling product, culinary, and lifestyle visuals crafted to stop the scroll and build brand desirability.',
    fullDescription:
      'Great products deserve visuals that command attention. We collaborate with art directors, fashion labels, and hospitality brands to deliver crisp commercial assets ready for billboards, lookbooks, and digital ads.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    startingPrice: '₹75,000',
    features: [
      'Tethered live monitor review during shoot',
      'Full product and model lighting styling',
      'Color accuracy calibration for print & digital',
      'Comprehensive commercial licensing',
    ],
  },
]
