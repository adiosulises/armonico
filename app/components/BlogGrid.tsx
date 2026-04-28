'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import BlogCard from "./BlogCard"
import { ShopifyArticle } from "../lib/shopify"

const PREVIEW_SIZE=3
const PAGE_SIZE=9
const MOBILE_PAGE_SIZE=3

type Props = {
    title: string
    articles: ShopifyArticle[]
}

export default function BlogGrid({ title, articles }: Props) {
    const [expanded, setExpanded] = useState(false)
    const [page, setPage] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    const pageSize = isMobile ? MOBILE_PAGE_SIZE : PAGE_SIZE
    const totalPages = Math.ceil(articles.length/pageSize)
    const displayed = isMobile
        ? articles.slice(page*MOBILE_PAGE_SIZE,(page+1)*MOBILE_PAGE_SIZE)
        : expanded
            ? articles.slice(page*PAGE_SIZE, (page+1)*PAGE_SIZE)
            : articles.slice(0,PREVIEW_SIZE)

    function collapse() {
        setExpanded(false)
        setPage(0)
    }

    useEffect(()=>{
        const check = () => setIsMobile(window.innerWidth<768)
        check()
        window.addEventListener('resize', check)
        return ()=> window.removeEventListener('resize',check)
    }, [])

    useEffect(()=>{
        setPage(0)
        setExpanded(false)
    }, [isMobile])

    return (
        <section className="mb-12">

            {/* Header */}
            <div className="flex items-center border-t border-black justify-between pb-2">
                <h2 className="text-3xl font-bold uppercase tracking-widest">
                    {title}
                </h2>
            </div>

            {/* Grid 1x3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayed.map((article) => (
                    <BlogCard key={article.handle} article={article}/>
                ))}
            </div>

            {/* Paginacion (solo cuando esta activo Ver Mas) */}
            {(isMobile? articles.length > MOBILE_PAGE_SIZE
                : expanded && totalPages > 1) && (
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

            {!isMobile && (
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
            )}

        </section>
    )
}