import './globals.css'
import { CartProvider } from '@/components/CartContext'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export const metadata = {
  title: 'VANITYSHOP — Prendas con carácter, hechas para quedarse',
  description: 'Cápsulas de moda diseñadas en pequeños lotes, con materiales trazables y un ajuste que no pasa de moda.',
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
        <CartProvider>{children}</CartProvider>
        <WhatsAppFloat />
      </body>
    </html>
  )
}