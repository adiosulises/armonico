import React from 'react'

// Parse the Shopify HTML into structured rec entries
function parseRecs(html: string) {
    const decoded = html.replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ')
    const parts = decoded.split(/<h2[^>]*>/i).slice(1)

    return parts.map(part => {
        const [h2Content, ...rest] = part.split(/<\/h2>/i)
        const remainder = rest.join('</h2>')

        const title = h2Content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

        const imgMatch = (h2Content + remainder).match(/<img[^>]+src="([^"]+)"/)
        const image = imgMatch?.[1] ?? null
        const imgAlt = (h2Content + remainder).match(/<img[^>]+alt="([^"]*)"/)?.[1] ?? ''

        const linkMatch = remainder.match(/<a[^>]+href="([^"]+)"[^>]*>\s*Escucha aquí\s*<\/a>/i)
        const link = linkMatch?.[1] ?? null

        // Remove the "Escucha aquí" link tag only, keep surrounding text
        const cleanedRemainder = remainder.replace(/<a[^>]*>\s*Escucha aquí\s*<\/a>/gi, '')

        const pMatches = cleanedRemainder.match(/<p[^>]*>([\s\S]*?)<\/p>/g) ?? []
        const body = pMatches
            .map(p => p.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
            .filter(t => t && t.length > 5) // filter empty or near-empty paragraphs
            .join('\n\n')

        return { title, image, imgAlt, body, link }
    }).filter(r => r.title.length > 3)
}

export default function RecsLayout({ article }: { article: any }) {
    const recs = parseRecs(article.contentHtml)

    return (
        <div
            className="min-h-screen px-6 md:px-16"
            style={{ fontFamily: 'var(--font-tecla)', backgroundColor: '#fafaf8' }}
        >
            {/* Header */}
            <div className=" pt-16 pb-10 border-b border-black">
                <p className="text-sm uppercase tracking-widest text-gray-500 mb-2">
                    {new Date(article.publishedAt).toLocaleDateString('es-MX', {
                        year: 'numeric', month: 'long', day: 'numeric'
                    })}
                </p>
                <h1
                    className="uppercase leading-none"
                    style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', fontFamily: 'var(--font-din)' }}
                >
                    {article.title}
                </h1>
                <div className="flex gap-2 mt-4">
                    {article.tags.map((tag: string) => (
                        <span key={tag} className="text-xs uppercase tracking-widest border border-black px-2 py-0.5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Recs list */}
            <div className="divide-y divide-black">
                {recs.map((rec, i) => (
                    <div key={i} className="py-12">
                        {/* Rec title */}
                        <h2
                            className="uppercase mb-8 leading-tight"
                            style={{
                                fontSize: 'clamp(1.8rem, 3vw, 3rem)',
                                fontFamily: 'var(--font-din)'
                            }}
                        >
                            {rec.title}
                        </h2>

                        {/* Image + text layout */}
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                            {rec.image && (
                                <div className="shrink-0">
                                    <img
                                        src={rec.image}
                                        alt={rec.imgAlt}
                                        className="w-full md:w-48 lg:w-64 object-cover"
                                        style={{ aspectRatio: '1/1' }}
                                    />
                                </div>
                            )}
                            <div className="flex flex-col justify-between gap-4">
                                <p
                                    className="text-gray-700 leading-relaxed whitespace-pre-line"
                                    style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}
                                >
                                    {rec.body}
                                </p>
                                {rec.link && (
                                    <a
                                        href={rec.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="self-end uppercase tracking-widest text-sm underline hover:text-[#C91E1F] transition-colors"
                                    >
                                        Escucha aquí →
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}