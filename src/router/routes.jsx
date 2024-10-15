import { createBrowserRouter } from "react-router-dom";
import Userlayout from "../layout/Userlayout";
import Home from "../pages/Home";

import About from "../pages/About";


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
    
    ],
  },
]);
