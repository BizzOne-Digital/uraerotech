'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Category {
  id: string
  name: string
  slug: string
  description?: string | null
}

interface PartsToolsSectionProps {
  categories?: Category[]
}

const categoryIcons: Record<string, string> = {
  'Structural Components': '🔩',
  'Engine Parts': '⚙️',
  'Avionics & Electronics': '📡',
  'Landing Gear': '🛬',
  'Interior Components': '🪑',
  'Tools & Equipment': '🔧',
  'Fasteners & Hardware': '📎',
  'Hydraulic Systems': '💧',
  'Electrical Components': '⚡',
  'Fuel Systems': '⛽',
}

export function PartsToolsSection({ categories = [] }: PartsToolsSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const displayCategories = categories.slice(0, 4)

  useEffect(() => {
    const section = document.getElementById('parts-section')
    if (!section) return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setIsVisible(true) }) },
      { threshold: 0.1 }
    )
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])

  return (
    <section
      id="parts-section"
      className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parts-bg"
          style={{ backgroundImage: "url('/images/parts-tools-bg.jpg')", filter: 'brightness(1.25)' }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
          <div
            className={`text-white transition-all duration-1000 text-center lg:text-left ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              AIRCRAFT PARTS & TOOLS
            </h2>
            <p className="text-xl sm:text-2xl text-white/90 mb-4 sm:mb-6 font-semibold">
              Available for Sale
            </p>
            <p className="text-white/80 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
              Browse our extensive inventory of high-quality aircraft components and specialized tools. Visit our selling portal to explore our latest products.
            </p>
            <Link
              href="/products"
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all duration-300 text-white font-semibold text-sm sm:text-base hover:scale-105 transform"
            >
              VIEW PRODUCTS
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>

        
        </div>
      </div>

      <style jsx>{`
        .parts-bg {
          animation: partsParallax 40s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes partsParallax {
          0%   { transform: translateX(2%) translateY(-1%) scale(1.05); }
          25%  { transform: translateX(-1%) translateY(-2%) scale(1.06); }
          50%  { transform: translateX(-2%) translateY(-1%) scale(1.07); }
          75%  { transform: translateX(-1%) translateY(0) scale(1.06); }
          100% { transform: translateX(2%) translateY(-1%) scale(1.05); }
        }
      `}</style>
    </section>
  )
}
