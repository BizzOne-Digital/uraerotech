'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Notification from '@/components/Notification'
import { useNotification } from '@/hooks/useNotification'

export default function SignUp() {
  const router = useRouter()
  const { notification, showSuccess, showError, hideNotification } = useNotification()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '', role: 'B2C', company: '', phone: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) return showError('Passwords do not match')
    if (formData.password.length < 6) return showError('Password must be at least 6 characters')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        showError(data.error || 'Something went wrong')
      } else {
        showSuccess('Account created! Redirecting...')
        setTimeout(() => router.push('/auth/signin?registered=true'), 2000)
      }
    } catch {
      showError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
  const labelClass = "block text-sm font-medium text-white/70 mb-2"

  const EyeIcon = ({ show }: { show: boolean }) => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d={show ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            : "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
    </svg>
  )

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-2 text-white/60">Join UR Aerotech today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input type="text" required value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={inputClass} placeholder="Your full name" />
            </div>

            <div>
              <label className={labelClass}>Email</label>
              <input type="email" required value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputClass} placeholder="you@example.com" />
            </div>

            <div>
              <label className={labelClass}>Account Type</label>
              <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-lg">
                {[['B2C', '👤 Individual'], ['B2B', '🏢 Business']].map(([role, label]) => (
                  <button key={role} type="button" onClick={() => setFormData({ ...formData, role })}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                      formData.role === role ? 'bg-gradient-aviation text-white shadow' : 'text-white/60 hover:text-white'
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {formData.role === 'B2B' && (
              <div>
                <label className={labelClass}>Company Name</label>
                <input type="text" value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={inputClass} placeholder="Your company" />
              </div>
            )}

            <div>
              <label className={labelClass}>Phone</label>
              <input type="tel" value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={inputClass} placeholder="+1 (555) 000-0000" />
            </div>

            {[
              ['Password', 'password', showPassword, () => setShowPassword(!showPassword)],
              ['Confirm Password', 'confirmPassword', showConfirm, () => setShowConfirm(!showConfirm)],
            ].map(([label, field, show, toggle]: any) => (
              <div key={field}>
                <label className={labelClass}>{label}</label>
                <div className="relative">
                  <input type={show ? 'text' : 'password'} required minLength={6}
                    value={formData[field as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className={`${inputClass} pr-12`} placeholder="••••••••" />
                  <button type="button" onClick={toggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
                    <EyeIcon show={show} />
                  </button>
                </div>
              </div>
            ))}

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-gradient-aviation rounded-lg text-white font-semibold hover:shadow-glow-blue transition-all duration-300 disabled:opacity-50">
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 font-semibold">Sign In</Link>
            </p>
          </div>
        </div>

        {notification.show && (
          <Notification type={notification.type} message={notification.message} onClose={hideNotification} />
        )}
      </div>
    </div>
  )
}
