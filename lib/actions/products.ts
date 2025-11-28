"use server";

import { State } from "@/lib/schema/base";
import { z } from "zod";
import { createApiResource } from "../network/utils/base";
import { CreateProductDTO, Product, UpdateProductDTO } from "../types/main";

const productsApi = createApiResource<
  Product,
  CreateProductDTO,
  UpdateProductDTO
>("api/v1/products", true);

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.instanceof(File, { message: "Image file is required" }),
  stockQuantity: z.number().int().nonnegative("Stock must be non-negative"),
  active: z.boolean().default(true),
  rating: z.number().min(0).max(5).optional(),
});

const updateProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().positive("Price must be positive").optional(),
  category: z.string().min(1, "Category is required").optional(),
  image: z.instanceof(File).optional(),
  stockQuantity: z
    .number()
    .int()
    .nonnegative("Stock must be non-negative")
    .optional(),
  active: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
});

const deleteProductSchema = z.object({
  id: z.number(),
});

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
