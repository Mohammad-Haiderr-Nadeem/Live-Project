import React from "react";
import { Suspense } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Auth/Login/Login";
import SignUp from "./Components/Auth/SignUp/SignUp";
import MyProfile from "./Components/Users/MyProfile/MyProfile";
import AllProfiles from "./Components/Users/AllProfiles/AllProfiles";
import PrivateRoute from "./Components/Routes/PrivateRoutes/PrivateRoutes";
import PublicRoute from "./Components/Routes/PublicRoutes/PublicRoutes";
import MyFriends from "./Components/Users/MyFriends/MyFriends";
import AdminSignup from "./Components/Admin/Auth/SignUp/SignUp";
import AdminLogin from "./Components/Admin/Auth/Login/Login";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import AddAdmin from "./Components/Admin/AddAdmin/AddAdmin";
import AddUser from "./Components/Admin/AddUser/AddUser";
import AdminProfile from "./Components/Admin/MyProfile/MyProfile";
import AllUsers from "./Components/Admin/AllUsers/AllUsers";
import AllAdmins from "./Components/Admin/AllAdmins/AllAdmins";
import Blogs from "./Components/Blogs/Blogs";
import AdminBlogs from "./Components/Admin/Blogs/Blogs";
import AdminPublicRoute from "./Components/Routes/AdminPublicRoutes/AdminPublicRoutes";
import AdminPrivateRoute from "./Components/Routes/AdminPrivateRoutes/AdminPrivateRoutes";
import UserBlog from "./Components/Blogs/UserBlog/UserBlog";

function App() {
  return (
    <Suspense fallback={"Loading...."}>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={<PublicRoute element={<Login />} redirectTo="/home" />}
          />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} redirectTo="/home" />}
          />
          <Route
            path="/home"
            element={<PrivateRoute element={<Navbar />} redirectTo="/login" />}
          />
          <Route
            path="/blogs"
            element={<PrivateRoute element={<Blogs />} redirectTo="/login" />}
          />
          <Route
            path="/myprofile/:id"
            element={
              <PrivateRoute element={<MyProfile />} redirectTo="/login" />
            }
          />
          <Route
            path="/allprofiles"
            element={
              <PrivateRoute element={<AllProfiles />} redirectTo="/login" />
            }
          />
          <Route
            path="/myfriends"
            element={
              <PrivateRoute element={<MyFriends />} redirectTo="/login" />
            }
          />
          <Route
            path="/myblogs/:id"
            element={
              <PrivateRoute element={<UserBlog />} redirectTo="/login" />
            }
          />
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
    </Suspense>
  );
}

export default App;
