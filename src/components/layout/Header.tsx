'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

import { useCart } from '@/providers/CartProvider'

export const Header = () => {
  const pathname = usePathname()
  const { totalItems } = useCart()

  const navLinks = [
    { name: 'Collection', href: '/products' },
    { name: 'About', href: '#' },
    { name: 'Care Guide', href: '#' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/50 backdrop-blur-md border-b border-primary/5">
      <div className="container mx-auto max-w-(--container-max) px-gutter h-24 flex items-center justify-between">
        {/* Logo & Navigation Left */}
        <div className="flex items-center gap-12">
          <Link 
            href="/" 
            className="font-serif text-3xl font-bold text-primary tracking-tight hover:opacity-70 transition-opacity"
          >
            Rooted
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'font-sans text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:text-secondary',
                  pathname === link.href ? 'text-secondary' : 'text-primary'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Cart Right */}
        <div className="flex items-center">
          <Link
            href="/checkout"
            className="group relative p-2 text-primary hover:text-secondary transition-all duration-300 transform hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-surface shadow-ambient">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
