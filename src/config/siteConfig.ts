export const siteConfig = {
  brandName: 'Jebaraj Alex Robin Photography',
  studioName: 'Jebaraj Studio',
  shortName: 'Jebaraj',
  founder: 'Jebaraj Alex Robin',
  role: 'Lead Visual Storyteller & Director',
  tagline: 'Your Moments. Our Story.',
  subTagline: 'Cinematic photography that turns unscripted moments into timeless visual legacies.',
  location: 'Kallidaikurichi, Tamil Nadu, India',
  address: 'Kallidaikurichi, Tenkasi District, Tamil Nadu',
  phone: '+91 98400 54321',
  phoneClean: '919840054321',
  whatsapp: '+91 98400 54321',
  whatsappClean: '919840054321',
  email: 'jebaraj.studio@gmail.com',
  workingHours: 'Mon – Sat: 09:00 AM – 08:00 PM',
  socials: {
    instagram: 'https://instagram.com/jebarajstudio',
    instagramHandle: '@jebarajstudio',
    facebook: 'https://facebook.com/jebarajstudio',
    youtube: 'https://youtube.com/@jebarajstudio',
    behance: 'https://behance.net/jebarajstudio',
  },

  navLinks: [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/portfolio', label: 'Portfolio' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
  ],
  categories: [
    'Weddings',
    'Sports',
    'Events',
    'Portraits',
    'Commercial',
  ] as const,
}

export type SiteConfig = typeof siteConfig

