import { useForm } from "react-hook-form";
import { axiosInstants } from "../../config/axiosInstants";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Address() {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get user Id
  const getUserId = async () => {
    try {
      const response = await axiosInstants({
        method: "GET",
        url: "/user/profile",
      });
      setUserId(response.data._id);
    } catch (error) {
      console.error("Error fetching user ID:", error);
      toast.error("Failed to fetch user profile.");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    setLoading(true); // Set loading state to true
    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/address/address",
        data: { ...data, user: userId },
      });
      navigate("/user/cart");
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    getUserId();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg sm:max-w-xl p-6 bg-white rounded-lg shadow-lg flex flex-col space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Enter Your Address
        </h2>

        {/* Name and House Name */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className={`w-full p-3 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}

          <input
            type="text"
            placeholder="House Name"
            {...register("houseName", { required: "House Name is required" })}
            className={`w-full p-3 border ${
              errors.houseName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        {/* District and Street */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="District"
            {...register("district", { required: "District is required" })}
            className={`w-full p-3 border ${
              errors.district ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="text"
            placeholder="Street"
            {...register("street", { required: "Street is required" })}
            className={`w-full p-3 border ${
              errors.street ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        {/* Landmark and Zip Code */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Landmark"
            {...register("landmark", { required: "Landmark is required" })}
            className={`w-full p-3 border ${
              errors.landmark ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="text"
            placeholder="Zip Code"
            {...register("postalCode", { required: "Zip Code is required" })}
            className={`w-full p-3 border ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        {/* Phone and Email */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="tel"
            placeholder="Phone"
            {...register("phone", { required: "Phone number is required" })}
            className={`w-full p-3 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`w-full p-3 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 ${
            loading ? "bg-gray-500" : "bg-orange-500"
          } text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
