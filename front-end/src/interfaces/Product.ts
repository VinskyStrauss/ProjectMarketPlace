import { Category } from "./Category";
import { User } from "./User";

export interface Product {
  id: number | null;
  product_name: string;
  product_description: string;
  price: number;
  product_image: string;
  user: User;
  categories: Category[];
}
