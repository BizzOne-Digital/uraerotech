'use client'

import { useEffect, useState } from 'react'

export function WhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)

  const features = [
    { icon: '✓', title: 'Certified Excellence', description: 'FAA and international aviation standards compliance' },
    { icon: '⚡', title: 'Fast Turnaround', description: 'Minimize downtime with efficient repair processes' },
    { icon: '🔧', title: 'Expert Team', description: '20+ years of combined experience in aviation' },
    { icon: '📦', title: 'Extensive Inventory', description: '50,000+ certified parts ready for immediate delivery' },
    { icon: '🌍', title: 'Global Reach', description: 'Serving clients worldwide with reliable service' },
    { icon: '💎', title: 'Quality Guaranteed', description: 'Premium materials and precision craftsmanship' },
  ]

  useEffect(() => {
    const section = document.getElementById('why-choose-us')
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 z-0"></div>
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4">WHY CHOOSE US</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Excellence in Every Detail
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            We combine decades of experience with cutting-edge technology to deliver unmatched aircraft structural repair services.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-4 sm:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-white/70 group-hover:text-white/90 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
