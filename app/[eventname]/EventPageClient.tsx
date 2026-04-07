'use client'
import { useState } from 'react'
import { ShopifyVariant } from '../lib/shopify'

type Props = {
  title: string
  support: string
  actos: string
  orden: string
  reglas: string
  date: string
  time: string
  description: string
  flyer: string
  variants: ShopifyVariant[]
  storeDomain: string
}

export default function EventPageClient({ title, support, actos, orden, reglas, date, time, description, flyer, variants, storeDomain }: Props) {
  const expandables = [
    actos ? { label: 'TODOS LOS ACTOS', content: actos } : null,
    orden ? { label: 'ORDEN DE ACTOS', content: orden } : null,
    reglas ? { label: 'REGLAS', content: reglas } : null,
  ].filter(Boolean) as { label: string; content: string }[]

  const [open, setOpen] = useState<number | null>(null)
  const [qty, setQty] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<ShopifyVariant | null>(null)

  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  const buyUrl = selectedVariant
    ? `https://${storeDomain}/cart/${selectedVariant.id}:${qty}`
    : '#'

  const now = new Date()

  // Safer date parsing
  const eventDate = new Date(date + 'T00:00:00')
  eventDate.setHours(0, 0, 0, 0)

  const isTaquillaActive = now >= eventDate

  const filteredVariants = variants.filter(v => {
    const title = v.title.toLowerCase()

    const isPreventa = title.includes('preventa')
    const isTaquilla = title.includes('taquilla')

    if (isPreventa) {
      return !isTaquillaActive
    }

    if (isTaquilla) {
      return isTaquillaActive
    }
    return true
  })

  return (
    <section className="min-h-screen flex flex-col md:flex-row pb-6 sm:pb-0">

      {/* Flyer */}
      <div className="w-full md:w-3/5 flex items-center justify-center py-10 md:py-0">
        <div style={{ width: 'clamp(240px, 72vw, 620px)', aspectRatio: '620/774', transform: 'rotate(-3deg)' }}>
          <img src={flyer} alt="flyer" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info */}
      <div className="w-full md:w-2/5 flex flex-col justify-center px-6 md:pr-16 md:pl-0 gap-2 pb-12 md:pb-0">

        <h1 style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }} className="uppercase leading-none text-center">{title}</h1>
        <p style={{ fontSize: 'clamp(1.2rem, 4vw, 2.25rem)' }} className="uppercase text-gray-500 text-center">{support || '\u00A0'}</p>

        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} className="text-[#C91E1F] mt-2 text-center">{date}</p>
        <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }} className="text-[#C91E1F] text-center">{time}</p>

        <div className="mt-4 min-h-[80px] text-base uppercase text-gray-700">
          {description}
        </div>

        {/* Expandables */}
        <div className="flex flex-col mt-4">
          {expandables.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-3 uppercase tracking-widest"
                style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}
              >
                <span>{open === i ? '− ' : '+ '}{item.label}</span>
              </button>
              {open === i && (
                <div className="pb-4 text-sm uppercase text-gray-500 px-1">{item.content}</div>
              )}
            </div>
          ))}
        </div>

        {/* Ticket variants */}
        <div className="mt-6 flex flex-col gap-1 uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
          {filteredVariants.map((v) => {
            const isSelected = selectedVariant?.id === v.id
            return (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v)}
                className={`flex justify-between text-left transition-colors ${isSelected ? 'text-[#C91E1F]' : 'text-black'}`}
              >
                <span>{v.title == 'General Admission' ? 'ADMISIÓN GENERAL' : v.title}</span>
                <span>{parseFloat(v.price) === 0 ? 'GRATIS' : '$' + parseFloat(v.price).toLocaleString('es-MX')}</span>
              </button>
            )
          })}
        </div>

        <hr className="border-black mt-4" />

        {/* Quantity + buy */}
        {selectedVariant && (
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3 uppercase" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
              <span>Boletos:</span>
              <div className="relative flex items-center">
                <select
                  value={qty}
                  onChange={e => setQty(Number(e.target.value))}
                  className="appearance-none bg-transparent uppercase outline-none cursor-pointer pr-2"
                  style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-0 text-sm">▾</span>
              </div>
            </div>
            <a href={buyUrl} className="uppercase underline tracking-widest" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.25rem)' }}>
              COMPRAR
            </a>
          </div>
        )}

      </div>
    </section>
  )
}