import z from "zod";

// Validation schemas
export const addToCartSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
});

export const updateCartItemSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
  quantity: z.number().int().nonnegative("Quantity must be non-negative"),
});

export const removeFromCartSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
});