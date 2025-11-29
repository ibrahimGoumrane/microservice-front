"use server";

import type {
  CreateProductDTO,
  Product,
  UpdateProductDTO,
} from "@/lib/types/entities/product";
import type {
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types/subTypes/commonTypes";
import { createApiResource } from "../utils/base";

// Create the Products API resource - base path is /api/v1/products
const productsApi = createApiResource<
  Product,
  CreateProductDTO,
  UpdateProductDTO
>("api/v1/products", true);

// Product-specific methods
export async function getAllProducts(
  page: number = 1,
  limit: number = 10,
  search?: string,
  paginated: boolean = true
): Promise<Product[]> {
  // When paginated, use getAllResourcePaginated to get full response
  const response = await productsApi.getAllResourcePaginated<Product>(
    "",
    page,
    limit,
    search || "",
    paginated
  );
  return response?.data || [];
}

export async function getProductById(id: number): Promise<Product> {
  // GET /api/v1/products/{id}
  return await productsApi.get(id);
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  // GET /api/v1/products/category/{category}
  return await productsApi.getAllResource<Product>(`category/${category}`);
}

export async function searchProducts(name: string): Promise<Product[]> {
  // GET /api/v1/products/search?name=query
  return await productsApi.getAllResource<Product>(
    `search?name=${encodeURIComponent(name)}`
  );
}

export async function createProduct(
  data: CreateProductDTO
): Promise<ApiResponse<Product>> {
  // POST /api/v1/products (multipart/form-data)
  return await productsApi.create(data);
}

export async function updateProduct(
  id: number,
  data: UpdateProductDTO
): Promise<ApiResponse<Product>> {
  // PUT /api/v1/products/{id} (multipart/form-data)
  return await productsApi.update(id, data);
}

export async function deleteProduct(id: number): Promise<ApiResponse<null>> {
  // DELETE /api/v1/products/{id}
  return await productsApi.delete(id);
}

export async function reserveStock(
  id: number,
  quantity: number
): Promise<ApiResponse<any>> {
  // POST /api/v1/products/{id}/reserve?quantity=2
  return await productsApi.postResource<any, {}>(
    `${id}/reserve?quantity=${quantity}`,
    {}
  );
}

export async function releaseStock(
  id: number,
  quantity: number
): Promise<ApiResponse<null>> {
  // POST /api/v1/products/{id}/release?quantity=2
  return await productsApi.postResource<null, {}>(
    `${id}/release?quantity=${quantity}`,
    {}
  );
}

export async function getAllProductsPaginated(
  page: number = 1,
  limit: number = 10,
  search?: string,
): Promise<PaginatedResponse<Product>> {
  // When paginated, use getAllResourcePaginated to get full response
  const response = await productsApi.getAllResourcePaginated<Product>(
    "",
    page,
    limit,
    search || "",
    true
  );
  return response;
}
