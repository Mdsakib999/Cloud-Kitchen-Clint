import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import { AllFoodItem } from "./Pages/AllFoodItem/AllFoodItem";
import { FoodDetails } from "./Pages/FoodDetails/FoodDetails";
import { OrderNow } from "./Pages/OrderNow/OrderNow";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/menu",
        element: <AllFoodItem />,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
      },
      {
        path: "/order",
        element: <OrderNow />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);
