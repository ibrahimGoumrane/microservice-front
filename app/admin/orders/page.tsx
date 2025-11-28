import { getAllOrders } from "@/lib/network/api/orders";
import { HeaderWrapper } from "@/components/header-wrapper";
import { AdminOrdersClient } from "./_components/admin-orders-client";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <AdminOrdersClient orders={orders} />
    </div>
  );
}
