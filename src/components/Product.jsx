import React, { useEffect, useState } from "react";
import { axiosInstants } from "../config/axiosInstants";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/product/list",
      });

      // Check if response.data is an array and update the state accordingly
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Expected an array of products, but got:", response.data);
        setProducts([]); // Handle non-array response by setting products to an empty array
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg bg-gradient-to-r from-yellow-500 to-orange-600"></span>
      </div>
    ); // Optionally show a loading indicator
  }

  return (
    <main className="px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">
        Our Modern Collection
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="w-full sm:w-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="w-full h-64 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-lg font-medium text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <button
                  onClick={() => {
                    navigate(`/product-details/${product._id}`);
                  }}
                  className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </main>
  );
};

export default Product;
