// Cart Entity Types
import type { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  itemCount: number;
}

// DTOs for Cart operations
export interface AddToCartDTO {
  userId: number;
  productId: number;
  quantity: number;
}

export interface UpdateCartItemDTO {
  userId: number;
  productId: number;
  quantity: number;
}

export interface RemoveFromCartDTO {
  userId: number;
  productId: number;
}

export interface CartResponse {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  itemCount: number;
}
