import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import http from "http";
import { DataSource, EntityManager, Repository } from "typeorm";
import { AppDataSource } from "./data-source";
/* import { CategoryController } from "./controller/category.controller";
import { IngredientController } from "./controller/ingredient.controller";
import { RecipeController } from "./controller/recipe.controller";
import { RecipeIngredientController } from "./controller/recipeIngredient.controller"; */
import { Product } from "./entities/Product";
import { User } from "./entities/User";
import { ProductController } from "./controller/product.controller";
import { UserController } from "./controller/user.controller";

export const SM = {} as {
  server: http.Server;
  orm: DataSource;
  em: EntityManager;
  // Add other repositories here
  userRepository: Repository<User>;
  productRepository: Repository<Product>;
};

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
export const connectDatabase = async () => {
  SM.orm = await AppDataSource.initialize();
  SM.em = SM.orm.createEntityManager();
  SM.userRepository = SM.em.getRepository(User);
  SM.productRepository = SM.em.getRepository(Product);
};

const initializeServer = async () => {
  await connectDatabase();
  // here you can start to work with your database
  const port = 3000;

  const app: Express = express();

  // Enable CORS for your API
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Add DELETE method
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

  app.use(express.json());

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });
  app.use("/products", ProductController);
  app.use("/users", UserController);
};

initializeServer();
