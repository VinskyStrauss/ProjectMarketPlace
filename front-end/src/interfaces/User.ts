import { Product } from "./Product";

export interface User {
  id: number | null;
  user_name: string;
  user_description: string;
  products: Product[];
}
