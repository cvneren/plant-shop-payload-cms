'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const SearchPill = () => {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-full flex items-center px-8 py-5 shadow-ambient focus-within:ring-2 focus-within:ring-primary/10 transition-all border border-primary/5 group">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-primary/40 mr-4 group-focus-within:text-primary transition-colors flex-shrink-0"
        >
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find your perfect plant..."
          className="w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-lg font-sans text-ink placeholder:text-primary/30 p-0"
        />
      </div>
    </form>
  )
}
