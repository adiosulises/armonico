import Link from "next/link"
import { getAllArticles } from "../lib/shopify"

export default async function BlogPage() {
  let articles: any[] = []

  try {
    articles = await getAllArticles()
    console.log('articles:', articles.length)
  } catch (e) {
    console.error('Failed to fetch articles:', e)
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-8">Blog</h1>
      <div className="flex flex-col gap-4">
        {articles.map((article) => (
          <Link
            key={article.handle}
            href={`/blog/${article.blogHandle}/${article.handle}`}
            className="underline text-lg hover:text-blue-600"
          >
            {article.title}
            <span className="text-sm text-gray-500 ml-3">
              {new Date(article.publishedAt).toLocaleDateString('es-MX')}
            </span>
          </Link>
        ))}
        {articles.length === 0 && <p className="text-gray-500">No hay entradas.</p>}
      </div>
    </div>
  )
}