'use client'
import { track } from '@/lib/analytics'
import { useEffect, useRef, useState } from 'react'
import { useCart } from './CartContext'

const chips = ['Busco un regalo especial', 'Algo para la playa', 'Para mi mascota', 'Para mi hogar']

export default function ChatBot() {
  const { addToCart } = useCart()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'bot', text: '¡Hola! 👋 Soy el asistente de VANITYSHOP. Cuéntame qué buscas y te recomiendo las piezas perfectas.' },
  ])
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [messages, loading])

  const send = async (text) => {
    const clean = text.trim()
    if (!clean || loading) return
    setInput('')
    setMessages((m) => [...m, { role: 'user', text: clean }])
    setLoading(true)
    try {
      const res = await fetch('/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: clean }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'bot', text: data.reply, picks: data.picks, engine: data.engine }])
    } catch {
      setMessages((m) => [...m, { role: 'bot', text: 'Ups, tuve un tropiezo 💫 Intenta de nuevo.' }])
    }
    setLoading(false)
  }

  const goToProduct = (p) => {
    setOpen(false)track('chat_spotlight', { item: p.name })
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('spotlight-product', { detail: p.id }))
    }, 150)
  }

  return (
    <>
      <button className="chat-float" onClick={() => setOpen(!open)} aria-label="Abrir asistente">
        <span className="chat-pulse" />
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm6 5H7v-2h6v2z" /></svg>
        )}
      </button>

      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <span className="chat-dot" />
            <div>
              <strong>Asistente VANITYSHOP</strong>
              <span className="chat-sub">Recomendaciones al instante</span>
            </div>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {m.text}
                {m.engine && (
                  <span className="engine">{m.engine === 'ia' ? '✨ IA generativa' : '✨ asistente'}</span>
                )}
                {m.picks?.map((p) => (
                  <div className="pick" key={p.id}>
                    <div>
                      <button className="pick-name" onClick={() => goToProduct(p)}>
                        {p.name} ↗
                      </button>
                      <span className="price">${p.price}</span>
                    </div>
                    <button onClick={() => addToCart(p)}>Añadir</button>
                  </div>
                ))}
              </div>
            ))}
            {loading && <div className="msg bot">Escribiendo…</div>}
          </div>

          <div className="chips">
            {chips.map((c) => (
              <button key={c} className="chip" onClick={() => send(c)}>{c}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send(input) }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ej: busco un regalo para mi mamá"
            />
            <button type="submit" aria-label="Enviar">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z" /></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}