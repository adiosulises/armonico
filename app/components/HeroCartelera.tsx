'use client'

import Link from "next/link"

type ItemType = 'title' | 'subtitle' | 'spacer'

interface HeroItem {
  type: ItemType
  text?: string
}

interface HeroData {
  items: HeroItem[]
  buttonText: string
  buttonUrl: string
}

// 👇 Replace this with your Shopify fetch later
const data: HeroData = {
  items: [
    { type: 'title', text: 'ARMONICO' },
    { type: 'subtitle', text: 'PRESENTA' },
    { type: 'spacer' },
    { type: 'title', text: 'BUEN CAMINO DAN' },
    { type: 'title', text: '"HORMIGAS"' },
    { type: 'subtitle', text: 'EN VIVO' },
    { type: 'spacer' },
    { type: 'title', text: '14.FEB.25 - 8PM' },
  ],
  buttonText: 'COMPRAR BOLETOS',
  buttonUrl: '/',
}

const styles = {
  title: {
    fontSize: 'clamp(2rem, 7vw, 16rem)',
    lineHeight: 1,
    marginTop: '-0.11em',
    marginBottom: '-0.17em',
  },
  subtitle: {
    fontSize: 'clamp(1.2rem, 4vw, 8rem)',
    lineHeight: 1,
    marginTop: '0.25em',
    marginBottom: '-0.17em',
  },
}

export default function HeroCartelera() {
  return (
    <>
      <section
        id="inicio"
        className="h-screen min-h-screen uppercase flex items-center justify-center text-center"
        style={{ fontFamily: 'var(--font-din)' }}
      >
        {/* INFO */}
        <div className="">
          <hr className="border-black" />
          {data.items.map((item, i) => (
            item.type === 'spacer'
              ? <div key={i} className="leading-none" />
              : <div key={i} className="leading-none">
                <p style={styles[item.type]} className="px-30">
                  {item.text}
                </p>
                <hr className="border-black" />
              </div>
          ))}
          <Link href={data.buttonUrl}>
            <button
              className="text-black font-bold uppercase tracking-widest pt-20 hover:underline decoration-1  "
              style={{ fontSize: 'clamp(1rem, 3vw, 3rem)' }}
            >
              {data.buttonText}
            </button>
          </Link>
        </div>
      </section>
      <div id="hero-sentinel" />
    </>
  )
}