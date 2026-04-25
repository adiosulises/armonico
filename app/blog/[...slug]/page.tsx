import { getArticleByHandle } from "../../lib/shopify"
import RecsLayout from "./RecsLayout"

export default async function BlogArticlePage({ params }: { params: Promise<{ slug?: string[] }> }) {

  const { slug } = await params
  const [blogHandle, articleHandle] = slug ?? []

  if (!blogHandle || !articleHandle) return <div className="p-10">Blog index</div>

  const blog = await getArticleByHandle(blogHandle, articleHandle)
  const article = blog?.articleByHandle

  if (!article) return <div className="p-10">Artículo no encontrado.</div>

  console.log(article)

  if (article.tags.includes('recs')) {
    return <RecsLayout article={article} />
  }


  return (
    <div className="px-2 py-2 lg:py-15 md:px-10 lg:px-40 blog-post">
      <h6>{article.tags[0]}</h6>
      <h1 className="text-4xl uppercase" style={{ fontFamily: 'var(--font-tecla)' }}>{article.title}</h1>
      <p className="text-gray-500" style={{ fontFamily: 'var(--font-tecla)' }}>{new Date(article.publishedAt).toLocaleDateString('es-MX')}</p>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} style={{ fontFamily: 'Helvetica, Arial, sans-serif' }} />
    </div>
  )
}