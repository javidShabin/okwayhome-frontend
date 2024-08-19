import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AuthUser = () => {
  const { isUserExist } = useSelector((state) => state.user);
  console.log(isUserExist);
  const navigate = useNavigate();

  if (!isUserExist) {
    navigate("/");
  }
  return isUserExist ? <Outlet /> : null;
};

export default AuthUser;
