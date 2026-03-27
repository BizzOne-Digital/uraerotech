'use client'

import { QuoteForm } from '@/components/QuoteForm'

export default function QuotePage() {
  return (
    <div className="min-h-screen py-20 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Request a Quote</h1>
          <p className="text-white/60">Fill out the form and we'll get back to you within 24 hours.</p>
        </div>
        <QuoteForm type="none" />
      </div>
    </div>
  )
}
