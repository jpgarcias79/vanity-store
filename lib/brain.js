import { products } from './products'

const synonyms = {
  playa: ['Trajes de Baño'], piscina: ['Trajes de Baño'], vacaciones: ['Trajes de Baño'],
  regalo: ['Joyería Oro', 'Joyería Plata'], mama: ['Joyería Oro'], madre: ['Joyería Oro'],
  novia: ['Joyería Oro'], aniversario: ['Joyería Oro'],
  oro: ['Joyería Oro'], anillo: ['Joyería Oro'], collar: ['Joyería Oro'],
  plata: ['Joyería Plata'], pendientes: ['Joyería Plata'], pulsera: ['Joyería Plata'],
  perro: ['Mascotas'], perra: ['Mascotas'], gato: ['Mascotas'], mascota: ['Mascotas'],
  casa: ['Hogar'], hogar: ['Hogar'], sofa: ['Hogar'], manta: ['Hogar'], cojin: ['Hogar'],
  bolso: ['Bolsos'], tote: ['Bolsos'], oficina: ['Bolsos'],
}

export function localBrain(text) {
  const t = text.toLowerCase()
  const cats = new Set()
  for (const [key, values] of Object.entries(synonyms)) {
    if (t.includes(key)) values.forEach((v) => cats.add(v))
  }

  let picks = products.filter((p) => cats.has(p.category))
  let reply

  if (picks.length === 0) {
    picks = products.slice(0, 3)
    reply = 'Mientras te conozco mejor, estas son las favoritas de la casa:'
  } else {
    reply = '¡Tengo justo lo que buscas! Te recomiendo estas piezas:'
  }

  return { reply, picks: picks.slice(0, 3) }
}