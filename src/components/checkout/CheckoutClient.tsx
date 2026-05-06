'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/providers/CartProvider'
import { Button } from '@/components/ui/Button'
import { formatPrice } from '@/lib/utils'
import { Product } from '@/payload/payload-types'

interface CheckoutClientProps {
  recommendations: Product[]
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

export const CheckoutClient: React.FC<CheckoutClientProps> = ({ recommendations }) => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, addItem, clearCart } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOrdered, setIsOrdered] = useState(false)
  const [email, setEmail] = useState('')

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Smooth simulation of transaction processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsOrdered(true)
    clearCart()
  }

  // Filter out any recommendations that are already in the shopping cart
  const activeCartSlugs = new Set(items.map(item => item.slug))
  const filteredPairings = recommendations
    .filter(prod => !activeCartSlugs.has(prod.slug))
    .slice(0, 3)

  // 19% VAT calculations (included in displayed prices)
  const inclusiveTax = totalPrice * (0.19 / 1.19)
  const finalTotal = totalPrice

  if (isOrdered) {
    return (
      <div className="bg-surface min-h-screen pt-24 pb-32 flex items-center">
        <div className="container mx-auto px-gutter text-center max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#f5ece7]/40 border border-primary/5 backdrop-blur-md rounded-[2.5rem] p-12 md:p-16 shadow-ambient"
          >
            <div className="mb-8 text-secondary flex justify-center">
              <span className="material-symbols-outlined text-7xl select-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_florist
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6 italic leading-tight">
              Growth <br />
              <span className="not-italic font-normal">Underway.</span>
            </h1>
            <p className="font-sans text-base leading-relaxed text-primary/70 mb-10 max-w-md mx-auto">
              Your curated sanctuary items are now being prepared at our Soho greenhouse. A complete growth & acclimation guide has been sent to <span className="font-bold text-primary">{email}</span>.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-primary text-white hover:bg-[#4a5d4e] transition-all">
              <Link href="/products" className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                Continue Curating
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-surface min-h-screen pt-24 pb-32 flex items-center">
        <div className="container mx-auto px-gutter text-center max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-5xl md:text-6xl text-primary mb-6 italic">Your Garden is Empty.</h1>
            <p className="font-sans text-base text-primary/70 mb-10 max-w-md mx-auto leading-relaxed">
              It looks like you haven&apos;t selected any boutique plants yet. Every home deserves the peace of living geometry.
            </p>
            <Button asChild size="lg" className="rounded-full px-8 py-6 bg-primary text-white hover:bg-[#4a5d4e]">
              <Link href="/products" className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                Explore the Collection
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface min-h-screen pt-28 pb-32">
      <div className="container mx-auto px-gutter max-w-(--container-max)">
        {/* Title Block */}
        <header className="mb-16 max-w-3xl">
          <div className="mb-8">
            <Link 
              href="/products" 
              className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/50 hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:-translate-x-1 select-none">
                arrow_back
              </span>
              Back to Collection
            </Link>
          </div>
          <h1 className="font-serif text-5xl md:text-7xl text-primary mb-4 italic leading-none">
            Your <span className="not-italic font-normal">Sanctuary</span>
          </h1>
          <p className="font-sans text-base text-primary/60 max-w-md">
            Review your collection of botanical companions before they begin their journey home.
          </p>
        </header>

        {/* 12-Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Cart Items & Pairings (Span 8) */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-16">
            
            {/* Cart Items List */}
            <div className="flex flex-col border-t border-primary/10">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col sm:flex-row gap-6 md:gap-8 py-8 border-b border-primary/10 group relative"
                  >
                    {/* Item Image Container */}
                    <div className="relative h-32 w-32 shrink-0 rounded-xl overflow-hidden bg-[#efe6e2] shadow-sm flex items-center justify-center">
                      {item.image ? (
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                          sizes="128px"
                        />
                      ) : (
                        <div className="text-primary/10 scale-120">
                          <span className="material-symbols-outlined text-4xl select-none">local_florist</span>
                        </div>
                      )}
                    </div>

                    {/* Item Content Info */}
                    <div className="flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-serif text-xl md:text-2xl text-primary font-bold group-hover:text-secondary transition-colors duration-300">
                              <Link href={`/products/${item.slug}`}>{item.name}</Link>
                            </h3>
                            <p className="font-serif italic text-xs text-primary/50 mt-1">
                              {getScientificName(item.name)}
                            </p>
                          </div>
                          <p className="font-sans text-lg font-bold text-primary">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <p className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-primary/40 mt-2">
                          Premium Greenhouse Specimen
                        </p>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between mt-6">
                        {/* Quantity Pill Row */}
                        <div className="flex items-center gap-4 bg-[#f5ece7] border border-[#e9e1dc] rounded-full px-4 py-1.5 shadow-sm">
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-primary/70 hover:text-secondary transition-colors font-bold text-base px-1"
                          >
                            −
                          </button>
                          <span className="text-sm font-bold w-4 text-center text-primary">{item.quantity}</span>
                          <button 
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-primary/70 hover:text-secondary transition-colors font-bold text-base px-1"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Action text */}
                        <button 
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 hover:text-secondary transition-colors underline underline-offset-4 decoration-1 decoration-primary/20 hover:decoration-secondary"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Perfect Pairings Section (Recommendations) */}
            {filteredPairings.length > 0 && (
              <div className="pt-4">
                <h2 className="font-serif text-2xl md:text-3xl text-primary italic mb-1">Perfect Pairings</h2>
                <p className="font-sans text-xs text-primary/50 mb-8">Elevate your indoor garden space with these curated pairings.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {filteredPairings.map((prod) => {
                    const mainImage = typeof prod.images?.[0]?.image === 'object' ? prod.images[0].image : null
                    return (
                      <div key={prod.id} className="flex sm:flex-col gap-4 sm:gap-0 group">
                        {/* Recommendation Image Frame */}
                        <div className="relative aspect-square w-24 sm:w-full shrink-0 rounded-xl bg-[#efe6e2] overflow-hidden flex items-center justify-center shadow-sm mb-3">
                          {mainImage?.url ? (
                            <Image
                              src={mainImage.url}
                              alt={mainImage.alt || prod.name}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 96px, 200px"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-primary/10 text-3xl select-none">local_florist</span>
                          )}
                          <button 
                            type="button"
                            onClick={() => addItem({
                              id: prod.id,
                              name: prod.name,
                              price: prod.price,
                              slug: prod.slug,
                              image: mainImage?.url || ''
                            })}
                            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary hover:bg-secondary text-white flex items-center justify-center shadow-md active:scale-90 transition-transform duration-300 z-10"
                          >
                            <span className="material-symbols-outlined text-[16px]">add</span>
                          </button>
                        </div>

                        {/* Info details */}
                        <div className="flex flex-col justify-center sm:justify-start">
                          <h4 className="font-serif text-base md:text-lg text-primary font-bold group-hover:text-secondary transition-colors">
                            <Link href={`/products/${prod.slug}`}>{prod.name}</Link>
                          </h4>
                          <p className="font-serif italic text-[11px] text-primary/50 mb-1">
                            {getScientificName(prod.name)}
                          </p>
                          <p className="font-sans text-xs font-bold text-primary mt-0.5">
                            {formatPrice(prod.price)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right: Sticky Order Summary & Checkout Form (Span 4) */}
          <div className="col-span-1 lg:col-span-4 relative lg:sticky lg:top-32">
            <div className="bg-[#f5ece7]/40 border border-primary/5 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-ambient relative overflow-hidden flex flex-col gap-8">
              {/* Soft abstract circle visual flare */}
              <div className="absolute -top-16 -right-16 w-32 h-32 bg-[#efe6e2]/50 rounded-full blur-xl pointer-events-none" />
              
              <h2 className="font-serif text-3xl text-primary italic">Order Summary</h2>
              
              {/* Cost specifications breakdown */}
              <div className="flex flex-col gap-4 text-xs font-sans font-bold uppercase tracking-widest border-b border-primary/10 pb-6">
                <div className="flex justify-between text-primary/50">
                  <span>Subtotal (incl. Tax)</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-primary/50">
                  <span>Eco-conscious Shipping</span>
                  <span className="text-secondary tracking-normal font-sans text-xs uppercase">Complimentary</span>
                </div>
                <div className="flex justify-between text-primary/50 font-sans">
                  <span>Included 19% VAT</span>
                  <span>{formatPrice(inclusiveTax)}</span>
                </div>
              </div>

              {/* Total Row */}
              <div className="flex justify-between items-end">
                <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-primary/50 pb-1">Order Total</span>
                <span className="font-serif text-3xl font-bold text-primary">{formatPrice(finalTotal)}</span>
              </div>

              {/* Input Form Fields */}
              <form onSubmit={handleCheckout} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/40 ml-1">
                    Email for Care Guide
                  </label>
                  <input 
                    required 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="botanist@rooted.com"
                    className="w-full bg-[#fbf2ed] border border-primary/10 rounded-full px-6 py-4 text-sm font-sans text-primary focus:outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/5 transition-all placeholder:text-primary/30"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  size="lg" 
                  className="w-full rounded-full py-6 bg-primary text-white hover:bg-secondary font-sans text-[10px] font-bold uppercase tracking-[0.2em] shadow-md transition-all duration-300"
                >
                  {isSubmitting ? 'Securing Greenhouse...' : 'Confirm Order'}
                </Button>
              </form>

              {/* Guarantee badges */}
              <div className="flex flex-col gap-4 text-center pt-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-primary/40 leading-loose">
                  Safe botanical transit guaranteed. <br />
                  30-day organic growth promise.
                </p>
                <div className="flex justify-center gap-4 opacity-15 grayscale">
                  <span className="material-symbols-outlined text-2xl select-none">verified_user</span>
                  <span className="material-symbols-outlined text-2xl select-none">local_shipping</span>
                  <span className="material-symbols-outlined text-2xl select-none">lock</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
