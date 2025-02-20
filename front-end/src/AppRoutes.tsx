import React from "react";
import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";

type RouteConfig = RouteProps & {
  isPrivate?: boolean;
};

export const routes: RouteConfig[] = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
];

export interface AuthRequiredProps {
  children: React.ReactNode;
  to?: string;
}

const renderRouteMap = ({ isPrivate, element, ...restRoute }: RouteConfig) => {
  const routeElement = element;
  return <Route key={restRoute.path} element={routeElement} {...restRoute} />;
};

export const AppRoutes = () => {
  return <Routes>{routes.map((route) => renderRouteMap(route))}</Routes>;
};
