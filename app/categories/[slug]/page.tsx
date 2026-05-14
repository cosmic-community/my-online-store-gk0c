// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, getProductsByCategory, getMetafieldValue } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.image

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gray-900 overflow-hidden">
        {image && (
          <img
            src={`${image.imgix_url}?w=2400&h=800&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
        )}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-white">Categories</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{name}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{name}</h1>
          {description && <p className="text-lg text-gray-200 max-w-2xl">{description}</p>}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-600 mb-8">{products.length} {products.length === 1 ? 'product' : 'products'} in this category</p>
        {products.length === 0 ? (
          <p className="text-gray-500">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}