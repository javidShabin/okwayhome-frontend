import { useForm } from "react-hook-form";
import { axiosInstants } from "../config/axiosInstants";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/user/register",
        data
      })
      console.log(response)
      navigate('/')
      toast.success("Registered")
    } catch (error) {
      
    }
  };
  
  return (
    <div className="flex justify-center items-center h-[87vh] bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Sign Up
        </h2>

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="text-red-500 mb-4">{errors.name.message}</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 mb-4">{errors.email.message}</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 mb-4">{errors.password.message}</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Confirm Password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 mb-4">
            {errors.confirmPassword.message}
          </span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          placeholder="Phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: { value: /^[0-9]+$/, message: "Invalid phone number" },
          })}
        />
        {errors.phone && (
          <span className="text-red-500 mb-4">{errors.phone.message}</span>
        )}

        <p className="text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span className="text-orange-400">Login</span>
          </Link>
        </p>

        <input
          className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 cursor-pointer w-[100px] transition duration-300 mt-2"
          type="submit"
          value="Sign Up"
        />
      </form>
    </div>
  );
}
