// Product Entity Types

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  mainImage: string;
  secondaryImages?: string[];
  stockQuantity: number;
  active: boolean;
  rating?: number;
}

// DTOs for Product operations
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category: string;
  stockQuantity: number;
  active?: boolean;
  rating?: number;
  mainImage: File;
  secondaryImages?: File[];
}

export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  stockQuantity?: number;
  active?: boolean;
  rating?: number;
  mainImage?: File;
  secondaryImages?: File[];
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  mainImage: string;
  secondaryImages?: string[];
  stockQuantity: number;
  active: boolean;
  rating?: number;
}
