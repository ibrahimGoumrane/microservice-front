import { getAllOrders } from "@/lib/network/api/orders"
import { AdminOrdersClient } from "./_components/admin-orders-client"

export default async function AdminOrdersPage() {
  const orders = await getAllOrders()

  return <AdminOrdersClient orders={orders} />
}
