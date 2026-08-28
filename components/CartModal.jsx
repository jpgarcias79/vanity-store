'use client'

import { useState } from 'react'
import { useCart } from './CartContext'
import { config } from '@/lib/config'

export default function CartModal() {
  const { items, changeQty, removeFromCart, subtotal, isOpen, setIsOpen } = useCart()
  const [name, setName] = useState('')
  const [error, setError] = useState(false)

  const nameValid = name.trim().length >= 2

  const handleNameChange = (e) => {
    // Solo permite letras (incluye acentos y ñ) y espacios
    const cleaned = e.target.value.replace(/[^\p{L}\s]/gu, '')
    setName(cleaned)
    if (cleaned.trim().length >= 2) setError(false)
  }

  const handleCheckout = () => {
    if (items.length === 0) return

    if (!nameValid) {
      setError(true)
      return
    }

    setError(false)
    const message = encodeURIComponent(
      `Hola VANITYSHOP 👋 Soy ${name.trim()} y quiero finalizar este pedido:\n` +
        items.map((i) => `• ${i.name} x${i.qty} — $${i.price * i.qty}`).join('\n') +
        `\nSubtotal: $${subtotal}`
    )
    window.open(`https://wa.me/${config.whatsapp}?text=${message}`, '_blank')
  }

  return (
    <>
      <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)} />
      <aside className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-head">
          <h3>Tu carrito</h3>
          <button className="drawer-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <div className="drawer-body">
          {items.length === 0 ? (
            <p className="cart-empty">Tu carrito está vacío.</p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="ph-image">
                  <span className="ph-label">{item.name}</span>
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <span className="cart-item-price">${item.price * item.qty}</span>
                  <div className="qty-row">
                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}>−</button>
                    <span>{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(item.id, 1)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-foot">
          <div className="field">
            <label>Tu nombre *</label>
            <input
              type="text"
              value={name}
              placeholder="Escribe tu nombre"
              onChange={handleNameChange}
              style={error ? { borderColor: 'var(--crimson)' } : undefined}
            />
            {error && (
              <p
                className="cart-note"
                style={{ color: 'var(--crimson)', opacity: 1, textAlign: 'left', marginTop: 8 }}
              >
                Escribe tu nombre (solo letras, mínimo 2) para finalizar la compra.
              </p>
            )}
          </div>

          <div className="subtotal-row">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleCheckout}
            style={items.length === 0 ? { opacity: 0.5, pointerEvents: 'none' } : undefined}
          >
            Finalizar compra
          </button>
          <p className="cart-note">Al finalizar, tu pedido se envía por WhatsApp.</p>
        </div>
      </aside>
    </>
  )
}