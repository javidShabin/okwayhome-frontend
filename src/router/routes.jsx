import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Home from "../pages/Home";
import AuthUser from "./protectedRoutes/AuthUser";
import SignupPage from "../pages/Signup";
import LoginPage from "../pages/Login";
import About from "../pages/About";

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
        path: "user",
        element: <AuthUser/>
      }
    ]
  },
]);
