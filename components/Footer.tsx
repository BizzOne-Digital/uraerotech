import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black via-black/95 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">

          {/* Company Info */}
          <div>
            <div className="mb-4">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 transition-transform duration-300 hover:scale-105">
                <Image src="/logo.jpeg" alt="UR Aerotech Logo" fill className="object-contain rounded" />
              </div>
            </div>
            <p className="text-white/70 text-sm mb-4 leading-relaxed">
              20+ Years of Excellence in Aircraft Structural Repairs and Modifications.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform inline-block">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform inline-block">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-blue-400 transition-colors duration-300 hover:scale-110 transform inline-block">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/services', label: 'Services' },
                { href: '/products', label: 'Products' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/70 hover:text-blue-400 transition-all duration-300 text-sm inline-block hover:translate-x-1 transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              {[
                { href: '/services/aircraft-structural-repair', label: 'Aircraft Structural Repair' },
                { href: '/services/aircraft-structure-modifications', label: 'Aircraft Structure Modifications' },
                { href: '/services/aircraft-service-bulletin-compliance', label: 'Service Bulletin Compliance' },
                { href: '/services/aircraft-parts-supply', label: 'Aircraft Parts Supply' },
                { href: '/services/aviation-tools-sales', label: 'Aviation Tools Sales' },
                { href: '/services/aviation-tool-rental', label: 'Aviation Tool Rental' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-white/70 hover:text-blue-400 transition-all duration-300 text-sm inline-block hover:translate-x-1 transform">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="https://mail.google.com/mail/u/0/?fs=1&to=info@uraerotech.com&tf=cm" target="_blank" rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300">
                  info@uraerotech.com
                </a>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-col">
                  <a href="tel:+491732504540" className="hover:text-blue-400 transition-colors duration-300">+49 173 250 4540</a>
                  <a href="tel:+491732498648" className="hover:text-blue-400 transition-colors duration-300 text-xs mt-1">+49 173 249 8648</a>
                </div>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a href="https://maps.app.goo.gl/Hq7DRmcTpmowDy8Z6" target="_blank" rel="noopener noreferrer"
                  className="hover:text-blue-400 transition-colors duration-300">
                  <div>Gaterstr. 66B</div>
                  <div>52538, Gangelt</div>
                  <div>Germany</div>
                </a>
              </li>
              <li>
                <Link href="/quote" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 inline-flex items-center group">
                  Request a Quote
                  <span className="ml-1 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70 text-sm">
          <p>&copy; {new Date().getFullYear()} UR Aerotech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
