import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstants } from '../config/axiosInstants';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getProductDetails = async () => {
        try {
            const response = await axiosInstants.get(`/product/product/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch product details");
            setLoading(false);
        }
    };

    useEffect(() => {
        getProductDetails();
    }, [id]);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center py-10">{error}</div>;
    }

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6">{product.name}</h1>
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
                        <p className="text-gray-700 mb-6">
                            {product.description}
                        </p>
                    </div>
                    <button className="bg-orange-600 text-white py-3 px-6 rounded-lg shadow hover:bg-orange-700 transition duration-200 flex items-center justify-center">
                        <span className="mr-2">🛒</span>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Related Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Add related products here */}
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="text-lg font-semibold text-gray-800">Related Product Name</h3>
                        <p className="text-gray-600">Price: $XX.XX</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="text-lg font-semibold text-gray-800">Related Product Name</h3>
                        <p className="text-gray-600">Price: $XX.XX</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <img src="https://via.placeholder.com/150" alt="Related Product" className="w-full h-32 object-cover rounded-md mb-2" />
                        <h3 className="text-lg font-semibold text-gray-800">Related Product Name</h3>
                        <p className="text-gray-600">Price: $XX.XX</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
