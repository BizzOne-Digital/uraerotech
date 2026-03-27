import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// PATCH - Update order status (admin only)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const { status } = await req.json()

    // If cancelling, restore stock
    if (status === 'CANCELLED') {
      const existing = await prisma.order.findUnique({
        where: { id },
        include: { items: true }
      })
      if (existing && existing.status !== 'CANCELLED') {
        await Promise.all(existing.items.map(item =>
          prisma.product.update({
            where: { id: item.productId },
            data: { stock: { increment: item.quantity } }
          })
        ))
      }
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { user: true, items: { include: { product: true } } }
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
