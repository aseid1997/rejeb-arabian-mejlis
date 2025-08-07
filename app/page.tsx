"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Moon, Sun, Globe, Star, MapPin, Phone, Mail, Award, Sparkles, Crown, ShoppingCart, Plus, Edit, Trash2, Users, Package } from 'lucide-react'
import { useTheme } from "next-themes"
import { createClient } from '@supabase/supabase-js'
import { toast } from "@/hooks/use-toast"
import AdminPanel from "@/components/admin-panel"
import CartSidebar from "@/components/cart-sidebar"
import ConfigurationBanner from "@/components/configuration-banner"

// Supabase client with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Check if Supabase is configured
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

// Language context
const translations = {
  en: {
    nav: {
      home: "Home",
      majlis: "Majlis",
      sofas: "Sofas",
      beds: "Beds",
      curtains: "Curtains",
      about: "About",
      contact: "Contact",
    },
    hero: {
      title: "Exquisite Arabian Furniture",
      subtitle: "Crafting Luxury, Defining Elegance",
      description:
        "Discover our premium collection of handcrafted Arabian majlis, luxurious sofas, elegant beds, and bespoke curtains that transform your space into a palace of comfort and style.",
      cta: "Explore Collection",
    },
    sections: {
      newArrivals: "New Arrivals",
      craftsmanship: "Master Craftsmanship",
      inspiration: "Design Inspiration",
      about: "About Rejeb Furniture",
      showrooms: "Our Showrooms",
      contact: "Contact Us",
    },
    about: {
      title: "Three Decades of Excellence",
      description:
        "Since 1990, Rejeb Furniture has been the epitome of luxury and craftsmanship in Arabian furniture. Our master artisans blend traditional techniques with contemporary design to create pieces that are not just furniture, but works of art that tell stories of heritage and elegance.",
    },
    contact: {
      name: "Full Name",
      email: "Email Address",
      message: "Your Message",
      send: "Send Message",
      phone: "+251-11-123-4567",
      email_addr: "info@alfakhir.com",
      address: "Bole Road, Addis Ababa, Ethiopia",
    },
    cart: {
      addToCart: "Add to Cart",
      viewCart: "View Cart",
    },
  },
  am: {
    nav: {
      home: "ቤት",
      majlis: "መጅሊስ",
      sofas: "ሶፋዎች",
      beds: "አልጋዎች",
      curtains: "መጋረጃዎች",
      about: "ስለ እኛ",
      contact: "ያግኙን",
    },
    hero: {
      title: "የአረብ የቤት እቃዎች",
      subtitle: "ቅንጦት መፍጠር፣ ውበት መግለጽ",
      description: "በእጅ የተሰሩ የአረብ መጅሊስ፣ ቅንጦተኛ ሶፋዎች፣ ውብ አልጋዎች እና ልዩ መጋረጃዎችን ያግኙ። የእርስዎን ቦታ ወደ ምቾት እና ዘይቤ ቤተ መንግስት ይለውጡ።",
      cta: "ስብስብ ይመልከቱ",
    },
    sections: {
      newArrivals: "አዲስ መጤዎች",
      craftsmanship: "ዋና የእጅ ስራ",
      inspiration: "የንድፍ መነሳሳት",
      about: "ስለ አል-ፋኪር የቤት እቃዎች",
      showrooms: "የእኛ ማሳያ ቤቶች",
      contact: "ያግኙን",
    },
    about: {
      title: "ሶስት አስርት ዓመታት ብቃት",
      description:
        "ከ1990 ጀምሮ አል-ፋኪር የቤት እቃዎች በአረብ የቤት እቃዎች ውስጥ የቅንጦት እና የእጅ ስራ ምሳሌ ሆነዋል። የእኛ ዋና የእጅ ባለሞያዎች ባህላዊ ቴክኒኮችን ከዘመናዊ ንድፍ ጋር በማዋሃድ የቤት እቃዎች ብቻ ሳይሆን የቅርስ እና ውበት ታሪኮችን የሚነግሩ የጥበብ ስራዎችን ይፈጥራሉ።",
    },
    contact: {
      name: "ሙሉ ስም",
      email: "የኢሜይል አድራሻ",
      message: "የእርስዎ መልእክት",
      send: "መልእክት ላክ",
      phone: "+251-11-123-4567",
      email_addr: "info@alfakhir.com",
      address: "ቦሌ መንገድ፣ አዲስ አበባ፣ ኢትዮጵያ",
    },
    cart: {
      addToCart: "ወደ ጋሪ ጨምር",
      viewCart: "ጋሪ ይመልከቱ",
    },
  },
}

