import React from "react";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "../Admin/AddAdmin/AddAdmin";
import AddUser from "../Admin/AddUser/AddUser";
import AllAdmins from "../Admin/AllAdmins/AllAdmins";
import AllUsers from "../Admin/AllUsers/AllUsers";
import AdminLogin from "../Admin/Auth/Login/Login";
import AdminSignup from "../Admin/Auth/SignUp/SignUp";
import AdminBlogs from "../Admin/Blogs/Blogs";
import Dashboard from "../Admin/Dashboard/Dashboard";
import AdminProfile from "../Admin/MyProfile/MyProfile";
import AdminPrivateRoute from "../Routes/AdminPrivateRoutes/AdminPrivateRoutes";
import AdminPublicRoute from "../Routes/AdminPublicRoutes/AdminPublicRoutes";

const AdminApiRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/admin/signup"
          element={
            <AdminPublicRoute
              element={<AdminSignup />}
              redirectTo="/admin/dashboard"
            />
          }
        />
        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute
              element={<AdminLogin />}
              redirectTo="/admin/dashboard"
            />
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminPrivateRoute
              element={<Dashboard />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/addadmin"
          element={
            <AdminPrivateRoute
              element={<AddAdmin />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/adduser"
          element={
            <AdminPrivateRoute
              element={<AddUser />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/adminprofile/:id"
          element={
            <AdminPrivateRoute
              element={<AdminProfile />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/allusers"
          element={
            <AdminPrivateRoute
              element={<AllUsers />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/alladmins"
          element={
            <AdminPrivateRoute
              element={<AllAdmins />}
              redirectTo="/admin/login"
            />
          }
        />
        <Route
          path="/admin/blogs"
          element={
            <AdminPrivateRoute
              element={<AdminBlogs />}
              redirectTo="/admin/login"
            />
          }
        />
      </Routes>
    </React.Fragment>
  );
};
export default AdminApiRoutes;
