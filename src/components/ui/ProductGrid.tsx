'use client'

import React from 'react'
import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: any[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {products.length === 0 && (
        <p className="col-span-full text-center py-20 text-[#8C4E37]">No plants found in our garden yet.</p>
      )}
    </motion.div>
  )
}

export default ProductGrid
