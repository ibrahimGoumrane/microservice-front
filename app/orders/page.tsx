import { HeaderWrapper } from "@/components/header-wrapper";
import { getAllOrders } from "@/lib/network/api/orders";
import { OrdersListClient } from "./_components/orders-list-client";

export default async function OrdersPage() {

  const orders = await getAllOrders();

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <OrdersListClient orders={orders} />
    </div>
  );
}
