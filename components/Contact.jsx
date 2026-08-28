'use client'

import { useState } from 'react'
import { config } from '@/lib/config'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  const rows = [
    { k: 'Correo', v: config.email },
    { k: 'Teléfono', v: config.phone },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const message = encodeURIComponent(
      `Hola VANITYSHOP 👋\n\nNombre: ${name}\nCorreo: ${email}\nMensaje: ${text}`
    )
    window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="contact" id="contacto">
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-info">
            <span className="eyebrow">Contacto</span>
            <h2>Hablemos.</h2>
            <p className="lede">
              ¿Dudas sobre una prenda, un pedido o una colaboración? Escríbenos, respondemos en menos de 24 horas.
            </p>

            {rows.map((r) => (
              <div className="info-row" key={r.k}>
                <span className="k">{r.k}</span>
                <span className="v">{r.v}</span>
              </div>
            ))}

            <div className="info-row">
              <span className="k">Instagram</span>
              <a
                className="v insta-link"
                href={`https://instagram.com/${config.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
                </svg>
                @{config.instagram}
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label>Correo electrónico</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label>Mensaje</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              {sent ? 'Abriendo WhatsApp… ✓' : 'Enviar mensaje'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}