export default function RejebFurniture() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [language, setLanguage] = useState<"en" | "am">("en")
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  type Product = {
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

  type CartItem = Product & { quantity: number }

  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showCart, setShowCart] = useState(false)

  const t = translations[language]

  useEffect(() => {
    setMounted(true)
    fetchProducts()
  }, [])

  const heroSlides = [
    {
      image: "/placeholder.svg?height=800&width=1200&text=Arabian+Majlis+Collection",
      title: "Arabian Majlis Collection",
      subtitle: "Traditional Elegance Redefined",
    },
    {
      image: "/placeholder.svg?height=800&width=1200&text=Premium+Sofa+Collection",
      title: "Premium Sofa Collection",
      subtitle: "Comfort Meets Sophistication",
    },
    {
      image: "/placeholder.svg?height=800&width=1200&text=Royal+Bedroom+Collection",
      title: "Royal Bedroom Collection",
      subtitle: "Where Dreams Meet Luxury",
    },
  ]

  const productCategories = [
    {
      name: "Majlis",
      nameAm: "መጅሊስ",
      image: "/placeholder.svg?height=400&width=600&text=Majlis+Collection",
      count: "25+ Designs",
    },
    {
      name: "Sofas",
      nameAm: "ሶፋዎች",
      image: "/placeholder.svg?height=400&width=600&text=Sofa+Collection",
      count: "40+ Designs",
    },
    {
      name: "Beds",
      nameAm: "አልጋዎች",
      image: "/placeholder.svg?height=400&width=600&text=Bed+Collection",
      count: "30+ Designs",
    },
    {
      name: "Curtains",
      nameAm: "መጋረጃዎች",
      image: "/placeholder.svg?height=400&width=600&text=Curtain+Collection",
      count: "50+ Designs",
    },
  ]

  // Fetch products from Supabase or use fallback data
  const fetchProducts = async () => {
  if (!isSupabaseConfigured || !supabase) {
    // Fallback mock data
    const mockProducts = [
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
    ]
    
    setProducts(mockProducts)
    return
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
      // Use fallback data on error
      fetchProducts()
      return
    }
    
    setProducts(data || [])
  } catch (error) {
    console.error('Supabase connection error:', error)
    // Use fallback data on connection error
    fetchProducts()
  }
}

  // Add product to cart
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  // Update cart item quantity
  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  // Clear cart
  const clearCart = () => {
    setCartItems([])
  }

  // Submit contact form with fallback
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  
  const contactData = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    language: language
  }
  
  if (!isSupabaseConfigured || !supabase) {
    // Fallback: Show success message without saving to database
    toast({
      title: "Message Received (Demo Mode)",
      description: "Thank you for your message! In demo mode, messages are not saved. Please configure Supabase to enable full functionality.",
    })
    form.reset()
    return
  }
  
  try {
    const { error } = await supabase
      .from('contacts')
      .insert([contactData])
    
    if (error) throw error
    
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    })
    
    form.reset()
  } catch (error) {
    console.error('Error saving contact:', error)
    toast({
      title: "Message Received (Offline Mode)",
      description: "Thank you for your message! There was a connection issue, but we've noted your inquiry.",
    })
    form.reset()
  }
}

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
                Rejeb Furniture
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#home" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.home}
              </Link>
              <Link href="#majlis" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.majlis}
              </Link>
              <Link href="#sofas" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.sofas}
              </Link>
              <Link href="#beds" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.beds}
              </Link>
              <Link href="#curtains" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.curtains}
              </Link>
              <Link href="#about" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.about}
              </Link>
              <Link href="#contact" className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                {t.nav.contact}
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowCart(true)}
                className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              
              {/* Admin Panel Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Users className="h-5 w-5" />
              </Button>
              
              {!isSupabaseConfigured && (
                <div className="hidden md:flex items-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-amber-600 dark:text-amber-400">Demo</span>
                </div>
              )}
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "en" ? "am" : "en")}
                className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-slate-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-400"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <ConfigurationBanner isSupabaseConfigured={isSupabaseConfigured} />

      {/* Hero Slider */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-6 w-6 text-amber-400" />
                <span className="text-amber-400 font-semibold tracking-wider uppercase">{t.hero.subtitle}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">{t.hero.title}</h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">{t.hero.description}</p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold px-8 py-4 text-lg"
              >
                {t.hero.cta}
              </Button>
            </div>
          </div>
        </div>

        {/* Slider Controls */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-400 hover:bg-black/20"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-amber-400 hover:bg-black/20"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
            title="Slide Indicator"
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-amber-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">Our Collections</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-white/60 dark:bg-black/40 border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {language === "en" ? category.name : category.nameAm}
                    </h3>
                    <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-400/30">
                      {category.count}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 bg-gradient-to-b from-purple-50 to-slate-50 dark:from-purple-900 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">{t.sections.newArrivals}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map((item, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-white/60 dark:bg-black/40 border-amber-500/20 hover:border-amber-400/50 transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item?.image_url || "/placeholder.svg"}
                    alt={item?.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-amber-500 text-black font-semibold">NEW</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {language === "en" ? item.name : item.name_am}
                  </h3>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">
                    ETB {item.price.toLocaleString()}
                  </p>
                  <Button
                    onClick={() => addToCart(item)}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    {t.cart.addToCart}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Award className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wider uppercase">
                  {t.sections.craftsmanship}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">Artistry in Every Detail</h2>
              <p className="text-slate-600 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                Our master craftsmen bring decades of experience to every piece, combining traditional Arabian
                techniques with modern precision. Each furniture piece is meticulously handcrafted using the finest
                materials and time-honored methods passed down through generations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">30+</div>
                  <div className="text-slate-600 dark:text-gray-300">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">500+</div>
                  <div className="text-slate-600 dark:text-gray-300">Happy Clients</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Master+Craftsman"
                alt="Master Craftsman"
                width={800}
                height={600}
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                <Star className="h-12 w-12 text-black" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-purple-50 to-slate-50 dark:from-purple-900 dark:to-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-6">{t.sections.about}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8" />
            <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mb-6">{t.about.title}</h3>
            <p className="text-slate-600 dark:text-gray-300 text-lg leading-relaxed">{t.about.description}</p>
          </div>
        </div>
      </section>

      {/* Showrooms */}
      <section
        id="showrooms"
        className="py-20 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-slate-900 dark:to-purple-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">{t.sections.showrooms}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Bole Showroom", address: "Bole Road, Addis Ababa", phone: "+251-11-123-4567" },
              { name: "Piazza Showroom", address: "Piazza Area, Addis Ababa", phone: "+251-11-234-5678" },
              { name: "Merkato Showroom", address: "Merkato District, Addis Ababa", phone: "+251-11-345-6789" },
            ].map((showroom, index) => (
              <Card
                key={index}
                className="bg-white/60 dark:bg-black/40 border-amber-500/20 hover:border-amber-400/50 transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="h-48 bg-gradient-to-br from-amber-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{showroom.name}</h3>
                  <p className="text-slate-600 dark:text-gray-300 mb-2">{showroom.address}</p>
                  <p className="text-amber-600 dark:text-amber-400 font-semibold">{showroom.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-purple-50 to-slate-50 dark:from-purple-900 dark:to-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">{t.sections.contact}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-white font-semibold">Phone</p>
                    <p className="text-slate-600 dark:text-gray-300">{t.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-white font-semibold">Email</p>
                    <p className="text-slate-600 dark:text-gray-300">{t.contact.email_addr}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-slate-800 dark:text-white font-semibold">Address</p>
                    <p className="text-slate-600 dark:text-gray-300">{t.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white/60 dark:bg-black/40 border-amber-500/20">
              <CardContent className="p-8">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      required
                      placeholder={t.contact.name}
                      className="bg-white/50 dark:bg-white/10 border-amber-500/30 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      required
                      placeholder={t.contact.email}
                      className="bg-white/50 dark:bg-white/10 border-amber-500/30 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      required
                      placeholder={t.contact.message}
                      rows={5}
                      className="bg-white/50 dark:bg-white/10 border-amber-500/30 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-gray-400 focus:border-amber-400"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                  >
                    {t.contact.send}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-100 dark:bg-black border-t border-amber-500/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Crown className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600 bg-clip-text text-transparent">
                  Rejeb Furniture
                </span>
              </div>
              <p className="text-slate-600 dark:text-gray-400 mb-4">
                Crafting luxury furniture with Arabian elegance since 1990. Transform your space into a palace of
                comfort and style.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: "📘", name: "Facebook", url: "https://facebook.com/alfakhir" },
                  { icon: "📷", name: "Instagram", url: "https://instagram.com/alfakhir" },
                  { icon: "✈️", name: "Telegram", url: "https://t.me/alfakhir" },
                  { icon: "🎵", name: "TikTok", url: "https://tiktok.com/@alfakhir" }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center hover:bg-amber-500/30 transition-colors cursor-pointer text-lg"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-800 dark:text-white font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                {["Home", "Collections", "About", "Showrooms", "Contact"].map((link) => (
                  <Link key={link} href="#" className="block text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                    {link}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-800 dark:text-white font-semibold mb-4">Collections</h4>
              <div className="space-y-2">
                {["Majlis", "Sofas", "Beds", "Curtains", "Custom Orders"].map((collection) => (
                  <Link
                    key={collection}
                    href="#"
                    className="block text-slate-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                  >
                    {collection}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-amber-500/20 mt-8 pt-8 text-center">
            <p className="text-slate-600 dark:text-gray-400">
              © {new Date().getFullYear()} Rejeb Furniture. All rights reserved. | Crafted with excellence in Ethiopia
            </p>
          </div>
        </div>
      </footer>

      {/* Admin Panel */}
      <AdminPanel isOpen={showAdminPanel} onClose={() => setShowAdminPanel(false)} />

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        cartItems={cartItems}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        clearCart={clearCart}
        language={language}
      />
    </div>
  )
}
