import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import AuthUser from "./protectedRoutes/AuthUser";

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
        path: "register",
        element: <Signup/>
      },
      {
        path: "login",
        element: <Login/>
      },

      {
        path: "user",
        element: <AuthUser/>
      }
    ]
  },
]);
