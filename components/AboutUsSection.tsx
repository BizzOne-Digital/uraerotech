'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function AboutUsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('about-section')
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section id="about-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4">ABOUT US</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Excellence in Aircraft Structural Repairs
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 hover:border-blue-400/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Our Mission</h3>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base">
              To provide world-class aircraft structural repair services and parts, ensuring the highest standards of safety, quality, and reliability for our clients in the aviation industry. We are committed to excellence in every project, from initial assessment to final certification.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-500 hover:border-blue-400/50">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Our Vision</h3>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base">
              To be the global leader in aircraft structural repair and modification services, recognized for our innovation, expertise, and unwavering commitment to safety. We strive to set the standard for excellence in the aviation maintenance industry.
            </p>
          </div>
        </div>

        <div
          className={`mt-8 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <Link
            href="/about"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-105 transform"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  )
}
