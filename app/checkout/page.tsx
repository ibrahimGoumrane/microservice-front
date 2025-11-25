"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { useStore } from "@/lib/store-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, CheckCircle } from "lucide-react"
import type { Address } from "@/lib/types"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, cartTotal, placeOrder, isAuthenticated } = useStore()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [address, setAddress] = useState<Address>({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const [errors, setErrors] = useState<Partial<Address>>({})

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  if (cart.length === 0 && !success) {
    router.push("/cart")
    return null
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Address> = {}

    if (!address.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!address.street.trim()) newErrors.street = "Street address is required"
    if (!address.city.trim()) newErrors.city = "City is required"
    if (!address.state.trim()) newErrors.state = "State is required"
    if (!address.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
    if (!address.country.trim()) newErrors.country = "Country is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const order = placeOrder(address)

    if (order) {
      setOrderId(order.id)
      setSuccess(true)
    }

    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16 text-center">
          <div className="rounded-full bg-accent/20 p-6">
            <CheckCircle className="h-16 w-16 text-accent" />
          </div>
          <h1 className="mt-6 text-3xl font-bold">Payment Successful!</h1>
          <p className="mt-4 text-muted-foreground">Thank you for your order. Your order ID is:</p>
          <p className="mt-2 font-mono text-lg font-semibold">{orderId}</p>
          <div className="mt-8 flex gap-4">
            <Button onClick={() => router.push("/orders")}>View Orders</Button>
            <Button variant="outline" onClick={() => router.push("/products")}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const total = cartTotal + (cartTotal >= 50 ? 0 : 9.99) + cartTotal * 0.08

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={address.street}
                      onChange={(e) => setAddress({ ...address, street: e.target.value })}
                      className={errors.street ? "border-destructive" : ""}
                    />
                    {errors.street && <p className="text-sm text-destructive">{errors.street}</p>}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={address.state}
                        onChange={(e) => setAddress({ ...address, state: e.target.value })}
                        className={errors.state ? "border-destructive" : ""}
                      />
                      {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={address.zipCode}
                        onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                        className={errors.zipCode ? "border-destructive" : ""}
                      />
                      {errors.zipCode && <p className="text-sm text-destructive">{errors.zipCode}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={address.country}
                        onChange={(e) => setAddress({ ...address, country: e.target.value })}
                        className={errors.country ? "border-destructive" : ""}
                      />
                      {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Payment Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertTitle>Mock Checkout</AlertTitle>
                    <AlertDescription>
                      This is a demo checkout. No real payment will be processed. Click &quot;Place Order&quot; to
                      simulate a successful payment.
                    </AlertDescription>
                  </Alert>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Place Order - ${total.toFixed(2)}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{cartTotal >= 50 ? "Free" : "$9.99"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
