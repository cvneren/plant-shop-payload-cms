import React, { Suspense } from 'react'
import { getPayload } from '@/lib/payload'
import ProductGrid from '@/components/ui/ProductGrid'
import SkeletonGrid from '@/components/ui/SkeletonGrid'
import { HorizontalFilters } from '@/components/products/HorizontalFilters'

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

async function ProductsList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let products: any[] = []

  try {
    const payload = await getPayload()
    if (payload) {
      const categorySlug = searchParams.category as string
      const lightLevel = searchParams.light as string
      const petFriendly = searchParams.petFriendly as string

      const where: any = {}

      if (categorySlug) {
        where['category.slug'] = { equals: categorySlug }
      }

      if (lightLevel) {
        where['lightLevel'] = { equals: lightLevel }
      }

      if (petFriendly === 'true') {
        where['petFriendly'] = { equals: true }
      }

      const { docs: fetchedProducts } = await payload.find({
        collection: 'products',
        where,
        depth: 1,
      })
      products = fetchedProducts || []
    }
  } catch (error: any) {
    console.error('Error fetching products:', error.message)
  }

  return <ProductGrid products={products} />
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-28 pb-32">
        {/* Page Headline */}
        <section className="mb-10 max-w-xl">
          <h1 className="font-serif text-4xl md:text-5xl text-primary font-bold mb-3 tracking-tight">Our Collection</h1>
          <p className="font-sans text-sm md:text-base text-primary/70 leading-relaxed">
            Curated greenery for every corner of your home. From rare specimens to hardy housewarming classics.
          </p>
        </section>

        {/* Filter & Sort Bar */}
        <HorizontalFilters />

        {/* Product Grid */}
        <main className="mt-8">
          <Suspense key={JSON.stringify(resolvedSearchParams)} fallback={<SkeletonGrid count={8} />}>
            <ProductsList searchParams={resolvedSearchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}
