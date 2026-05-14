import Link from 'next/link'
import { Product } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ProductCard({ product }: { product: Product }) {
  const name = getMetafieldValue(product.metadata?.name) || product.title
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const stockStatus = getMetafieldValue(product.metadata?.stock_status)
  const image = product.metadata?.featured_image
  const hasSale = salePrice && price && salePrice < price

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-brand-500 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {image && (
            <img
              src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={name}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          {hasSale && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              SALE
            </span>
          )}
          {stockStatus && stockStatus !== 'In Stock' && (
            <span className="absolute top-3 right-3 bg-gray-900/80 text-white text-xs font-medium px-2 py-1 rounded-full">
              {stockStatus}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            {hasSale ? (
              <>
                <span className="text-lg font-bold text-red-600">${salePrice}</span>
                <span className="text-sm text-gray-400 line-through">${price}</span>
              </>
            ) : (
              price !== undefined && price !== null && (
                <span className="text-lg font-bold text-gray-900">${price}</span>
              )
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}