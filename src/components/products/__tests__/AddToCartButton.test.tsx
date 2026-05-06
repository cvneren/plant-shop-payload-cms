import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { AddToCartButton } from '../AddToCartButton'
import { CartProvider } from '@/providers/CartProvider'
import React from 'react'

describe('AddToCartButton', () => {
  const mockProduct = {
    id: '123',
    name: 'Ficus Elastica',
    price: 35,
    slug: 'ficus-elastica',
    stock: 10,
  }

  it('renders standard state correctly when in stock', () => {
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} />
      </CartProvider>
    )

    const button = screen.getByRole('button', { name: /add to sanctuary/i })
    expect(button).toBeInTheDocument()
    expect(button).not.toBeDisabled()
  })

  it('renders out of stock state correctly when stock is 0', () => {
    render(
      <CartProvider>
        <AddToCartButton product={{ ...mockProduct, stock: 0 }} />
      </CartProvider>
    )

    const button = screen.getByRole('button', { name: /currently unavailable/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('changes text to Added state and calls add to cart on click', () => {
    vi.useFakeTimers()
    
    render(
      <CartProvider>
        <AddToCartButton product={mockProduct} />
      </CartProvider>
    )

    const button = screen.getByRole('button', { name: /add to sanctuary/i })
    
    act(() => {
      fireEvent.click(button)
    })

    expect(screen.getByRole('button', { name: /added to sanctuary/i })).toBeInTheDocument()

    // Fast-forward timers
    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('button', { name: /add to sanctuary/i })).toBeInTheDocument()
    
    vi.useRealTimers()
  })
})
