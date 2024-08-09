import { lazy } from "react";
import { ReactComponent } from "../types/global.type";

//admin pages
export const AdminDashboard: ReactComponent = lazy(() => import("../pages/admin/AdminDashboard"));
export const Inventory: ReactComponent = lazy(() => import("../pages/admin/Inventory"));
export const Coupon = lazy(() => import("../pages/admin/Coupon"));
export const AddBook = lazy(() => import("../pages/admin/AddBook"))
export const OurUses: ReactComponent = lazy(() => import("../pages/admin/OurUsers"));
export const Transaction: ReactComponent = lazy(() => import("../pages/admin/Transaction"));
export const TransactionManagement: ReactComponent = lazy(() => import("../pages/admin/TransactionManagement"));
export const Stopwatch: ReactComponent = lazy(() => import("../pages/admin/Stopwatch"));
export const MainLayout: ReactComponent = lazy(() => import("../components/layouts/MainLayouts"));


// user pages
export const UserDashboard: ReactComponent = lazy(() => import("../pages/user/UserDashboard"));



// home pages
export const Home = lazy(() => import("../pages/home/Home"))
// export const Cart = lazy(() => import("../pages/home/Cart"))
export const Checkout = lazy(() => import("../pages/home/Checkout"))
export const Login = lazy(() => import("../pages/home/Login"))
export const Search = lazy(() => import("../pages/home/Search"))
export const Orders = lazy(() => import("../pages/home/Orders"))
export const Payment = lazy(() => import("../pages/home/payment/PaymentPage"))
