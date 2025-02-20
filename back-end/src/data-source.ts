import { DataSource } from "typeorm";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

//require dotenv
require("dotenv").config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  entities: [Product, User],
  subscribers: [],
  migrations: [],
});
