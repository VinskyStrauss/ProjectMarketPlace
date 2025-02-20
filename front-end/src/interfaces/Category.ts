import { Product } from "./Product";

export interface Category {
  id: number;
  category_name: string;
  category_description: string;
  products: Product[];
}
