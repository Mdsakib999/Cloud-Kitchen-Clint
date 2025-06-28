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
import { OrderDetails } from "./Components/AdminDashBoardPageComponent/OrderPage/OrderDetails";
import { OrderList } from "./Components/AdminDashBoardPageComponent/OrderPage/OrderList";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import ErrorPage from "./Pages/Error/ErrorPage";
import { ManageReviews } from "./Components/AdminDashBoardPageComponent/ManageReviews/ManageReviews";
import { AddCategory } from "./Components/AdminDashBoardPageComponent/ManageCategory/AddCategory";
import ResetPassword from "./Pages/Authentication/ResetPassword";
import ReRoute from "./Pages/Authentication/ReRoute";
import ShowPasswordResetSent from "./Pages/Authentication/ShowPasswordResetSent";
import { AllBlogs } from "./Pages/Blogs/AllBlogs";
import AddCoupon from "./Components/AdminDashBoardPageComponent/CouponPage/AddCoupon";
import { ManageCategory } from "./Components/AdminDashBoardPageComponent/ManageCategory/ManageCategory";
import { BlogDetails } from "./Pages/Blogs/BlogDetails";
import ManageCoupon from "./Components/AdminDashBoardPageComponent/CouponPage/ManageCoupon";
import AddOffer from "./Components/AdminDashBoardPageComponent/Offer/AddOffer";
import AddFood from "./Components/AdminDashBoardPageComponent/AddFood/AddFood";
import Faq from "./Components/Faq";
import ManageFood from "./Components/AdminDashBoardPageComponent/ManageFood/ManageFood";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <ErrorPage />,
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
        path: "/blogs",
        element: <AllBlogs />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetails />,
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
        path: "/manage-category",
        element: <ManageCategory />,
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
    ],
  },
  // Email verification & reset password
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/view-reset-password",
    element: <ShowPasswordResetSent />,
  },
  {
    path: "/handle-auth",
    element: <ReRoute />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
  {
    path: "/verification-email",
    element: <ShowEmailVerification />,
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
        path: "track-order/:id",
        element: <TrackOrder />,
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
        path: "orders",
        element: <OrderList />,
      },
      {
        path: "order-details/:id",
        element: <OrderDetails />,
      },
      {
        path: "manage-reviews",
        element: <ManageReviews />,
      },
      {
        path: "add-category",
        element: <AddCategory />,
      },
      {
        path: "add-offer",
        element: <AddOffer />,
      },
      {
        path: "add-food",
        element: <AddFood />,
      },
      {
        path: "manage-food",
        element: <ManageFood />,
      },
      {
        path: "add-coupon",
        element: <AddCoupon />,
      },
      {
        path: "manage-coupon",
        element: <ManageCoupon />,
      },
    ],
  },
]);
