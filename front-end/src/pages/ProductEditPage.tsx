import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { PageLayout } from "../layouts/PageLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

function ProductEditPage() {
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState<Product>();
  const [updatedProduct, setUpdatedProduct] = useState<Product>();
  useEffect(() => {
    const productApiURL = `http://localhost:3000/products/${param.id}`;
    fetch(productApiURL)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [param.id]);
  console.log("Product", product);
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <PageLayout>
      <div className="mx-36">
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
        <div className="flex flex-row gap-5 w-full mt-10">
          <div className="w-1/4">
            <img
              className="w-80 h-80 object-contain"
              src={product?.product_image}
              alt={product?.product_name}
            />
          </div>
          <div className="flex flex-row justify-between w-2/4">
            <div>
              <textarea
                className="font-bold text-2xl w-full resize-none overflow-hidden break-words"
                value={product?.product_name}
                rows={Math.ceil((product?.product_name?.length || 1) / 50)} // Adjust rows dynamically
                onChange={(e) =>
                  setUpdatedProduct({
                    ...product,
                    product_name: e.target.value,
                  })
                }
              />

              <a
                href={product?.product_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Product
              </a>

              <p>{product?.product_description}</p>
              <p className="text-2xl font-bold font-mono">
                Price:{product?.product_price}
              </p>
            </div>
            <div className="flex flex-col w-1/4 ml-20">
              <div className="w-full">
                <button className="bg-green-400 rounded-md text-white font-bold text-xl p-2 font-mono">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProductEditPage;
