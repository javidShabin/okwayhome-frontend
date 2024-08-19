import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { axiosInstants } from "../config/axiosInstants";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, saveUser } from "../redux/features/userSlice";
import UserHeader from "../components/loginUser/Header";

const Userlayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { isUserExist } = useSelector((state) => state.user);

  const checkUser = async () => {
    try {
      await axiosInstants({
        method: "GET",
        url: "/user/check-user",
      });
      dispatch(saveUser());
    } catch (error) {
      dispatch(clearUser());
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg bg-gradient-to-r from-yellow-500 to-orange-600 "></span>
      </div>
    ); // Optionally show a loading indicator
  }
  return (
    <div>
      {isUserExist ? <UserHeader /> : <Header />}
      <Outlet />
      <footer>footer</footer>
    </div>
  );
};

export default Userlayout;
