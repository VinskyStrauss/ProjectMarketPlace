import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column("double")
  product_unit: number;

  @Column("text")
  product_description: string;

  @Column("text")
  product_link: string;

  @Column("text")
  product_price: string;

  @Column("text", { nullable: true })
  product_image: string;

  // Many products can belong to one user
  @ManyToOne(() => User, (user) => user.products)
  user?: User;

  // Many Products can belong to One Category
  @ManyToOne(() => Category, (category) => category.id)
  categories?: Category;
}
