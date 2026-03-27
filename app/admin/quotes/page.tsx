'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Loading from '@/components/Loading'

interface Quote {
  id: string
  name: string
  email: string
  phone: string
  company: string | null
  serviceType: string
  message: string
  status: string
  adminNotes: string | null
  createdAt: string
  user: { name: string; role: string } | null
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null)
  const [adminNotes, setAdminNotes] = useState('')
  const [newStatus, setNewStatus] = useState('')

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const res = await fetch('/api/quotes')
      if (res.ok) {
        const data = await res.json()
        setQuotes(data)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const openUpdateModal = (quote: Quote, status: string) => {
    setSelectedQuote(quote)
    setNewStatus(status)
    setAdminNotes(quote.adminNotes || '')
    setShowModal(true)
  }

  const handleUpdateQuote = async () => {
    if (!selectedQuote) return

    try {
      const res = await fetch(`/api/admin/quotes/${selectedQuote.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          adminNotes
        })
      })

      if (res.ok) {
        setShowModal(false)
        setSelectedQuote(null)
        setAdminNotes('')
        fetchQuotes()
      } else {
        alert('Failed to update quote')
      }
    } catch (error) {
      console.error('Error updating quote:', error)
      alert('Failed to update quote')
    }
  }

  const pendingQuotes = quotes.filter(q => q.status === 'PENDING')
  const approvedQuotes = quotes.filter(q => q.status === 'APPROVED')
  const rejectedQuotes = quotes.filter(q => q.status === 'REJECTED')

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white">Manage Quotes</h1>
            <p className="text-white/60 mt-2">Review and respond to quote requests</p>
          </div>
          <Link href="/admin" className="bg-white/10 border border-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition">
            Back to Dashboard
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400">{pendingQuotes.length}</div>
            <div className="text-yellow-400/70">Pending Quotes</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">{approvedQuotes.length}</div>
            <div className="text-green-400/70">Approved Quotes</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400">{rejectedQuotes.length}</div>
            <div className="text-red-400/70">Rejected Quotes</div>
          </div>
        </div>

        {quotes.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-12 text-center">
            <p className="text-xl text-white/60">No quote requests yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{quote.name}</h3>
                    <p className="text-sm text-white/60">{quote.email} • {quote.phone}</p>
                    {quote.company && (
                      <p className="text-sm text-white/60">Company: {quote.company}</p>
                    )}
                    <p className="text-sm text-white/40 mt-1">
                      {new Date(quote.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    quote.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                    quote.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {quote.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-white/70 mb-1">Service Type:</div>
                  <div className="text-white">{quote.serviceType}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-semibold text-white/70 mb-1">Message:</div>
                  <div className="text-white/80 bg-white/5 border border-white/10 p-4 rounded-lg">{quote.message}</div>
                </div>

                {quote.adminNotes && (
                  <div className="mb-4">
                    <div className="text-sm font-semibold text-white/70 mb-1">Admin Notes:</div>
                    <div className="text-white/80 bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">{quote.adminNotes}</div>
                  </div>
                )}

                <div className="border-t border-white/10 pt-4 flex gap-2">
                  <button
                    onClick={() => openUpdateModal(quote, 'APPROVED')}
                    disabled={quote.status === 'APPROVED'}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => openUpdateModal(quote, 'REJECTED')}
                    disabled={quote.status === 'REJECTED'}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Reject
                  </button>
                  {quote.status !== 'PENDING' && (
                    <button
                      onClick={() => openUpdateModal(quote, 'PENDING')}
                      className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                    >
                      Reset to Pending
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedQuote && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900/95 border border-white/10 rounded-xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {newStatus === 'APPROVED' ? 'Approve' : newStatus === 'REJECTED' ? 'Reject' : 'Update'} Quote
            </h2>
            
            <div className="mb-4">
              <p className="text-sm text-white/60">Quote from: <span className="font-semibold text-white">{selectedQuote.name}</span></p>
              <p className="text-sm text-white/60">Service: <span className="font-semibold text-white">{selectedQuote.serviceType}</span></p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Admin Notes {newStatus === 'REJECTED' && '(Required for rejection)'}
              </label>
              <textarea
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 text-white placeholder-white/30 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Add notes for the customer..."
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleUpdateQuote}
                className={`flex-1 py-3 rounded-lg text-white font-semibold transition ${
                  newStatus === 'APPROVED' ? 'bg-green-500 hover:bg-green-600' :
                  newStatus === 'REJECTED' ? 'bg-red-500 hover:bg-red-600' :
                  'bg-yellow-500 hover:bg-yellow-600'
                }`}
              >
                Confirm {newStatus === 'APPROVED' ? 'Approval' : newStatus === 'REJECTED' ? 'Rejection' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedQuote(null)
                  setAdminNotes('')
                }}
                className="flex-1 bg-white/10 border border-white/10 text-white py-3 rounded-lg hover:bg-white/20 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

