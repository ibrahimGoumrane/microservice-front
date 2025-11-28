import { getAllProducts } from "@/lib/network/api/products";
import { HeaderWrapper } from "@/components/header-wrapper";
import { AdminProductsClient } from "./_components/admin-products-client";

export default async function AdminProductsPage() {
  const products = await getAllProducts(1, 1000, undefined, true);

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <AdminProductsClient initialProducts={products} />
    </div>
  );
}
