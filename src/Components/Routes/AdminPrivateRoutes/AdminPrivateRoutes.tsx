import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminPrivateRoute = ({ element, redirectTo, ...rest }: any) => {
  const isAuthenticated = !!Cookies.get("adminAccessToken");

  if (isAuthenticated) {
    return element;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default AdminPrivateRoute;
