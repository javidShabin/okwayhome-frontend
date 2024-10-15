import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstants } from "../config/axiosInstants";
import toast from "react-hot-toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstants({
        method: "POST",
        url: "/user/login",
        data,
      });
      // Check for success status
      if (response.status === 200) {
        toast.success("User logged in");
        navigate("/user/profile");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[87vh] bg-gray-100">
      <img src="your-image-url-here" className="hidden sm:block" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login
        </h2>

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        {errors.name && (
          <span className="text-red-500 mb-4">Name is required</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-red-500 mb-4">Email is required</span>
        )}

        <input
          className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 mb-4">Password is required</span>
        )}

        <p className="text-gray-500">
          New user?{" "}
          <Link to={"/register"}>
            <span className="text-orange-400">Signup</span>
          </Link>
        </p>

        <input
          className="bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange-500 cursor-pointer w-[100px] transition duration-300 mt-2"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}
