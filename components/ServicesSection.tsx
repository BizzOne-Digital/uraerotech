'use client'

import Link from 'next/link'
import { getAllServices } from '@/data/services'
import { useEffect, useState } from 'react'

export function ServicesSection() {
  const services = getAllServices().slice(0, 3)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = document.getElementById('services-section')
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section id="services-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat services-bg"
        style={{ backgroundImage: "url('/images/services-bg.jpg')", filter: 'brightness(1.25)' }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <p className="text-sm uppercase tracking-wider text-white/70 mb-4">OUR SERVICES</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Comprehensive Structural Repair Services
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={`group bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 transition-all duration-500 hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="h-48 bg-gradient-to-br from-blue-600/20 to-blue-500/10 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group-hover:from-blue-600/30 group-hover:to-blue-500/20 transition-all duration-300">
                <span className="text-5xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {service.icon}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {service.name}
              </h3>
              <p className="text-white/70 mb-4 line-clamp-3 group-hover:text-white/90 transition-colors duration-300">
                {service.description}
              </p>
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-lg transition-all duration-300 text-white font-semibold group-hover:shadow-lg group-hover:shadow-blue-500/50 transform group-hover:scale-105"
              >
                Learn More
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className={`text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Link
            href="/services"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all duration-300 text-white font-semibold mr-4 hover:scale-105 transform"
          >
            VIEW ALL SERVICES
          </Link>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300 text-white font-semibold hover:scale-105 transform"
          >
            BROWSE INVENTORY
          </Link>
        </div>
      </div>

      <style jsx>{`
        .services-bg {
          animation: servicesParallax 40s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes servicesParallax {
          0%   { transform: translateX(-2%) translateY(-1%) scale(1.05); }
          25%  { transform: translateX(1%) translateY(-2%) scale(1.06); }
          50%  { transform: translateX(2%) translateY(-1%) scale(1.07); }
          75%  { transform: translateX(1%) translateY(0) scale(1.06); }
          100% { transform: translateX(-2%) translateY(-1%) scale(1.05); }
        }
      `}</style>
    </section>
  )
}
