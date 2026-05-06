'use client'

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ChipProps {
  children: React.ReactNode
  variant?: 'sage' | 'terracotta'
  className?: string
}

export const Chip: React.FC<ChipProps> = ({ children, variant = 'sage', className }) => {
  const variants = {
    sage: 'bg-primary/10 text-primary',
    terracotta: 'bg-secondary/10 text-secondary',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-sans tracking-wide',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
