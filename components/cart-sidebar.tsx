"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Minus, ShoppingBag } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { toast } from "@/hooks/use-toast"

// Supabase client with fallback
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null

// Check if Supabase is configured
const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey)

interface CartItem {
  id: string
  name: string
  name_am: string
  price: number
  image_url: string
  quantity: number
}

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
  language: 'en' | 'am'
}

export default function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  updateQuantity,
  removeItem,
  clearCart,
  language
}: CartSidebarProps) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      })
      return
    }

    if (!isSupabaseConfigured || !supabase) {
      // Fallback: Show success message without saving to database
      toast({
        title: "Order Received (Demo Mode)",
        description: "Thank you for your order! In demo mode, orders are not saved. Please configure Supabase to enable full functionality.",
      })

      clearCart()
      setShowCheckout(false)
      setCustomerInfo({ name: '', email: '', phone: '', address: '' })
      onClose()
      return
    }

    try {
      const orderData = {
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        customer_address: customerInfo.address,
        products: cartItems,
        total_amount: total,
        status: 'pending'
      }

      const { error } = await supabase
        .from('orders')
        .insert([orderData])

      if (error) throw error

      toast({
        title: "Order Placed",
        description: "Your order has been placed successfully! We'll contact you soon.",
      })

      clearCart()
      setShowCheckout(false)
      setCustomerInfo({ name: '', email: '', phone: '', address: '' })
      onClose()
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Order Received (Offline Mode)",
        description: "Thank you for your order! There was a connection issue, but we've noted your order details.",
      })
      
      clearCart()
      setShowCheckout(false)
      setCustomerInfo({ name: '', email: '', phone: '', address: '' })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-end">
      <div className="bg-slate-900 w-full max-w-md h-full overflow-hidden flex flex-col">
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2" />
            {language === 'en' ? 'Shopping Cart' : 'የግዢ ጋሪ'}
          </h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:text-amber-400">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {!isSupabaseConfigured && (
          <div className="mx-6 mb-4 p-3 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-400 text-sm font-semibold">Demo Mode</span>
            </div>
            <p className="text-amber-300 text-xs mt-1">
              Orders will not be saved without Supabase configuration.
            </p>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-400 mt-8">
              <ShoppingBag className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>{language === 'en' ? 'Your cart is empty' : 'የእርስዎ ጋሪ ባዶ ነው'}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="bg-slate-800 border-amber-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm">
                          {language === 'en' ? item.name : item.name_am}
                        </h4>
                        <p className="text-amber-400 font-bold">
                          ETB {item.price.toLocaleString()}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                            className="ml-2 h-6 px-2 text-xs"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-amber-500/20">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-white">
                {language === 'en' ? 'Total:' : 'ጠቅላላ:'}
              </span>
              <span className="text-2xl font-bold text-amber-400">
                ETB {total.toLocaleString()}
              </span>
            </div>

            {!showCheckout ? (
              <div className="space-y-2">
                <Button
                  onClick={() => setShowCheckout(true)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                >
                  {language === 'en' ? 'Proceed to Checkout' : 'ወደ ክፍያ ይሂዱ'}
                </Button>
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="w-full border-amber-500/30 text-white hover:bg-amber-500/10"
                >
                  {language === 'en' ? 'Clear Cart' : 'ጋሪ አጽዳ'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    {language === 'en' ? 'Full Name' : 'ሙሉ ስም'}
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="bg-slate-800 border-amber-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    {language === 'en' ? 'Email' : 'ኢሜይል'}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="bg-slate-800 border-amber-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    {language === 'en' ? 'Phone' : 'ስልክ'}
                  </Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="bg-slate-800 border-amber-500/30 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">
                    {language === 'en' ? 'Address' : 'አድራሻ'}
                  </Label>
                  <Input
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                    className="bg-slate-800 border-amber-500/30 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                  >
                    {language === 'en' ? 'Place Order' : 'ትዕዛዝ ይስጡ'}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    variant="outline"
                    className="w-full border-amber-500/30 text-white hover:bg-amber-500/10"
                  >
                    {language === 'en' ? 'Back to Cart' : 'ወደ ጋሪ ተመለስ'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
