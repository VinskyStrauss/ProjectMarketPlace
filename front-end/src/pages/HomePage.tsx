import React, { useEffect, useState } from "react";
import { PageLayout } from "../layouts/PageLayout";
import { SearchBar } from "../components/SearchBar";
import { Product } from "../interfaces/Product";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  //filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  //State for search
  const [search, setSearch] = useState<string>("");

  //Take all of the products from the API
  useEffect(() => {
    const productApiURL = "http://localhost:3000/products/";
    fetch(productApiURL)
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);
      });
  }, []);

  //Filter products based on search
  useEffect(() => {
    if (search.toLowerCase() === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.product_name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  return (
    <PageLayout>
      <div className="mx-36">
        <SearchBar handleSearch={(val: string) => setSearch(val)} />
        <div className="grid grid-cols-4 gap-6 mt-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col w-80 h-80 bg-white shadow-md rounded-lg overflow-hidden 
                   transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              {/* Image container */}
              <div className="w-full h-1/3 flex items-center justify-center bg-gray-100">
                <img
                  className="w-full h-full object-contain p-3"
                  src={product.product_image}
                  alt={product.product_name}
                />
              </div>

              {/* Product details */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-gray-800">
                  {product.product_name}
                </h2>
                <p className="text-sm text-gray-600 truncate">
                  {product.product_description}
                </p>
                <p className="text-md font-bold text-gray-900">
                  Price: {product.product_price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default HomePage;
