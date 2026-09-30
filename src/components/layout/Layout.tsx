import { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileContactBar from './MobileContactBar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-ink text-white selection:bg-blue selection:text-white">
      <Navbar />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileContactBar />
    </div>
  )
}

