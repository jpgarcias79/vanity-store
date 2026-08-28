'use client'

import { createContext, useContext, useState, useRef } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const timer = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setToastVisible(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToastVisible(false), 2200)
  }

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      return [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} añadido al carrito`)
  }

  const changeQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const cartCount = items.reduce((s, i) => s + i.qty, 0)
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, changeQty, removeFromCart, cartCount, subtotal, isOpen, setIsOpen }}>
      {children}
      <div className={`toast ${toastVisible ? 'show' : ''}`}>{toast}</div>
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}