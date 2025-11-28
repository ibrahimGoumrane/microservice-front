"use server";

import { createApiResource } from "../utils/base";
import type {
  Cart,
  AddToCartDTO,
  UpdateCartItemDTO,
  CartResponse,
} from "@/lib/types/entities/cart";
import { ApiResponse } from "@/lib/types/subTypes/commonTypes";

// Create the Cart API resource - base path is /api/v1/cart
const cartApi = createApiResource<Cart, AddToCartDTO, UpdateCartItemDTO>(
  "api/v1/cart"
);

// Cart-specific methods
export async function getCart(userId: number): Promise<CartResponse> {
  // GET /api/v1/cart/current?userId=1
  const response = await cartApi.getResource<CartResponse>(
    `current?userId=${userId}`
  );
  return response;
}

export async function addToCart(
  data: AddToCartDTO
): Promise<ApiResponse<CartResponse>> {
  // POST /api/v1/cart/add
  return await cartApi.postResource<CartResponse, AddToCartDTO>("add", data);
}

export async function updateCartItem(
  data: UpdateCartItemDTO
): Promise<ApiResponse<CartResponse>> {
  // POST /api/v1/cart/update
  return await cartApi.postResource<CartResponse, UpdateCartItemDTO>(
    "update",
    data
  );
}

export async function removeFromCart(
  productId: number,
  userId: number
): Promise<ApiResponse<CartResponse>> {
  // DELETE /api/v1/cart/items/{productId}?userId=1
  return await cartApi.deleteResource<CartResponse>(
    `items/${productId}?userId=${userId}`
  );
}

export async function clearCart(
  userId: number
): Promise<ApiResponse<CartResponse>> {
  // DELETE /api/v1/cart/clear?userId=1
  return await cartApi.deleteResource<CartResponse>(`clear?userId=${userId}`);
}

export async function getCartTotal(userId: number): Promise<number> {
  const cart = await getCart(userId);
  return cart.total;
}

export async function getCartItemCount(userId: number): Promise<number> {
  const cart = await getCart(userId);
  return cart.itemCount;
}
