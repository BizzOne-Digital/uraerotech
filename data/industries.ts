export interface Industry {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  features: string[]
  content: string
  image?: string
  images?: string[]
}

export const industries: Industry[] = [
  {
    id: '1',
    name: 'Commercial Aviation',
    slug: 'commercial-aviation',
    description: 'Supporting airlines and commercial operators with certified structural repairs and modifications for passenger aircraft.',
    icon: '✈️',
    features: [
      'FAA and EASA certified repairs',
      'Minimal downtime solutions',
      'Fleet-wide support',
      '24/7 emergency response',
    ],
    content: `UR Aerotech is a trusted partner for commercial aviation operators worldwide. We understand the critical importance of maintaining fleet availability while ensuring the highest standards of safety and compliance.

**Our Commercial Aviation Services:**

We provide comprehensive structural repair and modification services specifically tailored for commercial passenger aircraft. Our team has extensive experience working with major airlines, regional carriers, and commercial operators across all aircraft types, from narrow-body to wide-body aircraft.

Our services are designed to minimize aircraft downtime, which is crucial for commercial operations. We work closely with airline maintenance teams to coordinate repairs during scheduled maintenance windows, ensuring minimal disruption to flight schedules.

**Certification and Compliance:**

All our commercial aviation work is performed in strict compliance with FAA, EASA, and other international aviation authority regulations. We maintain certifications for work on all major commercial aircraft types and are approved by numerous airlines and maintenance facilities.

Our quality assurance processes ensure that every repair meets or exceeds original equipment manufacturer (OEM) specifications. We provide complete documentation packages that satisfy regulatory requirements and support your aircraft's continued airworthiness.

**Fleet Support:**

We offer fleet-wide support programs that provide consistent, high-quality service across your entire aircraft fleet. Our team understands the unique requirements of commercial operations and can coordinate repairs across multiple aircraft to optimize scheduling and minimize costs.

**Emergency Response:**

We understand that commercial aviation doesn't always operate on a predictable schedule. Our 24/7 emergency response capability ensures that when unexpected structural issues arise, we can quickly assess the situation and provide solutions to get your aircraft back in service as quickly as possible.

**Key Benefits:**
- Certified repairs meeting all regulatory requirements
- Minimal downtime with efficient turnaround times
- Fleet-wide support and coordination
- 24/7 emergency response capability
- Complete documentation for regulatory compliance
- Cost-effective solutions for commercial operations`,
    image: '/images/industries/Commercial Aviation 1.jpeg',
    images: [
      '/images/industries/Commercial Aviation 1.jpeg',
      '/images/industries/Commercial Aviation 2.jpeg',
      '/images/industries/Commercial Aviation 3.jpeg',
    ],
  },
  {
    id: '2',
    name: 'Private & General Aviation',
    slug: 'private-general-aviation',
    description: 'Expert services for private jets, business aircraft, and general aviation fleet maintenance and modifications.',
    icon: '🛩️',
    features: [
      'Custom modifications',
      'Luxury cabin upgrades',
      'Performance enhancements',
      'Personalized service',
    ],
    content: `We specialize in providing personalized structural repair and modification services for private jets, business aircraft, and general aviation aircraft. Our approach is tailored to meet the unique needs of aircraft owners and operators who demand the highest levels of quality and attention to detail.

**Personalized Service:**

Unlike commercial operations, private and general aviation often requires more customized solutions. We work closely with aircraft owners, operators, and maintenance facilities to understand your specific requirements and preferences, ensuring that every project meets your exact specifications.

Our team understands that your aircraft is more than just transportation—it's an investment and often a reflection of your personal or business standards. We treat every project with the care and attention to detail that your aircraft deserves.

**Custom Modifications:**

We excel at custom structural modifications for private and business aircraft. Whether you need to accommodate new avionics systems, modify cabin configurations, add luxury amenities, or implement performance enhancements, we have the expertise to design and execute the modifications you need.

Our engineering team works with you to develop solutions that not only meet your functional requirements but also maintain or enhance your aircraft's value and appeal.

**Luxury Cabin Upgrades:**

For high-end private jets and business aircraft, we provide specialized structural modifications to support luxury cabin upgrades. This includes structural reinforcements for heavy cabin amenities, modifications for entertainment systems, and structural changes to accommodate custom interior configurations.

**Performance Enhancements:**

We can help improve your aircraft's performance through carefully engineered structural modifications. This includes weight reduction programs, aerodynamic improvements, and structural modifications to support performance upgrades.

**Key Benefits:**
- Personalized service tailored to your needs
- Custom modifications designed to your specifications
- Luxury cabin upgrade support
- Performance enhancement solutions
- Attention to detail and craftsmanship
- Value preservation and enhancement`,
    image: '/images/industries/Private & General Aviation 1.jpeg',
    images: [
      '/images/industries/Private & General Aviation 1.jpeg',
      '/images/industries/Private & General Aviation 2.jpeg',
      '/images/industries/Private & General Aviation 3.jpeg',
    ],
  },
  {
    id: '3',
    name: 'Cargo & Freight',
    slug: 'cargo-freight',
    description: 'Specialized structural modifications and repairs for cargo aircraft, freighters, and cargo conversion projects.',
    icon: '📦',
    features: [
      'Cargo door installations',
      'Floor reinforcement',
      'Heavy-lift modifications',
      'Fleet conversion services',
    ],
    content: `UR Aerotech is a leading provider of structural repair and modification services for cargo and freight aircraft. We specialize in both maintaining existing cargo aircraft and converting passenger aircraft for cargo operations.

**Cargo Aircraft Maintenance:**

We provide comprehensive structural repair services for dedicated cargo aircraft and freighters. Our team understands the unique structural demands of cargo operations, including heavy loads, frequent loading cycles, and the need for robust structural integrity.

Our services include routine structural repairs, damage assessments, and major structural modifications to extend the service life of cargo aircraft. We work with all major cargo aircraft types, from narrow-body freighters to large wide-body cargo aircraft.

**Cargo Conversions:**

One of our specialties is converting passenger aircraft to cargo configuration. This complex process requires extensive structural modifications, including:

- Large cargo door installations
- Floor reinforcement to support heavy cargo loads
- Structural modifications to accommodate cargo handling systems
- Weight and balance modifications
- Compliance with cargo aircraft regulations

Our engineering team designs conversion solutions that maximize cargo capacity while maintaining structural integrity and regulatory compliance. We coordinate all aspects of the conversion process, from initial design through final certification.

**Cargo Door Installations:**

Installing cargo doors is one of the most complex structural modifications in aviation. We have extensive experience in designing and installing cargo doors that meet all regulatory requirements while providing reliable, long-term service.

Our cargo door installations are performed to the highest standards, with complete documentation and certification to ensure continued airworthiness.

**Floor Reinforcement:**

Cargo aircraft require significantly stronger floors than passenger aircraft to support heavy cargo loads. We provide floor reinforcement services that increase load-bearing capacity while maintaining weight efficiency.

**Key Benefits:**
- Specialized expertise in cargo aircraft structures
- Complete cargo conversion services
- Cargo door installation and certification
- Floor reinforcement for heavy loads
- Fleet conversion coordination
- Regulatory compliance for cargo operations`,
    image: '/images/industries/Cargo & Freight 1.jpeg',
    images: [
      '/images/industries/Cargo & Freight 1.jpeg',
      '/images/industries/Cargo & Freight 2.jpeg',
      '/images/industries/Cargo & Freight 3.jpeg',
    ],
  },
  {
    id: '4',
    name: 'Military & Defense',
    slug: 'military-defense',
    description: 'Trusted partner for military aircraft structural repairs, modifications, and compliance with defense standards.',
    icon: '🛡️',
    features: [
      'Military specification compliance',
      'Classified project support',
      'Rapid deployment solutions',
      'Defense contractor certified',
    ],
    content: `UR Aerotech is a trusted partner for military and defense organizations, providing specialized structural repair and modification services for military aircraft. We understand the unique requirements of military operations and maintain the highest levels of security and quality standards.

**Military Specification Compliance:**

All our military work is performed in strict compliance with military specifications (MIL-SPEC) and defense standards. Our team is trained in military-specific requirements and maintains certifications for work on various military aircraft types.

We understand that military aircraft often operate in demanding conditions and require robust structural solutions. Our repairs and modifications are designed to meet or exceed military performance and durability requirements.

**Classified Project Support:**

We have the capability and security clearances to support classified military projects. Our facilities and processes are designed to handle sensitive military work while maintaining the highest levels of security and confidentiality.

Our team understands the importance of operational security and follows all required protocols for handling classified information and materials.

**Rapid Deployment Solutions:**

Military operations often require rapid response capabilities. We maintain the flexibility and resources to respond quickly to urgent military structural repair needs, supporting operational readiness and mission-critical requirements.

Our team can deploy to military facilities when required, providing on-site structural repair and modification services to support operational requirements.

**Defense Contractor Certification:**

We are certified as a defense contractor and maintain all required certifications and clearances. Our quality systems and processes are designed to meet defense industry standards, ensuring that all work meets the rigorous requirements of military operations.

**Key Benefits:**
- Full compliance with military specifications
- Classified project support capabilities
- Rapid deployment and response
- Defense contractor certified
- Security clearance support
- Mission-critical reliability`,
    image: '/images/industries/Military & Defense 1.jpeg',
    images: [
      '/images/industries/Military & Defense 1.jpeg',
      '/images/industries/Military & Defense 2.jpeg',
      '/images/industries/Military & Defense 3.jpeg',
    ],
  },
  {
    id: '5',
    name: 'Helicopter Services',
    slug: 'helicopter-services',
    description: 'Specialized structural repair and modification services for helicopters and rotorcraft of all types.',
    icon: '🚁',
    features: [
      'Rotor system repairs',
      'Airframe modifications',
      'Emergency medical service upgrades',
      'Offshore operations support',
    ],
    content: `UR Aerotech provides specialized structural repair and modification services for helicopters and rotorcraft. We understand the unique structural requirements of rotary-wing aircraft and have extensive experience working with all types of helicopters.

**Helicopter Structural Expertise:**

Helicopters have unique structural characteristics that require specialized knowledge and experience. Our team has extensive expertise in helicopter structures, including main rotor systems, tail rotors, airframes, and dynamic components.

We provide comprehensive structural repair services for all helicopter types, from light single-engine helicopters to heavy multi-engine helicopters used in commercial and military operations.

**Rotor System Repairs:**

Rotor systems are critical components that require specialized structural repair expertise. We provide structural repair services for rotor blades, hubs, and related components, ensuring that all repairs meet the highest standards of safety and performance.

Our rotor system repairs are performed with precision and attention to detail, recognizing that these components are essential to flight safety.

**Airframe Modifications:**

We provide airframe modification services for helicopters, including structural changes to accommodate new equipment, mission-specific modifications, and performance enhancements. Our engineering team designs modifications that maintain structural integrity while meeting your operational requirements.

**Emergency Medical Service Upgrades:**

We specialize in structural modifications for emergency medical service (EMS) helicopters. This includes structural reinforcements for medical equipment, modifications for patient transport systems, and structural changes to support specialized medical missions.

**Offshore Operations Support:**

Helicopters used in offshore operations face unique challenges, including exposure to harsh marine environments and the need for specialized equipment. We provide structural modifications and repairs specifically designed for offshore helicopter operations.

**Key Benefits:**
- Specialized helicopter structural expertise
- Rotor system repair capabilities
- Airframe modification services
- EMS helicopter modifications
- Offshore operations support
- All helicopter types supported`,
    image: '/images/industries/Helicopter Services 1.jpeg',
    images: [
      '/images/industries/Helicopter Services 1.jpeg',
      '/images/industries/Helicopter Services 2.jpeg',
      '/images/industries/Helicopter Services 3.jpeg',
    ],
  },
  {
    id: '6',
    name: 'Aerospace Manufacturing',
    slug: 'aerospace-manufacturing',
    description: 'Supporting aerospace manufacturers with structural components, assembly support, and production line services.',
    icon: '🏭',
    features: [
      'Component manufacturing',
      'Assembly line support',
      'Quality assurance',
      'Supply chain solutions',
    ],
    content: `UR Aerotech supports aerospace manufacturers with structural component manufacturing, assembly support, and production line services. We work as an extension of your manufacturing team, providing high-quality structural components and services that meet your exact specifications.

**Component Manufacturing:**

We manufacture structural components for aerospace manufacturers, including airframe components, structural assemblies, and specialized parts. Our manufacturing capabilities include precision machining, fabrication, and assembly services.

All our manufacturing is performed to aerospace quality standards, with complete traceability and documentation. We can work to your specifications or collaborate with your engineering team to develop manufacturing solutions.

**Assembly Line Support:**

We provide on-site and off-site assembly support for aerospace manufacturers. Our team can integrate into your production line, providing structural assembly services that maintain your production schedule and quality standards.

Our assembly services include structural component installation, fastening, and integration, all performed to aerospace manufacturing standards.

**Quality Assurance:**

We maintain rigorous quality assurance processes that meet aerospace manufacturing standards. All our work includes complete documentation, material traceability, and quality certifications required for aerospace manufacturing.

Our quality systems are designed to integrate with your manufacturing quality processes, ensuring seamless integration into your production workflow.

**Supply Chain Solutions:**

We understand the importance of reliable supply chains in aerospace manufacturing. We provide flexible manufacturing solutions that can scale to meet your production requirements, whether you need ongoing production support or assistance with specific projects.

Our supply chain solutions help reduce manufacturing risks and provide backup manufacturing capacity when needed.

**Key Benefits:**
- Aerospace quality component manufacturing
- Production line assembly support
- Rigorous quality assurance
- Flexible supply chain solutions
- Complete documentation and traceability
- Integration with your manufacturing processes`,
    image: '/images/industries/Aerospace Manufacturing 1.jpeg',
    images: [
      '/images/industries/Aerospace Manufacturing 1.jpeg',
      '/images/industries/Aerospace Manufacturing 2.jpeg',
      '/images/industries/Aerospace Manufacturing 3.jpeg',
    ],
  },
]

export function getAllIndustries(): Industry[] {
  return industries
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug)
}


