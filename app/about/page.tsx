import { ScrollAnimation } from '@/components/ScrollAnimation'
import Link from 'next/link'

export const metadata = {
  title: 'About Us - UR Aerotech',
  description: 'Learn about UR Aerotech - 20+ years of excellence in aircraft structural repair',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden -mt-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/hero-aircraft.jpg')",
            filter: 'brightness(0.6)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-indigo-950/85 to-sky-900/80" />
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4">
              About UR Aerotech
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl">
              20+ Years of Excellence in Aircraft Structural Repairs and Modifications
            </p>
          </div>
        </div>
      </section>

      <div className="pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto -mt-10 sm:-mt-16 md:-mt-20 relative z-10">

          {/* Company Overview */}
          <ScrollAnimation animation="fadeIn" delay={0}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 sm:p-8 md:p-12 shadow-xl mb-6 sm:mb-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-4 sm:mb-6">
                  With over 20 years of excellence in aircraft structural repairs and modifications, UR Aerotech has established itself as a trusted leader in the aviation industry. Our commitment to quality, safety, and innovation has made us the preferred partner for aviation companies, aircraft owners, and operators worldwide.
                </p>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4 sm:mb-6">
                  Our team of certified engineers and technicians brings unparalleled expertise to every project, ensuring that all structural modifications meet or exceed FAA and international aviation standards. We specialize in comprehensive damage assessment, expert repairs, custom fabrication services, and maintaining an extensive inventory of high-quality aircraft parts and specialized tools.
                </p>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  From commercial airlines to private aircraft owners, from military operations to cargo fleets, we have successfully completed thousands of projects across all sectors of aviation. Our reputation for excellence, reliability, and customer service has made us a trusted name in the industry.
                </p>
              </div>
            </div>
          </ScrollAnimation>

          {/* Stats */}
          <ScrollAnimation animation="scale" delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {[
                { value: '20+', label: 'Years Experience' },
                { value: '5000+', label: 'Projects Completed' },
                { value: '1000+', label: 'Satisfied Clients' },
                { value: '50K+', label: 'Parts in Inventory' },
              ].map((stat, index) => (
                <ScrollAnimation key={index} animation="zoom" delay={index * 100}>
                  <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-6 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">{stat.value}</div>
                    <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </ScrollAnimation>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ScrollAnimation animation="slideLeft" delay={100}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  To provide world-class aircraft structural repair services and parts, ensuring the highest standards of safety, quality, and reliability for our clients in the aviation industry. We are committed to excellence in every project, from initial assessment to final certification.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slideRight" delay={100}>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  To be the global leader in aircraft structural repair and modification services, recognized for our innovation, expertise, and unwavering commitment to safety. We strive to set the standard for excellence in the aviation maintenance industry.
                </p>
              </div>
            </ScrollAnimation>
          </div>

          {/* Core Values */}
          <ScrollAnimation animation="fadeIn" delay={100}>
            <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 md:p-12 shadow-xl mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Our Core Values</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: 'Safety First', description: 'Safety is our top priority in every project. We adhere to the highest safety standards and ensure all work meets or exceeds regulatory requirements.' },
                  { title: 'Quality Excellence', description: 'We never compromise on quality. Every repair and modification is performed to the highest standards with meticulous attention to detail.' },
                  { title: 'Customer Focus', description: 'Our clients are at the heart of everything we do. We work closely with you to understand your needs and deliver solutions that exceed expectations.' },
                  { title: 'Innovation', description: 'We continuously invest in new technologies, techniques, and training to stay at the forefront of aircraft structural repair and modification.' },
                  { title: 'Integrity', description: 'We conduct business with honesty, transparency, and ethical practices. Trust is the foundation of our relationships with clients and partners.' },
                  { title: 'Reliability', description: 'You can count on us to deliver on time, on budget, and to specification. We understand the critical importance of keeping aircraft in service.' },
                ].map((value, index) => (
                  <ScrollAnimation
                    key={index}
                    animation={index % 3 === 0 ? 'slideLeft' : index % 3 === 1 ? 'slideRight' : 'fadeIn'}
                    delay={index * 100}
                  >
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300">
                      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                      <p className="text-white/70 leading-relaxed">{value.description}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Certifications & Expertise */}
          <ScrollAnimation animation="fadeIn" delay={100}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 shadow-xl mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Certifications & Expertise</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Regulatory Compliance</h3>
                  <ul className="space-y-3">
                    {[
                      'FAA Certified Repair Station',
                      'EASA Part 145 Approved',
                      'ISO 9001:2015 Certified',
                      'Military Specification Compliance',
                      'International Aviation Authority Approvals',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <span className="text-blue-400 mt-1.5 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Areas of Expertise</h3>
                  <ul className="space-y-3">
                    {[
                      'Aircraft Structural Repairs',
                      'Structural Modifications',
                      'Damage Assessment & Analysis',
                      'Service Bulletin Compliance',
                      'Custom Fabrication',
                      'Parts Manufacturing',
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-white/70">
                        <span className="text-blue-400 mt-1.5 flex-shrink-0">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Why Choose Us */}
          <ScrollAnimation animation="fadeIn" delay={100}>
            <div className="bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-sky-600/20 backdrop-blur-md border border-blue-400/30 rounded-xl p-8 md:p-12 shadow-xl mb-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-10 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose UR Aerotech</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: '🎯', title: 'Proven Track Record', description: '20+ years of successful projects across all sectors of aviation, from commercial airlines to private jets, military to cargo operations.' },
                  { icon: '🔧', title: 'Expert Team', description: 'Our certified engineers and technicians have extensive experience and stay current with the latest techniques and technologies.' },
                  { icon: '⚡', title: 'Fast Turnaround', description: 'We understand that time is critical. Our efficient processes minimize downtime while maintaining the highest quality standards.' },
                  { icon: '📦', title: 'Extensive Inventory', description: 'With 50,000+ certified parts in stock, we can often provide immediate solutions without waiting for parts procurement.' },
                  { icon: '🌍', title: 'Global Reach', description: 'Serving clients worldwide with reliable service, whether you need on-site support or work performed at our facilities.' },
                  { icon: '💎', title: 'Quality Guaranteed', description: 'Every project is backed by our commitment to excellence. We provide complete documentation and certification for all work.' },
                ].map((item, index) => (
                  <ScrollAnimation
                    key={index}
                    animation={index % 2 === 0 ? 'slideLeft' : 'slideRight'}
                    delay={index * 100}
                  >
                    <div className="bg-white/5 rounded-lg p-6 border border-white/10 hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <span className="text-4xl flex-shrink-0">{item.icon}</span>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-white/70 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* CTA */}
          <ScrollAnimation animation="scale" delay={100}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-12 shadow-xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Work With Us?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                Experience the UR Aerotech difference. Contact us today to discuss your aircraft structural repair or modification needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 transform"
                >
                  Contact Us
                </Link>
                <Link
                  href="/quote"
                  className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold hover:scale-105 transform transition-all duration-300"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </ScrollAnimation>

        </div>
      </div>
    </div>
  )
}
