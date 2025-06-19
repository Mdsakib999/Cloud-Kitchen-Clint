import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Pages/Home/Home";
import SignIn from "./Pages/Authentication/SignIn";
import SignUp from "./Pages/Authentication/SignUp";
import Contact from "./Pages/Contact/Contact";
import About from "./Pages/About/About";
import VerifyEmail from "./Pages/Authentication/VerifyEmail";
import ShowEmailVerification from "./Pages/Authentication/ShowEmailVerification";
import { AllFoodItem } from "./Pages/AllFoodItem/AllFoodItem";
import { FoodDetails } from "./Pages/FoodDetails/FoodDetails";
import { OrderNow } from "./Pages/OrderNow/OrderNow";
import { CheckoutForm } from "./Pages/Checkout/CheckoutForm";
import { UpdateProfile } from "./Components/UserDashBoardPageComponents/UpdateProfile";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { OrderHistory } from "./Components/UserDashBoardPageComponents/OrderHistory";
import TrackOrder from "./Components/SharedComponent/TrackOrder/TrackOrder";
import { DashStatics } from "./Components/AdminDashBoardPageComponent/StaticsPage/DashStatics";
import { AllCustomer } from "./Components/AdminDashBoardPageComponent/CustomerPage.jsx/AllCustomer";
import { CustomerDetails } from "./Components/AdminDashBoardPageComponent/CustomerPage.jsx/CustomerDetails";

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
      {
        path: "/order-track",
        element: <TrackOrder />,
      },
      {
        path: "/checkout",
        element: <CheckoutForm />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/verification-email",
        element: <ShowEmailVerification />,
      },
    ],
  },
  // User Dashboard
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <UpdateProfile />,
      },
      {
        path: "order",
        element: <OrderHistory />,
      },
    ],
  },
  // Admin Dashboard
  {
    path: "admin/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <DashStatics />,
      },
      {
        path: "profile",
        element: <UpdateProfile />,
      },
      {
        path: "customers",
        element: <AllCustomer />,
      },
      {
        path: "customer-deatils/:id",
        element: <CustomerDetails />,
      },
    ],
  },
]);
