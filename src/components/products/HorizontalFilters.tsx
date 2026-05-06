'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { clsx } from 'clsx'

export const HorizontalFilters: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategory = searchParams.get('category')
  const currentLight = searchParams.get('light')
  const currentPetFriendly = searchParams.get('petFriendly')

  const setFilter = (filters: { category?: string | null; light?: string | null; petFriendly?: string | null }) => {
    const params = new URLSearchParams()
    
    if (filters.category !== undefined) {
      if (filters.category) params.set('category', filters.category)
    } else if (currentCategory) {
      params.set('category', currentCategory)
    }

    if (filters.light !== undefined) {
      if (filters.light) params.set('light', filters.light)
    } else if (currentLight) {
      params.set('light', currentLight)
    }

    if (filters.petFriendly !== undefined) {
      if (filters.petFriendly) params.set('petFriendly', filters.petFriendly)
    } else if (currentPetFriendly) {
      params.set('petFriendly', currentPetFriendly)
    }

    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  const clearAll = () => {
    router.push('/products', { scroll: false })
  }

  const isAllActive = !currentCategory && !currentLight && !currentPetFriendly

  return (
    <section className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-primary/5 pb-6">
      <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-4 px-4 md:mx-0 md:px-0 w-full md:w-auto">
        {/* All Plants */}
        <button
          onClick={clearAll}
          className={clsx(
            "flex-none px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-all active:scale-95 whitespace-nowrap",
            isAllActive
              ? "bg-primary text-white"
              : "bg-[#d3e8d5] text-[#0e1f13] hover:bg-[#b7ccb9]"
          )}
        >
          All Plants
        </button>

        {/* Low Light Filter */}
        <button
          onClick={() => setFilter({ light: 'Low', category: null, petFriendly: null })}
          className={clsx(
            "flex-none px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-all active:scale-95 whitespace-nowrap",
            currentLight === 'Low'
              ? "bg-primary text-white"
              : "bg-[#d3e8d5] text-[#0e1f13] hover:bg-[#b7ccb9]"
          )}
        >
          Low Light
        </button>

        {/* Pet Friendly Filter */}
        <button
          onClick={() => setFilter({ petFriendly: 'true', category: null, light: null })}
          className={clsx(
            "flex-none px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-all active:scale-95 whitespace-nowrap",
            currentPetFriendly === 'true'
              ? "bg-primary text-white"
              : "bg-[#d3e8d5] text-[#0e1f13] hover:bg-[#b7ccb9]"
          )}
        >
          Pet Friendly
        </button>

        {/* Rare Filter */}
        <button
          onClick={() => setFilter({ category: 'rare', light: null, petFriendly: null })}
          className={clsx(
            "flex-none px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-all active:scale-95 whitespace-nowrap",
            currentCategory === 'rare'
              ? "bg-primary text-white"
              : "bg-[#d3e8d5] text-[#0e1f13] hover:bg-[#b7ccb9]"
          )}
        >
          Rare
        </button>

        {/* Succulents Filter */}
        <button
          onClick={() => setFilter({ category: 'succulents', light: null, petFriendly: null })}
          className={clsx(
            "flex-none px-6 py-2.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] transition-all active:scale-95 whitespace-nowrap",
            currentCategory === 'succulents'
              ? "bg-primary text-white"
              : "bg-[#d3e8d5] text-[#0e1f13] hover:bg-[#b7ccb9]"
          )}
        >
          Succulents
        </button>
      </div>

      {/* Sort / Clear Filters Button */}
      {!isAllActive ? (
        <button 
          onClick={clearAll}
          className="flex items-center gap-1.5 self-start md:self-auto px-5 py-2 border border-primary/10 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-secondary hover:bg-secondary/5 transition-all duration-300"
        >
          Clear Filters
          <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
      ) : (
        <button 
          className="flex items-center gap-1.5 self-start md:self-auto px-5 py-2 border border-primary/10 rounded-full font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-primary/70 hover:bg-primary/5 transition-all duration-300"
        >
          Sort By
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
      )}
    </section>
  )
}
