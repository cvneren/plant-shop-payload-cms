import React from 'react'
import { getPayload } from '@/lib/payload'
import { CheckoutClient } from '@/components/checkout/CheckoutClient'

export default async function CheckoutPage() {
  const payload = await getPayload()
  let products: any[] = []

  if (payload) {
    try {
      const { docs } = await payload.find({
        collection: 'products',
        limit: 10,
        depth: 1,
      })
      products = docs
    } catch (error) {
      console.error('Error fetching checkout plant recommendations:', error)
    }
  }

  return <CheckoutClient recommendations={products} />
}
