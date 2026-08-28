import './globals.css'
import { CartProvider } from '@/components/CartContext'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import ChatBot from '@/components/ChatBot'
import Script from 'next/script'

export const metadata = {
  metadataBase: new URL('https://vanity-store.vercel.app'),
  title: 'VANITYSHOP — Prendas con carácter, hechas para quedarse',
  description:
    'Cápsulas de moda diseñadas en pequeños lotes, con materiales trazables y un ajuste que no pasa de moda.',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://vanity-store.vercel.app',
    siteName: 'VANITYSHOP',
    title: 'VANITYSHOP — Viste lo que perdura',
    description:
      'Moda consciente en pequeños lotes, materiales trazables y devoluciones sin preguntas. Confianza cosida en cada prenda.',
    images: [
      {
        url: '/images/hero-1.jpg',
        width: 1456,
        height: 816,
        alt: 'VanityShop — Colección 2026',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VANITYSHOP — Viste lo que perdura',
    description: 'Moda consciente en pequeños lotes y materiales trazables.',
    images: ['/images/hero-1.jpg'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,700;1,800&family=Fraunces:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>{children}<ChatBot /></CartProvider>
        <WhatsAppFloat />
      </body>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-WV87LJQQXW" strategy="afterInteractive" />
<Script id="ga4-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-WV87LJQQXW');
  `}
</Script>
    </html>
  )
}