import { ScrollAnimation } from '@/components/ScrollAnimation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Industries - UR Aerotech',
  description: 'Serving diverse aviation industries with expert structural repair and modification services',
}

export const dynamic = 'force-dynamic'

export default async function IndustriesPage() {
  const industries = await prisma.industry.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } })
  return (
    <div className="min-h-screen">
      <main className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/industries-bg.jpg')",
            backgroundSize: '120% 120%',
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollAnimation animation="fadeIn" delay={0}>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-wider text-white/70 mb-4">OUR INDUSTRIES</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Serving Diverse Aviation Industries
              </h1>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                With over 20 years of experience, we provide expert structural repair and modification services across all sectors of aviation.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <ScrollAnimation
                key={industry.id}
                animation={index % 3 === 0 ? 'slideLeft' : index % 3 === 1 ? 'slideRight' : 'fadeIn'}
                delay={index * 100}
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:border-blue-400/50 hover:shadow-2xl hover:shadow-blue-500/20">
                  <div className="h-48 rounded-lg mb-4 overflow-hidden">
                    {industry.image ? (
                      <img src={industry.image} alt={industry.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center">
                        <span className="text-5xl">{industry.icon}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{industry.name}</h3>
                  <p className="text-white/70 mb-4 line-clamp-3">{industry.description}</p>
                  <div className="mb-4">
                    <ul className="space-y-2">
                      {industry.features.slice(0, 2).map((feature, i) => (
                        <li key={i} className="text-sm text-white/60 flex items-center">
                          <span className="text-blue-400 mr-2">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/industries/${industry.slug}`}
                    className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
                  >
                    Learn More →
                  </Link>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Need Custom Solutions for Your Industry?
              </h2>
              <p className="text-white/70 mb-6">
                Our team has experience across all sectors of aviation. Contact us to discuss how we can support your specific industry needs.
              </p>
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 transform"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
