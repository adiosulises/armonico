const domain = process.env.SHOPIFY_STORE_DOMAIN!
const token = process.env.SHOPIFY_STOREFRONT_TOKEN!
const endpoint = `https://${domain}/api/2024-01/graphql.json`

export async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 },
    })
    const json = await res.json()
    if (json.errors) throw new Error(json.errors[0].message)
    return json.data as T
}

// Tipos

export type EveyTicketType = {
    id: number
    title: string
    variant_id: string
    available: number
}

export type EveyEvent = {
    title: string
    start_at: string
    end_at: string
    location: string
    custom_fields: { date?: string }
    ticket_types: EveyTicketType[]
}

export type ShopifyVariant = {
    id: string
    title: string
    price: string
}

export type ShopifyEvent = {
    handle: string
    title: string
    description: string
    support: string
    flyer: string
    evey: EveyEvent
    variants: ShopifyVariant[]
}

// Helpers

function parseDescription(raw: string): { description: string; support: string } {
    const idx = raw.indexOf('Support:')
    if (idx === -1) return { description: raw.trim(), support: '' }
    return {
        description: raw.slice(0, idx).trim(),
        support: raw.slice(idx + 'Support:'.length).trim(),
    }
}

function parseVariantId(gid: string): string {
    return gid.split('/').pop() ?? gid
}

function mapProduct(node: any): ShopifyEvent | null {
    if (!node?.metafield?.value) return null
    const evey: EveyEvent = JSON.parse(node.metafield.value)
    const { description, support } = parseDescription(node.description ?? '')
    return {
        handle:      node.handle,
        title:       node.title,
        description,
        support,
        flyer:       node.images.edges[0]?.node.url ?? '',
        evey,
        variants: node.variants.edges.map((v: any) => ({
            id:    parseVariantId(v.node.id),
            title: v.node.title,
            price: v.node.price.amount,
        })),
    }
}

const PRODUCT_FIELDS = `
    handle
    title
    description
    images(first: 1) {
        edges { node { url } }
    }
    variants(first: 10) {
        edges {
            node {
                id
                title
                price { amount currencyCode }
            }
        }
    }
    metafield(namespace: "evey", key: "event") {
        value
    }
`

const MONTH_ABBR = [
    'ENE','FEB','MAR','ABR','MAY','JUN',
    'JUL','AGO','SEP','OCT','NOV','DIC'
]

// APIs

export async function getEvents(): Promise<ShopifyEvent[]> {
    const data = await shopifyFetch<any>(`
        query GetEventProducts {
            products(first: 50) {
                edges { node { ${PRODUCT_FIELDS} } }
            }
        }
    `)
    return data.products.edges
        .map((e: any) => mapProduct(e.node))
        .filter(Boolean) as ShopifyEvent[]
}

export async function getEventByHandle(handle: string): Promise<ShopifyEvent | null> {
    const data = await shopifyFetch<any>(`
        query GetEventByHandle($handle: String!) {
            product(handle: $handle) { ${PRODUCT_FIELDS} }
        }
    `, { handle })
    return mapProduct(data.product)
}

export function formatTime(start_at: string): string {
    const [, time] = start_at.split('T')
    const [h, m] = time.split(':')
    return `${h}H${m}`
}

export function formatDate(start_at:string):string{
    const [datePart] = start_at.split('T')
    const [year,month,day] = datePart.split('-')
    const mon = MONTH_ABBR[parseInt(month,10)-1]
    return `${mon}.${day}.${year.slice(2)}`
}