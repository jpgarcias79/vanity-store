'use client'

import { useEffect, useState } from 'react'
import { useCart } from './CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { cartCount, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${scrolled || menuOpen ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="wrap">
        <a href="#top" className="logo-lockup" onClick={() => setMenuOpen(false)}>
          <span className="logo-word">Vanityshop</span>
          <span className="logo-sub">STORE</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#compromiso" onClick={() => setMenuOpen(false)}>Compromiso</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </div>

        <div className="nav-right">
          <button className="cart-btn" onClick={() => setIsOpen(true)} aria-label="Abrir carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M6 7h12l1.5 13h-15L6 7z" />
              <path d="M9 7a3 3 0 0 1 6 0" />
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  )
}