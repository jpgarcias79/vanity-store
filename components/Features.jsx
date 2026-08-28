import Reveal from './Reveal'

const features = [
  { num: '01', title: 'Materiales trazables', text: 'Documentamos el origen de cada fibra, del hilo a la prenda terminada.' },
  { num: '02', title: 'Lotes pequeños', text: 'Producimos lo que se va a vender. Sin excedentes, sin desperdicio textil.' },
  { num: '03', title: 'Pago 100% seguro', text: 'Cifrado de extremo a extremo en cada compra, sin excepciones.' },
  { num: '04', title: 'Devolución en 30 días', text: 'Pruébalo con calma. Si no encaja en tu vida, lo recogemos gratis.' },
]

export default function Features() {
  return (
    <section className="trust" id="compromiso">
      <div className="wrap trust-grid">
        {features.map((f) => (
          <Reveal key={f.num} className="trust-item">
            <span className="num">{f.num}</span>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}