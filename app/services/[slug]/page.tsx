import { ScrollAnimation } from '@/components/ScrollAnimation'
import { QuoteForm } from '@/components/QuoteForm'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await prisma.service.findUnique({ where: { slug } })
  if (!service) return { title: 'Service Not Found - UR Aerotech' }
  return { title: `${service.name} - UR Aerotech`, description: service.description }
}

export const dynamic = 'force-dynamic'

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await prisma.service.findUnique({ where: { slug } }) as (Awaited<ReturnType<typeof prisma.service.findUnique>> & { images?: string[] }) | null
  if (!service) notFound()

  return (
    <div className="min-h-screen">
      <main className="pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/services"
            className="text-blue-400 hover:text-blue-300 transition-colors mb-4 sm:mb-6 inline-block text-sm sm:text-base"
          >
            ← Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8">
              {/* Main Image */}
              {service.image && (
                <ScrollAnimation animation="fadeIn" delay={0}>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden">
                    <div className="relative w-full h-48 sm:h-64 md:h-96">
                      <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </ScrollAnimation>
              )}

              <ScrollAnimation animation="slideRight" delay={100}>
                <article className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 md:p-12">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-4xl sm:text-5xl md:text-6xl">{service.icon}</span>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">{service.name}</h1>
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8">{service.description}</p>

                  <div className="prose prose-invert max-w-none">
                    <div className="text-white/70 leading-relaxed">
                      {service.content.split('\n\n').map((paragraph, pIndex) => {
                        if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                          return (
                            <h3 key={pIndex} className="text-2xl font-bold text-white mt-8 mb-4">
                              {paragraph.replace(/\*\*/g, '').trim()}
                            </h3>
                          )
                        }
                        if (paragraph.trim().startsWith('- ')) {
                          const items = paragraph.split('\n').filter(line => line.trim().startsWith('- '))
                          return (
                            <ul key={pIndex} className="list-disc list-inside space-y-2 mb-6 mt-4">
                              {items.map((item, iIndex) => (
                                <li key={iIndex} className="text-white/70">
                                  {item.substring(2).trim()}
                                </li>
                              ))}
                            </ul>
                          )
                        }
                        if (paragraph.trim() === '') return null
                        return (
                          <p key={pIndex} className="mb-4">
                            {paragraph.trim()}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
              {/* Image Gallery */}
              <ScrollAnimation animation="scale" delay={200}>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">Service Gallery</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(service.images && service.images.length > 0
                      ? service.images
                      : [null, null, null]
                    ).map((img, index) => (
                      <ScrollAnimation
                        key={index}
                        animation={index % 3 === 0 ? 'slideLeft' : index % 3 === 1 ? 'slideRight' : 'fadeIn'}
                        delay={index * 100}
                      >
                        <div className="relative aspect-square rounded-lg overflow-hidden group border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                          {img ? (
                            <img
                              src={img}
                              alt={`${service.name} - Image ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-sky-600/30 transition-all duration-300">
                              <span className="text-5xl opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-300">{service.icon}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </ScrollAnimation>
                    ))}
                  </div>
                </div>
              </ScrollAnimation>
            </div>

            {/* Quote Form */}
            <ScrollAnimation animation="slideLeft" delay={100}>
              <div className="lg:col-span-1">
                <QuoteForm type="service" preselected={service.name} compact />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </main>
    </div>
  )
}
