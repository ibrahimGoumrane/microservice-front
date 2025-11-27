import { HomePage } from "./_components/home-page";
import { getFeaturedProducts } from "@/lib/network/api/products";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts(1, 8, undefined, false, true);
  
  return <HomePage featuredProducts={featuredProducts} />;
}
