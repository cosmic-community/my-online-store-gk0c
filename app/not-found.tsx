import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div className="text-7xl mb-4">🛍️</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-semibold rounded-xl transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}