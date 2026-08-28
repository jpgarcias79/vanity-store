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
    { k: 'Taller', v: config.address },
    { k: 'Horario', v: config.hours },
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