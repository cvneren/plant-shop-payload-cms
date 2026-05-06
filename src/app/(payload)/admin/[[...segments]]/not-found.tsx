import { NotFoundPage } from '@payloadcms/next/views'
import configPromise from '../../../../payload/payload.config'
import { importMap } from '../importMap.js'

const NotFound = ({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ segments: string[] }>
  searchParams: Promise<{ [key: string]: string | string[] }>
}) => NotFoundPage({ config: configPromise, params, searchParams, importMap })

export default NotFound
