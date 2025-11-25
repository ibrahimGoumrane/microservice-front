export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  stock: number
  rating: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: Address
  createdAt: string
}

export interface Address {
  fullName: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}
