'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useNotification } from '@/hooks/useNotification'

interface Category {
  id: string
  name: string
  slug: string
  description?: string
  _count: { products: number }
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string; name: string }>({ show: false, id: '', name: '' })
  const { notification, showSuccess, showError, hideNotification } = useNotification()
  const [form, setForm] = useState({ name: '', slug: '', description: '' })

  useEffect(() => { fetchCategories() }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories')
      if (res.ok) setCategories(await res.json())
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', slug: '', description: '' })
    setShowModal(true)
  }

  const openEdit = (cat: Category) => {
    setEditing(cat)
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || '' })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const url = editing ? `/api/admin/categories/${editing.id}` : '/api/admin/categories'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (res.ok) {
        showSuccess(editing ? 'Category updated!' : 'Category created!')
        setShowModal(false)
        fetchCategories()
      } else {
        const err = await res.json()
        showError(err.error || 'Failed to save category')
      }
    } catch {
      showError('Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
      if (res.ok) {
        showSuccess('Category and all linked products deleted!')
        fetchCategories()
      } else {
        showError('Failed to delete category')
      }
    } catch {
      showError('Failed to delete category')
    } finally {
      setDeleting(false)
      setDeleteConfirm({ show: false, id: '', name: '' })
    }
  }

  if (loading) return <Loading />

  const totalProducts = categories.reduce((s, c) => s + c._count.products, 0)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Categories</h1>
            <p className="text-white/60 mt-2">Add, edit, or remove product categories</p>
          </div>
          <div className="flex gap-4">
            <button onClick={openAdd}
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg hover:shadow-glow-blue transition">
              + Add Category
            </button>
            <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-sm text-white/60 mb-1">Total Categories</div>
            <div className="text-3xl font-bold text-blue-400">{categories.length}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-sm text-white/60 mb-1">Total Products</div>
            <div className="text-3xl font-bold text-blue-400">{totalProducts}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-sm text-white/60 mb-1">Empty Categories</div>
            <div className="text-3xl font-bold text-yellow-400">{categories.filter(c => c._count.products === 0).length}</div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Products</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {categories.map(cat => (
                  <tr key={cat.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 font-semibold text-white">{cat.name}</td>
                    <td className="px-6 py-4 text-sm text-white/50">{cat.slug}</td>
                    <td className="px-6 py-4 text-sm text-white/60 max-w-xs truncate">{cat.description || '—'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${cat._count.products > 0 ? 'bg-blue-500/20 text-blue-400' : 'bg-white/10 text-white/40'}`}>
                        {cat._count.products} products
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => openEdit(cat)} className="text-blue-400 hover:text-blue-300 text-sm font-medium">Edit</button>
                        <button onClick={() => setDeleteConfirm({ show: true, id: cat.id, name: cat.name })}
                          className="text-red-400 hover:text-red-300 text-sm font-medium">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">No categories yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-md w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{editing ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                <input type="text" required value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Slug *</label>
                <input type="text" required value={form.slug}
                  onChange={e => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
                <textarea rows={3} value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div className="flex gap-4 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-gradient-aviation text-white py-3 rounded-lg hover:shadow-glow-blue transition disabled:opacity-50">
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {notification.show && <Notification type={notification.type} message={notification.message} onClose={hideNotification} />}

      {deleteConfirm.show && (
        <ConfirmDialog
          title="Delete Category"
          message={`Are you sure you want to delete "${deleteConfirm.name}"?`}
          disclaimer="All products in this category and their linked orders will also be permanently deleted."
          confirmText="Delete" cancelText="Cancel" type="danger"
          loading={deleting}
          onConfirm={() => handleDelete(deleteConfirm.id)}
          onCancel={() => !deleting && setDeleteConfirm({ show: false, id: '', name: '' })}
        />
      )}
    </div>
  )
}
