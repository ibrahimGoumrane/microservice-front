import { getAllProducts } from "@/lib/network/api/products"
import { AdminProductsClient } from "./_components/admin-products-client"

export default async function AdminProductsPage() {
  const products = await getAllProducts(1, 1000, undefined, true, false)

  return <AdminProductsClient initialProducts={products} />
}
