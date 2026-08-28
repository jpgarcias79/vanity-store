import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import Catalog from '@/components/Catalog'
import InstagramFeed from '@/components/InstagramFeed'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CartModal from '@/components/CartModal'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Catalog />
      <Contact />
      <Footer />
      <CartModal />
    </main>
  )
}