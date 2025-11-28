"use server";

import { createApiResource } from "../utils/base";
import type {
  User,
  CreateUserDTO,
  UpdateUserDTO,
} from "@/lib/types/entities/user";
import {
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types/subTypes/commonTypes";

// Create the Users API resource - base path is /api/v1/users (Admin only)
const usersApi = createApiResource<User, CreateUserDTO, UpdateUserDTO>(
  "api/v1/users"
);

// User-specific methods (all require ROLE_ADMIN)
export async function getAllUsers(
  page: number = 0,
  size: number = 10,
  search?: string
): Promise<PaginatedResponse<User>> {
  // GET /api/v1/users?page=0&size=10&search=john
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  return await usersApi.getResource<PaginatedResponse<User>>(
    `?page=${page}&size=${size}${searchParam}`
  );
}

export async function getUserById(id: number): Promise<User> {
  // GET /api/v1/users/{id}
  return await usersApi.get(id);
}

export async function createUser(
  data: CreateUserDTO
): Promise<ApiResponse<User>> {
  // POST /api/v1/users
  return await usersApi.create(data);
}

export async function updateUser(
  id: number,
  data: UpdateUserDTO
): Promise<ApiResponse<User>> {
  // PUT /api/v1/users/{id}
  return await usersApi.update(id, data);
}

export async function deleteUser(id: number): Promise<ApiResponse<null>> {
  // DELETE /api/v1/users/{id}
  return await usersApi.delete(id);
}
