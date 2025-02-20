import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

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

  // Many products can belong to one user
  @ManyToOne(() => User, (user) => user.products)
  user: User;
}
