import { getPayload } from '../lib/payload.ts'

const seed = async () => {
  console.log('Starting DB seeding with actual images...')
  const payload = await getPayload()
  if (!payload) {
    console.error('Failed to get Payload client.')
    process.exit(1)
  }

  // 1. Clear any existing categories & products (to start completely fresh and clean!)
  console.log('Clearing existing records...')
  try {
    await payload.delete({
      collection: 'products',
      where: { id: { exists: true } }
    })
    await payload.delete({
      collection: 'categories',
      where: { id: { exists: true } }
    })
    await payload.delete({
      collection: 'media',
      where: { id: { exists: true } }
    })
  } catch (err: any) {
    console.log('No existing records to delete or deletion skipped:', err.message)
  }

  // 2. Create Categories
  console.log('Creating categories...')
  const categoriesToCreate = [
    { name: 'Low Light', slug: 'low-light', description: 'Plants that thrive in low-light environments' },
    { name: 'Pet Friendly', slug: 'pet-friendly', description: 'Safe and non-toxic plants for cats and dogs' },
    { name: 'Rare', slug: 'rare', description: 'Rare, hard-to-find botanical specimens' },
    { name: 'Succulents', slug: 'succulents', description: 'Hardy succulents and cacti requiring minimal water' },
    { name: 'Easy Care', slug: 'easy-care', description: 'Perfect plants for beginners' },
    { name: 'Large Trees', slug: 'large-trees', description: 'Statement trees and tall indoor greenery' }
  ]

  const categoriesMap: { [slug: string]: any } = {}
  for (const cat of categoriesToCreate) {
    const doc = await payload.create({
      collection: 'categories',
      data: cat,
    })
    categoriesMap[cat.slug] = doc
    console.log(`Created category: ${doc.name} (ID: ${doc.id})`)
  }

  // 3. Create Media Documents with real Unsplash images
  console.log('Downloading and creating media records in Payload...')
  const mediaToCreate = [
    {
      alt: 'Monstera Albo',
      url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop',
    },
    {
      alt: 'Pink Princess',
      url: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?q=80&w=600&auto=format&fit=crop',
    },
    {
      alt: 'ZZ Plant',
      url: 'https://images.unsplash.com/photo-1632203171280-d1b55a1c3577?q=80&w=600&auto=format&fit=crop',
    },
    {
      alt: 'Snake Plant',
      url: 'https://images.unsplash.com/photo-1593487568000-7452a58d4d44?q=80&w=600&auto=format&fit=crop',
    },
    {
      alt: 'Golden Pothos',
      url: 'https://images.unsplash.com/photo-1597055181300-e3633a207518?q=80&w=600&auto=format&fit=crop',
    },
    {
      alt: 'Calathea',
      url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&auto=format&fit=crop',
    }
  ]

  const mediaMap: { [alt: string]: any } = {}
  
  // 1x1 transparent PNG fallback buffer
  const fallbackBuffer = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
    'base64'
  )

  for (const item of mediaToCreate) {
    let buffer = fallbackBuffer
    let isFallback = false

    try {
      console.log(`Downloading image for ${item.alt}...`)
      const res = await fetch(item.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      })
      
      if (!res.ok) {
        throw new Error(`Unsplash returned status ${res.status}`)
      }

      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('image')) {
        throw new Error(`Response content-type is non-image: ${contentType}`)
      }

      const arrayBuffer = await res.arrayBuffer()
      buffer = Buffer.from(arrayBuffer)
      console.log(`Successfully downloaded image for ${item.alt} (${buffer.length} bytes)`)
    } catch (err: any) {
      console.warn(`Could not download image for ${item.alt}, using transparent fallback. Error:`, err.message)
      buffer = fallbackBuffer
      isFallback = true
    }

    try {
      const filename = `${item.alt.toLowerCase().replace(/\s+/g, '_')}${isFallback ? '.png' : '.jpg'}`
      const mimetype = isFallback ? 'image/png' : 'image/jpeg'

      const doc = await payload.create({
        collection: 'media',
        data: { alt: item.alt },
        file: {
          data: buffer,
          name: filename,
          mimetype: mimetype,
          size: buffer.length,
        }
      })
      mediaMap[item.alt] = doc
      console.log(`Successfully created media: ${doc.alt} (ID: ${doc.id})`)
    } catch (err: any) {
      console.error(`Failed to create media document for ${item.alt}:`, err.message)
    }
  }

  // 4. Create Products
  console.log('Creating products with media relationships...')
  const productsToCreate = [
    {
      name: 'Monstera Albo',
      slug: 'monstera-albo',
      price: 145.00,
      images: [{ image: mediaMap['Monstera Albo']?.id }],
      category: categoriesMap['rare']?.id,
      lightLevel: 'Bright Indirect' as const,
      petFriendly: false,
      description: 'The highly sought-after Monstera Albo Borsigiana features spectacular, irregular white variegation on its large split leaves. A statement collector plant.',
      stock: 5,
    },
    {
      name: 'Pink Princess',
      slug: 'pink-princess',
      price: 85.00,
      images: [{ image: mediaMap['Pink Princess']?.id }],
      category: categoriesMap['rare']?.id,
      lightLevel: 'Bright Indirect' as const,
      petFriendly: false,
      description: 'Philodendron Erubescens "Pink Princess" boasts stunning dark-green to burgundy foliage splashed with vibrant bubblegum pink variegation. Truly royal.',
      stock: 8,
    },
    {
      name: 'ZZ Plant',
      slug: 'zz-plant',
      price: 32.00,
      images: [{ image: mediaMap['ZZ Plant']?.id }],
      category: categoriesMap['low-light']?.id,
      lightLevel: 'Low' as const,
      petFriendly: false,
      description: 'Zamioculcas zamiifolia is incredibly hardy, tolerating extreme low-light environments and neglected watering schedules. Glossy, dark-green leaves.',
      stock: 25,
    },
    {
      name: 'Snake Plant',
      slug: 'snake-plant',
      price: 28.00,
      images: [{ image: mediaMap['Snake Plant']?.id }],
      category: categoriesMap['low-light']?.id,
      lightLevel: 'Low' as const,
      petFriendly: false,
      description: 'Dracaena trifasciata, with its upright architectural leaves and pale-green banding, is an excellent choice for purifying indoor air in low-light spots.',
      stock: 20,
    },
    {
      name: 'Golden Pothos',
      slug: 'golden-pothos',
      price: 24.00,
      images: [{ image: mediaMap['Golden Pothos']?.id }],
      category: categoriesMap['easy-care']?.id,
      lightLevel: 'Low' as const,
      petFriendly: false,
      description: 'The golden pothos features beautiful trailing vines of heart-shaped leaves with yellow variegation. Extremely adaptable and fast-growing.',
      stock: 15,
    },
    {
      name: 'Calathea',
      slug: 'calathea',
      price: 45.00,
      images: [{ image: mediaMap['Calathea']?.id }],
      category: categoriesMap['pet-friendly']?.id,
      lightLevel: 'Bright Indirect' as const,
      petFriendly: true,
      description: 'Calathea orbifolia is famous for its massive, round leaves striped with delicate silver-green bands. Safe for pets and gorgeous in any room.',
      stock: 12,
    }
  ]

  for (const prod of productsToCreate) {
    if (!prod.images[0].image) {
      console.warn(`Skipping product ${prod.name} due to missing media relationship`)
      continue
    }
    const doc = await payload.create({
      collection: 'products',
      data: prod,
    })
    console.log(`Created product: ${doc.name} (ID: ${doc.id})`)
  }

  console.log('Seeding completed successfully! 🎉')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seeding crashed:', err)
  process.exit(1)
})
