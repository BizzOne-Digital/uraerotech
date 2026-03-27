import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const industries = await prisma.industry.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(industries)
  } catch (error) {
    console.error('Error fetching industries:', error)
    return NextResponse.json({ error: 'Failed to fetch industries' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const data = await req.json()
    const industry = await prisma.industry.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        content: data.content,
        icon: data.icon || '✈️',
        image: data.image || '',
        images: data.images || [],
        features: data.features || [],
        isActive: data.isActive !== false,
      }
    })
    return NextResponse.json(industry, { status: 201 })
  } catch (error) {
    console.error('Error creating industry:', error)
    return NextResponse.json({ error: 'Failed to create industry' }, { status: 500 })
  }
}
