export type PhotographyCategory =
  | 'Weddings'
  | 'Sports'
  | 'Events'
  | 'Portraits'
  | 'Commercial'

export interface CameraExif {
  camera?: string
  lens?: string
  focalLength?: string
  aperture?: string
  shutterSpeed?: string
  iso?: string
}

export interface GalleryImage {
  src: string
  alt: string
  aspect: 'portrait' | 'landscape' | 'square'
  caption?: string
  exif?: CameraExif
}

export interface Project {
  slug: string
  title: string
  category: PhotographyCategory
  location: string
  date?: string
  coverImage: string
  intro: string
  client?: string
  deliverables?: string
  gallery: GalleryImage[]
}

export interface Service {
  slug: string
  title: string
  category: PhotographyCategory
  description: string
  fullDescription?: string
  image: string
  features?: string[]
  startingPrice?: string
}

export interface Testimonial {
  id: string
  quote: string
  name: string
  role?: string
  location?: string
  category: PhotographyCategory
  rating: number
  avatar?: string
  projectSlug?: string
}

export interface BlogPost {
  slug: string
  title: string
  category: string
  date: string
  readTime?: string
  excerpt: string
  content?: string[]
  image: string
}

export interface PackageItem {
  id: string
  name: string
  category: PhotographyCategory | 'All'
  tagline: string
  isPopular?: boolean
  deliverables: string[]
}

export interface BeforeAfterComparison {
  id: string
  title: string
  category: PhotographyCategory
  description: string
  rawImage: string
  gradedImage: string
}
