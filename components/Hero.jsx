import Reveal from './Reveal'
import HeroSlider from './HeroSlider'

const phrases = ['Hecho para durar', 'Moda consciente', 'Envío en 24–48h', 'Devoluciones sin preguntas']
const half = [...phrases, ...phrases, ...phrases]

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <Reveal className="hero-copy">
          <span className="eyebrow">Colección 2026 · Producción responsable</span>
          <h1>
            Viste lo que <span className="accent">perdura.</span>
          </h1>
          <p className="lede">
            Cápsulas de moda diseñadas en pequeños lotes, con materiales trazables y un ajuste que no pasa de moda. Confianza cosida en cada prenda.
          </p>
          <div className="hero-cta">
            <a href="#catalogo" className="btn btn-primary">Ver la colección</a>
            <a href="#compromiso" className="btn btn-ghost">Nuestro compromiso</a>
          </div>
          <div className="hero-stats">
            <div><span className="num">12.400+</span><span className="lab">Clientas fieles</span></div>
            <div><span className="num">98%</span><span className="lab">Recompra</span></div>
            <div><span className="num">30d</span><span className="lab">Devolución libre</span></div>
          </div>
        </Reveal>

        <div className="hero-media">
          <HeroSlider />
          <div className="hero-badge">
            <strong>Materiales trazables</strong>
            Cada etiqueta cuenta el origen real de la prenda que llevas puesta.
          </div>
        </div>
      </div>

      <div className="ribbon-wrap">
        <div className="ribbon">
          <div className="marquee-track">
            {[0, 1].map((h) =>
              half.map((t, i) => (
                <span key={`${h}-${i}`}>{t}</span>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}