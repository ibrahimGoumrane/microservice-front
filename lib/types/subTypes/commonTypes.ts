// Pagination metadata interface
export interface PaginationMeta {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

// Generic response wrapper with pagination
export interface ApiResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T;
  metadata?: {
    pagination?: PaginationMeta;
  };
}

// Paginated list response type
export interface PaginatedResponse<T> {
  success: boolean;
  code: number;
  message?: string;
  data: T[];
  metadata?: {
    pagination?: PaginationMeta;
  };
}
