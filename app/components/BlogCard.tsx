import Image from "next/image"
import Link from "next/link"
import { ShopifyArticle } from "../lib/shopify"

export default function BlogCard({ article }: { article: ShopifyArticle }) {
    return (
        <Link href={`/blog/${article.handle}`} className="flex flex-col gap-2">

            {/* Thumbnail */}
            {article.image && (
            <div className="relative w-full aspect-video overflow-hidden">
                <Image
                    src={article.image.url}
                    alt={article.image.altText}
                    fill
                    className="object-cover"
                />
            </div>
            )}

            {/* Text */}
            <span className="text-xs uppercase tracking-widest text-black">
                {article.blog.handle}
            </span>
            <p className="text-sm font-semibold uppercase leading-snug" style={{ fontFamily: 'var(--font-tecla)'}}>
                {article.title}
            </p>
                <p className="text-xs text-black/[.34] mt-1">
                {article.publishedAt.split('T')[0]}
            </p>

        </Link>
    )
}