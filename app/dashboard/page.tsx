import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { OrdersBarChart, StatusPieChart } from '@/components/Charts'

async function getDashboardData(userId: string) {
  const [orders, quotes] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.quote.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ])

  // Get all orders for analytics
  const allOrders = await prisma.order.findMany({
    where: { userId },
    select: { createdAt: true, status: true, total: true }
  })

  // Orders by month (last 6 months)
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  
  const recentOrders = allOrders.filter(order => new Date(order.createdAt) >= sixMonthsAgo)
  
  const ordersByMonth = new Map<string, number>()
  recentOrders.forEach(order => {
    const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short' })
    ordersByMonth.set(month, (ordersByMonth.get(month) || 0) + 1)
  })

  const ordersData = Array.from(ordersByMonth.entries()).map(([name, orders]) => ({
    name,
    orders
  }))

  // Orders by status
  const statusCount = new Map<string, number>()
  allOrders.forEach(order => {
    statusCount.set(order.status, (statusCount.get(order.status) || 0) + 1)
  })

  const statusData = Array.from(statusCount.entries()).map(([name, value]) => ({
    name,
    value
  }))

  // Calculate total spent
  const totalSpent = allOrders.reduce((sum, order) => sum + order.total, 0)

  return { orders, quotes, ordersData, statusData, totalSpent }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  if (session.user.role === 'ADMIN') {
    redirect('/admin')
  }

  const { orders, quotes, ordersData, statusData, totalSpent } = await getDashboardData(session.user.id)

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2 flex-wrap">
            <h1 className="text-4xl font-bold text-white">Welcome, {session.user.name}</h1>
            {session.user.role === 'B2B' && (
              <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-full text-sm font-semibold">
                🏢 Business Customer
              </span>
            )}
          </div>
          <p className="text-white/60 mt-2">
            {session.user.role === 'B2B' ? 'Enjoy 10% discount on all products and priority support' : 'Manage your orders and quotes'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Orders', value: orders.length, color: 'text-blue-400' },
            { label: 'Pending Quotes', value: quotes.filter(q => q.status === 'PENDING').length, color: 'text-blue-400' },
            { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, color: 'text-green-400' },
            { label: 'Account Type', value: session.user.role, color: session.user.role === 'B2B' ? 'text-purple-400' : 'text-blue-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <div className="text-sm text-white/60 mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
              {stat.label === 'Account Type' && session.user.role === 'B2B' && (
                <div className="text-xs text-purple-400 mt-1">10% discount active</div>
              )}
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Orders Over Time</h2>
            {ordersData.length > 0 ? <OrdersBarChart data={ordersData} /> : <p className="text-white/50 text-center py-12">No order data available</p>}
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Order Status</h2>
            {statusData.length > 0 ? <StatusPieChart data={statusData} /> : <p className="text-white/50 text-center py-12">No status data available</p>}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl mb-8">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
          </div>
          <div className="p-6">
            {orders.length === 0 ? <p className="text-white/50">No orders yet</p> : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">Order #{order.id.slice(-8)}</div>
                        <div className="text-sm text-white/50">{new Date(order.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-400">${order.total.toFixed(2)}</div>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
                          order.status === 'PROCESSING' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-white/10 text-white/60'
                        }`}>{order.status}</span>
                      </div>
                    </div>
                    <div className="text-sm text-white/50">{order.items.length} item(s)</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Recent Quotes</h2>
          </div>
          <div className="p-6">
            {quotes.length === 0 ? <p className="text-white/50">No quotes yet</p> : (
              <div className="space-y-4">
                {quotes.map((quote) => (
                  <div key={quote.id} className="border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-semibold text-white">{quote.serviceType}</div>
                        <div className="text-sm text-white/50">{new Date(quote.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        quote.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                        quote.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>{quote.status}</span>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{quote.message}</p>
                    {quote.adminNotes && (
                      <div className="mt-2 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-sm text-blue-300">
                        <span className="font-semibold">Admin Note:</span> {quote.adminNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
