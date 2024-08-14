import { useForm } from "react-hook-form";
import { axiosInstants } from "../../config/axiosInstants";

export default function Address() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/address/address",
        data,
      });
      console.log(response, "==address");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[87vh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-10 h-[70vh] bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Enter Your Address
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="District"
            {...register("district", { required: "District is required" })}
            className={`w-full py-3 px-5 border ${
              errors.district ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="text"
            placeholder="Street"
            {...register("street", { required: "Street is required" })}
            className={`w-full py-3 px-5 border ${
              errors.street ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-4">
          <input
            type="text"
            placeholder="Landmark"
            {...register("landmark", { required: "Landmark is required" })}
            className={`w-full py-3 px-5 border ${
              errors.landmark ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="text"
            placeholder="Zip Code"
            {...register("postalCode", { required: "Zip Code is required" })}
            className={`w-full py-3 px-5 border ${
              errors.postalCode ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          <input
            type="tel"
            placeholder="Phone"
            {...register("phone", { required: "Phone number is required" })}
            className={`w-full py-3 px-5 border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className={`w-full py-3 px-5 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-400 transition duration-150`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
