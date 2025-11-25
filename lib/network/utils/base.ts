
import {
  ApiResponse,
  PaginatedResponse,
} from "@/lib/types/subTypes/commonTypes";
import { ZodSchema } from "zod";
import { downloadFile, fetchData } from "./main";
import { handleAction } from "./action";
import { State } from "@/lib/schema/base";

/**
 * Generic CRUD API client that can be extended for specific resources
 */
export class ApiResource<T, CreateDTO = T, UpdateDTO = Partial<T>> {
  private baseUrl: string;
  private haveFiles: boolean;

  constructor(resourcePath: string, haveFiles: boolean = false) {
    this.baseUrl = `/${resourcePath.replace(/^\/|\/$/g, "")}/`; // Normalize path
    this.haveFiles = haveFiles;
  }
  /**
   * List all resources with pagination support
   */
  async list(): Promise<T[]> {
    try {
      const response = (await fetchData<PaginatedResponse<T>>(
        this.baseUrl + `?paginated=false`,
        {
          method: "GET",
        }
      )) as PaginatedResponse<T>;
      return response.data;
    } catch (error) {
      console.error("Error fetching resource list:", error);
      return [];
    }
  }

  /**
   * List all resources with pagination metadata
   * @returns The full paginated response including metadata
   */
  async listWithPagination<R = T>(
    page: number,
    limit: number,
    search: string = "",
    admin: boolean,
    paginated: boolean
  ): Promise<PaginatedResponse<R>> {
    try {
      const response = (await fetchData<PaginatedResponse<R>>(
        this.baseUrl +
          `?page=${page}&limit=${limit}&search=${search}&admin=${admin}&paginated=${paginated}`,
        {
          method: "GET",
        }
      )) as PaginatedResponse<R>;
      return response;
    } catch (error) {
      console.error("Error fetching paginated resources:", error);
      return {
        data: [],
        success: false,
        meta: {
          pagination: {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 0,
          },
        },
      };
    }
  }

  /**
   * Get a single resource by ID
   */
  async get(id: number | string): Promise<T> {
    try {
      const response = (await fetchData<ApiResponse<T>>(
        `${this.baseUrl}${id}/`,
        {
          method: "GET",
        }
      )) as ApiResponse<T>;
      return response.data as T;
    } catch (error) {
      console.error("Error fetching resource by ID:", error);
      return null as T; // Return null if not found
    }
  }

  /**
   * Create a new resource
   */
  async create(data: CreateDTO): Promise<ApiResponse<T>> {
    const body = this.haveFiles
      ? this.toFormData(data as Record<string, string | File>)
      : JSON.stringify(data);
    const response = (await fetchData<ApiResponse<T>>(this.baseUrl, {
      method: "POST",
      body,
    })) as ApiResponse<T>;
    return response;
  }

  /**
   * Update a resource
   */
  async update(
    id: number | string,
    data: UpdateDTO,
    fetchMethod: "PUT" | "POST" = "PUT"
  ): Promise<ApiResponse<T>> {
    const body = this.haveFiles
      ? this.toFormData(data as Record<string, string | File>)
      : JSON.stringify(data);
    const response = (await fetchData<ApiResponse<T>>(`${this.baseUrl}${id}/`, {
      method: fetchMethod,
      body,
    })) as ApiResponse<T>;
    return response;
  }

