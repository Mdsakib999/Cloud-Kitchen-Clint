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
import { PriceList } from "./Pages/PriceList/PriceList";
import { UpdateProfile } from "./Components/UserDashBoardPageComponents/UpdateProfile";
import { Dashboard } from "./Pages/Dashboard/Dashboard";
import { OrderHistory } from "./Components/UserDashBoardPageComponents/OrderHistory";
import TrackOrder from "./Pages/TrackOrder/TrackOrder";
import { DashStatics } from "./Components/AdminDashBoardPageComponent/StaticsPage/DashStatics";
import { AllCustomer } from "./Components/AdminDashBoardPageComponent/CustomerPage.jsx/AllCustomer";
import { OrderDetails } from "./Components/AdminDashBoardPageComponent/OrderPage/OrderDetails";
import { ManageOrders } from "./Components/AdminDashBoardPageComponent/OrderPage/ManageOrders";
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
import { BlogDetailPage } from "./Pages/Blogs/BlogDetailPage";
import ManageCoupon from "./Components/AdminDashBoardPageComponent/CouponPage/ManageCoupon";
import AddOffer from "./Components/AdminDashBoardPageComponent/Offer/AddOffer";
import AddFood from "./Components/AdminDashBoardPageComponent/AddFood/AddFood";
import ManageFood from "./Components/AdminDashBoardPageComponent/ManageFood/ManageFood";
import EditFoodForm from "./Components/AdminDashBoardPageComponent/ManageFood/EditFood";
import CheckoutForm from "./Pages/Checkout/CheckoutForm";
import { CreateBlog } from "./Components/AdminDashBoardPageComponent/Blogs/CreateBlog";
import { ManageBlog } from "./Components/AdminDashBoardPageComponent/Blogs/ManageBlog";
import PublicRoute from "./router/PublicRoute";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./Pages/TermsAndConditions/TermsAndConditions";
import Refund from "./Pages/Refund/Refund";
import OrderSuccess from "./Pages/Checkout/OrderSuccess";
import Faq from "./Pages/Faq/Faq";
import Projects from "./Pages/projects/Projects";

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
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/blog-details/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
      },
      {
        path: "/priceList",
        element: <PriceList />,
      },
      {
        path: "/order-track/:id",
        element: <TrackOrder />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckoutForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
      {
        path: "/signup",
        element: (
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        ),
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsAndConditions />,
      },
      {
        path: "/refund",
        element: <Refund />,
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
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
        element: <ManageOrders />,
      },
      {
        path: "orders/order-details/:id",
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
        path: "manage-food/edit-food/:id",
        element: <EditFoodForm />,
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
      {
        path: "create-blogs",
        element: <CreateBlog />,
      },
      {
        path: "manage-blogs",
        element: <ManageBlog />,
      },
    ],
  },
]);
