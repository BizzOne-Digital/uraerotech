import { ScrollAnimation } from '@/components/ScrollAnimation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export const metadata = {
  title: 'Services - UR Aerotech',
  description: 'Comprehensive aircraft structural repair services',
}

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { isActive: true }, orderBy: { createdAt: 'asc' } })

  return (
    <div className="min-h-screen">
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollAnimation animation="fadeIn" delay={0}>
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-wider text-white/70 mb-4">OUR SERVICES</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
                Comprehensive Structural Repair Services
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                Expert aircraft structural repair and modification services with 20+ years of excellence.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <ScrollAnimation
                key={service.id}
                animation={index % 3 === 0 ? 'slideLeft' : index % 3 === 1 ? 'slideRight' : 'fadeIn'}
                delay={index * 100}
              >
                <Link
                  href={`/services/${service.slug}`}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 sm:p-6 card-hover flex flex-col h-full"
                >
                  <div className="h-32 sm:h-40 md:h-48 rounded-lg mb-3 sm:mb-4 overflow-hidden">
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl">{service.icon}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{service.name}</h3>
                  <p className="text-white/70 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base flex-1">
                    {service.description}
                  </p>
                  <span className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white font-semibold text-sm sm:text-base">
                    Learn More →
                  </span>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
