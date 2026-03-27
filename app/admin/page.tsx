import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { MultiLineChart, StatusPieChart, RevenueBarChart } from '@/components/Charts'

async function getAdminStats() {
  const [totalProducts, totalOrders, pendingQuotes, totalUsers, totalServices, totalIndustries, totalCategories] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.quote.count({ where: { status: 'PENDING' } }),
    prisma.user.count({ where: { role: { not: 'ADMIN' } } }),
    prisma.service.count(),
    prisma.industry.count(),
    prisma.category.count(),
  ])

  const recentOrders = await prisma.order.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
    take: 5
  }).then(orders => orders.filter(o => o.user !== null))

  const recentQuotes = await prisma.quote.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  })

  // Get orders by status for pie chart
  const ordersByStatus = await prisma.order.groupBy({
    by: ['status'],
    _count: { status: true }
  })

  // Get revenue by month for last 6 months
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  
  const ordersWithDates = await prisma.order.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true, total: true }
  })

  // Process monthly revenue
  const monthlyRevenue = new Map<string, number>()
  ordersWithDates.forEach(order => {
    const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    monthlyRevenue.set(month, (monthlyRevenue.get(month) || 0) + order.total)
  })

  const revenueData = Array.from(monthlyRevenue.entries()).map(([name, revenue]) => ({
    name,
    revenue: Math.round(revenue)
  }))

  // Get activity trends (orders, quotes, users) by month
  const quotesWithDates = await prisma.quote.findMany({
    where: { createdAt: { gte: sixMonthsAgo } },
    select: { createdAt: true }
  })

  const usersWithDates = await prisma.user.findMany({
    where: { 
      createdAt: { gte: sixMonthsAgo },
      role: { not: 'ADMIN' }
    },
    select: { createdAt: true }
  })

  const activityByMonth = new Map<string, { orders: number, quotes: number, users: number }>()
  
  ordersWithDates.forEach(order => {
    const month = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short' })
    const current = activityByMonth.get(month) || { orders: 0, quotes: 0, users: 0 }
    activityByMonth.set(month, { ...current, orders: current.orders + 1 })
  })

  quotesWithDates.forEach(quote => {
    const month = new Date(quote.createdAt).toLocaleDateString('en-US', { month: 'short' })
    const current = activityByMonth.get(month) || { orders: 0, quotes: 0, users: 0 }
    activityByMonth.set(month, { ...current, quotes: current.quotes + 1 })
  })

  usersWithDates.forEach(user => {
    const month = new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short' })
    const current = activityByMonth.get(month) || { orders: 0, quotes: 0, users: 0 }
    activityByMonth.set(month, { ...current, users: current.users + 1 })
  })

  const activityData = Array.from(activityByMonth.entries()).map(([name, data]) => ({
    name,
    ...data
  }))

  const statusData = ordersByStatus.map(item => ({
    name: item.status,
    value: item._count.status
  }))

  return {
    totalProducts,
    totalOrders,
    pendingQuotes,
    totalUsers,
    totalServices,
    totalIndustries,
    totalCategories,
    recentOrders,
    recentQuotes,
    statusData,
    revenueData,
    activityData
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/dashboard')
  }

  const stats = await getAdminStats()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-white/60 mt-2">Manage your platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Categories</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalCategories}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Products</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalProducts}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Services</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalServices}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Industries</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalIndustries}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Orders</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalOrders}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Pending Quotes</div>
            <div className="text-3xl font-bold text-yellow-400">{stats.pendingQuotes}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total Users</div>
            <div className="text-3xl font-bold text-blue-400">{stats.totalUsers}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Link href="/admin/products"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Products
            </Link>
            <Link href="/admin/categories"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Categories
            </Link>
            <Link href="/admin/services"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Services
            </Link>
            <Link href="/admin/industries"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Industries
            </Link>
            <Link href="/admin/orders"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Orders
            </Link>
            <Link href="/admin/quotes"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Quotes
            </Link>
            <Link href="/admin/users"
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg text-center hover:shadow-glow-blue transition">
              Manage Users
            </Link>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Activity Trends</h2>
            <MultiLineChart data={stats.activityData} />
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Order Status Distribution</h2>
            <StatusPieChart data={stats.statusData} />
          </div>
        </div>

        {/* Revenue Analytics */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Monthly Revenue</h2>
          <RevenueBarChart data={stats.revenueData} />
        </div>

        {/* Recent Orders */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl mb-8">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-white/80">#{order.id.slice(-8)}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{order.user.name}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        order.status === 'DELIVERED' ? 'bg-green-500/20 text-green-400' :
                        order.status === 'SHIPPED' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Recent Quote Requests</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {stats.recentQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 text-sm text-white/80">{quote.name}</td>
                    <td className="px-6 py-4 text-sm text-white/80">{quote.serviceType}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        quote.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                        quote.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{new Date(quote.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
