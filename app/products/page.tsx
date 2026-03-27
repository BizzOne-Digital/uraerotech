'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import { useNotification } from '@/hooks/useNotification'

export default function ProductsPage() {
  const { data: session } = useSession()
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [addingId, setAddingId] = useState<string | null>(null)
  const { notification, showSuccess, showError, hideNotification } = useNotification()

  // Initialize selectedCategory from URL param
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || 'all')
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState<string>('all')
  const [stockFilter, setStockFilter] = useState<string>('all')
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const isAdmin = session?.user?.role === 'ADMIN'
  const isB2B = session?.user?.role === 'B2B'
  const B2B_DISCOUNT = 0.10

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const cat = searchParams.get('category')
    setSelectedCategory(cat || 'all')
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const data = await res.json()
        setProducts(data)
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Map(data.map((p: any) => [p.category.id, p.category])).values()
        )
        setCategories(uniqueCategories as any[])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const getPrice = (price: number) => {
    return isB2B ? price * (1 - B2B_DISCOUNT) : price
  }

  const addToCart = async (product: any) => {
    if (!session) {
      showError('Please sign in to add items to cart')
      return
    }
    if (isAdmin) return
    setAddingId(product.id)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      })
      if (res.ok) {
        showSuccess(`${product.name} added to cart`)
      } else {
        showError('Failed to add to cart')
      }
    } catch {
      showError('Failed to add to cart')
    } finally {
      setAddingId(null)
    }
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    // Category filter
    if (selectedCategory !== 'all' && product.category.id !== selectedCategory) {
      return false
    }

    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Price range filter
    const price = getPrice(product.price)
    if (priceRange === 'under50' && price >= 50) return false
    if (priceRange === '50to100' && (price < 50 || price > 100)) return false
    if (priceRange === '100to200' && (price < 100 || price > 200)) return false
    if (priceRange === 'over200' && price <= 200) return false

    // Stock filter
    if (stockFilter === 'instock' && product.stock <= 0) return false
    if (stockFilter === 'outofstock' && product.stock > 0) return false

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, priceRange, stockFilter])

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-white">Aviation Parts & Tools</h1>
            {isB2B && (
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-semibold">
                🏢 10% B2B Discount
              </span>
            )}
          </div>
          <p className="text-white/60 text-lg">
            {isB2B ? 'Business customer pricing - Save 10% on all products' : 'Browse our extensive catalog of premium aviation products'}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Search</label>
              <input type="text" placeholder="Search products..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [&>option]:bg-gray-900">
                <option value="all">All Categories</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Price Range</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [&>option]:bg-gray-900">
                <option value="all">All Prices</option>
                <option value="under50">Under $50</option>
                <option value="50to100">$50 - $100</option>
                <option value="100to200">$100 - $200</option>
                <option value="over200">Over $200</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Availability</label>
              <select value={stockFilter} onChange={(e) => setStockFilter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [&>option]:bg-gray-900">
                <option value="all">All Products</option>
                <option value="instock">In Stock</option>
                <option value="outofstock">Out of Stock</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-white/50">Showing {currentProducts.length} of {filteredProducts.length} products</p>
            {(selectedCategory !== 'all' || searchQuery || priceRange !== 'all' || stockFilter !== 'all') && (
              <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setPriceRange('all'); setStockFilter('all') }}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-xl">
            <p className="text-white/60 text-lg">No products found matching your filters.</p>
            <button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); setPriceRange('all'); setStockFilter('all') }}
              className="mt-4 text-blue-400 hover:text-blue-300 transition-colors">Clear filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {currentProducts.map((product: any) => (
                <div key={product.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 hover:shadow-glow-blue transition-all duration-300 flex flex-col">
                  <Link href={`/products/${product.slug}`} className="group">
                    <div className="h-48 overflow-hidden bg-white/5">
                      <img src={product.image || '/products/default.jpg'} alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/products/default.jpg' }} />
                    </div>
                    <div className="p-5 pb-3">
                      <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-1">{product.name}</h3>
                      <p className="text-white/60 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          {isB2B ? (
                            <div>
                              <span className="text-xl font-bold text-purple-400">${getPrice(product.price).toFixed(2)}</span>
                              <div className="text-xs text-white/40 line-through">${product.price.toFixed(2)}</div>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-blue-400">${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="px-5 pb-5 mt-auto flex flex-col gap-2">
                    {!isAdmin && session && product.stock > 0 && (
                      <button
                        onClick={() => addToCart(product)}
                        disabled={addingId === product.id}
                        className="w-full py-2 bg-gradient-aviation rounded-lg text-white text-sm font-semibold hover:shadow-glow-blue transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
                      >
                        {addingId === product.id ? (
                          <><span className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />Adding...</>
                        ) : 'Add to Cart'}
                      </button>
                    )}
                    {!session && product.stock > 0 && (
                      <p className="text-xs text-white/40 text-center">
                        <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">Sign in</Link> to order
                      </p>
                    )}
                    <Link href={`/products/${product.slug}`}
                      className="w-full py-2 mb-2 border border-white/20 rounded-lg text-white/70 text-sm text-center hover:border-white/40 hover:text-white transition-all duration-300">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 disabled:opacity-40 transition-all">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-all ${currentPage === page ? 'bg-gradient-aviation text-white' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}>
                    {page}
                  </button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 disabled:opacity-40 transition-all">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
      {notification.show && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}
    </div>
  )
}
