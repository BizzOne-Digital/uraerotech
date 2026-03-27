import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role === 'ADMIN') {
      return NextResponse.json({ error: 'Admins cannot place orders' }, { status: 403 })
    }

    const { shippingAddress } = await req.json()
    if (!shippingAddress) {
      return NextResponse.json({ error: 'Shipping address required' }, { status: 400 })
    }

    // Get cart with items
    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (item.quantity > item.product.stock) {
        return NextResponse.json({
          error: `Only ${item.product.stock} units of "${item.product.name}" available`
        }, { status: 400 })
      }
    }

    // Calculate total (apply B2B discount if applicable)
    const isB2B = session.user.role === 'B2B'
    const total = cart.items.reduce((sum, item) => {
      const price = isB2B ? item.product.price * 0.9 : item.product.price
      return sum + (price * item.quantity)
    }, 0)

    // Create order and deduct stock in a transaction
    const order = await prisma.$transaction(async (tx) => {
      const created = await tx.order.create({
        data: {
          userId: session.user.id,
          total,
          shippingAddress,
          status: 'PENDING',
          items: {
            create: cart.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: isB2B ? item.product.price * 0.9 : item.product.price
            }))
          }
        },
        include: { items: { include: { product: true } } }
      })

      // Deduct stock for each item
      await Promise.all(cart.items.map(item =>
        tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        })
      ))

      return created
    })

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
