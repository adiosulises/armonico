const domain = process.env.SHOPIFY_STORE_DOMAIN!
const token = process.env.SHOPIFY_STOREFRONT_TOKEN!
const endpoint = `https://${domain}/api/2024-01/graphql.json`

export async function shopifyFetch(query: string, variables = {}) {
    const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 60 }, // revalidate every 60s
    })
    if (!res.ok) throw new Error(`Shopify fetch failed: ${res.status}`)
    return res.json()
}