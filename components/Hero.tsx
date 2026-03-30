'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat airplane-bg"
          style={{
            backgroundImage: "url('/images/hero-aircraft.jpg')",
            backgroundSize: '120% 120%',
            backgroundPosition: 'center center',
          }}
        />
        {/* Floating Particles */}
        <div className="absolute inset-0 z-15">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
              style={{
                left: `${(i * 17 + 5) % 100}%`,
                top: `${(i * 13 + 7) % 100}%`,
                animation: `float ${5 + (i % 5)}s ease-in-out infinite`,
                animationDelay: `${(i % 5)}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`text-white transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-xs sm:text-sm uppercase tracking-wider text-white/80 mb-3 sm:mb-4 animate-fadeIn">EXPERT AIRCRAFT</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-slideInLeft">
              Structure Repair & Sales
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-2 sm:mb-3 max-w-2xl animate-fadeIn delay-300">
              20+ Years of Excellence in Aircraft Structural Repairs and Modifications.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl animate-fadeIn delay-300">
              Supplying certified aircraft parts, aviation tools, and industry-leading services — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fadeIn delay-500">
              <Link
                href="/quote"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl transition-all duration-300 text-white font-semibold text-center text-sm sm:text-base shadow-lg hover:shadow-blue-500/50 hover:scale-105 transform"
              >
                GET A QUOTE
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/products"
                className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 rounded-xl transition-all duration-300 text-white font-semibold text-center text-sm sm:text-base hover:scale-105 transform"
              >
                BROWSE INVENTORY
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* Right Badge */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 mt-8 lg:mt-0 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 animate-pulse"></div>
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-2 sm:border-4 border-white/30 bg-gradient-to-br from-blue-600/30 to-blue-500/20 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2 animate-bounce">20+</p>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-white/90">YEARS</p>
                  <p className="text-xs sm:text-sm uppercase tracking-wider text-white/90">EXPERIENCE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .airplane-bg {
          animation: airplaneMove 30s ease-in-out infinite;
          transform-origin: center;
          min-width: 100%;
          min-height: 100%;
          width: 120%;
          height: 120%;
          left: -10%;
          top: -10%;
        }
        @keyframes airplaneMove {
          0%   { transform: translateX(-2%) translateY(-1%) scale(1.05) rotate(-0.5deg); }
          25%  { transform: translateX(1%) translateY(-2%) scale(1.08) rotate(0.5deg); }
          50%  { transform: translateX(2%) translateY(-1.5%) scale(1.1) rotate(-0.3deg); }
          75%  { transform: translateX(1%) translateY(-0.5%) scale(1.08) rotate(0.3deg); }
          100% { transform: translateX(-2%) translateY(-1%) scale(1.05) rotate(-0.5deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50%       { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn    { animation: fadeIn 1s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 1s ease-out forwards; }
        .delay-300 { animation-delay: 0.3s; opacity: 0; }
        .delay-500 { animation-delay: 0.5s; opacity: 0; }
      `}</style>
    </section>
  )
}
