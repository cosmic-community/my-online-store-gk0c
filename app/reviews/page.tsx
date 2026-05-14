import { getAllReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'
import StarRating from '@/components/StarRating'

export const metadata = {
  title: 'Customer Reviews - My Online Store',
}

export default async function ReviewsPage() {
  const reviews = await getAllReviews()

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + (Number(r.metadata?.rating) || 0), 0) / reviews.length
    : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600 mt-2">What our customers are saying</p>
        {reviews.length > 0 && (
          <div className="mt-6 inline-flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4">
            <div>
              <div className="text-3xl font-bold text-gray-900">{avgRating.toFixed(1)}</div>
              <StarRating rating={Math.round(avgRating)} size="sm" />
            </div>
            <div className="text-gray-600 text-sm">
              Based on<br />{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </div>
          </div>
        )}
      </div>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      )}
    </div>
  )
}