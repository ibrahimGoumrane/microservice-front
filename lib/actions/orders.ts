"use server";

import { z } from "zod";
import { State } from "@/lib/schema/base";
import { ordersApi } from "@/lib/network/api/orders";
import { revalidatePath } from "next/cache";

// Validation schemas
const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  country: z.string().min(1, "Country is required"),
});

const createOrderSchema = z.object({
  customerId: z.number().positive("Customer ID is required"),
  shippingAddress: addressSchema,
  orderItems: z.array(
    z.object({
      productId: z.number().positive("Product ID is required"),
      quantity: z.number().int().positive("Quantity must be positive"),
      price: z.number().positive("Price must be positive"),
    })
  ),
});

const updateOrderSchema = z.object({
  id: z.number(),
  status: z
    .enum([
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
    ])
    .optional(),
});

// Server Actions
export async function createOrderAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const data = {
      shippingAddress: {
        fullName: formData.get("fullName") as string,
        street: formData.get("street") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        zipCode: formData.get("zipCode") as string,
        country: formData.get("country") as string,
      },
    };

    const parsed = createOrderSchema.safeParse(data);
    if (!parsed.success) {
      return {
        success: false,
        errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const response = await ordersApi.create(parsed.data);
    revalidatePath("/orders");
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

export async function updateOrderStatusAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  return await ordersApi.updateAction(
    prevState,
    formData,
    updateOrderSchema,
    true,
    ["/admin/orders", "/orders"],
    "id",
    "PUT"
  );
}

export async function cancelOrderAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const id = Number(formData.get("id"));

    if (!id) {
      return {
        success: false,
        errors: { id: ["Order ID is required"] },
      };
    }

    const response = await ordersApi.delete(id);
    revalidatePath("/orders");
    revalidatePath("/admin/orders");

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
