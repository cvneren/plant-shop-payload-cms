'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { clsx } from 'clsx'

interface FilterSidebarProps {
  categories: { id: string | number; name: string; slug: string }[]
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const currentCategory = searchParams.get('category')
  const currentLight = searchParams.get('light')

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/products?${params.toString()}`, { scroll: false })
  }

  const lightLevels = ['Low', 'Medium', 'Bright Direct', 'Bright Indirect']

  return (
    <div className="flex flex-col gap-10">
      {/* Category Filter */}
      <div>
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-primary/40">Categories</h3>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={() => updateFilter('category', null)}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-secondary',
                !currentCategory ? 'text-secondary' : 'text-primary'
              )}
            >
              All Plants
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateFilter('category', cat.slug)}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-secondary',
                  currentCategory === cat.slug ? 'text-secondary' : 'text-primary'
                )}
              >
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Light Level Filter */}
      <div>
        <h3 className="font-sans text-xs font-bold uppercase tracking-widest mb-6 text-primary/40">Light Requirement</h3>
        <ul className="flex flex-col gap-4">
          <li>
            <button
              onClick={() => updateFilter('light', null)}
              className={clsx(
                'text-sm font-medium transition-colors hover:text-secondary',
                !currentLight ? 'text-secondary' : 'text-primary'
              )}
            >
              Any Light
            </button>
          </li>
          {lightLevels.map((level) => (
            <li key={level}>
              <button
                onClick={() => updateFilter('light', level)}
                className={clsx(
                  'text-sm font-medium transition-colors hover:text-secondary',
                  currentLight === level ? 'text-secondary' : 'text-primary'
                )}
              >
                {level}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Reset Button */}
      {(currentCategory || currentLight) && (
        <button 
          onClick={() => router.push('/products')}
          className="text-xs font-bold uppercase tracking-widest text-secondary border-b border-secondary/20 pb-1 w-fit hover:border-secondary transition-all"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}
