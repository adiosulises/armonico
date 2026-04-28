import { getBlogArticles } from "@/app/lib/shopify"
import BlogDestacado from "../components/BlogDestacado";
import BlogGrid from "../components/BlogGrid";

export default async function Blog() {
    const [posts, videos] = await Promise.all([
        getBlogArticles("publicaciones"),
        getBlogArticles("videos"),
    ])
    const featured = posts.find(p=>p.tags.includes('destacado'))??posts[0]

    return (
        <main className="max-w-6xl mx-auto px-2 py-20">
            {posts[0] && <BlogDestacado article={featured} />}
            {posts.length>0&&(<BlogGrid title="Entradas Recientes"articles={posts}/>)}
            {videos.length>0&&(<BlogGrid title="Videos"articles={videos}/>)}
        </main>
    )
}