'use client'

interface ProductCardProps {
  image: string | undefined
  alt: string
}

export default function ProductCardImage({ image, alt }: ProductCardProps) {
  return (
    <img
      src={image || '/products/default.jpg'}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      onError={(e) => { (e.target as HTMLImageElement).src = '/products/default.jpg' }}
    />
  )
}
