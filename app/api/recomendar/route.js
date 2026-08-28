import { NextResponse } from 'next/server'
import { products } from '@/lib/products'
import { localBrain } from '@/lib/brain'

export async function POST(req) {
  let message = ''
  try {
    message = (await req.json()).message || ''
  } catch {
    return NextResponse.json({ error: 'mensaje invalido' }, { status: 400 })
  }

  const key = process.env.AI_API_KEY
  if (key) {
    try {
      const base = process.env.AI_BASE_URL || 'https://api.openai.com/v1'
      const model = process.env.AI_MODEL || 'gpt-4o-mini'
      const res = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model,
          temperature: 0.7,
          messages: [
            {
              role: 'system',
              content:
                'Eres el asistente de VANITYSHOP, tienda de moda sostenible. Catálogo: ' +
                JSON.stringify(products.map((p) => ({ id: p.id, name: p.name, category: p.category, price: p.price }))) +
                '. Recomienda máximo 3 productos. Responde SOLO con JSON válido: {"reply": "texto amable", "picks": [ids]}',
            },
            { role: 'user', content: message },
          ],
        }),
      })
      const data = await res.json()
      const parsed = JSON.parse(data.choices[0].message.content)
      const picks = products.filter((p) => (parsed.picks || []).includes(p.id))
      if (parsed.reply && picks.length) {
        return NextResponse.json({ reply: parsed.reply, picks, engine: 'ia' })
      }
    } catch (e) {
      // si la IA falla, cae al cerebro local sin romperse
    }
  }

  const { reply, picks } = localBrain(message)
  return NextResponse.json({ reply, picks, engine: 'local' })
}