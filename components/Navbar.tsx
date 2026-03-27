'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'

interface Category {
  id: string
  name: string
  slug: string
}

export default function Navbar() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const productsDropdownRef = useRef<HTMLDivElement>(null)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetch('/api/categories')
      .then(res => res.ok ? res.json() : [])
      .then(data => setCategories(data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
        setIsProductsDropdownOpen(false)
        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
      }
    }
    if (isProductsDropdownOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    }
  }, [isProductsDropdownOpen])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    setIsProductsDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setIsProductsDropdownOpen(false), 200)
  }

  const handleDropdownMouseEnter = () => {
    if (hoverTimeoutRef.current) { clearTimeout(hoverTimeoutRef.current); hoverTimeoutRef.current = null }
    setIsProductsDropdownOpen(true)
  }

  const handleDropdownMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(() => setIsProductsDropdownOpen(false), 200)
  }

  const closeDropdown = () => {
    setIsProductsDropdownOpen(false)
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 ${
      scrolled
        ? 'bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-900/95 shadow-lg'
        : 'bg-gradient-to-r from-slate-950 via-indigo-950 to-sky-900'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">

        {/* Top Row: Logo + Search + Auth */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4 md:gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 transition-transform duration-300 group-hover:scale-110">
              <Image src="/logo.jpeg" alt="UR Aerotech Logo" fill className="object-contain rounded" priority />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-white font-semibold text-xl tracking-tight">
                UR <span className="font-bold">Aerotech</span>
              </div>
              <div className="text-xs text-sky-100/80 uppercase tracking-[0.2em]">
                Aircraft Structure Repair
              </div>
            </div>
          </Link>

          {/* Search (desktop) */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="w-full max-w-md relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-200/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-900/70 border border-slate-300/40 text-sm text-white placeholder-slate-200/70 focus:outline-none focus:ring-2 focus:ring-sky-400/80 focus:border-sky-400/80 shadow-sm"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search icon (mobile) */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle search"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Auth (desktop) */}
            {session ? (
              <div className="hidden md:flex items-center space-x-2">
                {session.user.role !== 'ADMIN' && (
                  <Link href="/cart"
                    className="px-3 py-2 text-xs font-medium uppercase tracking-wide rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-colors">
                    Cart
                  </Link>
                )}
                <Link
                  href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className="px-3 py-2 text-xs font-medium uppercase tracking-wide rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-3 py-2 text-xs font-medium uppercase tracking-wide rounded-full border border-white/25 bg-white/5 text-white hover:bg-white/15 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="hidden md:inline-flex items-center px-5 py-2 text-sm font-medium rounded-full border border-white/60 bg-transparent text-white hover:bg-white/10 transition-colors"
              >
                Sign In
              </Link>
            )}

            {/* Request a Quote */}
            <Link
              href="/quote"
              className="inline-flex items-center px-5 py-2 text-sm font-semibold rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-md hover:from-sky-400 hover:to-indigo-400 transition-transform hover:-translate-y-[1px]"
            >
              Request a Quote
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors lg:hidden"
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 px-1">
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-slate-200/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-900/80 border border-slate-300/40 text-sm text-white placeholder-slate-200/70 focus:outline-none focus:ring-2 focus:ring-sky-400/80"
              />
            </div>
          </div>
        )}

        {/* Bottom Row: Nav links (desktop) */}
        <div className="hidden lg:flex items-center h-12 text-sm text-slate-100/90 space-x-8">
          <Link href="/" className="py-3 hover:text-white transition-colors">Home</Link>
          <Link href="/services" className="py-3 hover:text-white transition-colors">Services</Link>
          <Link href="/industries" className="py-3 hover:text-white transition-colors">Industries</Link>

          {/* Products Dropdown */}
          <div
            ref={productsDropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center gap-1 py-3">
              <Link href="/products" className="hover:text-white transition-colors text-slate-100/90">
                Products
              </Link>
              <button
                onClick={() => setIsProductsDropdownOpen(prev => !prev)}
                className="ml-1 hover:text-white transition-colors text-slate-100/90"
                aria-label="Toggle products menu"
              >
                <span className={`text-xs transition-transform duration-200 inline-block ${isProductsDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
            </div>

            {isProductsDropdownOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-72 z-[100]"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-sky-900 border border-white/30 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                    <Link href="/products" onClick={closeDropdown}
                      className="block text-white hover:text-blue-300 transition-colors font-semibold text-base">
                      All Products
                    </Link>
                  </div>
                  <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                    {categories.map((cat) => (
                      <Link key={cat.id} href={`/products?category=${cat.id}`} onClick={closeDropdown}
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-100/90 hover:bg-white/15 rounded-xl transition-all duration-200 group border border-transparent hover:border-blue-400/30">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white group-hover:text-blue-300 transition-colors text-sm">{cat.name}</div>
                        </div>
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-300 opacity-0 group-hover:opacity-100 transition-all flex-shrink-0"
                          fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link href="/about" className="py-3 hover:text-white transition-colors">About Us</Link>
          <Link href="/contact" className="py-3 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-[500px] pb-3' : 'max-h-0'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="/services" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link href="/industries" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>Industries</Link>
            <div>
              <Link href="/products" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md font-semibold" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <div className="pl-4 mt-1 space-y-1">
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/products?category=${cat.id}`}
                    className="block px-4 py-2 text-sm text-slate-50/70 hover:bg-white/10 rounded-md"
                    onClick={() => setIsMenuOpen(false)}>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link href="/contact" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            {session ? (
              <>
                {session.user.role !== 'ADMIN' && (
                  <Link href="/cart" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>Cart</Link>
                )}
                <Link href={session.user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button onClick={() => signOut()} className="w-full text-left px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="block px-4 py-2 text-sm text-slate-50/90 hover:bg-white/10 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>

      </div>
    </nav>
  )
}
