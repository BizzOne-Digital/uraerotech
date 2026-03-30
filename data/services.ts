export interface Service {
  id: string
  name: string
  slug: string
  description: string
  content: string
  icon: string
  image: string
  images?: string[]
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Aircraft Structural Repair',
    slug: 'aircraft-structural-repair',
    description: 'Keep your aircraft safe, reliable, and airworthy with expert structural repairs.',
    content: `We specialize in structural repair solutions that meet or even exceed FAA and international aviation standards. From small dents to major structural components, our experienced engineers and technicians handle every repair with precision and care, ensuring your aircraft is safe and ready to fly with minimal downtime.

**Our Expertise:**
- 20+ years of aviation experience
- Repairs for commercial planes, private jets, helicopters, and cargo aircraft
- Skilled in both minor and major structural repairs
- Full documentation and certification for every repair

**How We Work:**

1. Damage Assessment – We inspect your aircraft using advanced tools to pinpoint every area that needs attention.
2. Repair Planning – Our engineers design a repair plan that meets OEM specifications and regulatory standards.
3. Precision Repair – Skilled technicians restore your aircraft using certified materials and strict quality control.
4. Complete Documentation – You get full reports, material certifications, and compliance records to maintain airworthiness.

**Why It Matters:**
- Quick turnaround so your aircraft spends less time grounded
- Repairs fully compliant with FAA and international standards
- OEM-approved procedures and certified materials
- Support for all aircraft types and models
- Focus on safety, quality, and regulatory compliance

**Why Choose Us:**

We understand that aircraft safety is non-negotiable. That's why we combine experience, precision, and efficiency to deliver repairs you can trust. With us, your aircraft is not just repaired—it's restored to peak performance.

**Reach out today and let us ensure your aircraft stays safe, strong, and ready for the skies.**`,
    icon: '✈️',
    image: '/images/services/structural-repair.jpg',
    images: [
      '/images/services/structural-repair-1.jpg',
      '/images/services/structural-repair-2.jpg',
      '/images/services/structural-repair-3.jpg',
    ],

  },
  {
    id: '2',
    name: 'Aircraft Structure Modification',
    slug: 'aircraft-structure-modifications',
    description: 'Tailored structural modifications to enhance your aircraft\'s performance and capabilities.',
    content: `We provide professional aircraft structure modification services customized to your operational needs. Our certified engineers work closely with you to design and implement modifications that improve performance, integrate new equipment, or meet updated regulatory requirements. All work is precise, fully documented, and certified for airworthiness.

**Our Expertise:**
- Custom modifications for avionics, cabin layouts, cargo conversions, and performance enhancements
- Full certification and airworthiness approval
- Support for all aircraft types and models
- Experience in both minor alterations and major structural changes

**How We Work:**

1. Consultation & Analysis – We start by understanding your goals and assessing your aircraft's current structure.
2. Engineering & Planning – Our team develops detailed modification plans, engineering drawings, and regulatory-compliant designs.
3. Precision Implementation – Skilled technicians execute modifications using certified materials and approved procedures.
4. Documentation & Certification – We provide complete reports, material certifications, and compliance documentation to maintain airworthiness.

**Key Benefits:**
- Performance enhancements to maximize aircraft capabilities
- Seamless integration of new avionics or equipment
- Cabin reconfiguration and luxury upgrades
- Cargo conversions with engineered reinforcements
- Strict adherence to FAA and international regulations
- Turnkey services from design to completion

**Why Choose Us:**

We combine engineering expertise, precision workmanship, and regulatory knowledge to deliver modifications you can trust. Every project is executed safely, efficiently, and to the highest standards, ensuring your aircraft operates at its full potential.

**Contact us today to customize your aircraft with confidence.**`,
    icon: '🔧',
    image: '/images/services/Aircraft Structure Modifications 1.jpeg',
    images: [
      '/images/services/Aircraft Structure Modifications 2.jpeg',
      '/images/services/Aircraft Structure Modifications 3.jpeg',
      '/images/services/Aircraft Structure Modifications 4.jpeg',
    ],
  },
  {
    id: '3',
    name: 'Aircraft Service Bulletin Compliance',
    slug: 'aircraft-service-bulletin-compliance',
    description: 'Keep your aircraft safe, up to date, and fully compliant.',
    content: `We help you stay on top of all service bulletins, so your aircraft meets both mandatory and recommended manufacturer requirements. Our team handles the tracking, planning, and execution, so you can focus on operations, not paperwork.

**What We Do:**
- Track service bulletins from all major manufacturers like Boeing, Airbus, Bombardier, and Embraer
- Review your aircraft's compliance status and create a clear, actionable plan
- Coordinate inspections, modifications, or part replacements as needed
- Keep complete records and compliance reports

**Why It Matters:**
- Ensures your aircraft stays fully compliant and airworthy
- Provides advanced alerts for upcoming deadlines
- Integrates smoothly with your maintenance schedule
- Reduces the risk of regulatory issues or unexpected grounding

**Why Choose Us:**

We make compliance easy, safe, and stress-free. With expert tracking, analysis, and execution, your aircraft is always ready to fly without any issue.

**Contact us today to keep your aircraft compliant and ready for the skies.**`,
    icon: '📋',
    image: '/images/services/Aircraft Service Bulletin Compliance1.jpeg',
    images: [
      '/images/services/Aircraft Service Bulletin Compliance 2.jpeg',
      '/images/services/Aircraft Service Bulletin Compliance 3.jpeg',
      '/images/services/Aircraft Service Bulletin Compliance 4.jpeg',
    ],
  },
  {
    id: '4',
    name: 'Aircraft Parts Supply',
    slug: 'aircraft-parts-supply',
    description: 'Reliable sourcing of certified aircraft parts from trusted manufacturers.',
    content: `We provide certified aircraft parts from trusted suppliers worldwide. With over 20 years in the aviation industry, our global network ensures you get genuine, quality parts quickly and reliably.

**What We Do:**
- Supply structural components, avionics, landing gear, engines, and interior fittings
- Source parts not in inventory through our global supplier network
- Verify authenticity, certifications, and compliance for every part
- Handle the full procurement process, from sourcing to delivery

**Why It Matters:**
- Ensures only genuine, certified parts are used on your aircraft
- Provides complete documentation including certificates of conformance and compliance
- Reduces risk of safety issues or regulatory problems
- Fast turnaround, even for urgent or hard-to-find parts

**Why Choose Us:**

We make aircraft parts procurement simple, reliable, and safe. With access to a vast global inventory and expert handling, your aircraft gets the parts it needs on time.

**Contact us today to source certified aircraft parts with confidence.**`,
    icon: '📦',
    image: '/images/services/Aircraft Parts Supply 1.jpeg',
    images: [
      '/images/services/Aircraft Parts Supply 2.jpeg',
      '/images/services/Aircraft Parts Supply 3.jpeg',
      '/images/services/Aircraft Parts Supply 4.jpeg',
    ],
  },
  {
    id: '5',
    name: 'Aviation Tools Sales',
    slug: 'aviation-tools-sales',
    description: 'Premium tools and equipment for professional aircraft maintenance.',
    content: `We provide certified, high-quality aviation tools and equipment designed for professional maintenance and repair operations. From hand tools to specialized instruments, our inventory ensures you have exactly what you need to get the job done safely and efficiently.

**What We Do:**
- Supply hand tools like wrenches, screwdrivers, pliers, and sockets
- Provide precision instruments including torque wrenches, gauges, and micrometers—certified and calibrated
- Offer specialized tools for engines, landing gear, avionics, and structural repairs
- Deliver technical support, calibration services, and warranty support

**Why It Matters:**
- Ensures your maintenance work is accurate, safe, and compliant
- Tools are certified, calibrated, and verified before delivery
- Access to professional-grade, aircraft-specific tools not easily sourced elsewhere
- Fast, reliable shipping with expert guidance on proper tool use

**Why Choose Us:**

We make aircraft maintenance tools easy to get, reliable, and safe to use. With premium quality, full certification, and dedicated support, your team can work efficiently with confidence.

All our tools come from trusted manufacturers and meet or exceed aviation industry standards. Every precision instrument is calibrated, certified, and fully verified before delivery.

**Contact us today to get the tools you need for professional aircraft maintenance.**`,
    icon: '🛠️',
    image: '/images/services/Aviation Tools Sales 1.jpeg',
    images: [
      '/images/services/Aviation Tools Sales 2.jpeg',
      '/images/services/Aviation Tools Sales 3.jpeg',
      '/images/services/Aviation Tools Sales 4.jpeg',
    ],
  },
  {
    id: '6',
    name: 'Aviation Tool Rental',
    slug: 'aviation-tool-rental',
    description: 'Flexible tool solutions for short-term projects and specialized maintenance.',
    content: `Need premium aviation tools without buying? Our rental program gives you access to certified, calibrated, and ready-to-use tools for short-term projects, special repairs, or specialized maintenance tasks.

**What We Do:**
- Provide precision instruments like torque wrenches, micrometers, and gauges
- Supply specialized and large maintenance tools for specific projects
- Maintain all rental tools to highest standards, with calibration certificates included
- Offer delivery, pickup, and technical support during the rental period

**Why It Matters:**
- Access premium tools without upfront costs
- Perfect for one-time or occasional use
- Try new tools before buying to ensure suitability
- Always use latest models and technology without inventory updates

**Why Choose Us:**

We make tool rental easy, flexible, and reliable. With certified, calibrated tools, flexible terms, and full support, your project gets the right tools when you need them—without the hassle or long-term commitment.

**Contact us today to rent aviation tools for your next project.**`,
    icon: '🔩',
    image: '/images/services/Aviation Tool Rental 1.jpeg',
    images: [
      '/images/services/Aviation Tool Rental 2.jpeg',
      '/images/services/Aviation Tool Rental 3.jpeg',
      '/images/services/Aviation Tool Rental 4.jpeg',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}

export function getAllServices(): Service[] {
  return services
}

