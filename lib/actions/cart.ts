"use server";

import { z } from "zod";
import { State } from "@/lib/schema/base";
import * as cartApi from "@/lib/network/api/cart";
import { revalidatePath } from "next/cache";

// Validation schemas
const addToCartSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
  quantity: z.number().int().positive("Quantity must be positive"),
});

const updateCartItemSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
  quantity: z.number().int().nonnegative("Quantity must be non-negative"),
});

const removeFromCartSchema = z.object({
  userId: z.number().positive("User ID is required"),
  productId: z.number().positive("Product ID is required"),
});

// Server Actions
export async function addToCartAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const data = {
      userId: Number(formData.get("userId")),
      productId: Number(formData.get("productId")),
      quantity: Number(formData.get("quantity")),
    };

    const parsed = addToCartSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const response = await cartApi.addToCart(parsed.data);
    revalidatePath("/cart");
    revalidatePath("/");

    return {
      success: true,
      errors: {},
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
}

export async function updateCartItemAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const data = {
      userId: Number(formData.get("userId")),
      productId: Number(formData.get("productId")),
      quantity: Number(formData.get("quantity")),
    };

    const parsed = updateCartItemSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const response = await cartApi.updateCartItem(parsed.data);
    revalidatePath("/cart");

    return {
      success: true,
      errors: {},
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
}

export async function removeFromCartAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const data = {
      userId: Number(formData.get("userId")),
      productId: Number(formData.get("productId")),
    };

    const parsed = removeFromCartSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const response = await cartApi.removeFromCart(
      parsed.data.productId,
      parsed.data.userId
    );
    revalidatePath("/cart");

    return {
      success: true,
      errors: {},
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
}

export async function clearCartAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const userId = Number(formData.get("userId"));

    if (!userId) {
      return {
        success: false,
        errors: { userId: ["User ID is required"] },
      };
    }

    const response = await cartApi.clearCart(userId);
    revalidatePath("/cart");

    return {
      success: true,
      errors: {},
      data: response,
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: [(error as Error).message] },
    };
  }
}
