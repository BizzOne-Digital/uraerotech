import { prisma } from '@/lib/prisma'
import { Hero } from '@/components/Hero'
import { AboutUsSection } from '@/components/AboutUsSection'
import { ServicesSection } from '@/components/ServicesSection'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { PartsToolsSection } from '@/components/PartsToolsSection'
import { CTASection } from '@/components/CTASection'
import { ScrollAnimation } from '@/components/ScrollAnimation'

export default async function HomePage() {
  let categories: { id: string; name: string; slug: string; description: string | null }[] = []
  try {
    categories = await prisma.category.findMany({
      select: { id: true, name: true, slug: true, description: true },
      orderBy: { createdAt: 'asc' },
      take: 4,
    })
  } catch {
    categories = []
  }

  return (
    <div className="min-h-screen">
      <Hero />
      <ScrollAnimation animation="fadeIn" delay={0}>
        <AboutUsSection />
      </ScrollAnimation>
      <ScrollAnimation animation="slideRight" delay={100}>
        <ServicesSection />
      </ScrollAnimation>
      <ScrollAnimation animation="slideLeft" delay={100}>
        <WhyChooseUs />
      </ScrollAnimation>
      <ScrollAnimation animation="fadeIn" delay={100}>
        <PartsToolsSection categories={categories} />
      </ScrollAnimation>
      <ScrollAnimation animation="scale" delay={100}>
        <CTASection />
      </ScrollAnimation>
    </div>
  )
}
