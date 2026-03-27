import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } }
    })
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { name, slug, description } = await req.json()
    if (!name || !slug) return NextResponse.json({ error: 'Name and slug required' }, { status: 400 })

    const category = await prisma.category.create({ data: { name, slug, description } })
    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Name or slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
  }
}
