"use server";

import { State } from "@/lib/schema/base";
import { revalidatePath } from "next/cache";
import { createApiResource } from "../network/utils/base";
import { createOrderSchema, updateOrderSchema } from "../schema/order";
import { UpdateOrderStatusDTO } from "../types/entities/order";
import { CreateOrderDTO, Order } from "../types/main";

// Create the Orders API resource - base path is /api/v1/orders
const ordersApi = createApiResource<
  Order,
  CreateOrderDTO,
  UpdateOrderStatusDTO
>("api/v1/orders");


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
