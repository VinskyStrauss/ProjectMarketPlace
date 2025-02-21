import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Product } from "../interfaces/Product";
import { PageLayout } from "../layouts/PageLayout";
import { IoMdArrowRoundBack } from "react-icons/io";

function ProductPage() {
  const navigate = useNavigate();
  const param = useParams();
  const [product, setProduct] = useState<Product>();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const productApiURL = `http://localhost:3000/products/${param.id}`;
    fetch(productApiURL)
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      });
  }, [param.id]);
  console.log("Product", product);
  return (
    <PageLayout>
      <div className="mx-36">
        <button
          className="bg-red-500 text-white p-2 rounded-md"
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoMdArrowRoundBack />
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
              <h1 className="font-bold text-2xl">{product?.product_name}</h1>
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

export default ProductPage;
