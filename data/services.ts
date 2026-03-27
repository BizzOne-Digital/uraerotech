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
    description: 'Expert structural repair services ensuring airworthiness and compliance with aviation standards.',
    content: `Our aircraft structural repair services are designed to restore your aircraft to full airworthiness. We provide comprehensive structural repair solutions that meet or exceed FAA and international aviation standards.

Our certified engineers and technicians have extensive experience in repairing various types of structural damage, from minor dents to major structural components. We ensure all repairs are documented, certified, and compliant with regulatory requirements.

With over 20 years of experience in the aviation industry, we have successfully completed thousands of structural repairs on various aircraft types, including commercial airliners, private jets, helicopters, and cargo aircraft. Our team understands the critical importance of maintaining structural integrity while ensuring minimal downtime for your operations.

**Our Repair Process:**

We follow a systematic approach to every structural repair project. First, our team conducts a thorough damage assessment using advanced inspection techniques and equipment. This allows us to identify all areas requiring attention and develop a comprehensive repair plan.

Next, we design the repair solution using industry-standard engineering principles and materials. All repair designs are reviewed and approved by certified structural engineers to ensure they meet or exceed original equipment manufacturer (OEM) specifications.

During the repair execution phase, our skilled technicians use precision tools and techniques to restore the structural integrity of your aircraft. We work with certified materials and follow strict quality control procedures at every step.

Finally, we provide complete documentation of all work performed, including repair reports, material certifications, and compliance documentation. This ensures your aircraft maintains its airworthiness certification and meets all regulatory requirements.

**Key Features:**
- Comprehensive damage assessment using advanced inspection techniques
- Expert repair techniques backed by 20+ years of experience
- Full compliance with FAA and international aviation standards
- Complete documentation and certification for all repairs
- Fast turnaround times to minimize aircraft downtime
- Quality assurance at every step of the process
- Certified materials and OEM-approved procedures
- Support for all aircraft types and models

**Why Choose Us:**

Our commitment to excellence and safety sets us apart. We understand that structural repairs are critical to aircraft safety, and we never compromise on quality. Our team stays current with the latest repair techniques, materials, and regulatory requirements to ensure your aircraft receives the best possible service.

We also recognize that time is money in the aviation industry. That's why we work efficiently without sacrificing quality, helping you get your aircraft back in service as quickly as possible.`,
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
    name: 'Aircraft Structure Modifications',
    slug: 'aircraft-structure-modifications',
    description: 'Professional modification services for aircraft structures, tailored to your specific requirements.',
    content: `We offer professional aircraft structure modification services customized to meet your specific operational needs. Our team of certified engineers works closely with you to design and implement structural modifications that enhance performance, accommodate new equipment, or meet updated regulatory requirements.

All modifications are executed with precision, fully documented, and certified for airworthiness. Whether you need to install new avionics, modify cabin configurations, add cargo capabilities, or implement performance enhancements, we have the expertise to deliver.

**Our Modification Services:**

Our modification services cover a wide range of structural changes, from minor alterations to major structural modifications. We work with aircraft owners, operators, and maintenance facilities to design solutions that meet their specific requirements while maintaining or improving aircraft safety and performance.

For avionics installations, we design and implement structural modifications to accommodate new equipment while maintaining proper weight and balance. Our engineers ensure all modifications comply with applicable regulations and don't compromise aircraft structural integrity.

Cabin modifications are another area of expertise. Whether you need to reconfigure seating, add luxury amenities, or modify interior structures, we can design and implement the necessary structural changes while maintaining compliance with all safety regulations.

Cargo conversions are particularly complex, requiring careful engineering to ensure the aircraft can safely carry increased loads. We design and implement structural reinforcements, floor modifications, and door installations to convert passenger aircraft for cargo operations.

**The Modification Process:**

Every modification project begins with a detailed consultation to understand your requirements and objectives. Our engineers then conduct a thorough analysis of your aircraft's current structure and develop a comprehensive modification plan.

We create detailed engineering drawings and documentation for all proposed modifications, ensuring they meet regulatory requirements and maintain aircraft airworthiness. All designs are reviewed and approved by certified structural engineers before implementation.

During the modification phase, our skilled technicians execute the work with precision, using certified materials and following approved procedures. We maintain strict quality control throughout the process to ensure the highest standards are met.

Upon completion, we provide comprehensive documentation including engineering drawings, material certifications, compliance documentation, and modification reports. This ensures your aircraft maintains its airworthiness certification and all modifications are properly documented.

**Key Features:**
- Custom design and engineering by certified professionals
- Performance enhancements to improve aircraft capabilities
- Equipment integration for avionics and systems
- Full regulatory compliance with FAA and international standards
- Detailed documentation for all modifications
- Professional certification and airworthiness approval
- Support for all aircraft types and models
- Turnkey modification services from design to completion`,
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
    description: 'Comprehensive service bulletin compliance services to keep your aircraft current and compliant.',
    content: `Stay compliant with all manufacturer service bulletins and regulatory requirements. Our comprehensive service bulletin compliance services ensure your aircraft remains current and meets all mandatory and recommended service bulletin requirements.

We maintain detailed tracking of all service bulletins applicable to your aircraft, coordinate necessary modifications or inspections, and provide complete documentation for your records. Service bulletins are critical for maintaining aircraft safety and airworthiness, and non-compliance can result in serious consequences including grounding of your aircraft.

**Understanding Service Bulletins:**

Service bulletins are issued by aircraft manufacturers to communicate important information about aircraft maintenance, modifications, or inspections. They can be mandatory (required by regulatory authorities) or recommended (advisory in nature). Mandatory service bulletins must be complied with to maintain aircraft airworthiness, while recommended bulletins are strongly advised to ensure optimal aircraft performance and safety.

Our team stays current with all service bulletins issued by major aircraft manufacturers including Boeing, Airbus, Bombardier, Embraer, and others. We maintain comprehensive databases and tracking systems to ensure we never miss an applicable bulletin for your aircraft.

**Our Compliance Services:**

We provide end-to-end service bulletin compliance management. Our services begin with a comprehensive review of your aircraft's current compliance status. We identify all applicable service bulletins, both mandatory and recommended, and create a detailed compliance plan.

For each applicable bulletin, we analyze the requirements and determine the necessary actions. This may include inspections, modifications, part replacements, or other maintenance actions. We coordinate all necessary work and ensure it's completed in accordance with the bulletin requirements.

Our team handles all documentation, ensuring proper records are maintained for regulatory compliance. We provide detailed compliance reports that document all work performed and verify compliance with each applicable bulletin.

**Compliance Tracking and Management:**

We maintain detailed tracking systems to monitor your aircraft's compliance status over time. This includes tracking compliance dates, expiration dates for time-limited bulletins, and scheduling future compliance actions.

Our proactive approach ensures you're never caught off guard by compliance deadlines. We provide advance notifications of upcoming compliance requirements and help you plan maintenance schedules to efficiently address multiple bulletins when possible.

We also monitor for new service bulletins that may become applicable to your aircraft, ensuring you stay current with the latest manufacturer recommendations and regulatory requirements.

**Key Features:**
- Comprehensive service bulletin tracking for all major manufacturers
- Complete compliance management from identification to completion
- Support for both mandatory and recommended service bulletins
- Detailed documentation and compliance reporting
- Inspection coordination and scheduling
- Proactive monitoring of regulatory updates
- Integration with maintenance planning
- Expert analysis of bulletin requirements`,
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
    description: 'Reliable sourcing and supply of certified aircraft parts from trusted manufacturers.',
    content: `We provide reliable sourcing and supply of certified aircraft parts from trusted manufacturers worldwide. Our extensive network of suppliers ensures we can locate and procure genuine, certified parts for your aircraft needs.

All parts are verified for authenticity, certification, and compliance with aviation standards. We handle the entire procurement process, from sourcing to delivery, ensuring you receive quality parts when you need them. With over 20 years in the aviation industry, we've built relationships with suppliers and manufacturers around the globe, giving us access to a vast inventory of aircraft parts.

**Our Parts Inventory:**

We maintain an extensive inventory of commonly needed aircraft parts, including structural components, avionics, landing gear parts, engine components, and interior fittings. Our inventory is constantly updated to ensure we have the parts you need when you need them.

For parts not in our inventory, we leverage our global supplier network to quickly locate and procure the required components. Our relationships with OEMs, authorized distributors, and certified suppliers ensure we can source genuine, certified parts for virtually any aircraft type.

**Quality Assurance:**

Every part we supply undergoes rigorous quality verification. We verify authenticity, check certifications, and ensure compliance with all applicable aviation standards. All parts come with complete documentation including certificates of conformance, traceability records, and compliance documentation.

We understand that using non-certified or counterfeit parts can have serious safety and legal consequences. That's why we maintain strict quality control procedures and only source parts from trusted, certified suppliers.

**Procurement Services:**

Our procurement services cover the entire process from initial inquiry to delivery. We handle all aspects including supplier communication, price negotiation, quality verification, documentation, shipping coordination, and customs clearance when required.

We work efficiently to minimize lead times while ensuring quality. Our team understands the urgency that often accompanies aircraft parts needs, and we prioritize fast turnaround times without compromising on quality or compliance.

**Key Features:**
- Global supplier network with access to thousands of suppliers
- Certified and genuine parts with full traceability
- Comprehensive quality verification and certification checks
- Fast procurement with expedited shipping options
- Complete documentation including certificates and compliance records
- Competitive pricing with transparent cost structures
- Support for all aircraft types and manufacturers
- Emergency parts sourcing for urgent requirements
- Inventory management and parts tracking
- Custom procurement solutions for fleet operators`,
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
    description: 'Premium aviation tools and equipment for professional aircraft maintenance and repair.',
    content: `We offer a comprehensive selection of premium aviation tools and equipment designed for professional aircraft maintenance and repair operations. Our inventory includes specialized tools from leading manufacturers, all certified and calibrated to meet aviation industry standards.

Whether you need hand tools, precision instruments, or specialized equipment, we can provide the right tools for your maintenance needs. Our extensive catalog includes thousands of tools from trusted manufacturers, ensuring you can find exactly what you need for your maintenance operations.

**Our Tool Categories:**

We stock a wide range of aviation tools organized into several categories. Hand tools include wrenches, sockets, screwdrivers, pliers, and other essential tools specifically designed for aircraft maintenance. All hand tools meet aviation industry standards and are designed for use in aircraft maintenance environments.

Precision instruments are another important category, including torque wrenches, micrometers, gauges, and measuring instruments. These tools are critical for ensuring proper installation and maintenance of aircraft components. All precision instruments are calibrated and certified to meet industry standards.

Specialized tools form a significant part of our inventory. These include aircraft-specific tools designed for particular maintenance tasks, such as engine tools, landing gear tools, avionics tools, and structural repair tools. These specialized tools are often required for specific maintenance procedures and can be difficult to source elsewhere.

**Tool Quality and Certification:**

All tools we sell are from reputable manufacturers and meet or exceed aviation industry standards. Precision instruments are calibrated and certified, with calibration certificates provided. We maintain relationships with leading tool manufacturers to ensure we offer the latest and best tools available.

We understand that tool quality directly impacts maintenance quality and safety. That's why we only stock tools from trusted manufacturers with proven track records in the aviation industry. All tools are inspected and verified before sale to ensure they meet our quality standards.

**Support and Service:**

We provide comprehensive support for all tools we sell. This includes technical support, calibration services, warranty service, and replacement parts. Our team can help you select the right tools for your specific needs and provide guidance on proper use and maintenance.

For precision instruments, we offer calibration services to ensure your tools remain accurate and compliant. We maintain calibration standards and can provide calibration certificates for all calibrated tools.

**Key Features:**
- Premium quality tools from leading manufacturers
- Comprehensive inventory covering all tool categories
- Certified and calibrated precision instruments
- Professional grade equipment for commercial operations
- Specialized tools for aircraft-specific maintenance tasks
- Complete technical support and guidance
- Calibration services for precision instruments
- Warranty and service support
- Competitive pricing with volume discounts
- Fast shipping and delivery options`,
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
    description: 'Flexible tool rental solutions for short-term projects and specialized maintenance needs.',
    content: `Need specialized aviation tools for a short-term project? Our flexible tool rental program provides access to premium aviation tools and equipment without the upfront investment.

Perfect for one-time repairs, special projects, or when you need specialized equipment that you don't use regularly. All rental tools are certified, calibrated, and maintained to the highest standards. We offer flexible rental terms to accommodate your project timeline and budget.

**Why Rent Aviation Tools?**

Aviation tools, especially specialized and precision instruments, can be expensive investments. For tools that are only needed occasionally, renting makes much more financial sense than purchasing. Our rental program allows you to access premium tools when you need them without the significant upfront cost.

Renting is also ideal for trying out new tools before making a purchase decision. You can evaluate a tool's suitability for your operations before committing to a purchase. Additionally, renting ensures you always have access to the latest tool models and technologies without the need to constantly update your inventory.

**Our Rental Inventory:**

Our rental inventory includes a wide range of aviation tools available for short-term rental. This includes precision instruments like torque wrenches, micrometers, and gauges, specialized tools for specific maintenance tasks, and larger equipment that may be needed for special projects.

All rental tools are maintained to the highest standards. Precision instruments are calibrated before each rental, and all tools are inspected to ensure they're in perfect working condition. We provide calibration certificates for all calibrated rental tools.

**Rental Terms and Options:**

We offer flexible rental terms to meet your needs. Short-term rentals are available for daily, weekly, or monthly periods. For longer projects, we can arrange extended rental terms with favorable rates.

All rental agreements include tool insurance coverage, so you're protected in case of damage or loss. We also provide technical support during your rental period to help you get the most out of the tools you're renting.

Delivery and pickup services are available for your convenience. We can deliver tools to your location and pick them up when your rental period ends, minimizing disruption to your operations.

**Key Features:**
- Flexible rental terms from daily to monthly options
- Access to premium tools without upfront investment
- No long-term commitment required
- All tools certified and calibrated before rental
- Short-term solutions for temporary needs
- Budget-friendly options for cost-conscious operations
- Tool insurance coverage included
- Delivery and pickup services available
- Technical support during rental period
- Latest tool models and technologies available
- Extended rental terms for longer projects`,
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

