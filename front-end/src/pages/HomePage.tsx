import React, { useEffect, useState } from "react";
import { PageLayout } from "../layouts/PageLayout";
import { SearchBar } from "../components/SearchBar";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";
import { renderStars } from "../components/RenderStars";

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  //filtered products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  //State for search
  const [search, setSearch] = useState<string>("");

  //Filter by price
  const [price, setPrice] = useState(2500);
  const minPrice = 100;
  const maxPrice = 2500;

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
  // Update filters when search, price, or brands change
  useEffect(() => {
    console.log("Products", products);
    setFilteredProducts(
      products.filter((product) => {
        const matchesSearch = product.product_name
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchesPrice =
          parseFloat(product.product_price.replace("$", "")) <= price;

        const matchesBrand =
          selectedBrands.length === 0 ||
          selectedBrands.some((brand) =>
            product.product_name.toLowerCase().includes(brand.toLowerCase())
          );
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((category) =>
            product.category?.category_name
              .toLowerCase()
              .includes(category.toLowerCase())
          );

        return matchesSearch && matchesPrice && matchesBrand && matchesCategory;
      })
    );
    console.log("Categories", selectedCategories);
    console.log("Brands", selectedBrands);
    console.log("Filtered Products", filteredProducts);
  }, [search, price, selectedBrands, selectedCategories, products]);

  // Handle brand selection
  const handleBrandSelection = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  // Handle category selection
  const handleCategorySelection = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };
  return (
    <PageLayout>
      <div className="mx-36">
        <SearchBar handleSearch={(val: string) => setSearch(val)} />
        <div className="flex flex-row w-full h-full">
          <div className="w-1/6 p-4">
            <p className="text-xl font-bold font-mono">Filter</p>
            <div className="p-2">
              <div>
                <p className="text-xl font-bold font-mono">Category</p>
                {["Phone", "Laptop & Computer"].map((category) => (
                  <label key={category} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategorySelection(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
              <div>
                <p className="text-xl font-bold font-mono">Brand</p>
                {["Samsung", "Apple", "Moto", "Nokia"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandSelection(brand)}
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
              {/* Price Slider */}
              <div>
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
          <div className="grid grid-cols-4 gap-6 mt-6 w-5/6">
            {filteredProducts.map((product) => (
              <div
                onClick={() => navigate(`/product/${product.id}`)}
                key={product.id}
                className="flex flex-col w-80 h-96 bg-white shadow-md rounded-lg overflow-hidden 
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
                  <p className="flex items-center space-x-1 text-sm text-gray-600">
                    <span>Rating:</span>
                    <span className="flex">
                      {renderStars(product.product_rating)}
                    </span>
                    <span>({product.product_rating})</span>
                  </p>

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
