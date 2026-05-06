import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

export const revalidateProducts: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'update' || operation === 'create') {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache') as any
      revalidateTag('products')
      revalidatePath('/')
      revalidatePath('/products')
      
      if (doc.slug) {
        revalidatePath(`/products/${doc.slug}`)
      }
    } catch (e) {
      console.log('Cache revalidation skipped (likely running in CLI/types generation)')
    }
  }

  return doc
}

export const revalidateProductsDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache') as any
    revalidateTag('products')
    revalidatePath('/')
    revalidatePath('/products')
    
    if (doc.slug) {
      revalidatePath(`/products/${doc.slug}`)
    }
  } catch (e) {
    console.log('Cache revalidation skipped (likely running in CLI/types generation)')
  }

  return doc
}

export const revalidateCategories: CollectionAfterChangeHook = async ({
  doc,
  operation,
}) => {
  if (operation === 'update' || operation === 'create') {
    try {
      const { revalidatePath, revalidateTag } = await import('next/cache') as any
      revalidateTag('categories')
      revalidatePath('/products')
    } catch (e) {
      console.log('Cache revalidation skipped (likely running in CLI/types generation)')
    }
  }
  
  return doc
}

export const revalidateCategoriesDelete: CollectionAfterDeleteHook = async ({
  doc,
}) => {
  try {
    const { revalidatePath, revalidateTag } = await import('next/cache') as any
    revalidateTag('categories')
    revalidatePath('/products')
  } catch (e) {
    console.log('Cache revalidation skipped (likely running in CLI/types generation)')
  }
  
  return doc
}
