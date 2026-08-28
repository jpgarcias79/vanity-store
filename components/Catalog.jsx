'use client'

import { useEffect, useState } from 'react'
import { products, categories } from '@/lib/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function Catalog() {
  const [active, setActive] = useState('Todo')
  const filtered = active === 'Todo' ? products : products.filter((p) => p.category === active)

  useEffect(() => {
    const handler = (e) => {
      const id = e.detail
      const product = products.find((p) => p.id === id)
      if (!product) return
      setActive(product.category)
      setTimeout(() => {
        const el = document.getElementById(`producto-${id}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' })
          el.classList.add('spotlight')
          setTimeout(() => el.classList.remove('spotlight'), 2600)
        }
      }, 200)
    }
    window.addEventListener('spotlight-product', handler)
    return () => window.removeEventListener('spotlight-product', handler)
  }, [])

  return (
    <section className="catalog" id="catalogo">
      <div className="wrap">
        <Reveal className="section-head">
          <div>
            <span className="eyebrow">Catálogo en línea</span>
            <h2>Piezas pensadas para vivir en tu armario, no en tu basurero.</h2>
          </div>
          <p>Filtra por categoría y añade directamente al carrito. Catálogo completo, listo para vender.</p>
        </Reveal>

        <div className="filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}