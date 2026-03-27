'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import { useNotification } from '@/hooks/useNotification'

export default function CartPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [cart, setCart] = useState<any>(null)
  const [pageLoading, setPageLoading] = useState(true)
  const [checkingOut, setCheckingOut] = useState(false)
  const [removingId, setRemovingId] = useState<string | null>(null)
  const [shippingAddress, setShippingAddress] = useState('')
  const { notification, showSuccess, showError, hideNotification } = useNotification()

  const isB2B = session?.user?.role === 'B2B'
  const B2B_DISCOUNT = 0.10
  const getPrice = (price: number) => isB2B ? price * (1 - B2B_DISCOUNT) : price

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchCart()
    }
  }, [status])

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart')
      if (res.ok) setCart(await res.json())
    } catch (e) {
      console.error(e)
    } finally {
      setPageLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, qty: number) => {
    if (qty < 1) return
    await fetch(`/api/cart?itemId=${itemId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity: qty })
    })
    setCart((prev: any) => ({
      ...prev,
      items: prev.items.map((i: any) => i.id === itemId ? { ...i, quantity: qty } : i)
    }))
  }

  const removeItem = async (itemId: string) => {
    setRemovingId(itemId)
    try {
      const res = await fetch(`/api/cart?itemId=${itemId}`, { method: 'DELETE' })
      if (res.ok) {
        setCart((prev: any) => ({
          ...prev,
          items: prev.items.filter((i: any) => i.id !== itemId)
        }))
      }
    } finally {
      setRemovingId(null)
    }
  }

  const checkout = async () => {
    if (!shippingAddress.trim()) {
      showError('Please enter a shipping address')
      return
    }
    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shippingAddress })
      })
      if (res.ok) {
        showSuccess('Order placed successfully!')
        setTimeout(() => router.push('/dashboard'), 1500)
      } else {
        const data = await res.json()
        showError(data.error || 'Checkout failed')
      }
    } catch {
      showError('Checkout failed')
    } finally {
      setCheckingOut(false)
    }
  }

  if (pageLoading || status === 'loading') return <Loading />

  const items: any[] = cart?.items ?? []
  const subtotal = items.reduce((sum, item) => sum + getPrice(item.product.price) * item.quantity, 0)
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="min-h-screen py-12 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Your Cart</h1>
          <Link href="/products" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
            ← Continue Shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white/5 border border-white/10 rounded-2xl">
            <div className="text-5xl mb-4">🛒</div>
            <p className="text-white/60 text-lg mb-6">Your cart is empty.</p>
            <Link href="/products"
              className="inline-block px-6 py-3 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Items list */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-center hover:border-white/20 transition-all">
                  <img
                    src={item.product.image || '/products/default.jpg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0 bg-white/5"
                    onError={(e) => { (e.target as HTMLImageElement).src = '/products/default.jpg' }}
                  />
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}
                      className="text-white font-semibold hover:text-blue-300 transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="mt-1">
                      {isB2B ? (
                        <div className="flex items-center gap-2">
                          <span className="text-purple-400 font-semibold text-sm">
                            ${getPrice(item.product.price).toFixed(2)}
                          </span>
                          <span className="text-white/30 line-through text-xs">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-blue-400 font-semibold text-sm">
                          ${item.product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 disabled:opacity-30 transition-all flex items-center justify-center leading-none"
                      >−</button>
                      <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center leading-none"
                      >+</button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <span className="text-white font-semibold">
                      ${(getPrice(item.product.price) * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      disabled={removingId === item.id}
                      className="text-red-400 hover:text-red-300 text-xs transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {removingId === item.id
                        ? <span className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-400" />
                        : '✕'} Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-fit sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-5">Order Summary</h2>

              {isB2B && (
                <div className="mb-4 text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2">
                  🏢 10% B2B discount applied
                </div>
              )}

              <div className="space-y-2 text-sm text-white/60 mb-4">
                <div className="flex justify-between">
                  <span>Items ({totalQty})</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                {isB2B && (
                  <div className="flex justify-between text-purple-400">
                    <span>B2B Savings</span>
                    <span>
                      −${items.reduce((s, i) => s + i.product.price * B2B_DISCOUNT * i.quantity, 0).toFixed(2)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6 flex justify-between text-white font-semibold text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Shipping address */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-white/70 mb-1.5">
                  Shipping Address *
                </label>
                <textarea
                  rows={3}
                  value={shippingAddress}
                  onChange={e => setShippingAddress(e.target.value)}
                  placeholder="Street, City, State, ZIP, Country"
                  className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                />
              </div>

              <button
                onClick={checkout}
                disabled={checkingOut}
                className="w-full py-3 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {checkingOut
                  ? <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" /> Processing...</>
                  : 'Checkout'}
              </button>
            </div>

          </div>
        )}
      </div>

      {notification.show && (
        <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
      )}
    </div>
  )
}
