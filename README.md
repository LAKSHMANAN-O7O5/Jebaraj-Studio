# Alex Robin Photography (FrameIt Studio) — Official Website

A high-performance, cinematic React 18 + TypeScript + Tailwind CSS website designed for **Alex Robin Photography (FrameIt Studio)** based in Chennai, Tamil Nadu.

Specializing in Weddings, Sports, Events, Portraits, Private Shoots, and Commercial Campaigns.

---

## 🎨 Design System: Blue, Black & White Luxury Theme

The visual design is built with a high-contrast cinematic palette tailored for photography:
- **Canvas / Midnight Blacks**: `#050608` (Ink), `#0D0F15` (Panel Surface), `#141722` (Card Elevation), `#222738` (Precision Borders).
- **Crisp Whites**: `#FFFFFF` (Headings & High-Contrast Accents), `#E2E8F0` (Silver Body Typography), `#94A3B8` (Subtle Metadata & EXIF Tags).
- **Electric Sapphire Blues**: `#2563EB` (Primary Brand Blue), `#38BDF8` (Sky Glow & Focus Marks), `#0066FF` (Electric Highlights), with custom neon glow shadows (`shadow-glow`, `shadow-glowSm`, `shadow-glowCyan`).
- **Cinematic Photography Details**: Camera viewfinder corner marks (`[ + ]`), glassmorphic panels, and smooth scroll reveals.

---

## 🏗️ Architecture & Code Separation

The codebase is organized with strict separation of concerns:

```
src/
├── config/
│   └── siteConfig.ts              # Centralized client info (Alex Robin, phone, email, WhatsApp, address, stats)
├── types/
│   └── index.ts                   # Strongly-typed models (Projects, Services, Packages, Gear, Reviews, Blog)
├── data/
│   ├── projects.ts                # Portfolio assignments with high-res photos & camera EXIF data
│   ├── services.ts                # Photography disciplines and starting investments
│   ├── packages.ts                # Transparent pricing tiers with deliverables
│   ├── gear.ts                    # "In My Bag" camera equipment & technical credentials
│   ├── testimonials.ts            # Client reviews with couple avatars & locations
│   ├── beforeAfter.ts             # Comparison data for color grading slider
│   └── blog.ts                    # Field journal articles with full guides
├── hooks/
│   └── useReveal.ts               # IntersectionObserver scroll animation hook
├── components/
│   ├── common/                    # Reusable Atomic UI Primitives
│   │   ├── Img.tsx                # Image loader with skeleton pulse & fallback
│   │   ├── LightboxModal.tsx      # Fullscreen photo modal (Esc, Arrow keys, EXIF badges)
│   │   ├── BeforeAfterSlider.tsx  # Touch/drag RAW vs. Graded split slider
│   │   ├── SectionHeader.tsx      # Typography & camera viewfinder styling
│   │   ├── Reveal.tsx             # Scroll animation container
│   │   └── ScrollToTop.tsx        # Route transition scroll reset
│   ├── layout/                    # Layout Shell
│   │   ├── Navbar.tsx             # Glassmorphism header with active pills & WhatsApp quick button
│   │   ├── Footer.tsx             # 5-column footer linking directly to siteConfig
│   │   ├── MobileContactBar.tsx   # Fixed bottom action bar (Call, WhatsApp, Book)
│   │   └── Layout.tsx             # Shell wrapper
│   └── sections/                  # Modular Page Sections
│       ├── HeroSection.tsx        # Cinematic full-bleed visual hero
│       ├── AboutPreview.tsx       # Bio, pillars & signature
│       ├── ServicesGrid.tsx       # Photography discipline cards
│       ├── FeaturedStories.tsx    # Editorial magazine-style story cards
│       ├── BeforeAfterSection.tsx # Interactive RAW vs. Graded color science showcase
│       ├── PortfolioGrid.tsx      # Filterable masonry gallery with Lightbox trigger
│       ├── WhyChooseUs.tsx        # 4 core pillars
│       ├── CameraGearSection.tsx  # Equipment credibility
│       ├── PricingPackages.tsx    # Transparent investment tiers
│       ├── TestimonialsSection.tsx# Verified client review carousel
│       ├── InstagramShowcase.tsx  # Social grid preview
│       ├── JournalSection.tsx     # Latest articles preview
│       └── BookingSection.tsx     # Interactive inquiry form & WhatsApp integration
└── pages/
    ├── Home.tsx                   # Comprehensive studio landing page
    ├── About.tsx                  # Alex Robin biography, awards & gear
    ├── Portfolio.tsx              # Full filterable gallery with Lightbox
    ├── ProjectDetails.tsx         # In-depth story pages with EXIF metadata
    ├── Services.tsx               # Service offerings, packages & FAQs
    ├── Blog.tsx                   # Complete journal archives
    ├── BlogPostPage.tsx           # Full reading experience with author box
    ├── Contact.tsx                # Booking wizard, studio HQ & directions
    └── NotFound.tsx               # 404 error frame
```

---

## 🚀 Running the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open the local URL (usually `http://localhost:5173`).

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## ⚙️ Updating Client Information

To change contact phone numbers, WhatsApp, email, studio address, or social media links across the entire website, simply edit:
👉 `src/config/siteConfig.ts`
All components (Navbar, Footer, Mobile Bar, Hero, Contact, Booking) update instantly.
