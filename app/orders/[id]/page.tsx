import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { getOrderById } from "@/lib/network/api"
import { OrderDetailClient } from "./_components/order-detail-client"

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const order = await getOrderById(id)

  if (!order) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-col items-center justify-center px-4 py-16">
          <h1 className="text-2xl font-bold">Order not found</h1>
          <p className="mt-2 text-muted-foreground">The order you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/orders">
            <Button className="mt-4">View All Orders</Button>
          </Link>
        </div>
      </div>
    )
  }

  return <OrderDetailClient order={order} />
}
