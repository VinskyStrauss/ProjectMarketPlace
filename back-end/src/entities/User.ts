import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Product } from "./Product";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_name: string;

  @Column("text")
  user_description: string;

  // One user can have multiple products
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
