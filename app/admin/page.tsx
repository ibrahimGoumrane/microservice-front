import { HeaderWrapper } from "@/components/header-wrapper";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/network/api/auth";
import { getAllOrders } from "@/lib/network/api/orders";
import { getAllProducts } from "@/lib/network/api/products";
import { getAllUsers } from "@/lib/network/api/users";
import { AdminDashboardClient } from "./_components/admin-dashboard-client";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    console.log("Admin Dashboard: No user found (user is null). Cookies might be missing.");
    // Log cookies for debugging (be careful with secrets in prod)
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    console.log("Admin Dashboard Cookies:", cookieStore.getAll().map(c => c.name));

    redirect("/auth/login?redirect=/admin");
  } else {
    console.log("Admin Dashboard: User found:", user.email, "Roles:", user.roles);
  }

  // Optional: Check for admin role if not enforced by middleware
  // if (!user.roles.includes("ROLE_ADMIN")) {
  //   redirect("/");
  // }

  // Load admin data
  const [products, orders, usersData] = await Promise.all([
    getAllProducts(1, 1000, undefined, false),
    getAllOrders(),
    getAllUsers(0, 1000),
  ]);

  const totalUsers = usersData?.metadata?.pagination?.totalItems || 0;

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
