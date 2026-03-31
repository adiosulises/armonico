'use client'
import { useState } from 'react'
import { ShopifyVariant } from '../lib/shopify'

const expandables = [
  { label: 'TODOS LOS ACTOS' },
  { label: 'RUNNING ORDER' },
  { label: 'REGLAS' },
]

type Props = {
  title: string
  support: string
  date: string
  time: string
  description: string
  flyer: string
  variants: ShopifyVariant[]
  storeDomain: string
}

export default function EventPageClient({ title, support, date, time, description, flyer, variants, storeDomain }: Props) {
  const [open, setOpen] = useState<number | null>(null)
  const [qty, setQty] = useState(1)

  const toggle = (i: number) => setOpen(prev => (prev === i ? null : i))

  const buyUrl = variants.length > 0
    ? `https://${storeDomain}/cart/${variants[0].id}:${qty}`
    : '#'

  return (
    <section className="min-h-screen flex flex-row">

      {/* Flyer */}
      <div className="w-3/5 flex items-center justify-center">
        <div style={{ width: 620, height: 774, transform: 'rotate(-3deg)' }}>
          <img src={flyer} alt="flyer" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Info */}
      <div className="w-2/5 flex flex-col justify-center pr-16 gap-2">

        {/* Title & support */}
        <h1 className="text-7xl uppercase leading-none text-center">{title}</h1>
        <p className="text-4xl uppercase text-gray-500 text-center">{support || '\u00A0'}</p>

        {/* Date & time */}
        <p className="text-2xl text-[#C91E1F] mt-2 text-center">{date}</p>
        <p className="text-2xl text-[#C91E1F] text-center">{time}</p>

        {/* Description */}
        <div className="mt-4 min-h-[80px] text-base uppercase text-gray-700">
          {description}
        </div>

        {/* Expandables */}
        <div className="flex flex-col mt-4">
          {expandables.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-3 text-xl uppercase tracking-widest"
              >
                <span>{open === i ? '− ' : '+ '}{item.label}</span>
              </button>
              {open === i && (
                <div className="pb-4 text-sm uppercase text-gray-500 px-1" />
              )}
            </div>
          ))}
        </div>

        {/* Ticket phases */}
        <div className="mt-6 flex flex-col gap-1 text-xl uppercase">
          {variants.map((v, i) => (
            <div key={v.id} className={`flex justify-between ${i > 0 ? 'text-gray-400' : ''}`}>
              <span>{v.title}</span>
              <span>${parseFloat(v.price).toLocaleString('es-MX')}</span>
            </div>
          ))}
        </div>

        <hr className="border-black mt-4" />

        {/* Quantity + buy */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 text-xl uppercase">
            <span>Boletos:</span>
            <div className="relative flex items-center">
              <select
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className="appearance-none bg-transparent text-xl uppercase outline-none cursor-pointer pr-2"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 text-sm">▾</span>
            </div>
          </div>
          <a href={buyUrl} className="text-xl uppercase underline tracking-widest">
            COMPRAR
          </a>
        </div>

      </div>
    </section>
  )
}
