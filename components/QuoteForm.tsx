'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

interface QuoteFormProps {
  /** 'service' | 'industry' | 'general' — controls which dropdown is shown and preselected */
  type?: 'service' | 'industry' | 'general' | 'none'
  /** Pre-select a specific service or industry name */
  preselected?: string
  compact?: boolean
}

export function QuoteForm({ type = 'general', preselected = '', compact = false }: QuoteFormProps) {
  const { data: session } = useSession()
  const isB2B = session?.user?.role === 'B2B'

  const [services, setServices] = useState<{ id: string; name: string }[]>([])
  const [industries, setIndustries] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: type === 'service' ? preselected : '',
    industryType: type === 'industry' ? preselected : '',
    message: '',
    estimatedQuantity: '',
    deliveryTimeline: '',
    paymentTerms: 'IMMEDIATE',
  })

  // Sync preselected value when prop changes
  useEffect(() => {
    if (type === 'service' && preselected) {
      setFormData(prev => ({ ...prev, serviceType: preselected }))
    }
    if (type === 'industry' && preselected) {
      setFormData(prev => ({ ...prev, industryType: preselected }))
    }
  }, [type, preselected])

  // Sync session values once loaded
  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || session.user.name || '',
        email: prev.email || session.user.email || '',
        paymentTerms: isB2B ? 'NET30' : 'IMMEDIATE',
      }))
    }
  }, [session, isB2B])

  useEffect(() => {
    fetch('/api/services').then(r => r.json()).then(data => setServices(data || [])).catch(() => {})
    fetch('/api/industries').then(r => r.json()).then(data => setIndustries(data || [])).catch(() => {})
  }, [])

  const set = (field: string, value: string) => setFormData(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          serviceType: formData.serviceType
            ? `Service: ${formData.serviceType}`
            : formData.industryType
            ? `Industry: ${formData.industryType}`
            : 'General Inquiry',
          message: formData.message,
        })
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Failed to submit. Please try again.')
      }
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
  const labelClass = "block text-sm font-medium text-white/70 mb-1.5"

  if (success) {
    return (
      <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-8 text-center">
        <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quote Submitted!</h3>
        <p className="text-white/60 text-sm mb-4">We'll get back to you within 24–48 hours.</p>
        <button onClick={() => setSuccess(false)}
          className="px-5 py-2 bg-gradient-aviation rounded-lg text-white text-sm font-semibold hover:shadow-glow-blue transition-all">
          Submit Another
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-xl ${compact ? 'p-6' : 'p-8'}`}>
      <h2 className={`font-bold text-white mb-5 ${compact ? 'text-xl' : 'text-2xl'}`}>
        {type === 'service' && preselected ? `Request a Quote — ${preselected}` :
         type === 'industry' && preselected ? `Request a Quote — ${preselected}` :
         'Request a Quote'}
      </h2>

      {isB2B && (
        <div className="mb-4 text-sm text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg px-3 py-2">
          🏢 Business customer — priority processing & flexible payment terms
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input type="text" required value={formData.name} onChange={e => set('name', e.target.value)}
              className={inputClass} placeholder="John Doe" />
          </div>
          <div>
            <label className={labelClass}>Email *</label>
            <input type="email" required value={formData.email} onChange={e => set('email', e.target.value)}
              className={inputClass} placeholder="john@example.com" />
          </div>
        </div>

        {/* Phone + Company */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Phone *</label>
            <input type="tel" required value={formData.phone} onChange={e => set('phone', e.target.value)}
              className={inputClass} placeholder="+1 (555) 123-4567" />
          </div>
          <div>
            <label className={labelClass}>Company</label>
            <input type="text" value={formData.company} onChange={e => set('company', e.target.value)}
              className={inputClass} placeholder="Company Name" />
          </div>
        </div>

        {/* Service — dropdown if no preselection, static label if preselected */}
        {(type === 'service' || type === 'general') && (
          <div>
            <label className={labelClass}>Service *</label>
            {type === 'service' && preselected ? (
              <div className={`${inputClass} text-white/80 cursor-default`}>{preselected}</div>
            ) : (
              <select required={type === 'service'} value={formData.serviceType} onChange={e => set('serviceType', e.target.value)}
                className={`${inputClass} [&>option]:bg-gray-900`}>
                <option value="">Select a service</option>
                {services.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            )}
          </div>
        )}

        {/* Industry — dropdown if no preselection, static label if preselected */}
        {(type === 'industry' || type === 'general') && (
          <div>
            <label className={labelClass}>Industry *</label>
            {type === 'industry' && preselected ? (
              <div className={`${inputClass} text-white/80 cursor-default`}>{preselected}</div>
            ) : (
              <select required={type === 'industry'} value={formData.industryType} onChange={e => set('industryType', e.target.value)}
                className={`${inputClass} [&>option]:bg-gray-900`}>
                <option value="">Select an industry</option>
                {industries.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
              </select>
            )}
          </div>
        )}

        {/* Message */}
        <div>
          <label className={labelClass}>Message *</label>
          <textarea required rows={compact ? 4 : 5} value={formData.message} onChange={e => set('message', e.target.value)}
            className={inputClass} placeholder="Please describe your requirements..." />
        </div>

        {/* B2B extras */}
        {isB2B && (
          <div className="border-t border-white/10 pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Estimated Quantity</label>
                <input type="text" value={formData.estimatedQuantity} onChange={e => set('estimatedQuantity', e.target.value)}
                  className={inputClass} placeholder="e.g., 100 units" />
              </div>
              <div>
                <label className={labelClass}>Delivery Timeline</label>
                <select value={formData.deliveryTimeline} onChange={e => set('deliveryTimeline', e.target.value)}
                  className={`${inputClass} [&>option]:bg-gray-900`}>
                  <option value="">Select timeline</option>
                  <option value="URGENT">Urgent (1–2 weeks)</option>
                  <option value="STANDARD">Standard (3–4 weeks)</option>
                  <option value="FLEXIBLE">Flexible (1–2 months)</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelClass}>Payment Terms</label>
              <select value={formData.paymentTerms} onChange={e => set('paymentTerms', e.target.value)}
                className={`${inputClass} [&>option]:bg-gray-900`}>
                <option value="NET30">Net 30 Days</option>
                <option value="NET60">Net 60 Days</option>
                <option value="IMMEDIATE">Immediate Payment</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2">
          {loading ? (
            <><span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />Submitting...</>
          ) : 'Submit Quote Request'}
        </button>
      </form>
    </div>
  )
}
