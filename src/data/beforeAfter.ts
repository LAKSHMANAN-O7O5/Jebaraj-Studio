import { BeforeAfterComparison } from '../types'

export const beforeAfterItems: BeforeAfterComparison[] = [
  {
    id: 'ba-1',
    title: 'Cinematic Golden Hour Bridal Portrait',
    category: 'Weddings',
    description: 'Notice how the graded shot lifts the shadow detail in the silk zari embroidery, restores natural skin luminosity, and infuses rich warm amber tones without crushing highlights.',
    // Graded: vibrant warm rich color grade; Raw: desaturated neutral flat profile
    rawImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=60&w=1200&auto=format&fit=crop&sat=-40&con=-20',
    gradedImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=90&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ba-2',
    title: 'High-Energy Concert Laser Grading',
    category: 'Events',
    description: 'Dynamic range recovery separating saturated blue lasers from deep crowd silhouettes while preserving stage smoke textures.',
    rawImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=60&w=1200&auto=format&fit=crop&sat=-50&con=-30',
    gradedImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=90&w=1200&auto=format&fit=crop',
  },
]

