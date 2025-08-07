"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Users, Package, Mail, Phone } from 'lucide-react'
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

interface Product {
  id?: string
  name: string
  name_am: string
  category: string
  price: number
  image_url: string
  description: string
  description_am: string
  in_stock: boolean
}

interface Contact {
  id: string
  name: string
  email: string
  message: string
  language: string
  created_at: string
}

interface Order {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  products: any[]
  total_amount: number
  status: string
  created_at: string
}

export default function AdminPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [products, setProducts] = useState<Product[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showProductDialog, setShowProductDialog] = useState(false)

  const [productForm, setProductForm] = useState<Product>({
    name: '',
    name_am: '',
    category: '',
    price: 0,
    image_url: '',
    description: '',
    description_am: '',
    in_stock: true
  })

  useEffect(() => {
    if (isOpen) {
      fetchProducts()
      fetchContacts()
      fetchOrders()
    }
  }, [isOpen])

  const fetchProducts = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Mock data for demo mode
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
      
      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      console.error('Error fetching products:', error)
      toast({
        title: "Demo Mode",
        description: "Using sample data. Configure Supabase for full functionality.",
      })
    }
  }

  const fetchContacts = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Mock contacts data
      const mockContacts = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Interested in your majlis collection. Please contact me.',
          language: 'en',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'አበበ ተስፋዬ',
          email: 'abebe@example.com',
          message: 'የሶፋ ስብስቦችን መመልከት እፈልጋለሁ።',
          language: 'am',
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ]
      setContacts(mockContacts)
      return
    }

    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const fetchOrders = async () => {
    if (!isSupabaseConfigured || !supabase) {
      // Mock orders data
      const mockOrders = [
        {
          id: '1',
          customer_name: 'Sarah Ahmed',
          customer_email: 'sarah@example.com',
          customer_phone: '+251-91-123-4567',
          products: [
            { name: 'Royal Majlis Set', quantity: 1, price: 125000 }
          ],
          total_amount: 125000,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]
      setOrders(mockOrders)
      return
    }

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!isSupabaseConfigured || !supabase) {
      toast({
        title: "Demo Mode",
        description: "Product management requires Supabase configuration. This is a demo.",
        variant: "destructive"
      })
      return
    }
  
    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productForm)
          .eq('id', editingProduct.id)
      
        if (error) throw error
      
        toast({
          title: "Product Updated",
          description: "Product has been updated successfully.",
        })
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productForm])
        
        if (error) throw error
        
        toast({
          title: "Product Added",
          description: "New product has been added successfully.",
        })
      }
    
      setShowProductDialog(false)
      setEditingProduct(null)
      setProductForm({
        name: '',
        name_am: '',
        category: '',
        price: 0,
        image_url: '',
        description: '',
        description_am: '',
        in_stock: true
      })
      fetchProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive"
      })
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (!isSupabaseConfigured || !supabase) {
      toast({
        title: "Demo Mode",
        description: "Product deletion requires Supabase configuration.",
        variant: "destructive"
      })
      return
    }

    if (!confirm('Are you sure you want to delete this product?')) return
  
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
    
      if (error) throw error
    
      toast({
        title: "Product Deleted",
        description: "Product has been deleted successfully.",
      })
    
      fetchProducts()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive"
      })
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setProductForm(product)
    setShowProductDialog(true)
  }

  const updateOrderStatus = async (orderId: string, status: string) => {
    if (!isSupabaseConfigured || !supabase) {
      toast({
        title: "Demo Mode",
        description: "Order management requires Supabase configuration.",
        variant: "destructive"
      })
      return
    }

    try {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
    
      if (error) throw error
    
      toast({
        title: "Order Updated",
        description: "Order status has been updated.",
      })
    
      fetchOrders()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update order status.",
        variant: "destructive"
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-amber-500/20 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <Button variant="ghost" onClick={onClose} className="text-white hover:text-amber-400">
            ✕
          </Button>
        </div>
        
        {!isSupabaseConfigured && (
          <div className="mx-6 mb-4 p-4 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-400 font-semibold">Demo Mode</span>
            </div>
            <p className="text-amber-300 text-sm mt-1">
              Supabase is not configured. Using mock data for demonstration. 
              Configure Supabase environment variables to enable full functionality.
            </p>
          </div>
        )}

        <div className="p-6 h-full overflow-y-auto">
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="products" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Package className="h-4 w-4 mr-2" />
                Products
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Mail className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="orders" className="data-[state=active]:bg-amber-500 data-[state=active]:text-black">
                <Users className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-white">Products Management</h3>
                <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-900 border-amber-500/20 text-white max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name (English)</Label>
                          <Input
                            id="name"
                            value={productForm.name}
                            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                            className="bg-slate-800 border-amber-500/30"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="name_am">Name (Amharic)</Label>
                          <Input
                            id="name_am"
                            value={productForm.name_am}
                            onChange={(e) => setProductForm({...productForm, name_am: e.target.value})}
                            className="bg-slate-800 border-amber-500/30"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category">Category</Label>
                          <Select value={productForm.category} onValueChange={(value) => setProductForm({...productForm, category: value})}>
                            <SelectTrigger className="bg-slate-800 border-amber-500/30">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="majlis">Majlis</SelectItem>
                              <SelectItem value="sofas">Sofas</SelectItem>
                              <SelectItem value="beds">Beds</SelectItem>
                              <SelectItem value="curtains">Curtains</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="price">Price (ETB)</Label>
                          <Input
                            id="price"
                            type="number"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                            className="bg-slate-800 border-amber-500/30"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="image_url">Image URL</Label>
                        <Input
                          id="image_url"
                          value={productForm.image_url}
                          onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                          className="bg-slate-800 border-amber-500/30"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description">Description (English)</Label>
                        <Textarea
                          id="description"
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          className="bg-slate-800 border-amber-500/30"
                          rows={3}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="description_am">Description (Amharic)</Label>
                        <Textarea
                          id="description_am"
                          value={productForm.description_am}
                          onChange={(e) => setProductForm({...productForm, description_am: e.target.value})}
                          className="bg-slate-800 border-amber-500/30"
                          rows={3}
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="in_stock"
                          checked={productForm.in_stock}
                          onChange={(e) => setProductForm({...productForm, in_stock: e.target.checked})}
                          className="rounded"
                        />
                        <Label htmlFor="in_stock">In Stock</Label>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setShowProductDialog(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-amber-500 hover:bg-amber-600 text-black">
                          {editingProduct ? 'Update' : 'Add'} Product
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <Card key={product.id} className="bg-slate-800 border-amber-500/20">
                    <CardContent className="p-4">
                      <img
                        src={product.image_url || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded mb-3"
                      />
                      <h4 className="font-semibold text-white mb-1">{product.name}</h4>
                      <p className="text-amber-400 font-bold mb-2">ETB {product.price.toLocaleString()}</p>
                      <Badge variant={product.in_stock ? "default" : "destructive"} className="mb-3">
                        {product.in_stock ? "In Stock" : "Out of Stock"}
                      </Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="flex-1"
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id!)}
                          className="flex-1"
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contacts" className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Contact Messages</h3>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <Card key={contact.id} className="bg-slate-800 border-amber-500/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{contact.name}</CardTitle>
                          <p className="text-amber-400">{contact.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">{contact.language.toUpperCase()}</Badge>
                          <p className="text-sm text-gray-400 mt-1">
                            {new Date(contact.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300">{contact.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders" className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Orders Management</h3>
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="bg-slate-800 border-amber-500/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-white">{order.customer_name}</CardTitle>
                          <p className="text-amber-400">{order.customer_email}</p>
                          <p className="text-gray-400">{order.customer_phone}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-amber-400">
                            ETB {order.total_amount.toLocaleString()}
                          </p>
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32 bg-slate-700 border-amber-500/30 mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h5 className="font-semibold text-white">Products:</h5>
                        {order.products.map((product: any, index: number) => (
                          <div key={index} className="flex justify-between text-gray-300">
                            <span>{product.name} x {product.quantity}</span>
                            <span>ETB {(product.price * product.quantity).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-400 mt-4">
                        Order Date: {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
