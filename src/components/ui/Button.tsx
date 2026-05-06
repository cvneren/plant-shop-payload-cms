'use client'

import React from 'react'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility to merge tailwind classes safely
 */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref) => {
    const { 
      className, 
      variant = 'primary', 
      size = 'md', 
      asChild = false, 
      children,
      ...restProps 
    } = props

    const baseStyles = 'inline-flex items-center justify-center font-sans font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none rounded-[0.5rem]'
    
    const variants = {
      primary: 'bg-primary text-surface hover:bg-primary-light shadow-ambient hover:shadow-ambient-hover transform hover:-translate-y-0.5',
      secondary: 'border border-secondary text-secondary hover:bg-secondary hover:text-white',
      ghost: 'text-primary hover:bg-primary/5',
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-[10px]',
      md: 'px-8 py-4 text-[12px]',
      lg: 'px-12 py-6 text-[14px]',
    }

    const classes = cn(baseStyles, variants[variant], sizes[size], className)

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<any>
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
        ...restProps,
      })
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...(restProps as any)}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
