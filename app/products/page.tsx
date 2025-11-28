import { getAllProducts } from "@/lib/network/api/products";
import { ProductsListClient } from "./_components/products-list-client";
import { HeaderWrapper } from "@/components/header-wrapper";

export default async function ProductsPage() {
  const products = await getAllProducts(1, 8, undefined, false);
  const categories = [
    "All",
    "Electronics",
    "Clothing",
    "Accessories",
    "Home",
    "Sports",
    "Shoes",
  ];

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <ProductsListClient products={products} categories={categories} />
    </div>
  );
}
