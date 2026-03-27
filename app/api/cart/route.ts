import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET cart
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const existing = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } }
    })

    if (existing) return NextResponse.json(existing)

    const created = await prisma.cart.create({
      data: { userId: session.user.id },
      include: { items: { include: { product: true } } }
    })

    return NextResponse.json(created)
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 })
  }
}

// POST - Add item to cart
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (session.user.role === 'ADMIN') {
      return NextResponse.json({ error: 'Admins cannot add items to cart' }, { status: 403 })
    }

    const { productId, quantity } = await req.json()

    // Check product stock
    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    if (product.stock <= 0) return NextResponse.json({ error: 'Product is out of stock' }, { status: 400 })

    // Get or create cart
    const existing = await prisma.cart.findUnique({ where: { userId: session.user.id } })
    const cart = existing ?? await prisma.cart.create({ data: { userId: session.user.id } })

    // Check if item already in cart
    const existingItem = await prisma.cartItem.findFirst({
      where: { cartId: cart.id, productId }
    })

    const newQty = existingItem ? existingItem.quantity + quantity : quantity
    if (newQty > product.stock) {
      return NextResponse.json({ error: `Only ${product.stock} units available` }, { status: 400 })
    }

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQty }
      })
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity }
      })
    }

    // Return updated cart
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    return NextResponse.json(updatedCart)
  } catch (error) {
    console.error('Error adding to cart:', error)
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 })
  }
}

// PATCH - Update item quantity
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get('itemId')
    if (!itemId) return NextResponse.json({ error: 'Item ID required' }, { status: 400 })

    const { quantity } = await req.json()

    const cartItem = await prisma.cartItem.findUnique({ where: { id: itemId }, include: { product: true } })
    if (!cartItem) return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    if (quantity > cartItem.product.stock) {
      return NextResponse.json({ error: `Only ${cartItem.product.stock} units available` }, { status: 400 })
    }

    await prisma.cartItem.update({ where: { id: itemId }, data: { quantity } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update quantity' }, { status: 500 })
  }
}

// DELETE - Remove item from cart
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const itemId = searchParams.get('itemId')

    if (!itemId) {
      return NextResponse.json({ error: 'Item ID required' }, { status: 400 })
    }

    await prisma.cartItem.delete({
      where: { id: itemId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing from cart:', error)
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 })
  }
}
