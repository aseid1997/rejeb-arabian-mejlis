// Centralized mock products for fallback/demo mode
export type Product = {
  id: string
  name: string
  name_am: string
  category: string
  price: number
  image_url: string
  description: string
  description_am: string
  in_stock: boolean
  [key: string]: any
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Majlis Set',
    name_am: 'ንጉሣዊ መጅሊስ ስብስብ',
    category: 'majlis',
    price: 125000,
    image_url: '/placeholder.svg?height=400&width=600&text=Royal+Majlis+Set',
    description: 'Luxurious traditional Arabian majlis with gold accents and premium fabrics.',
    description_am: 'በወርቅ ማስዋቢያዎች እና ከፍተኛ ጥራት ያላቸው ጨርቆች የተሰራ ቅንጦተኛ ባህላዊ የአረብ መጅሊስ።',
    in_stock: true
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
    in_stock: true
  },
  {
    id: '3',
    name: 'Palace Bedroom Set',
    name_am: 'የቤተ መንግስት የመኝታ ክፍል ስብስብ',
    category: 'beds',
    price: 95000,
    image_url: '/placeholder.svg?height=400&width=600&text=Palace+Bedroom+Set',
    description: 'Majestic bedroom furniture fit for royalty with intricate carvings.',
    description_am: 'ውስብስብ ቅርጻ ቅርጾች ያሉት ለንጉሣዊነት የሚመጥን ግርማ ሞገስ ያለው የመኝታ ክፍል እቃ።',
    in_stock: true
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
    in_stock: true
  }
];

export default mockProducts;
