import { createBrowserRouter } from "react-router-dom";
import { App } from "../App.tsx";
import { Suspense } from "react";
import {
  AdminDashboard,
  Inventory,
  Checkout,
  Login,
  Search,
  Orders,
  Coupon,
  AddBook,
  OurUses,
  Stopwatch,
  Payment,
} from "./index.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { Loader } from "../components/dashboard/dashboardShared/Loader.tsx";
import View from "../pages/home/View.tsx";
import ProductManage from "../pages/admin/ProductManage.tsx";
import Home from "../pages/home/Home.tsx";
import MainLayouts from "../components/layouts/MainLayouts.tsx";
import Transaction from "../pages/admin/Transaction.tsx";
import TransactionManagement from "../pages/admin/TransactionManagement.tsx";
import NotFoundPage from "../pages/not_found_page/NotFoundPage.tsx";
import Register from "../pages/home/Register.tsx";
import Cart from "../pages/home/Cart.tsx";

export const routes = createBrowserRouter([
  // home page routes
  {
    path: "/",
    element: <MainLayouts />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-cart",
        element: (
          <ProtectedRoute role={["user", "admin"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/search",
        element: (
          <Suspense fallback={<Loader />}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "/orders",
        element: (
          <Suspense fallback={<Loader />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Suspense fallback={<Loader />}>
            <ProtectedRoute role={["user", "admin"]}>
              <Checkout />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "/view/:id",
        element: <View />,
      },

      {
        path: "/login",
        element: (
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/payment",
        element: (
          <Suspense fallback={<Loader />}>
            <Payment />
          </Suspense>
        ),
      },
    ],
  },

  // admin dashboard routes

  {
    path: "/admin",
    element: (
      <ProtectedRoute role={["admin", "user"]}>
        <App />
      </ProtectedRoute>
    ),

    children: [
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "inventory",
        element: (
          <Suspense fallback={<Loader />}>
            <Inventory />
          </Suspense>
        ),
      },
      {
        path: "product-manage/:id",
        element: <ProductManage />,
      },
      {
        path: "coupon",
        element: (
          <Suspense fallback={<Loader />}>
            <Coupon />
          </Suspense>
        ),
      },
      {
        path: "stopwatch",
        element: (
          <Suspense fallback={<Loader />}>
            <Stopwatch />
          </Suspense>
        ),
      },
      {
        path: "addBook",
        element: (
          <Suspense fallback={<Loader />}>
            <AddBook />
          </Suspense>
        ),
      },
      {
        path: "our-users",
        element: (
          <Suspense fallback={<Loader />}>
            <OurUses />
          </Suspense>
        ),
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
      {
        path: "transaction-management/:id",
        element: <TransactionManagement />,
      },
    ],
  },


]);
