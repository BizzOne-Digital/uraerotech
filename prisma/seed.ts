import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { categories } from '../data/categories'
import { products } from '../data/products'
import { services } from '../data/services'
import { industries } from '../data/industries'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting fresh seed...')

  // ── Wipe existing data (order matters for relations) ──────────────────────
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.quote.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.service.deleteMany()
  await prisma.industry.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()
  console.log('Cleared existing data')

  // ── Users ─────────────────────────────────────────────────────────────────
  await prisma.user.create({
    data: {
      email: 'admin@uraerotech.com',
      name: 'Admin User',
      password: await bcrypt.hash('admin123', 10),
      role: 'ADMIN',
    },
  })

  await prisma.user.create({
    data: {
      email: 'customer@example.com',
      name: 'John Doe',
      password: await bcrypt.hash('customer123', 10),
      role: 'B2C',
      phone: '+1234567890',
    },
  })

  await prisma.user.create({
    data: {
      email: 'business@example.com',
      name: 'Aviation Corp',
      password: await bcrypt.hash('business123', 10),
      role: 'B2B',
      phone: '+1987654321',
      company: 'Aviation Solutions Inc.',
    },
  })
  console.log('Created users')

  // ── Categories ────────────────────────────────────────────────────────────
  for (const cat of categories) {
    await prisma.category.create({
      data: { name: cat.name, slug: cat.slug, description: cat.description },
    })
  }
  console.log('Created categories')

  // Build slug → id map
  const dbCategories = await prisma.category.findMany()
  const categoryMap: Record<string, string> = {}
  for (const c of dbCategories) categoryMap[c.slug] = c.id

  // ── Products ──────────────────────────────────────────────────────────────
  for (const p of products) {
    const categoryId = categoryMap[p.categorySlug]
    if (!categoryId) {
      console.warn(`Category not found: ${p.categorySlug} — skipping ${p.slug}`)
      continue
    }
    await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        detail: (p as any).detail ?? null,
        price: p.price,
        stock: p.stock,
        image: p.image,
        categoryId,
      },
    })
  }
  console.log('Created products')

  // ── Services ──────────────────────────────────────────────────────────────
  for (const s of services) {
    await prisma.service.create({
      data: {
        name: s.name,
        slug: s.slug,
        description: s.description,
        content: s.content,
        icon: s.icon,
        image: s.image,
        images: s.images ?? [],
        isActive: true,
      },
    })
  }
  console.log('Created services')

  // ── Industries ────────────────────────────────────────────────────────────
  for (const ind of industries) {
    await prisma.industry.create({
      data: {
        name: ind.name,
        slug: ind.slug,
        description: ind.description,
        content: ind.content,
        icon: ind.icon,
        image: ind.image,
        images: ind.images ?? [],
        features: ind.features,
        isActive: true,
      },
    })
  }
  console.log('Created industries')

  console.log('Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
