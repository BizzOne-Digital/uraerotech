import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const data = await req.json()
    const industry = await prisma.industry.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.description && { description: data.description }),
        ...(data.content && { content: data.content }),
        ...(data.icon && { icon: data.icon }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.images !== undefined && { images: data.images }),
        ...(data.features && { features: data.features }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      }
    })
    return NextResponse.json(industry)
  } catch (error) {
    console.error('Error updating industry:', error)
    return NextResponse.json({ error: 'Failed to update industry' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params
    const industry = await prisma.industry.findUnique({ where: { id }, select: { name: true } })
    if (industry) {
      await prisma.quote.deleteMany({ where: { serviceType: { contains: industry.name } } })
    }
    await prisma.industry.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting industry:', error)
    return NextResponse.json({ error: 'Failed to delete industry' }, { status: 500 })
  }
}
