import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  observation: string;
}

export interface CartState {
  items: CartItem[];
}
