import { config } from '@/lib/config'

const posts = [
  { src: '/images/hero-2.jpg', likes: 342, caption: 'Drop vino · edición limitada' },
  { src: '/images/hero-1.jpg', likes: 518, caption: 'La banda de la casa' },
  { src: '/images/hero-3.jpg', likes: 611, caption: 'Perlas para el rey' },
]

export default function InstagramFeed() {
  const url = `https://instagram.com/${config.instagram}`

  return (
    <section className="insta" id="instagram">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Instagram</span>
            <h2>El día a día de la marca.</h2>
          </div>
          <a className="btn btn-ghost" href={url} target="_blank" rel="noreferrer">
            Seguir a @{config.instagram}
          </a>
        </div>

        <div className="insta-grid">
          {posts.map((p) => (
            <a key={p.src} className="insta-card" href={url} target="_blank" rel="noreferrer">
              <img src={p.src} alt={p.caption} />
              <span className="insta-overlay">
                <svg viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {p.likes}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}