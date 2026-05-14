export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">My Online Store</h3>
            <p className="text-sm">Quality products at great prices, delivered to your door.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-white">All Products</a></li>
              <li><a href="/categories" className="hover:text-white">Categories</a></li>
              <li><a href="/reviews" className="hover:text-white">Reviews</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <p className="text-sm">© {new Date().getFullYear()} My Online Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}