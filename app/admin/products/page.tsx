'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useNotification } from '@/hooks/useNotification'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  categoryId: string
  price: number
  stock: number
  image: string
  category: { id: string; name: string }
}

interface Category {
  id: string
  name: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; productId: string; productName: string }>({ show: false, productId: '', productName: '' })
  const [deleting, setDeleting] = useState(false)
  const { notification, showSuccess, showError, hideNotification } = useNotification()
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    categoryId: '',
    price: '',
    stock: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/categories')
      ])

      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData)
      }

      if (categoriesRes.ok) {
        const catsData = await categoriesRes.json()
        setCategories(catsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setUploading(true)
      let imageUrl = formData.imageUrl || '/products/default.jpg'

      // Upload image if a new file is selected
      if (imageFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', imageFile)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        })

        if (uploadRes.ok) {
          const { imageUrl: uploadedUrl } = await uploadRes.json()
          imageUrl = uploadedUrl
        } else {
          const errorData = await uploadRes.json()
          console.error('Upload error:', errorData)
          showError(errorData.error || 'Failed to upload image')
          setUploading(false)
          return
        }
      }

      const url = editingProduct 
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products'
      
      const method = editingProduct ? 'PATCH' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          image: imageUrl
        })
      })

      if (res.ok) {
        setShowModal(false)
        setEditingProduct(null)
        resetForm()
        fetchData()
        showSuccess(editingProduct ? 'Product updated successfully!' : 'Product added successfully!')
      } else {
        showError('Failed to save product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      showError('Failed to save product')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    const currentImage = product.image || '/products/default.jpg'
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description,
      categoryId: product.categoryId,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: currentImage,
    })
    setImagePreview(currentImage)
    setImageFile(null)
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchData()
        showSuccess('Product deleted!')
      } else {
        showError('Failed to delete product')
      }
    } catch {
      showError('Failed to delete product')
    } finally {
      setDeleting(false)
      setDeleteConfirm({ show: false, productId: '', productName: '' })
    }
  }

  const confirmDelete = (product: Product) => {
    setDeleteConfirm({
      show: true,
      productId: product.id,
      productName: product.name
    })
  }

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      categoryId: '',
      price: '',
      stock: '',
      imageUrl: '',
    })
    setImageFile(null)
    setImagePreview('')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openAddModal = () => {
    setEditingProduct(null)
    resetForm()
    setShowModal(true)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Products</h1>
            <p className="text-white/60 mt-2">Add, edit, or remove products</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={openAddModal}
              className="bg-gradient-aviation text-white px-6 py-3 rounded-lg hover:shadow-glow-blue transition"
            >
              + Add Product
            </button>
            <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-white/5">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{product.name}</div>
                      <div className="text-sm text-white/50">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">{product.category.name}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-white">${product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        product.stock > 10 ? 'bg-green-500/20 text-green-400' :
                        product.stock > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(product)} className="text-blue-400 hover:text-blue-300 font-medium text-sm">Edit</button>
                        <button onClick={() => confirmDelete(product)} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Product Name *</label>
                <input type="text" required value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Slug *</label>
                <input type="text" required value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description *</label>
                <textarea required rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Product Image</label>
                <input type="file" accept="image/*" onChange={handleImageChange}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                <p className="text-xs text-white/30 mt-1">Upload an image (max 5MB). Default image used if none uploaded.</p>
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-white/60 mb-2">Preview:</p>
                    <img src={imagePreview} alt="Preview" className="w-40 h-40 object-cover rounded border border-white/10" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Category *</label>
                <select required value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="" className="bg-gray-900">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-gray-900">{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Price *</label>
                  <input type="number" step="0.01" required value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Stock *</label>
                  <input type="number" required min="1" value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={uploading}
                  className="flex-1 bg-gradient-aviation text-white py-3 rounded-lg hover:shadow-glow-blue transition disabled:opacity-50">
                  {uploading ? 'Uploading...' : editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button type="button" disabled={uploading}
                  onClick={() => { setShowModal(false); setEditingProduct(null); resetForm() }}
                  className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition disabled:opacity-50">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={hideNotification}
        />
      )}

      {deleteConfirm.show && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${deleteConfirm.productName}"?`}
          disclaimer="This will permanently delete all orders and cart items linked to this product."
          confirmText="Delete" cancelText="Cancel" type="danger"
          loading={deleting}
          onConfirm={() => handleDelete(deleteConfirm.productId)}
          onCancel={() => !deleting && setDeleteConfirm({ show: false, productId: '', productName: '' })}
        />
      )}
    </div>
  )
}
