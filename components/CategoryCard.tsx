import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const image = category.metadata?.image

  return (
    <Link href={`/categories/${category.slug}`} className="group block">
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
        {image && (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          {description && (
            <p className="text-white/90 text-sm line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  )
}