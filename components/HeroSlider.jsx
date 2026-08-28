'use client'

import { useEffect, useState } from 'react'

const slides = [
  { src: '/images/hero-1.jpg', alt: 'Mascota con pañuelo rojo de la colección' },
  { src: '/images/hero-2.jpg', alt: 'Modelo con vestido satinado color vino y joyería dorada' },
  { src: '/images/hero-3.jpg', alt: 'Bulldog con collar de perlas y dije dorado' },
]

const EASE = 'cubic-bezier(.22,.9,.32,1)'

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(74,17,30,0.18)',
        background: '#f7e4e1',
      }}
    >
      {slides.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'scale(1.03)' : 'scale(1.12)',
            transition: `opacity 1.2s ${EASE}, transform 6s ${EASE}`,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 110,
          background: 'linear-gradient(to top, rgba(42,15,22,0.45), transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ver imagen ${i + 1}`}
            style={{
              width: i === current ? 44 : 26,
              height: 3,
              borderRadius: 2,
              background: i === current ? '#fbf7f1' : 'rgba(251,247,241,0.45)',
              transition: `all .35s ${EASE}`,
            }}
          />
        ))}
      </div>
    </div>
  )
}