  /**
   * Delete a resource
   */
  async delete(id: number | string): Promise<ApiResponse<null>> {
    const response = (await fetchData<ApiResponse<null>>(
      `${this.baseUrl}${id}/`,
      {
        method: "DELETE",
      }
    )) as ApiResponse<null>;
    return response;
  }
  /**
   * Get all resources of a specific type with pagination support
   */
  async getAllResource<R>(resourcePath: string): Promise<R[]> {
    try {
      const response = (await fetchData<PaginatedResponse<R>>(
        `${this.baseUrl}${resourcePath.replace(
          /^\/|\/$/g,
          ""
        )}/?paginated=false`,
        {
          method: "GET",
        }
      )) as PaginatedResponse<R>;
      return response.data;
    } catch (error) {
      console.error("Error fetching all resources:", error);
      return [];
    }
  }
  /**
   * get all resources of a specific type with pagination metadata
   */
  async getAllResourcePaginated<R>(
    resourcePath: string,
    page: number,
    limit: number,
    search: string = "",
    paginated: boolean = true,
    admin: boolean = false
  ): Promise<PaginatedResponse<R>> {
    try {
      const response = (await fetchData<PaginatedResponse<R>>(
        `${this.baseUrl}${resourcePath.replace(
          /^\/|\/$/g,
          ""
        )}/?page=${page}&limit=${limit}&search=${search}&paginated=${paginated}&admin=${admin}`,
        {
          method: "GET",
        }
      )) as PaginatedResponse<R>;
      return response;
    } catch (error) {
      console.error("Error fetching all resources:", error);
      return {
        data: [],
        success: false,
        meta: {
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0,
          },
        },
      };
    }
  }

  /**
   * Get a specific resource of a specific type
   */
  async getResource<R>(resourcePath: string): Promise<R> {
    try {
      const response = (await fetchData<ApiResponse<R>>(
        `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`,
        {
          method: "GET",
        }
      )) as ApiResponse<R>;
      return response.data as R;
    } catch (error) {
      console.error("Error fetching resource:", error);
      return null as R; // Return null if not found
    }
  }
  /**
   * Perform a Post request to a specific resource path
   */
  async postResource<T, U = Record<string, any>>(
    resourcePath: string,
    data: U
  ): Promise<ApiResponse<T>> {
    const body = this.haveFiles
      ? this.toFormData(data as Record<string, File>)
      : JSON.stringify(data);
    return (await fetchData<ApiResponse<T>>(
      `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`,
      {
        method: "POST",
        body,
      }
    )) as ApiResponse<T>;
  }
  /**
   * Perform a Delete request to a specific resource path
   */
  async deleteResource<T>(resourcePath: string): Promise<ApiResponse<T>> {
    return (await fetchData<ApiResponse<T>>(
      `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`,
      {
        method: "DELETE",
      }
    )) as ApiResponse<T>;
  }

  /**
   * Download a file from a specific resource path
   */
  async downloadFileResource(resourcePath: string): Promise<Blob> {
    const response = await downloadFile(
      `${this.baseUrl}${resourcePath.replace(/^\/|\/$/g, "")}/`
    );
    return response;
  }
  /**
   * Server Action wrapper for fetching resources
   */
  private async handleAction(
    data: CreateDTO | UpdateDTO | Record<string, string | number | File>,
    schema: ZodSchema,
    action: () => Promise<ApiResponse<T | null>>,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> {
    return handleAction<T, CreateDTO, UpdateDTO>(
      data,
      schema,
      action,
      revalidatePaths
    );
  }

  /**
   * Server Action wrapper for creating resources
   */
  createAction = async (
    prevState: State,
    formData: FormData | CreateDTO,
    schema: ZodSchema,
    applyTransform: boolean = true,
    revalidatePaths?: string | string[] // New parameter
  ): Promise<State> => {
    const data = applyTransform
      ? this.formDataToObject(formData as FormData)
      : formData;
    return await this.handleAction(
      data as CreateDTO,
      schema,
      () => this.create(data as CreateDTO),
      revalidatePaths
    );
  };

  /**
   * Server Action wrapper for updating resources
   */
  updateAction = async (
    prevState: State,
    formData: FormData | UpdateDTO,
    schema: ZodSchema,
    applyTransform: boolean = true,
    revalidatePaths?: string | string[], // New parameter
    idName: string = "id",
    fetchMethod: "PUT" | "POST" = "PUT"
  ): Promise<State> => {
    const rawId =
      formData instanceof FormData
        ? formData.get(idName)
        : (formData as { [key: string]: any })?.[idName];
    if (!rawId) {
      return {
        success: false,
        errors: { id: ["ID is required"] },
      };
    }

    // Convert ID to number if it's a string
    const id = typeof rawId === "string" ? Number(rawId) : rawId;

    const data = applyTransform
      ? this.formDataToObject(formData as FormData)
      : formData;

    // Put the ID back into the data object Number
    if (!(data instanceof FormData)) {
      (data as Record<string, any>)[idName] = id;
    }
    return await this.handleAction(
      data as UpdateDTO,
      schema,
      () => this.update(id, data as UpdateDTO, fetchMethod),
      revalidatePaths
    );
  };

  /**
   * Server Action wrapper for deleting resources
   */
  deleteAction = async (
    prevState: State,
    formData: FormData,
    schema: ZodSchema,
    revalidatePaths?: string | string[], // New parameter
    idName: string = "id"
  ): Promise<State> => {
    const id = Number(formData.get(idName));
    if (!id) {
      return {
        success: false,
        errors: { id: ["ID is required"] },
      };
    }

    return await this.handleAction(
      { [idName]: id } as { [key: string]: number },
      schema,
      () => this.delete(id.toString()),
      revalidatePaths
    );
  };
  /**
   * Helper to convert FormData to a plain object
   */
  private formDataToObject(formData: FormData): Record<string, string | File> {
    const data: Record<string, string | File> = {};
    formData.forEach((value, key) => {
      // Skip empty values
      if (value !== null && value !== undefined && value !== "") {
        data[key] = value;
      }
    });
    return data;
  }
  /**
   * Helper to convert a plain object to FormData
   */
  private toFormData(data: Record<string, string | File | number>): FormData {
    const formData = new FormData();
    for (const key in data) {
      const value = data[key];
      if (value instanceof File) {
        formData.append(key, value);
      } else if (value !== null && value !== undefined) {
        formData.append(key, String(value));
      }
    }
    return formData;
  }
}

/**
 * Create a typed API resource
 */
export function createApiResource<T, C = T, U = Partial<T>>(
  resourcePath: string,
  haveFiles: boolean = false
) {
  return new ApiResource<T, C, U>(resourcePath, haveFiles);
}
