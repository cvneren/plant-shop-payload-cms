import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from '@/lib/payload'
import ProductGrid from '@/components/ui/ProductGrid'
import SkeletonGrid from '@/components/ui/SkeletonGrid'
import { Button } from '@/components/ui/Button'
import { SearchPill } from '@/components/ui/SearchPill'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function FeaturedProductsSection() {
  let products: any[] = []

  try {
    const payload = await getPayload()
    if (payload) {
      console.log('Fetching featured products...')
      const { docs: fetchedProducts } = await payload.find({
        collection: 'products',
        limit: 4,
        sort: '-createdAt',
      })
      products = fetchedProducts || []
      console.log(`Found ${products.length} products`)
    } else {
      console.warn('Payload client is null. CMS might be down.')
    }
  } catch (error: any) {
    console.error('Error fetching featured products:', error.stack || error)
  }

  return <ProductGrid products={products} />
}

export default async function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Search Centric (as in Rooted Home - With Filters) */}
      <section className="relative w-full px-4 md:px-gutter max-w-[1440px] mx-auto mt-8 mb-16 z-10">
        <div className="relative w-full h-80 md:h-[450px] rounded-[2rem] overflow-hidden mb-8 shadow-ambient border border-primary/5">
          <Image
            src="https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=1974&auto=format&fit=crop"
            alt="Lush indoor plant collection"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
          
          {/* Overlay Text for Editorial Aesthetic */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 z-10">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary/60 mb-2">Est. 2026</span>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-primary italic leading-tight">
              Breathe Life <br />
              <span className="not-italic font-normal">Into Your Space.</span>
            </h1>
          </div>
        </div>

        {/* Prominent Search Bar (Overlapping) */}
        <div className="relative max-w-2xl mx-auto -mt-16 z-20 px-4">
          <SearchPill />
        </div>
      </section>

      {/* Circular Categories - Browse by Need */}
      <section className="px-4 md:px-gutter max-w-[1440px] mx-auto mb-20 z-10 w-full overflow-hidden">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-8 text-center md:text-left">
          Browse by Need
        </h2>
        
        <div className="w-full max-w-full flex flex-nowrap overflow-x-auto gap-8 pt-4 pb-4 scrollbar-thin justify-start md:justify-center items-center">
          {/* Low Light */}
          <Link href="/products?category=low-light" className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-ambient group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-300 border border-primary/5">
              <span className="material-symbols-outlined text-primary group-hover:text-surface text-[32px] transition-colors">
                wb_sunny
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-colors text-center whitespace-nowrap">Low Light</span>
          </Link>

          {/* Pet Friendly */}
          <Link href="/products?category=pet-friendly" className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-ambient group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-300 border border-primary/5">
              <span className="material-symbols-outlined text-primary group-hover:text-surface text-[32px] transition-colors">
                pets
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-colors text-center whitespace-nowrap">Pet Friendly</span>
          </Link>

          {/* Succulents */}
          <Link href="/products?category=succulents" className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-ambient group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-300 border border-primary/5">
              <span className="material-symbols-outlined text-primary group-hover:text-surface text-[32px] transition-colors">
                local_florist
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-colors text-center whitespace-nowrap">Succulents</span>
          </Link>

          {/* Easy Care */}
          <Link href="/products?category=easy-care" className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-ambient group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-300 border border-primary/5">
              <span className="material-symbols-outlined text-primary group-hover:text-surface text-[32px] transition-colors">
                water_drop
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-colors text-center whitespace-nowrap">Easy Care</span>
          </Link>

          {/* Large Trees */}
          <Link href="/products?category=large-trees" className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-ambient group-hover:-translate-y-1 group-hover:bg-primary transition-all duration-300 border border-primary/5">
              <span className="material-symbols-outlined text-primary group-hover:text-surface text-[32px] transition-colors">
                forest
              </span>
            </div>
            <span className="font-sans text-xs font-bold uppercase tracking-wider text-primary/60 group-hover:text-primary transition-colors text-center whitespace-nowrap">Large Trees</span>
          </Link>
        </div>
      </section>

      {/* Trending Now - Staggered Grid (as in Rooted Home - With Filters) */}
      <section className="py-20 bg-surface">
        <div className="px-4 md:px-gutter max-w-[1440px] mx-auto">
          
          <h2 className="font-serif text-3xl md:text-4xl text-primary font-normal mb-10">
            Trending Now
          </h2>
          
          <div className="flex items-center justify-between gap-4 mb-12">
            {/* Scrollable Filters */}
            <div className="flex overflow-x-auto hide-scrollbar gap-2 py-1 flex-grow">
              <Link 
                href="/products?category=low-light" 
                className="px-5 py-2 bg-[#d3e8d5] text-[#0e1f13] rounded-full font-sans text-sm whitespace-nowrap hover:bg-[#b7ccb9] transition-colors"
              >
                Low Light
              </Link>
              <Link 
                href="/products?category=pet-friendly" 
                className="px-5 py-2 bg-[#d3e8d5] text-[#0e1f13] rounded-full font-sans text-sm whitespace-nowrap hover:bg-[#b7ccb9] transition-colors"
              >
                Pet Friendly
              </Link>
              <Link 
                href="/products?category=rare" 
                className="px-5 py-2 bg-[#d3e8d5] text-[#0e1f13] rounded-full font-sans text-sm whitespace-nowrap hover:bg-[#b7ccb9] transition-colors"
              >
                Rare
              </Link>
              <Link 
                href="/products?category=large-plants" 
                className="px-5 py-2 bg-[#d3e8d5] text-[#0e1f13] rounded-full font-sans text-sm whitespace-nowrap hover:bg-[#b7ccb9] transition-colors"
              >
                Large Plants
              </Link>
              <Link 
                href="/products?category=succulents" 
                className="px-5 py-2 bg-[#d3e8d5] text-[#0e1f13] rounded-full font-sans text-sm whitespace-nowrap hover:bg-[#b7ccb9] transition-colors"
              >
                Succulents
              </Link>
            </div>

            {/* Sort/Tune Button */}
            <Link 
              href="/products" 
              aria-label="View and sort all options" 
              className="flex items-center justify-center p-3 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-full transition-all flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[24px]">tune</span>
            </Link>
          </div>

          <Suspense fallback={<SkeletonGrid count={4} />}>
            <FeaturedProductsSection />
          </Suspense>

          {/* View All Plants Button */}
          <div className="flex justify-center mt-12">
            <Link 
              href="/products" 
              className="bg-[#4a5d4e] text-white font-sans text-sm font-medium px-8 py-3.5 rounded-full hover:bg-opacity-90 transition-all shadow-ambient inline-flex items-center justify-center"
            >
              View All Plants
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Tips Section - Plant Parent Tips */}
      <section className="my-24 px-4 md:px-gutter max-w-[1440px] mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-primary mb-10 text-center md:text-left">
          Plant Parent Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Tip Tile 1 */}
          <article className="bg-[#f5ece7] rounded-2xl overflow-hidden flex flex-col group cursor-pointer shadow-ambient hover:shadow-ambient-hover transition-all duration-500">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Watering Plants" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD95JXTTBs11fqX_jdz-bz71XGTRiFEDEoKXcIr0aD3rwTanl7Mh9LUtEP1btm1ZynAJWNpYVGyldC2uUW_GzKJyB6tJu4bF5f5Rp0B9H-Ax9lIpA0YKyV4-EIexzzEZ2YGJivwhDyR7sOOFkcrsfAsvw73ktyJRVfA8wO4hvsBbLV9q0CY3YfFxFsXSHNEekuh4DBraVg5tayBf9OC76sgmq4kLTEdGnbm-FqLWSkPJwmUpR6DZdjWSJ2TF814J2UJc-v23nerCf0M"
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#8c4e37] mb-3 block">Care Guide</span>
              <h3 className="font-serif text-xl text-primary mb-3">The Art of Watering</h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">Discover the subtle signs your plants give when they&apos;re thirsty, and learn to water with intention rather than a schedule.</p>
            </div>
          </article>

          {/* Tip Tile 2 */}
          <article className="bg-[#f5ece7] rounded-2xl overflow-hidden flex flex-col group cursor-pointer shadow-ambient hover:shadow-ambient-hover transition-all duration-500">
            <div className="h-48 overflow-hidden relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Sunlight on Leaves" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD60hsBViQQVRE0fle38BMx9B1SOKwxMsff6bOCJVm6hrHg61KdaT9AGmJNC9GhkD10QPOdwtoQ9EBpkskZxZBKogGJWkJubUE3QM-eG6ISxVxiCARobdJH2xEuzjC5bH2bpiq4grEII7wGKXUgzT__5jFV-FIpl6jkdQaWwlhntVkhMVn4p0ojHnfh4PsO6PjzVdzgpt56BQNT1DmpxcSNhD2i1UpLa-LIr7HZUy5bS0WYLrZfHPOGuQsgG4NOKu7EKfusIC89xc2D"
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#8c4e37] mb-3 block">Environment</span>
              <h3 className="font-serif text-xl text-primary mb-3">Decoding Light Needs</h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">From bright indirect to low light corners, master the art of placement to ensure your botanical companions thrive.</p>
            </div>
          </article>

          {/* Tip Tile 3 */}
          <article className="md:col-span-2 lg:col-span-1 bg-[#f5ece7] rounded-2xl overflow-hidden flex flex-col group cursor-pointer shadow-ambient hover:shadow-ambient-hover transition-all duration-500">
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#f5ece7]/50 to-transparent z-10 opacity-50"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                alt="Propagating Plants" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqOmNib47ZxgKCz6mAY1ULjfvlssPpKtnSGKR71ftErg8bf7d_R7qMfr85VGMRLIfg745KVSbNWuFpod3Js9_4oMR8jqAydp3N5i6cyQ91n9kK-mfCR9sPVityd6FMAC_BblsgeR0Fqki5ptDRrecMYvFQx8OhkqyppKhlFKMDh3-rzDM0xLUecP8aSLI9tiAIMqUjstFjLp_e5grSdHjXLpnQG1wbJB0t_WlH1QECOvGETPSRjFX1h7lZGjF_1qSNGNU4zo7qX0-Y"
              />
            </div>
            <div className="p-8 flex-grow flex flex-col justify-center">
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#8c4e37] mb-3 block">Propagation</span>
              <h3 className="font-serif text-xl text-primary mb-3">Multiplying Joy</h3>
              <p className="font-sans text-sm text-primary/70 leading-relaxed">A beginner&apos;s guide to safely taking cuttings and nurturing new life from your existing collection.</p>
            </div>
          </article>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-24 px-4 md:px-gutter max-w-[1440px] mx-auto flex justify-center">
        <div className="w-full max-w-4xl bg-[#efe6e2] rounded-[2.5rem] p-12 md:p-16 text-center shadow-ambient relative overflow-hidden">
          <h2 className="font-serif text-3xl md:text-5xl text-primary mb-4 relative z-10">
            Cultivate Your Inbox
          </h2>
          <p className="font-sans text-sm md:text-base text-primary/70 mb-8 max-w-md mx-auto relative z-10 leading-relaxed">
            Join our community for mindful plant care tips, early access to rare botanicals, and editorial inspiration.
          </p>
          <form className="relative z-10 flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <div className="flex-grow bg-white rounded-full flex items-center px-6 py-4 shadow-sm focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-primary/5 group">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-primary/40 mr-3 group-focus-within:text-primary transition-colors flex-shrink-0"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <input
                type="email"
                required
                placeholder="Your email address"
                className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm font-sans text-ink placeholder:text-primary/30 p-0"
              />
            </div>
            <button 
              type="submit"
              className="bg-[#334537] text-white font-sans text-sm font-medium px-8 py-4 rounded-full hover:bg-opacity-90 active:scale-98 transition-all shadow-ambient whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          {/* Decorative organic background blurs */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  )
}
