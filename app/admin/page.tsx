import { redirect } from "next/navigation";
import { HeaderWrapper } from "@/components/header-wrapper";
import { getCurrentUser, isAuthenticated } from "@/lib/network/api/auth";
import { getAllProducts } from "@/lib/network/api/products";
import { getAllOrders } from "@/lib/network/api/orders";
import { getAllUsers } from "@/lib/network/api/users";
import { AdminDashboardClient } from "./_components/admin-dashboard-client";

export default async function AdminDashboard() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }

  const user = await getCurrentUser();
  if (user.roles !== "ROLE_ADMIN") {
    redirect("/");
  }

  // Load admin data
  const [products, orders, usersData] = await Promise.all([
    getAllProducts(1, 1000, undefined, false),
    getAllOrders(),
    getAllUsers(0, 1000),
  ]);

  const totalUsers = usersData.metadata?.pagination?.totalItems || 0;

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <AdminDashboardClient
        user={user}
        products={products}
        orders={orders}
        totalUsers={totalUsers}
      />
    </div>
  );
}
