'use client'

import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [flash, setFlash] = useState(false)
  const { cartCount, setIsOpen } = useCart()
  const prevCount = useRef(cartCount)
  const hasItems = cartCount > 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setFlash(true)
      const t = setTimeout(() => setFlash(false), 1400)
      prevCount.current = cartCount
      return () => clearTimeout(t)
    }
    prevCount.current = cartCount
  }, [cartCount])

  return (
    <header className={`${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <nav className="wrap">
        <a href="#top" className="logo-lockup">
          <span className="logo-word">Vanityshop</span>
          <span className="logo-sub">STORE</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#compromiso" onClick={() => setMenuOpen(false)}>Compromiso</a>
          <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
        </div>

        <div className="nav-right">
          <div className="cart-wrap">
            <button
              className={`cart-btn ${hasItems ? 'active' : ''} ${flash ? 'flash' : ''}`}
              onClick={() => setIsOpen(true)}
              aria-label="Abrir carrito"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="20" r="1.6" />
                <circle cx="18" cy="20" r="1.6" />
                <path d="M2 3h3l2.5 12a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" />
              </svg>
              {hasItems && <span className="cart-count">{cartCount}</span>}
            </button>
            {hasItems && <span className="cart-toast">Aquí está tu compra</span>}
          </div>

          <button className="burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menú">
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  )
}