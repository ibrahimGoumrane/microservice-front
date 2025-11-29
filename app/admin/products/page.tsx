import { getAllProducts } from "@/lib/network/api/products";
import { HeaderWrapper } from "@/components/header-wrapper";
import { AdminProductsClient } from "./_components/admin-products-client";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const search = params.search || "";

  const products = await getAllProducts(page, limit, search, true);

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <AdminProductsClient initialProducts={products} />
    </div>
  );
}
