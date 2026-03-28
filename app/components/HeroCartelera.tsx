import Link from "next/link"
import { shopifyFetch } from "../lib/shopify"

type ItemType = 'title' | 'subtitle' | 'spacer' | 'empty'
interface HeroItem { type: ItemType; text?: string }
interface HeroData { items: HeroItem[]; buttonText: string; buttonUrl: string }

const PRODUCT_QUERY = `
  query {
    products(first: 20) {
      edges {
        node {
          title
          handle
          productType
          onlineStoreUrl
          metafields(identifiers: [
            { namespace: "evey", key: "event" }
          ]) {
            namespace
            key
            value
          }
        }
      }
    }
  }
`

function getNextEvent(products: any[]) {
  const now = new Date()

  const events = products
    .map(({ node }: any) => {
      const metafield = node.metafields?.[0]
      console.log('productType:', node.productType, 'metafield:', metafield)
      if (!metafield?.value) return null

      const evey = JSON.parse(metafield.value)
      const startAt = new Date(evey.start_at)

      return { node, evey, startAt }
    })
    .filter((e): e is NonNullable<typeof e> => e !== null && e.startAt >= now)
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())

  return events[0] ?? null
}

function formatDate(dateStr: string, timezone: string) {
  const date = new Date(dateStr)

  const day = new Intl.DateTimeFormat('es-MX', { day: '2-digit', timeZone: timezone }).format(date)
  const month = new Intl.DateTimeFormat('es-MX', { month: '2-digit', timeZone: timezone }).format(date)
  const year = new Intl.DateTimeFormat('es-MX', { year: '2-digit', timeZone: timezone }).format(date)
  const time = new Intl.DateTimeFormat('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: timezone }).format(date)

  return `${day}.${month}.${year} - ${time.toUpperCase()}`
}

const productTypeLabel: Record<string, string> = {
  'Expo': 'EXPOSICIÓN',
  'Taller': 'TALLER',
  'Live': 'EN VIVO',
  'Proyección': 'EN PANTALLA GRANDE',
}

function buildData(node: any, evey: any): HeroData {
  const typeLabel = productTypeLabel[node.productType] ?? node.productType
  return {
    items: [
      { type: 'title', text: 'ARMONICO' },
      { type: 'subtitle', text: 'PRESENTA' },
      { type: 'spacer' },
      { type: 'title', text: node.title },
      { type: 'subtitle', text: typeLabel },
      { type: 'spacer' },
      { type: 'empty' },
      { type: 'spacer' },
      { type: 'title', text: formatDate(evey.start_at, evey.timezone) },
    ],
    buttonText: 'COMPRAR BOLETOS',
    buttonUrl: node.onlineStoreUrl ?? '/',
  }
}

const fallbackData: HeroData = {
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
    marginTop: '0.45em',
    marginBottom: '-0.17em',
  },
}

export default async function HeroCartelera() {
  let data: HeroData = fallbackData

  try {
    const result = await shopifyFetch(PRODUCT_QUERY)
    const products = result?.data?.products?.edges ?? []
    const next = getNextEvent(products)

    if (next) {
      data = buildData(next.node, next.evey)
    }
  } catch (e) {
    console.error('Failed to fetch Shopify product, using fallback:', e)
  }

  return (
    <>
      <section id="inicio" className="min-h-screen bg-black text-white uppercase flex items-center justify-center" style={{ fontFamily: 'var(--font-din)' }}>
        <div className="max-w-3xl w-full px-6 flex flex-col items-center px-10">
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">ARMONICO</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-end justify-center text-center text-4xl pb-[1px]">
            <p className="leading-none -mb-[7px]">PRESENTA</p>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13" />
          <hr className="w-full border-white my-0 -mb-[1px]" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">BUEN CAMINO DAN</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold -mb-[1px]">
            <h1>"HORMIGAS"</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13 flex items-end justify-center text-center text-4xl pb-[1px]">
            <p className="leading-none -mb-[7px]">EN VIVO</p>
          </div>
          <hr className="w-full border-white my-0" />
          <div className="w-full h-13" />
          <hr className="w-full border-white my-0 -mb-[1px]" />
          <div className="w-full h-13 flex items-center justify-center text-center text-7xl font-bold">
            <h1 className="leading-none -mb-[3px]">14.FEB.25 - 8PM</h1>
          </div>
          <hr className="w-full border-white my-0" />
          <button className="mt-10 bg-[#f5f0dc] text-black font-bold uppercase px-12 py-6 text-lg tracking-widest rounded">
            COMPRAR BOLETOS
          </button>

        </div>
      </section>
      <div id="hero-sentinel" />
    </>
  )
}
