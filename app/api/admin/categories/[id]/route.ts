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
    const category = await prisma.category.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.slug && { slug: data.slug }),
        ...(data.description !== undefined && { description: data.description }),
      }
    })
    return NextResponse.json(category)
  } catch (error: any) {
    if (error.code === 'P2002') return NextResponse.json({ error: 'Name or slug already exists' }, { status: 409 })
    return NextResponse.json({ error: 'Failed to update category' }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const { id } = await params

    // Get all products in this category
    const products = await prisma.product.findMany({ where: { categoryId: id }, select: { id: true } })
    const productIds = products.map(p => p.id)

    if (productIds.length > 0) {
      // Delete cart items for these products
      await prisma.cartItem.deleteMany({ where: { productId: { in: productIds } } })
      // Delete order items and their orders
      const orderItems = await prisma.orderItem.findMany({ where: { productId: { in: productIds } }, select: { orderId: true } })
      const orderIds = [...new Set(orderItems.map(i => i.orderId))]
      await prisma.orderItem.deleteMany({ where: { productId: { in: productIds } } })
      if (orderIds.length > 0) {
        await prisma.order.deleteMany({ where: { id: { in: orderIds } } })
      }
      // Delete products
      await prisma.product.deleteMany({ where: { categoryId: id } })
    }

    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting category:', error)
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 })
  }
}
