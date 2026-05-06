import { getPayload as getPayloadLocal } from 'payload'
import configPromise from '@/payload/payload.config'

let cached = (global as any).payload

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null }
}

export const getPayload = async () => {
  if (cached.client) {
    return cached.client
  }

  if (!cached.promise) {
    const config = await configPromise
    
    if (!config) {
      console.error('Payload config is undefined.')
      return null
    }

    cached.promise = getPayloadLocal({
      config,
    })
  }

  try {
    cached.client = await cached.promise
  } catch (e: any) {
    cached.promise = null
    console.error('Error initializing Payload (CMS/DB might be down):', e.message)
    return null
  }

  return cached.client
}
