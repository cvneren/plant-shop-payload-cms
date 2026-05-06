'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload/payload-types'

import { useCart } from '@/providers/CartProvider'

interface ProductCardProps {
  product: Product
}

const getScientificName = (name: string) => {
  const lower = name.toLowerCase()
  if (lower.includes('albo') || lower.includes('monstera')) return "Monstera deliciosa 'Albo Variegata'"
  if (lower.includes('pink') || lower.includes('princess')) return "Philodendron erubescens 'Pink Princess'"
  if (lower.includes('zz')) return "Zamioculcas zamiifolia"
  if (lower.includes('snake')) return "Dracaena trifasciata"
  if (lower.includes('pothos')) return "Epipremnum aureum"
  if (lower.includes('calathea')) return "Calathea orbifolia"
  if (lower.includes('fern')) return "Nephrolepis exaltata"
  return "Botanical Specimen"
}

const getLightIcon = (level: string) => {
  const l = level?.toLowerCase() || ''
  if (l.includes('low')) return 'wb_twilight'
  if (l.includes('direct')) return 'sunny'
  return 'light_mode'
}

const getDifficulty = (name: string, light: string) => {
  const n = name.toLowerCase()
  if (n.includes('albo') || n.includes('pink')) return 'Intermediate'
  if (light.toLowerCase().includes('low')) return 'Easy Care'
  return 'Easy Care'
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { name, slug, price, images, lightLevel } = product
  const mainImage = typeof images?.[0]?.image === 'object' ? images[0].image : null
  const { addItem } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-[#efe6e2] flex items-center justify-center">
        <Link href={`/products/${slug}`} className="w-full h-full block relative">
          {mainImage?.url ? (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          ) : (
            <div className="text-primary/20 scale-150 opacity-20 flex items-center justify-center w-full h-full">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          )}
        </Link>
        <button 
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            addItem({
              id: product.id,
              name,
              price,
              slug,
              image: mainImage?.url || ''
            })
          }}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg active:scale-90 transition-transform hover:bg-[#4a5d4e] z-20"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
        </button>
      </div>

      <div className="px-1 flex-grow flex flex-col">
        <h3 className="font-serif text-lg md:text-xl text-primary font-bold mb-0.5 group-hover:text-secondary transition-colors duration-300">
          <Link href={`/products/${slug}`}>{name}</Link>
        </h3>
        <p className="font-serif italic text-xs text-primary/60 mb-3">{getScientificName(name)}</p>
        
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="flex items-center gap-1 px-2.5 py-0.5 bg-[#efe6e2] text-primary/70 font-sans text-[10px] font-bold uppercase tracking-[0.08em] rounded-full">
            <span className="material-symbols-outlined text-[12px]">{getLightIcon(lightLevel)}</span> {lightLevel} Light
          </span>
          <span className="px-2.5 py-0.5 bg-[#efe6e2] text-primary/70 font-sans text-[10px] font-bold uppercase tracking-[0.08em] rounded-full">
            {getDifficulty(name, lightLevel)}
          </span>
        </div>
        <p className="font-sans text-sm text-primary font-bold mt-auto">{formatPrice(price)}</p>
      </div>
    </motion.div>
  )
}

export default ProductCard
