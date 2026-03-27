'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'
import Notification from '@/components/Notification'
import ConfirmDialog from '@/components/ConfirmDialog'
import { useNotification } from '@/hooks/useNotification'

interface Service {
  id: string
  name: string
  slug: string
  description: string
  content: string
  icon: string
  image: string
  images: string[]
  isActive: boolean
}

const emptyForm = {
  name: '', slug: '', description: '', content: '', icon: '🔧', isActive: true
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [mainImageFile, setMainImageFile] = useState<File | null>(null)
  const [mainImagePreview, setMainImagePreview] = useState('')
  const [galleryFiles, setGalleryFiles] = useState<File[]>([])
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([])
  const [existingGallery, setExistingGallery] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; id: string; name: string }>({ show: false, id: '', name: '' })
  const [deleting, setDeleting] = useState(false)
  const { notification, showSuccess, showError, hideNotification } = useNotification()

  useEffect(() => { fetchServices() }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/services')
      if (res.ok) setServices(await res.json())
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('folder', 'services')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!res.ok) throw new Error('Upload failed')
    const { imageUrl } = await res.json()
    return imageUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    try {
      let image = editing?.image || ''
      if (mainImageFile) image = await uploadImage(mainImageFile)

      let images = existingGallery
      if (galleryFiles.length > 0) {
        const uploaded = await Promise.all(galleryFiles.map(f => uploadImage(f)))
        images = [...existingGallery, ...uploaded].slice(0, 3)
      }

      const url = editing ? `/api/admin/services/${editing.id}` : '/api/admin/services'
      const method = editing ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image, images })
      })
      if (res.ok) {
        setShowModal(false)
        resetForm()
        fetchServices()
        showSuccess(editing ? 'Service updated!' : 'Service created!')
      } else {
        showError('Failed to save service')
      }
    } catch { showError('Failed to save service') }
    finally { setUploading(false) }
  }

  const handleEdit = (s: Service) => {
    setEditing(s)
    setFormData({ name: s.name, slug: s.slug, description: s.description, content: s.content, icon: s.icon, isActive: s.isActive })
    setMainImagePreview(s.image || '')
    setMainImageFile(null)
    setGalleryFiles([])
    setGalleryPreviews([])
    setExistingGallery(s.images || [])
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
      if (res.ok) { fetchServices(); showSuccess('Service deleted!') }
      else showError('Failed to delete service')
    } catch { showError('Failed to delete service') }
    finally { setDeleting(false); setDeleteConfirm({ show: false, id: '', name: '' }) }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData(emptyForm)
    setMainImageFile(null)
    setMainImagePreview('')
    setGalleryFiles([])
    setGalleryPreviews([])
    setExistingGallery([])
  }

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setMainImageFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setMainImagePreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const remaining = 3 - existingGallery.length
    const allowed = files.slice(0, remaining)
    setGalleryFiles(allowed)
    const previews: string[] = []
    allowed.forEach((file, idx) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        previews[idx] = reader.result as string
        if (previews.filter(Boolean).length === allowed.length) setGalleryPreviews([...previews])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeExistingGalleryImage = (index: number) => {
    setExistingGallery(prev => prev.filter((_, i) => i !== index))
  }

  const openAdd = () => { resetForm(); setShowModal(true) }

  if (loading) return <Loading />

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Services</h1>
            <p className="text-white/60 mt-2">Add, edit, or remove services</p>
          </div>
          <div className="flex gap-4">
            <button onClick={openAdd} className="bg-gradient-aviation text-white px-6 py-3 rounded-lg hover:shadow-glow-blue transition">+ Add Service</button>
            <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">Back to Dashboard</Link>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Icon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{s.name}</div>
                    <div className="text-sm text-white/50">{s.slug}</div>
                  </td>
                  <td className="px-6 py-4 text-2xl">{s.icon}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs ${s.isActive ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'}`}>
                      {s.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(s)} className="text-blue-400 hover:text-blue-300 font-medium text-sm">Edit</button>
                      <button onClick={() => setDeleteConfirm({ show: true, id: s.id, name: s.name })} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold text-white mb-6">{editing ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Name *</label>
                  <input type="text" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Slug *</label>
                  <input type="text" required value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Icon (emoji) *</label>
                <input type="text" required value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Description *</label>
                <textarea required rows={3} value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Content *</label>
                <textarea required rows={10} value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Use **Heading** for headings and - item for bullet lists"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">Main Image</label>
                <input type="file" accept="image/*" onChange={handleMainImage}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-lg focus:outline-none" />
                <p className="text-xs text-white/30 mt-1">Max 5MB. Current image kept if none selected.</p>
                {mainImagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-white/60 mb-2">Preview:</p>
                    <img src={mainImagePreview} alt="Preview" className="w-40 h-40 object-cover rounded border border-white/10" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Gallery Images <span className="text-white/40 font-normal">(max 3)</span>
                </label>
                {existingGallery.length > 0 && (
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {existingGallery.map((url, i) => (
                      <div key={i} className="relative">
                        <img src={url} alt={`Gallery ${i + 1}`} className="w-24 h-24 object-cover rounded border border-white/10" />
                        <button type="button" onClick={() => removeExistingGalleryImage(i)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">✕</button>
                      </div>
                    ))}
                  </div>
                )}
                {existingGallery.length < 3 && (
                  <>
                    <input type="file" accept="image/*" multiple onChange={handleGalleryImages}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-lg focus:outline-none" />
                    <p className="text-xs text-white/30 mt-1">{3 - existingGallery.length} slot(s) remaining.</p>
                  </>
                )}
                {galleryPreviews.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {galleryPreviews.map((src, i) => (
                      <img key={i} src={src} alt={`New ${i + 1}`} className="w-24 h-24 object-cover rounded border border-blue-500/40" />
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="accent-blue-500" />
                <span className="text-sm text-white/70">Active</span>
              </label>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={uploading}
                  className="flex-1 bg-gradient-aviation text-white py-3 rounded-lg hover:shadow-glow-blue transition disabled:opacity-50">
                  {uploading ? 'Uploading...' : editing ? 'Update Service' : 'Add Service'}
                </button>
                <button type="button" disabled={uploading} onClick={() => { setShowModal(false); resetForm() }}
                  className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition disabled:opacity-50">
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
          title="Delete Service"
          message={`Are you sure you want to delete "${deleteConfirm.name}"?`}
          disclaimer="All quote requests linked to this service will also be permanently deleted."
          confirmText="Delete" cancelText="Cancel" type="danger"
          loading={deleting}
          onConfirm={() => handleDelete(deleteConfirm.id)}
          onCancel={() => !deleting && setDeleteConfirm({ show: false, id: '', name: '' })}
        />
      )}
    </div>
  )
}
