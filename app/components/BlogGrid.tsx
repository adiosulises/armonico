'use client'
import { useState } from "react"
import Link from "next/link"
import BlogCard from "./BlogCard"
import { ShopifyArticle } from "../lib/shopify"

const PREVIEW_SIZE=3
const PAGE_SIZE=9

type Props = {
    title: string
    articles: ShopifyArticle[]
}

export default function BlogGrid({ title, articles }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [page, setPage] = useState(0)

    const totalPages = Math.ceil(articles.length/PAGE_SIZE)
    const displayed = expanded
        ? articles.slice(page*PAGE_SIZE, (page+1)*PAGE_SIZE)
        : articles.slice(0,PREVIEW_SIZE)

    function collapse() {
        setExpanded(false)
        setPage(0)
    }

    return (
        <section className="mb-12">

            {/* Header */}
            <div className="flex items-center border-t border-black justify-between pb-2">
                <h2 className="text-3xl font-bold uppercase tracking-widest">
                    {title}
                </h2>
            </div>

            {/* Grid 1x3 */}
            <div className="grid grid-cols-3 gap-6">
                {displayed.map((article) => (
                    <BlogCard key={article.handle} article={article}/>
                ))}
            </div>

            {/* Paginacion (solo cuando esta activo Ver Mas) */}
            {expanded && totalPages > 1 && (
                <div className="flex items=center justify-center gap-6 mt-8">
                    <button
                        onClick={()=> setPage(p=>p-1)}
                        disabled={page===0}
                        className="text-m uppercase tracking-widest disabled:opacity-30 hover:underline"
                    >
                        ←
                    </button>
                    <span className="text-l text-black">
                        {page+1}/{totalPages}
                    </span>
                                        <button
                        onClick={()=> setPage(p=>p+1)}
                        disabled={page===totalPages-1}
                        className="text-m uppercase tracking-widest disabled:opacity-30 hover:underline"
                    >
                        →
                    </button>
                </div>
            )}

            <div className="flex justify-end mt-10">
                {!expanded && articles.length > PREVIEW_SIZE ? (
                    <button
                        onClick={()=>setExpanded(true)}
                        className="text-2xl uppercase tracking-widest hover:underline"
                    >
                        Ver Mas →
                    </button>
                ) : expanded ? (
                    <button
                        onClick={collapse}
                        className="text-2xl uppercase tracking-widest hover:underline"
                    >
                        ← Ver Menos
                    </button>
                ) : null}
            </div>

        </section>
    )
}