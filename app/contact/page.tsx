'use client'

import { useState } from 'react'
import { ScrollAnimation } from '@/components/ScrollAnimation'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setSuccess(true)
      setIsLoading(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 1000)
  }

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] overflow-hidden -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/services-bg.jpg')",
            filter: 'brightness(0.6)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-indigo-950/85 to-sky-900/80" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl">
              Get in touch with our team. We&apos;re here to help with all your aircraft structural repair needs.
            </p>
          </div>
        </div>
      </section>

      <div className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto -mt-10 sm:-mt-16 md:-mt-20 relative z-10">

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* Phone */}
            <ScrollAnimation animation="slideLeft" delay={0}>
              <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 text-center hover:bg-blue-600/25 transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                <div className="flex-1 flex flex-col justify-center">
                  <a href="tel:+491732504540" className="text-blue-400 hover:text-blue-300 transition-colors block mb-1">
                    +49 173 250 4540
                  </a>
                  <a href="tel:+491732498648" className="text-blue-400 hover:text-blue-300 transition-colors block">
                    +49 173 249 8648
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Email */}
            <ScrollAnimation animation="fadeIn" delay={100}>
              <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 text-center hover:bg-blue-600/25 transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                <div className="flex-1 flex flex-col justify-center">
                  <a
                    href="https://mail.google.com/mail/u/0/?fs=1&to=info@uraerotech.com&tf=cm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    info@uraerotech.com
                  </a>
                </div>
              </div>
            </ScrollAnimation>

            {/* Address */}
            <ScrollAnimation animation="slideRight" delay={200}>
              <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 text-center hover:bg-blue-600/25 transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Address</h3>
                <div className="flex-1 flex flex-col justify-center">
                  <a
                    href="https://maps.app.goo.gl/Hq7DRmcTpmowDy8Z6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-blue-400 transition-colors text-sm leading-relaxed"
                  >
                    Gaterstr. 66B<br />
                    52538, Gangelt<br />
                    Germany
                  </a>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Contact Form */}
          <ScrollAnimation animation="slideLeft" delay={100}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 md:p-12 shadow-xl mb-6 sm:mb-8">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-1 h-8 sm:h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Send Us a Message</h2>
              </div>

              {success ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Thank You!</h3>
                  <p className="text-white/70 mb-4 sm:mb-6 text-base sm:text-lg">
                    We&apos;ve received your message and will get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg transition-all text-white font-semibold text-sm sm:text-base"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+49 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-white/80 text-sm font-medium mb-2">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">Message *</label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      placeholder="Tell us about your aircraft structural repair needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollAnimation>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Business Hours */}
            <ScrollAnimation animation="slideRight" delay={200}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Business Hours</h3>
                </div>
                <div className="space-y-3 text-white/80">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="font-medium">Monday – Friday</span>
                    <span className="text-blue-400">08:00 – 17:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="font-medium">Saturday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-red-400">Closed</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Quick Actions */}
            <ScrollAnimation animation="fadeIn" delay={250}>
              <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Quick Actions</h3>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/quote"
                    className="block w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg transition-all text-white font-semibold text-center text-sm sm:text-base"
                  >
                    Request a Quote
                  </Link>
                  <Link
                    href="/products"
                    className="block w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white font-semibold text-center text-sm sm:text-base"
                  >
                    Browse Products
                  </Link>
                  <Link
                    href="/services"
                    className="block w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white font-semibold text-center text-sm sm:text-base"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            {/* Why Contact Us */}
            <ScrollAnimation animation="slideLeft" delay={300}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="w-1 h-6 sm:h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Why Contact Us?</h3>
                </div>
                <ul className="space-y-3 text-white/70">
                  {[
                    'Expert consultation on aircraft structural repairs',
                    'Custom quotes for your specific needs',
                    '24/7 emergency support available',
                    'FAA and EASA certified services',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollAnimation>
          </div>

        </div>
      </div>
    </div>
  )
}
