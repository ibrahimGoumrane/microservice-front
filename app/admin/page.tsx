"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { useStore } from "@/lib/store-context"
import { mockUsers } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Users, ShoppingCart, DollarSign, TrendingUp, ArrowRight, Box, ClipboardList } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, products, orders } = useStore()

  if (!isAuthenticated || user?.role !== "admin") {
    router.push("/login")
    return null
  }

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const totalProducts = products.length
  const totalOrders = orders.length
  const totalUsers = mockUsers.length
  const lowStockProducts = products.filter((p) => p.stock < 10).length

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      change: "+12.5%",
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
      change: "+8.2%",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      change: `${lowStockProducts} low stock`,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      title: "Total Users",
      value: totalUsers,
      icon: Users,
      change: "+5 this week",
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  const recentOrders = orders.slice(0, 5)

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`rounded-full p-3 ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/admin/products">
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Manage Products</h3>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/orders">
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-chart-2/10 p-3">
                    <ClipboardList className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View Orders</h3>
                    <p className="text-sm text-muted-foreground">Manage customer orders</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/users">
            <Card className="cursor-pointer transition-shadow hover:shadow-lg">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-chart-3/10 p-3">
                    <Users className="h-6 w-6 text-chart-3" />
                  </div>
                  <div>
                    <h3 className="font-semibold">User List</h3>
                    <p className="text-sm text-muted-foreground">View registered users</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Orders */}
        <Card className="mt-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-2">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <p className="font-mono text-sm font-semibold">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items • {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${order.total.toFixed(2)}</p>
                      <p className="text-sm capitalize text-muted-foreground">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No orders yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
