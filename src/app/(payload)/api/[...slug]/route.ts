import { handleEndpoints } from 'payload'
import configPromise from '../../../../payload/payload.config'

export const GET = (req: Request) => handleEndpoints({ config: configPromise, request: req })
export const POST = (req: Request) => handleEndpoints({ config: configPromise, request: req })
export const DELETE = (req: Request) => handleEndpoints({ config: configPromise, request: req })
export const PATCH = (req: Request) => handleEndpoints({ config: configPromise, request: req })
export const OPTIONS = (req: Request) => handleEndpoints({ config: configPromise, request: req })
export const PUT = (req: Request) => handleEndpoints({ config: configPromise, request: req })
