// app/products/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductBySlug, getReviewsByProduct, getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import { Variant } from '@/types'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const name = getMetafieldValue(product.metadata?.name) || product.title
  const description = getMetafieldValue(product.metadata?.description)
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const sku = getMetafieldValue(product.metadata?.sku)
  const inventory = product.metadata?.inventory_count
  const stockStatus = getMetafieldValue(product.metadata?.stock_status)
  const featuredImage = product.metadata?.featured_image
  const gallery = product.metadata?.gallery || []
  const category = product.metadata?.category
  const variants = product.metadata?.variants
  const hasSale = salePrice && price && salePrice < price

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-brand-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-brand-600">Products</Link>
        {category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/categories/${category.slug}`} className="hover:text-brand-600">
              {category.title}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-900">{name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          {featuredImage && (
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, idx) => (
                <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${name} ${idx + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-semibold text-brand-600 hover:text-brand-700 mb-2"
            >
              {category.title}
            </Link>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{name}</h1>

          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(avgRating)} />
              <span className="text-sm text-gray-600">
                {avgRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-red-600">${salePrice}</span>
                <span className="text-xl text-gray-400 line-through">${price}</span>
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">SALE</span>
              </>
            ) : (
              price !== undefined && price !== null && (
                <span className="text-3xl font-bold text-gray-900">${price}</span>
              )
            )}
          </div>

          {description && (
            <div className="prose prose-gray max-w-none mb-6">
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          {/* Variants */}
          {variants && Array.isArray(variants) && variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {(variants as Variant[]).map((variant, idx) => (
                  <div key={idx} className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
                    <span className="font-medium">{variant.name}</span>
                    {variant.value && <span className="text-gray-600">: {variant.value}</span>}
                    {variant.price !== undefined && <span className="ml-2 text-brand-600">${variant.price}</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Details */}
          <div className="border-t border-gray-200 pt-6 space-y-3">
            {stockStatus && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Availability</span>
                <span className={`font-semibold ${stockStatus === 'In Stock' ? 'text-green-700' : 'text-orange-700'}`}>
                  {stockStatus}
                </span>
              </div>
            )}
            {inventory !== undefined && inventory !== null && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">In stock</span>
                <span className="font-semibold text-gray-900">{inventory} units</span>
              </div>
            )}
            {sku && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">SKU</span>
                <span className="font-mono text-gray-900">{sku}</span>
              </div>
            )}
          </div>

          <button
            disabled={stockStatus === 'Out of Stock'}
            className="w-full mt-6 px-6 py-4 bg-brand-600 hover:bg-brand-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors"
          >
            {stockStatus === 'Out of Stock' ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mt-16 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}