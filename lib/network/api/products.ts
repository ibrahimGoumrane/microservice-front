"use server";

import { createApiResource } from "../utils/base";
import type { Product, CreateProductDTO, UpdateProductDTO } from "@/lib/types/entities/product";

// Create the Products API resource
export const productsApi = createApiResource<Product, CreateProductDTO, UpdateProductDTO>("products");

// Product-specific methods
export async function getAllProducts(page: number, limit: number, search: string | undefined, admin: boolean, paginated: boolean): Promise<Product[]> {
  return (await productsApi.listWithPagination(page, limit, search, admin, paginated)).data;
}

export async function getProductById(id: string): Promise<Product> {
  return await productsApi.get(id);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const allProducts = await productsApi.list();
  return allProducts.filter((p) => p.category === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const allProducts = await productsApi.list();
  const lowerQuery = query.toLowerCase();
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}

export async function createProduct(data: CreateProductDTO) {
  return await productsApi.create(data);
}

export async function updateProduct(id: string, data: UpdateProductDTO) {
  return await productsApi.update(id, data);
}

export async function deleteProduct(id: string) {
  return await productsApi.delete(id);
}

export async function getFeaturedProducts(page: number, limit: number, search: string | undefined, admin: boolean, paginated: boolean): Promise<Product[]> {
  const allProducts = await productsApi.listWithPagination(page, limit, search, admin, paginated);
  return allProducts.data;
}
