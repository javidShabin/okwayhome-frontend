import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstants } from "../config/axiosInstants";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProductDetails = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: `/product/product/${id}`,
      });
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch product details");
      setLoading(false);
    }
  };

  const fetchFilteredProduct = async (category) => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/product/filter",
        params: { category },
      });
      setFilteredProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch related products");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getProductDetails();
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (product && product.category) {
      fetchFilteredProduct(product.category);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg bg-gradient-to-r from-yellow-500 to-orange-600 "></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        {product.name}
      </h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
          />
        </div>
        <div className="md:w-1/2 md:pl-8 flex flex-col justify-between">
          <div>
            <p className="text-2xl font-bold text-orange-600 mb-4">
              Price: <span className="text-gray-800">{product.price}</span>
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
          </div>
          <button className="bg-orange-600 text-white py-3 px-6 rounded-lg shadow hover:bg-orange-700 transition duration-200 flex items-center justify-center">
            <span className="mr-2">🛒</span>
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Related Products
        </h2>
        {/* Add related products here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProduct.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-bl-lg">
                  ${item.price}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-2">
                  {item.description.substring(0, 60)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <button className="bg-orange-600 text-white py-2 px-4 rounded-lg shadow hover:bg-orange-700 transition duration-200">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
