import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Home from "../pages/Home";
import AuthUser from "./protectedRoutes/AuthUser";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import About from "../pages/About";
import Product from "../components/Product";
import ProductDetails from "../pages/ProductDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout/>,

    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "register",
        element: <SignupPage/>
      },
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "products",
        element: <Product/>
      },
      {
        path: "product-details/:id",
        element: <ProductDetails/>
      },

      {
        path: "user",
        element: <AuthUser/>
      }
    ]
  },
]);
