'use client'

import { use, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import { useNotification } from '@/hooks/useNotification'

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { data: session } = useSession()
  const router = useRouter()
  const resolvedParams = use(params)
  const [product, setProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const { notification, showSuccess, showError, hideNotification } = useNotification()

  // B2B discount rate (10%)
  const B2B_DISCOUNT = 0.10
  const isB2B = session?.user?.role === 'B2B'
  const isAdmin = session?.user?.role === 'ADMIN'
  const canOrder = session && !isAdmin
  
  const getPrice = () => {
    if (!product) return 0
    return isB2B ? product.price * (1 - B2B_DISCOUNT) : product.price
  }

  const getSavings = () => {
    if (!product || !isB2B) return 0
    return product.price * B2B_DISCOUNT
  }

  useEffect(() => {
    fetchProduct()
  }, [resolvedParams.slug])

  const fetchProduct = async () => {
    try {
      const res = await fetch('/api/products')
      if (res.ok) {
        const products = await res.json()
        const found = products.find((p: any) => p.slug === resolvedParams.slug)
        setProduct(found)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    if (isAdmin) return

    setAdding(true)
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id, quantity })
      })

      if (res.ok) {
        showSuccess('Added to cart!')
        setTimeout(() => router.push('/cart'), 1500)
      } else {
        showError('Failed to add to cart')
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      showError('Failed to add to cart')
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return <Loading />
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300">Back to Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/products" className="text-blue-400 hover:text-blue-300 mb-6 inline-block transition-colors">
          ← Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 items-start">
          <div className="rounded-xl bg-white/5 border border-white/10">
            <img src={product.image || '/products/default.jpg'} alt={product.name}
              className="w-full h-auto object-contain rounded-xl"
              onError={(e) => { (e.target as HTMLImageElement).src = '/products/default.jpg' }} />
          </div>

          <div>
            {isB2B && (
              <div className="mb-4 inline-block bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-semibold">
                🏢 Business Customer - 10% Discount Applied
              </div>
            )}
            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            <div className="mb-6">
              {isB2B ? (
                <div>
                  <div className="flex items-baseline gap-3">
                    <p className="text-3xl font-bold text-purple-400">${getPrice().toFixed(2)}</p>
                    <p className="text-xl text-white/40 line-through">${product.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-green-400 mt-1">You save ${getSavings().toFixed(2)} per unit</p>
                </div>
              ) : (
                <p className="text-3xl font-bold text-blue-400">${product.price.toFixed(2)}</p>
              )}
            </div>

            <div className="mb-6">
              <span className={`px-4 py-2 rounded-full text-sm ${product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <p className="text-white/70 mb-8 leading-relaxed">{product.description}</p>

            {product.detail && (
              <div className="mb-8 bg-white/5 border border-white/10 rounded-xl p-5 space-y-2">
                {product.detail.split('\n').filter(Boolean).map((line: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5 shrink-0">✦</span>
                    <span className="text-white/75 text-sm leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            )}

            {product.stock > 0 && (
              <div className="space-y-5">
                {isAdmin ? (
                  <div className="px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-400 text-sm">
                    Admin accounts cannot place orders.
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">
                        Quantity {isB2B && '(Bulk orders available)'}
                      </label>
                      <input type="number" min="1" max={product.stock} value={quantity}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 1
                          setQuantity(Math.min(val, product.stock))
                        }}
                        className="w-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                      <p className="text-xs text-white/40 mt-1">{product.stock} available</p>
                      {isB2B && quantity >= 10 && (
                        <p className="text-sm text-purple-400 mt-2">💼 Bulk order: Total savings ${(getSavings() * quantity).toFixed(2)}</p>
                      )}
                    </div>

                    <button onClick={addToCart} disabled={adding}
                      className="w-full py-4 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
                      {adding ? (
                        <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />Adding...</>
                      ) : 'Add to Cart'}
                    </button>

                    {!session && (
                      <p className="text-sm text-white/50 text-center">
                        Please <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300">sign in</Link> to purchase
                      </p>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {notification.show && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}
    </div>
  )
}
