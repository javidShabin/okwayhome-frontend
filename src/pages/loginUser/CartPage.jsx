import React, { useEffect, useState } from "react";
import { axiosInstants } from "../../config/axiosInstants";
import { Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { decrement } from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch();
  const [isAddress, setIsAddress] = useState(false);
  const deliveryCharge = 50;

  const getDataFromCart = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/cart/getcart",
      });
      setCartItems(response.data.items);
      setTotalPrice(response.data.totalPrice);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const updateCartItemQuantity = async (product, newQuantity) => {
    try {
      if (newQuantity < 1) return;
      await axiosInstants({
        method: "PUT",
        url: "/cart/update",
        data: {
          items: [{ product, quantity: newQuantity }],
        },
      });

      getDataFromCart(); // Refetch cart data after update
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const removeCartItem = async (product) => {
    try {
      const response = await axiosInstants({
        method: "DELETE",
        url: `/cart/remove`,
        data: { product },
      });
      getDataFromCart(); // Refetch cart data after removal
      dispatch(decrement());
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  // Check have any user address
  const getAddress = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/address/address",
      });
      console.log(response, "===address");
      setIsAddress(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    getDataFromCart();
    getAddress();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-8">
          Your Shopping Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-lg text-gray-600 text-center">
            Your cart is empty.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-200 text-gray-700 uppercase text-xs md:text-sm leading-normal">
                  <th className="py-2 md:py-3 px-4 md:px-6 text-left">
                    Product
                  </th>
                  <th className="py-2 md:py-3 px-4 md:px-6 text-left">
                    Quantity
                  </th>
                  <th className="py-2 md:py-3 px-4 md:px-6 text-left">Price</th>
                  <th className="py-2 md:py-3 px-4 md:px-6 text-left">Total</th>
                  <th className="py-2 md:py-3 px-4 md:px-6 text-left"></th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-xs md:text-sm font-light">
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-4 px-6 flex items-center">
                      <img
                        src={item.image}
                        alt={item.ItemName}
                        className="w-12 h-12 md:w-16 md:h-16 object-cover mr-4 rounded-md"
                      />
                      <span className="font-medium">{item.ItemName}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          className="bg-gray-200 px-2 md:px-3 py-1 text-sm md:text-lg font-bold text-gray-700 hover:bg-gray-300"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product,
                              item.quantity - 1
                            )
                          }
                        >
                          -
                        </button>
                        <span className="px-2 md:px-4 text-sm md:text-lg font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          className="bg-gray-200 px-2 md:px-3 py-1 text-sm md:text-lg font-bold text-gray-700 hover:bg-gray-300"
                          onClick={() =>
                            updateCartItemQuantity(
                              item.product,
                              item.quantity + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-6">₹{item.price}</td>
                    <td className="py-4 px-6">₹{item.price * item.quantity}</td>
                    <td className="py-4 px-6 text-right">
                      <Trash2
                        onClick={() => {
                          removeCartItem(item.product);
                        }}
                        className="text-red-500"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center md:items-start">
          <div className="shadow-xl w-full md:max-w-sm py-6 md:py-12 px-4 md:px-6 leading-8 bg-white rounded-lg">
            <h2 className="text-md md:text-lg text-gray-700">
              Total Price: ₹{totalPrice}
            </h2>
            <hr className="mt-4 md:mt-5" />
            <h2 className="text-md md:text-lg text-gray-700 mt-4 md:mt-5">
              Delivery charge: ₹{deliveryCharge}
            </h2>
            <hr className="mt-4 md:mt-5" />
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
              Grand Total: ₹{totalPrice > 0 ? totalPrice + deliveryCharge : 0}
            </h2>
            <h3 className="text-xl font-bold text-red-500">Pay Advance: ₹{Math.floor(totalPrice * 0.25)}</h3>

            {isAddress ? (
              <button className="py-2 px-4 md:px-6 mt-4 md:mt-5 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300">
                Check out
              </button>
            ) : (
              <div>
                <Link to={"/user/address"}>
                  <button className="py-2 px-4 md:px-6 mt-4 md:mt-5 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition duration-300">
                    Address
                  </button>
                </Link>
                <span className="ml-5 text-red-400">
                  Need a address for check out
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
