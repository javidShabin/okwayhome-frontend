import React, { useEffect, useState } from "react";
import { axiosInstants } from "../config/axiosInstants";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await axiosInstants.get("/product/list");
      setProducts(response.data); // Assuming the response contains product data in 'data'
    } catch (error) {
      setError("Failed to fetch products. Please try again later.");
      console.error(error);
    } finally {
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
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
    <h1 className="text-red-500">Product</h1>
    </>
  );
};

export default Product;
{/* <main className="px-4 py-8 bg-white min-h-screen">
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">
        Our Modern Collection
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {products.length > 0 ? (
          products.map(({ _id, image, name, price }) => (
            <div
              key={_id}
              className="w-full sm:w-64 bg-gray-100 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="w-full h-64 bg-white">
                <img
                  src={image}
                  alt={name} // Consider a more descriptive alt text if necessary
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <div className="p-4 flex flex-col items-center text-center">
                <h2 className="text-lg font-medium text-gray-800">{name}</h2>
                <p className="text-gray-600 mt-2">${price.toFixed(2)}</p>
                <button
                  onClick={() => navigate(`/product-details/${_id}`)}
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
    </main> */}