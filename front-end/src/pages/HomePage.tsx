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

  //Filter by price
  const [price, setPrice] = useState(0);
  const minPrice = 0;
  const maxPrice = 5000;

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
        products.filter(
          (product) =>
            product.product_name.toLowerCase().includes(search.toLowerCase()) &&
            product.product_price <= "$" + price.toString()
        )
      );
    }
  }, [search, price, products]);

  return (
    <PageLayout>
      <div className="mx-36">
        <SearchBar handleSearch={(val: string) => setSearch(val)} />
        <div className="flex flex-row w-full h-full">
          <div className="w-1/5 p-4">
            <p className="text-xl font-bold font-mono">Filter</p>
            <div className="p-2">
              <div>
                <p className="text-xl font-bold font-mono">Brand</p>
              </div>
              {/* Price Slider */}
              <div className="p-2">
                <p className="text-xl font-bold font-mono">Price</p>
                <div className="flex flex-col">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full cursor-pointer accent-blue-500"
                  />
                  {/* Min - Max Labels */}
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>${minPrice}</span>
                    <span className="font-bold">
                      ${minPrice} - ${price}
                    </span>
                    <span>${maxPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-6 mt-6 w-4/5">
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
      </div>
    </PageLayout>
  );
}

export default HomePage;
