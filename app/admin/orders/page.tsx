'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'

interface Order {
  id: string
  total: number
  status: string
  shippingAddress: string
  createdAt: string
  user: { name: string; email: string }
  items: Array<{
    id: string
    quantity: number
    price: number
    product: { name: string }
  }>
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })

      if (res.ok) {
        fetchOrders()
      } else {
        alert('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    } finally {
      setUpdatingId(null)
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Orders</h1>
            <p className="text-white/60 mt-2">View and update order status</p>
          </div>
          <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
            Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
            <p className="text-xl text-white/60">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Order #{order.id.slice(-8)}</h3>
                    <p className="text-sm text-white/60">Customer: {order.user.name} ({order.user.email})</p>
                    <p className="text-sm text-white/60">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-400 mb-2">${order.total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-white/70">
                          {item.product.name} x {item.quantity}
                        </span>
                        <span className="font-semibold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 mb-4">
                  <h4 className="font-semibold text-white mb-2">Shipping Address:</h4>
                  <p className="text-sm text-white/60 whitespace-pre-line">{order.shippingAddress}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-semibold text-white mb-3">Update Status:</h4>
                  <div className="flex gap-2 flex-wrap">
                    {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(order.id, status)}
                        disabled={updatingId === order.id || order.status === status}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                          order.status === status
                            ? status === 'DELIVERED' ? 'bg-green-500 text-white' :
                              status === 'SHIPPED' ? 'bg-blue-500 text-white' :
                              status === 'PROCESSING' ? 'bg-yellow-500 text-white' :
                              status === 'CANCELLED' ? 'bg-red-500 text-white' :
                              'bg-white/20 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        } disabled:opacity-50`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

