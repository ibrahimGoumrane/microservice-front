import { getProductById, getAllProducts } from "@/lib/network/api/products";
import { getProductReviews } from "@/lib/network/api/reviews";
import { getCurrentUser } from "@/lib/network/api/auth";
import { HeaderWrapper } from "@/components/header-wrapper";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "./_components/product-detail-client";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = +id;

  const [product, allProducts, reviewsData, user] = await Promise.all([
    getProductById(productId),
    getAllProducts(1, 8, undefined, true),
    getProductReviews(productId, 0, 10),
    getCurrentUser(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <HeaderWrapper />
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
        reviewsData={reviewsData}
        isAuthenticated={!!user}
      />
    </div>
  );
}
