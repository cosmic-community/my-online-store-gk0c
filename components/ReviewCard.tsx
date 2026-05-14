import { Review } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'

export default function ReviewCard({ review, showProduct = false }: { review: Review; showProduct?: boolean }) {
  const reviewerName = getMetafieldValue(review.metadata?.reviewer_name) || 'Anonymous'
  const rating = Number(review.metadata?.rating) || 0
  const title = getMetafieldValue(review.metadata?.review_title) || review.title
  const content = getMetafieldValue(review.metadata?.review_content)
  const verified = review.metadata?.verified_purchase
  const product = review.metadata?.product

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{reviewerName}</span>
            {verified && (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                ✓ Verified
              </span>
            )}
          </div>
          <StarRating rating={rating} size="sm" />
        </div>
      </div>
      {title && <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>}
      {content && <p className="text-gray-700 leading-relaxed">{content}</p>}
      {showProduct && product && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a href={`/products/${product.slug}`} className="text-sm text-brand-600 hover:text-brand-700 font-medium">
            Review for: {product.title} →
          </a>
        </div>
      )}
    </div>
  )
}