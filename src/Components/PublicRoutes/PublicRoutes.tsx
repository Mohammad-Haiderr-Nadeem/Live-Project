import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const PublicRoute = ({ element, redirectTo, ...rest }: any) => {
  const isAuthenticated = !!Cookies.get("accessToken");

  if (!isAuthenticated) {
    return element;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default PublicRoute;
