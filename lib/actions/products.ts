"use server";

import { State } from "@/lib/schema/base";
import { createApiResource } from "../network/utils/base";
import { createProductSchema , updateProductSchema , deleteProductSchema } from "../schema/product";
import { CreateProductDTO, Product, UpdateProductDTO } from "../types/main";

const productsApi = createApiResource<
  Product,
  CreateProductDTO,
  UpdateProductDTO
>("api/v1/products", true);

// Server Actions
export async function createProductAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  return await productsApi.createAction(
    prevState,
    formData,
    createProductSchema,
    true,
    ["/admin/products", "/products"]
  );
}

export async function updateProductAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  return await productsApi.updateAction(
    prevState,
    formData,
    updateProductSchema,
    true,
    ["/admin/products", "/products"],
    "id",
    "PUT"
  );
}

export async function deleteProductAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  return await productsApi.deleteAction(
    prevState,
    formData,
    deleteProductSchema,
    ["/admin/products", "/products"],
    "id"
  );
}
