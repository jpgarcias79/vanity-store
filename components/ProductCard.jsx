'use client'

import { useCart } from './CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <div className="product-media">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="ph-image">
            <svg className="ph-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.6" />
              <path d="M3 17l5-4 3 2 5-4 5 4" />
            </svg>
            <span className="ph-label">Foto — {product.name}</span>
          </div>
        )}
        <span className="tag">${product.price}</span>
        <button className="quick-add" onClick={() => addToCart(product)}>
          Añadir al carrito
        </button>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <span className="product-cat">{product.category}</span>
        </div>
      </div>
    </article>
  )
}