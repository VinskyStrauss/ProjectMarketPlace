import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_name: string;

  @Column("text", { nullable: true })
  category_description: string;

  // One Category can have multiple Products
  @OneToMany(() => Product, (product) => product.categories)
  products?: Product[];
}
