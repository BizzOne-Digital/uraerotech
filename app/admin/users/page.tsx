'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'

interface User {
  id: string
  name: string
  email: string
  role: string
  company: string | null
  phone: string | null
  createdAt: string
  _count: {
    orders: number
    quotes: number
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'B2C',
    company: '',
    phone: ''
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users')
      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingUser 
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users'
      
      const method = editingUser ? 'PATCH' : 'POST'
      
      const body: any = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        company: formData.company || null,
        phone: formData.phone || null
      }

      // Only include password for new users or if it's being changed
      if (!editingUser || formData.password) {
        body.password = formData.password
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (res.ok) {
        setShowModal(false)
        setEditingUser(null)
        resetForm()
        fetchUsers()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to save user')
      }
    } catch (error) {
      console.error('Error saving user:', error)
      alert('Failed to save user')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      company: user.company || '',
      phone: user.phone || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this user? This will also delete their orders and quotes.')) return

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      })

      if (res.ok) {
        fetchUsers()
      } else {
        const error = await res.json()
        alert(error.error || 'Failed to delete user')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'B2C',
      company: '',
      phone: ''
    })
  }

  const openAddModal = () => {
    setEditingUser(null)
    resetForm()
    setShowModal(true)
  }

  if (loading) {
    return <Loading />
  }

  // Filter out admin users - only show customers
  const customerUsers = users.filter(u => u.role !== 'ADMIN')
  const b2cUsers = customerUsers.filter(u => u.role === 'B2C')
  const b2bUsers = customerUsers.filter(u => u.role === 'B2B')

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Users</h1>
            <p className="text-white/60 mt-2">Add, edit, or remove users</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openAddModal}
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg hover:shadow-glow-blue transition"
            >
              + Add User
            </button>
            <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-white">{customerUsers.length}</div>
            <div className="text-white/60">Total Customers</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400">{b2cUsers.length}</div>
            <div className="text-blue-400/70">B2C Customers</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400">{b2bUsers.length}</div>
            <div className="text-purple-400/70">B2B Customers</div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Quotes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Joined</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {customerUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{user.name}</div>
                      <div className="text-sm text-white/50">{user.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === 'B2B' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{user.company || '-'}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{user.phone || '-'}</td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">{user._count.orders}</td>
                    <td className="px-6 py-4 text-sm text-white font-semibold">{user._count.quotes}</td>
                    <td className="px-6 py-4 text-sm text-white/60">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(user)} className="text-blue-400 hover:text-blue-300 font-medium text-sm">Edit</button>
                        <button onClick={() => handleDelete(user.id)} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-2">📊 Customer Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <div className="text-sm text-blue-400/70">Total Orders</div>
              <div className="text-2xl font-bold text-blue-300">
                {customerUsers.reduce((sum, user) => sum + user._count.orders, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-400/70">Total Quotes</div>
              <div className="text-2xl font-bold text-blue-300">
                {customerUsers.reduce((sum, user) => sum + user._count.quotes, 0)}
              </div>
            </div>
            <div>
              <div className="text-sm text-blue-400/70">Active Customers</div>
              <div className="text-2xl font-bold text-blue-300">
                {customerUsers.filter(u => u._count.orders > 0).length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Email *</label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Password {editingUser ? '(leave blank to keep current)' : '*'}
                </label>
                <input type="password" required={!editingUser} value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={editingUser ? 'Leave blank to keep current password' : ''}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Role *</label>
                <select required value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="B2C" className="bg-gray-900">B2C Customer</option>
                  <option value="B2B" className="bg-gray-900">B2B Customer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Company</label>
                <input type="text" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Phone</label>
                <input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="submit"
                  className="flex-1 bg-gradient-aviation text-white py-3 rounded-lg hover:shadow-glow-blue transition">
                  {editingUser ? 'Update User' : 'Add User'}
                </button>
                <button type="button"
                  onClick={() => { setShowModal(false); setEditingUser(null); resetForm() }}
                  className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

