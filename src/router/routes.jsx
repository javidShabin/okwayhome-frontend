import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Home from "../pages/Home";
import AuthUser from "./protectedRoutes/AuthUser";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import About from "../pages/About";
import Product from "../components/Product";
import ProductDetails from "../pages/ProductDetails";
import CartPage from "../pages/loginUser/CartPage";
import ProfilePage from "../pages/loginUser/ProfilePage";
import ChatPage from "../pages/loginUser/ChatPage";
import Address from "../pages/loginUser/Address";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout />,

    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "register",
        element: <SignupPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },

      {
        path: "user",
        element: <AuthUser />,

        children: [
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "cart",
            element: <CartPage />,
          },
          {
            path: "chat",
            element: <ChatPage />,
          },
          {
            path: "address",
            element: <Address />,
          },
        ],
      },
    ],
  },
]);
