'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { useCart, CartItem } from '@/providers/CartProvider'

interface AddToCartButtonProps {
  product: {
    id: string | number
    name: string
    price: number
    slug: string
    image?: string
    stock: number
  }
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { addItem } = useCart()
  const [added, setAdded] = React.useState(false)

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      slug: product.slug,
      image: product.image,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button 
      size="lg" 
      className="w-full md:w-fit px-12 rounded-full shadow-ambient" 
      disabled={product.stock === 0}
      onClick={handleAdd}
    >
      {added ? 'Added to Sanctuary' : product.stock > 0 ? 'Add to Sanctuary' : 'Currently Unavailable'}
    </Button>
  )
}
