import { response } from "express";
import { connectDatabase, SM } from ".";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

const categoryNum = 5;
const userNum = 3;
const productNum = 20;

//require dotenv
require("dotenv").config();
const seed = async () => {
  await connectDatabase();

  //create users
  const users: User[] = [];

  for (let i = 0; i < userNum; i++) {
    const newUser = new User();
    newUser.user_name = `User ${i}`;
    newUser.user_description = `Description ${i}`;
    users.push(newUser);
  }
  await SM.userRepository.save(users);

  //Create a new array of categories such as phone, laptop
  const categories = [
    {
      id: 1,
      category_name: "Phone",
      category_description: "Phone description",
    },
    {
      id: 2,
      category_name: "Laptop",
      category_description: "Laptop description",
    },
  ];

  await SM.categoryRepository.save(categories);

  //fetch API from Rapid
  const axios = require("axios");

  const phoneOptions = {
    method: "GET",
    url: process.env.PHONE_API_URL,
    params: {
      from: "0",
      size: "20",
    },
    headers: {
      "X-RapidAPI-Key": "b8b6b16f15msh01058e9ab1e6dd6p194067jsn81aec1a7bee8",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(phoneOptions);
    console.log("Response", response.data);

    // Ensure response structure is correct
    if (!response.data || !response.data.data || !response.data.data.products) {
      throw new Error("Invalid API response structure");
    }

    const products: Product[] = [];

    for (let i = 0; i < response.data.data.products.length; i++) {
      console.log("Product", response.data.data.products[i]);

      const productData = response.data.data.products[i];

      const newProduct = new Product();
      newProduct.product_name = productData.product_title;
      newProduct.product_description = productData.product_delivery || ""; // Ensure it exists
      newProduct.product_price = productData.product_price;
      newProduct.product_image = productData.product_photo; // Correct key for image
      newProduct.product_link = productData.product_url;
      newProduct.product_unit = 100; // Default unit
      newProduct.categories = categories[0];

      products.push(newProduct);
    }

    await SM.productRepository.save(products);
  } catch (error) {
    console.error(error);
  }

  const computerOptions = {
    method: "GET",
    url: process.env.COMPUTER_API_URL,
    params: {
      from: "0",
      size: "20",
    },
    headers: {
      "X-RapidAPI-Key": "b8b6b16f15msh01058e9ab1e6dd6p194067jsn81aec1a7bee8",
      "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(computerOptions);
    console.log("Response", response.data);

    // Ensure response structure is correct
    if (!response.data || !response.data.data || !response.data.data.products) {
      throw new Error("Invalid API response structure");
    }

    const products: Product[] = [];

    for (let i = 0; i < response.data.data.products.length; i++) {
      console.log("Product", response.data.data.products[i]);

      const productData = response.data.data.products[i];

      const newProduct = new Product();
      newProduct.product_name = productData.product_title;
      newProduct.product_description = productData.product_delivery || ""; // Ensure it exists
      newProduct.product_price = productData.product_price;
      newProduct.product_image = productData.product_photo; // Correct key for image
      newProduct.product_link = productData.product_url;
      newProduct.product_unit = 100; // Default unit
      newProduct.categories = categories[1];

      products.push(newProduct);
    }

    await SM.productRepository.save(products);
  } catch (error) {
    console.error(error);
  }

  console.log("Database seeded!");
};

seed();
