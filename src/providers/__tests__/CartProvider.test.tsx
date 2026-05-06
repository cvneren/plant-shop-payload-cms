import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { CartProvider, useCart } from '../CartProvider'
import React from 'react'

describe('CartProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  )

  it('should initialize with an empty cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.items).toEqual([])
    expect(result.current.totalItems).toBe(0)
    expect(result.current.totalPrice).toBe(0)
  })

  it('should add an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({
        id: '1',
        name: 'Monstera',
        price: 45,
        slug: 'monstera',
      })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toMatchObject({ id: '1', quantity: 1 })
    expect(result.current.totalItems).toBe(1)
    expect(result.current.totalPrice).toBe(45)
  })

  it('should increment quantity when adding the same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
    })
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.totalItems).toBe(2)
    expect(result.current.totalPrice).toBe(90)
  })

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
    })
    act(() => {
      result.current.updateQuantity('1', 5)
    })

    expect(result.current.items[0].quantity).toBe(5)
    expect(result.current.totalItems).toBe(5)
    expect(result.current.totalPrice).toBe(225)
  })

  it('should remove item when quantity is updated to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
    })
    act(() => {
      result.current.updateQuantity('1', 0)
    })

    expect(result.current.items).toHaveLength(0)
  })

  it('should explicitly remove an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
      result.current.addItem({ id: '2', name: 'Pothos', price: 20, slug: 'pothos' })
    })
    
    act(() => {
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].id).toBe('2')
  })

  it('should clear the entire cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    
    act(() => {
      result.current.addItem({ id: '1', name: 'Monstera', price: 45, slug: 'monstera' })
      result.current.addItem({ id: '2', name: 'Pothos', price: 20, slug: 'pothos' })
    })
    
    act(() => {
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.totalItems).toBe(0)
  })

  it('should load cart state from localStorage on mount', () => {
    // Preset localStorage before render
    localStorage.setItem('rooted-cart', JSON.stringify([
      { id: '3', name: 'Snake Plant', price: 30, slug: 'snake-plant', quantity: 2 }
    ]))

    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].name).toBe('Snake Plant')
    expect(result.current.totalItems).toBe(2)
    expect(result.current.totalPrice).toBe(60)
  })

  it('should handle invalid JSON in localStorage gracefully', () => {
    // Spy on console.error to keep test output clean
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    localStorage.setItem('rooted-cart', 'invalid-json-{')

    const { result } = renderHook(() => useCart(), { wrapper })
    
    expect(result.current.items).toHaveLength(0)
    consoleSpy.mockRestore()
  })

  it('should throw an error if useCart is used outside CartProvider', () => {
    // Suppress React error boundary logs for this expected error
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    expect(() => {
      renderHook(() => useCart())
    }).toThrow('useCart must be used within a CartProvider')
    
    consoleSpy.mockRestore()
  })
})
