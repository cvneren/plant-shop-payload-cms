import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPayload } from '@/lib/payload'
import { Button } from '@/components/ui/Button'
import { Chip } from '@/components/ui/Chip'
import { formatPrice } from '@/lib/utils'
import { AddToCartButton } from '@/components/products/AddToCartButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProduct(slug: string) {
  try {
    const payload = await getPayload()
    if (!payload) return null
    
    const { docs } = await payload.find({
      collection: 'products',
      where: {
        slug: { equals: slug },
      },
      depth: 1,
    })

    return docs[0] || null
  } catch (error: any) {
    console.error('Error fetching product:', error.message)
    return null
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  const { name, price, description, careInstructions, images, category, lightLevel, petFriendly, stock } = product
  const mainImage = typeof images?.[0]?.image === 'object' ? images[0].image : null

  const categoryName = (category as any)?.name || 'Plant'
  const isPetFriendlyCategory = categoryName.toLowerCase().includes('pet friendly') || categoryName.toLowerCase().includes('pet-friendly')
  const showPetFriendlyChip = petFriendly && !isPetFriendlyCategory

  return (
    <div className="bg-surface min-h-screen pt-28 pb-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Section */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#efe6e2] shadow-ambient border border-primary/5">
            {mainImage?.url ? (
              <Image
                src={mainImage.url}
                alt={mainImage.alt || name}
                fill
                priority
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary font-sans uppercase tracking-widest text-xs">
                No Image Available
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <Chip variant="sage">{categoryName}</Chip>
                {showPetFriendlyChip && <Chip variant="terracotta">Pet Friendly</Chip>}
              </div>
              
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary italic leading-tight">
                {name}
              </h1>
              
              <p className="text-xl md:text-2xl font-sans font-medium text-primary">
                {formatPrice(price)}
              </p>
            </div>

            <div className="flex flex-col gap-6 border-y border-primary/10 py-8">
              <div className="flex flex-col gap-2">
                <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">The Story</h3>
                <p className="font-sans text-lg text-primary/80 leading-relaxed italic">
                  &ldquo;{description}&rdquo;
                </p>
              </div>

              {/* Specifications Block - Luxury Botanical Profile */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                {/* Family */}
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-primary/5 shadow-ambient">
                  <span className="material-symbols-outlined text-primary text-xl">local_florist</span>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary/40 leading-none mb-1">Family</h4>
                    <p className="text-xs font-sans font-bold uppercase tracking-wider text-primary truncate max-w-[120px]">{categoryName}</p>
                  </div>
                </div>

                {/* Light */}
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-primary/5 shadow-ambient">
                  <span className="material-symbols-outlined text-primary text-xl">wb_sunny</span>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary/40 leading-none mb-1">Light</h4>
                    <p className="text-xs font-sans font-bold uppercase tracking-wider text-primary">{lightLevel}</p>
                  </div>
                </div>

                {/* Pet Friendly */}
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-primary/5 shadow-ambient">
                  <span className="material-symbols-outlined text-primary text-xl">pets</span>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary/40 leading-none mb-1">Safety</h4>
                    <p className="text-xs font-sans font-bold uppercase tracking-wider text-primary">{petFriendly ? 'Pet Safe' : 'Inquire'}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 bg-white/40 backdrop-blur-sm p-4 rounded-2xl border border-primary/5 shadow-ambient">
                  <span className="material-symbols-outlined text-primary text-xl">{stock > 0 ? 'check_circle' : 'error'}</span>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold uppercase tracking-wider text-primary/40 leading-none mb-1">Stock</h4>
                    <p className="text-xs font-sans font-bold uppercase tracking-wider text-primary">{stock > 0 ? 'In Stock' : 'Sold Out'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary/40">Care Instructions</h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">
                {careInstructions || 'Standard indoor plant care applies. Keep soil moist but not soggy, and ensure adequate light based on variety.'}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <AddToCartButton 
                product={{
                  id: product.id,
                  name,
                  price,
                  slug,
                  image: mainImage?.url || '',
                  stock
                }} 
              />
              <p className="text-[10px] uppercase tracking-widest text-primary/30 text-center md:text-left font-sans font-bold">
                Eco-friendly botanical shipping included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
