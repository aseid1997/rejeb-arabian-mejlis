// Utility functions for handling Supabase fallbacks

export const createMockProducts = () => [
  {
    id: '1',
    name: 'Royal Majlis Set',
    name_am: 'ንጉሣዊ መጅሊስ ስብስብ',
    category: 'majlis',
    price: 125000,
    image_url: '/placeholder.svg?height=400&width=600&text=Royal+Majlis+Set',
    description: 'Luxurious traditional Arabian majlis with gold accents and premium fabrics.',
    description_am: 'በወርቅ ማስዋቢያዎች እና ከፍተኛ ጥራት ያላቸው ጨርቆች የተሰራ ቅንጦተኛ ባህላዊ የአረብ መጅሊስ።',
    in_stock: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Golden Sofa Collection',
    name_am: 'የወርቅ ሶፋ ስብስብ',
    category: 'sofas',
    price: 85000,
    image_url: '/placeholder.svg?height=400&width=600&text=Golden+Sofa+Collection',
    description: 'Elegant sofa set with golden embroidery and comfortable seating.',
    description_am: 'በወርቅ ጥልፍ እና ምቹ መቀመጫ የተሰራ ውብ ሶፋ ስብስብ።',
    in_stock: true,
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Palace Bedroom Set',
    name_am: 'የቤተ መንግስት የመኝታ ክፍል ስብስብ',
    category: 'beds',
    price: 95000,
    image_url: '/placeholder.svg?height=400&width=600&text=Palace+Bedroom+Set',
    description: 'Majestic bedroom furniture fit for royalty with intricate carvings.',
    description_am: 'ውስብስብ ቅርጻ ቅርጾች ያሉት ለንጉሣዊነት የሚመጥን ግርማ ሞገስ ያለው የመኝታ ክፍል እቃ।',
    in_stock: true,
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    name: 'Silk Curtain Collection',
    name_am: 'የሐር መጋረጃ ስብስብ',
    category: 'curtains',
    price: 35000,
    image_url: '/placeholder.svg?height=400&width=600&text=Silk+Curtain+Collection',
    description: 'Premium silk curtains with traditional Arabian patterns.',
    description_am: 'ባህላዊ የአረብ ንድፎች ያሉት ከፍተኛ ጥራት ያለው የሐር መጋረጃ።',
    in_stock: true,
    created_at: new Date(Date.now() - 259200000).toISOString()
  },
  {
    id: '5',
    name: 'Executive Office Set',
    name_am: 'የአስፈፃሚ ቢሮ ስብስብ',
    category: 'majlis',
    price: 150000,
    image_url: '/placeholder.svg?height=400&width=600&text=Executive+Office+Set',
    description: 'Professional majlis set perfect for executive offices and meeting rooms.',
    description_am: 'ለአስፈፃሚ ቢሮዎች እና የስብሰባ ክፍሎች ፍጹም የሆነ ሙያዊ መጅሊስ ስብስብ።',
    in_stock: true,
    created_at: new Date(Date.now() - 345600000).toISOString()
  },
  {
    id: '6',
    name: 'Luxury Dining Set',
    name_am: 'የቅንጦት የመመገቢያ ስብስብ',
    category: 'sofas',
    price: 120000,
    image_url: '/placeholder.svg?height=400&width=600&text=Luxury+Dining+Set',
    description: 'Elegant dining furniture with traditional craftsmanship.',
    description_am: 'ባህላዊ የእጅ ስራ ያለው ውብ የመመገቢያ እቃ።',
    in_stock: false,
    created_at: new Date(Date.now() - 432000000).toISOString()
  }
]

export const createMockContacts = () => [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    message: 'I am interested in your Royal Majlis Set. Could you please provide more details about the materials and delivery options?',
    language: 'en',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    name: 'አበበ ተስፋዬ',
    email: 'abebe@example.com',
    message: 'የሶፋ ስብስቦችን መመልከት እፈልጋለሁ። የዋጋ ዝርዝር ላክልኝ።',
    language: 'am',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    name: 'Sarah Ahmed',
    email: 'sarah@example.com',
    message: 'Do you offer custom curtain designs? I need something specific for my living room.',
    language: 'en',
    created_at: new Date(Date.now() - 172800000).toISOString()
  },
  {
    id: '4',
    name: 'ፋጢማ አሊ',
    email: 'fatima@example.com',
    message: 'የመኝታ ክፍል እቃዎች ስለ ዋጋ እና ስለ ጥራት መረጃ ይስጡኝ።',
    language: 'am',
    created_at: new Date(Date.now() - 259200000).toISOString()
  }
]

export const createMockOrders = () => [
  {
    id: '1',
    customer_name: 'Sarah Ahmed',
    customer_email: 'sarah@example.com',
    customer_phone: '+251-91-123-4567',
    customer_address: 'Bole, Addis Ababa',
    products: [
      { id: '1', name: 'Royal Majlis Set', name_am: 'ንጉሣዊ መጅሊስ ስብስብ', quantity: 1, price: 125000 }
    ],
    total_amount: 125000,
    status: 'pending',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    customer_name: 'Ahmed Hassan',
    customer_email: 'ahmed@example.com',
    customer_phone: '+251-91-234-5678',
    customer_address: 'Piazza, Addis Ababa',
    products: [
      { id: '2', name: 'Golden Sofa Collection', name_am: 'የወርቅ ሶፋ ስብስብ', quantity: 1, price: 85000 },
      { id: '4', name: 'Silk Curtain Collection', name_am: 'የሐር መጋረጃ ስብስብ', quantity: 2, price: 35000 }
    ],
    total_amount: 155000,
    status: 'confirmed',
    created_at: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: '3',
    customer_name: 'ሙሉጌታ ወርቁ',
    customer_email: 'mulugeta@example.com',
    customer_phone: '+251-91-345-6789',
    customer_address: 'Merkato, Addis Ababa',
    products: [
      { id: '3', name: 'Palace Bedroom Set', name_am: 'የቤተ መንግስት የመኝታ ክፍል ስብስብ', quantity: 1, price: 95000 }
    ],
    total_amount: 95000,
    status: 'processing',
    created_at: new Date(Date.now() - 172800000).toISOString()
  }
]

export const isSupabaseConfigured = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  return Boolean(supabaseUrl && supabaseKey)
}

export const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    return null
  }
  
  try {
    const { createClient } = require('@supabase/supabase-js')
    return createClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}
