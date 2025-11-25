"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, CartItem, Order, Product } from "./types"
import { mockProducts } from "./mock-data"

interface StoreContextType {
  // Auth
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  isAuthenticated: boolean

  // Cart
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartCount: number

  // Orders
  orders: Order[]
  placeOrder: (address: Order["shippingAddress"]) => Order | null

  // Products (for admin)
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const STORAGE_KEYS = {
  USER: "ecommerce_user",
  TOKEN: "ecommerce_token",
  CART: "ecommerce_cart",
  ORDERS: "ecommerce_orders",
  PRODUCTS: "ecommerce_products",
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydrate state from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
    const storedCart = localStorage.getItem(STORAGE_KEYS.CART)
    const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS)
    const storedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS)

    if (storedUser) setUser(JSON.parse(storedUser))
    if (storedCart) setCart(JSON.parse(storedCart))
    if (storedOrders) setOrders(JSON.parse(storedOrders))
    if (storedProducts) setProducts(JSON.parse(storedProducts))

    setIsHydrated(true)
  }, [])

  // Persist cart
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  // Persist orders
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders))
    }
  }, [orders, isHydrated])

  // Persist products
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products))
    }
  }, [products, isHydrated])

  const login = (email: string, password: string): boolean => {
    // Simulate authentication - accept any password for demo
    const fakeToken = btoa(`${email}:${Date.now()}`)

    const isAdmin = email.toLowerCase().includes("admin")
    const newUser: User = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
      role: isAdmin ? "admin" : "user",
    }

    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser))
    localStorage.setItem(STORAGE_KEYS.TOKEN, fakeToken)
    return true
  }

  const register = (name: string, email: string, password: string): boolean => {
    const fakeToken = btoa(`${email}:${Date.now()}`)

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: "user",
    }

    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser))
    localStorage.setItem(STORAGE_KEYS.TOKEN, fakeToken)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEYS.USER)
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
  }

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) => prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => setCart([])

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const placeOrder = (address: Order["shippingAddress"]): Order | null => {
    if (cart.length === 0 || !user) return null

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: [...cart],
      total: cartTotal,
      status: "pending",
      shippingAddress: address,
      createdAt: new Date().toISOString(),
    }

    setOrders((prev) => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
