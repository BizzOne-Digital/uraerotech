'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function CTASection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('cta-section')
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section id="cta-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1920')" }}
        />
      </div>

      <div
        className={`relative z-20 max-w-4xl mx-auto text-center text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="text-sm uppercase tracking-wider text-white/80 mb-4">GET IN TOUCH</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Partner with the Experts in Aircraft Structural Repair
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Contact us today to discuss your repair needs or to explore our inventory of aircraft parts and tools.
        </p>
        <Link
          href="/contact"
          className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all duration-300 text-white font-semibold text-sm sm:text-base hover:scale-105 transform shadow-lg hover:shadow-blue-500/50"
        >
          CONTACT US
          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  )
}
