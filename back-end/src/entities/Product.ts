import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_unit: string;

  @Column("text")
  product_description: string;

  @Column("text")
  product_link: string;

  @Column("double")
  product_price: number;

  // Many products can belong to one user
  @ManyToOne(() => User, (user) => user.products)
  user: User;

  // Many Products can belong to One Category
  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  category: Category;
}
