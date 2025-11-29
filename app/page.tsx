import { HomePage } from "./_components/home-page";
import { getAllProducts } from "@/lib/network/api/products";

export default async function Home() {
  const featuredProducts = await getAllProducts(1, 8, undefined, true);
  console.log("featuredProducts", featuredProducts);
  return <HomePage featuredProducts={featuredProducts} />;
}
