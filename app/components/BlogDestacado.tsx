import Image from "next/image"
import Link from "next/link"
import { ShopifyArticle } from "../lib/shopify"

export default function BlogDestacado({ article }: { article: ShopifyArticle }) {
    return (
        <Link href={`/blog/${article.handle}`} className="block mb-12">
            
            {/* Hero */}
            {article.image && (
            <div className="relative w-full h-[340px] overflow-hidden mb-4">
                <Image
                    src={article.image.url}
                    alt={article.image.altText}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            )}

            {/* Etiquetas y titulo */}
            <span className="text-xl uppercase tracking-widest text-black">
                destacado
            </span>

            <h1 className="text-[10vw] md:text-[2.7vw] uppercase font-bold uppercaste mt-1" style={{ fontFamily: 'var(--font-tecla)'}}>
                {article.title}
            </h1>

            <p className="text-xl text-black/[.34] mt-1">
                {article.publishedAt.split('T')[0]}
            </p>

        </Link>
    )
}