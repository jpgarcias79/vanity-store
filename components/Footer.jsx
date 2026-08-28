'use client'

import { useState } from 'react'

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <span className="logo-lockup">
              <span className="logo-word">Vanityshop</span>
              <span className="logo-sub">STORE</span>
            </span>
            <p>Prendas con carácter, hechas para quedarse. Diseño y producción responsable desde el taller hasta tu armario.</p>
          </div>

          <div className="footer-col">
            <h4>Tienda</h4>
            <a href="#catalogo">Mujer</a>
            <a href="#catalogo">Hombre</a>
            <a href="#catalogo">Accesorios</a>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <a href="#compromiso">Nuestro compromiso</a>
            <a href="#contacto">Contacto</a>
          </div>

          <div className="footer-col">
            <h4>Newsletter</h4>
            <p>Novedades y lanzamientos, sin spam.</p>
            {subscribed ? (
              <p style={{ opacity: 1, color: 'var(--rose)' }}>¡Gracias por unirte! ✓</p>
            ) : (
              <form
                className="newsletter"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubscribed(true)
                }}
              >
                <input type="email" placeholder="Tu correo" required />
                <button type="submit">Unirme</button>
              </form>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VANITYSHOP. Todos los derechos reservados.</span>
          <span>Instagram · Pinterest · TikTok</span>
        </div>
      </div>
    </footer>
  )
}