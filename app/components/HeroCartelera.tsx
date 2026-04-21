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
      if (!metafield?.value) return null
      const evey = JSON.parse(metafield.value)
      const startAt = new Date(evey.start_at)
      return { node, evey, startAt }
    })
    .filter((e): e is NonNullable<typeof e> => e !== null && e.startAt >= now)
    .sort((a, b) => a.startAt.getTime() - b.startAt.getTime())
  return events[0] ?? null
}

function formatDate(dateStr: string,) {
  const date = new Date(dateStr)
  const timezone = 'America/Chihuahua'

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

// Split long titles into chunks of max N words so each chunk fits on one line
function splitIntoRows(text: string, maxWords = 3): string[] {
  const words = text.split(' ')
  const rows: string[] = []
  for (let i = 0; i < words.length; i += maxWords) {
    rows.push(words.slice(i, i + maxWords).join(' '))
  }
  return rows
}

function buildData(node: any, evey: any): HeroData {
  const typeLabel = productTypeLabel[node.productType] ?? node.productType
  const title: string = node.title

  // Only split if title is long — short titles stay as one row
  const titleItems: HeroItem[] = title.length > 24
    ? splitIntoRows(title, 3).map(row => ({ type: 'title', text: row }))
    : [{ type: 'title', text: title }]

  return {
    items: [
      { type: 'title', text: 'ARMÓNICO' },
      { type: 'subtitle', text: 'PRESENTA' },
      { type: 'spacer' },
      ...titleItems,
      { type: 'subtitle', text: typeLabel },
      { type: 'spacer' },
      { type: 'empty' },
      { type: 'spacer' },
      { type: 'title', text: formatDate(evey.start_at, evey.timezone) },
    ],
    buttonText: 'COMPRAR BOLETOS',
    buttonUrl: `/${node.handle}`,
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
    fontSize: 'clamp(1.4rem, 7vw, 16rem)',
    lineHeight: 1,
    marginTop: '-0.11em',
    marginBottom: '-0.17em',
  },
  subtitle: {
    fontSize: 'clamp(0.9rem, 4vw, 8rem)',
    lineHeight: 1,
    marginTop: '0.45em',
    marginBottom: '-0.17em',
  },
}

export default async function HeroCartelera() {
  let data: HeroData = fallbackData

  try {
    const result = await shopifyFetch<any>(PRODUCT_QUERY)
    const products = result?.products?.edges ?? []
    const next = getNextEvent(products)
    if (next) data = buildData(next.node, next.evey)
  } catch (e) {
    console.error('Failed to fetch Shopify product, using fallback:', e)
  }

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .hero-title {
            font-size: 2.8rem !important;
            padding-bottom: 0em !important;
            padding-top: .3em !important;
          }
          .hero-subtitle {
            font-size: 1.6rem !important;
            padding-top: 0.45em !important;
            padding-bottom: -0.17em !important;
          }
          .hero-button {
            font-size: 1.4rem !important;
            padding-top: 1.2rem !important;
          }
        }
      `}</style>
      <section
        id="inicio"
        className="h-screen min-h-screen uppercase flex items-center justify-center text-center overflow-hidden"
        style={{ fontFamily: 'var(--font-din)' }}
      >
        <div className="w-full px-4 md:px-8 lg:px-30">
          <hr className="border-black" />
          {data.items.map((item, i) => {
            if (item.type === 'spacer') return <div key={i} className="leading-none" />
            if (item.type === 'empty') return (
              <div key={i} className="leading-none">
                <p className="hero-subtitle" style={styles.subtitle}>&nbsp;</p>
                <hr className="border-black" />
              </div>
            )
            return (
              <div key={i} className="leading-none">
                <p
                  className={item.type === 'title' ? 'hero-title' : 'hero-subtitle'}
                  style={styles[item.type]}
                >
                  {item.text}
                </p>
                <hr className="border-black" />
              </div>
            )
          })}
          <Link href={data.buttonUrl}>
            <button
              className="hero-button text-black font-bold uppercase tracking-widest hover:underline decoration-1 mt-10 underline"
              style={{
                fontSize: 'clamp(0.8rem, 3vw, 3rem)',
                paddingTop: 'clamp(1rem, 4vh, 5rem)',
              }}
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