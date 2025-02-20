import { Category } from "./Category";
import { User } from "./User";

export interface Product {
  id: number | null;
  product_name: string;
  product_unit: number;
  product_description: string;
  prodduct_link: string;
  product_price: string;
  product_image: string;
  user?: User;
  categories?: Category[];
}
