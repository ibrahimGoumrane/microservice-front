"use server";

import { createApiResource } from "../utils/base";
import type {
  Order,
  CreateOrderDTO,
  UpdateOrderStatusDTO,
  OrderStatus,
} from "@/lib/types/entities/order";
import { ApiResponse } from "@/lib/types/subTypes/commonTypes";

// Create the Orders API resource - base path is /api/v1/orders
export const ordersApi = createApiResource<
  Order,
  CreateOrderDTO,
  UpdateOrderStatusDTO
>("api/v1/orders");

// Order-specific methods
export async function getAllOrders(): Promise<Order[]> {
  // GET /api/v1/orders
  return await ordersApi.list();
}

export async function getOrderById(id: number): Promise<Order> {
  // GET /api/v1/orders/{id}
  return await ordersApi.get(id);
}

export async function getOrderByOrderNumber(
  orderNumber: string
): Promise<Order> {
  // GET /api/v1/orders/number/{orderNumber}
  return await ordersApi.getResource<Order>(`number/${orderNumber}`);
}

export async function getCustomerOrders(customerId: number): Promise<Order[]> {
  // GET /api/v1/orders/customer/{customerId}
  return await ordersApi.getResource<Order[]>(`customer/${customerId}`);
}

export async function createOrder(
  data: CreateOrderDTO
): Promise<ApiResponse<Order>> {
  // POST /api/v1/orders
  return await ordersApi.create(data);
}

export async function updateOrderStatus(
  id: number,
  status: OrderStatus
): Promise<ApiResponse<Order>> {
  // PATCH /api/v1/orders/{id}/status
  return await ordersApi.postResource<Order, UpdateOrderStatusDTO>(
    `${id}/status`,
    { status }
  );
}

export async function cancelOrder(id: number): Promise<ApiResponse<null>> {
  // DELETE /api/v1/orders/{id}
  return await ordersApi.delete(id);
}

export async function getRecentOrders(
  customerId: number,
  limit: number = 5
): Promise<Order[]> {
  const allOrders = await getCustomerOrders(customerId);
  return allOrders.slice(0, limit);
}

export async function getOrdersByStatus(
  customerId: number,
  status: OrderStatus
): Promise<Order[]> {
  const allOrders = await getCustomerOrders(customerId);
  return allOrders.filter((order) => order.status === status);
}
