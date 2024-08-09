import { ReactNode } from "react";
import { useAppSelector } from "../redux/store/hooks";
import { Navigate, useLocation } from "react-router-dom";

type TProp = {
  children: ReactNode;
  role: string[];
};

export const ProtectedRoute = ({ role, children }: TProp) => {
  const { user } = useAppSelector((state) => state.auth);
  const { cartItem } = useAppSelector((state) => state.cart);

  const location = useLocation();
  const path = location.pathname;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user && !role.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  if (path === "/checkout") {
    if (cartItem.length === 0) return <Navigate to="/product-cart" />;
  }

  return children;
};
