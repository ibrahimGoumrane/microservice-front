// Pagination metadata interface
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Generic response wrapper with pagination
export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  errors?: string[] | null;
  meta?: {
    pagination?: PaginationMeta;
  };
}

// Paginated list response type
export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  message?: string;
  errors?: string[] | null;
  meta: {
    pagination: PaginationMeta;
  };
}
