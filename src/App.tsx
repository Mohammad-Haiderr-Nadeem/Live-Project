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
          {/* <Route path="/*" element={<Navigate to="/home" />} /> */}
          <Route
            path="/home"
            element={<PrivateRoute element={<Navbar />} redirectTo="/login" />}
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
            path="/admin/signup"
            element={
              <PublicRoute
                element={<AdminSignup />}
                redirectTo="/admin/dashboard"
              />
            }
          />
          <Route
            path="/admin/login"
            element={
              <PublicRoute
                element={<AdminLogin />}
                redirectTo="/admin/dashboard"
              />
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute element={<Dashboard />} redirectTo="/admin/login" />
            }
          />
          <Route
            path="/admin/addadmin"
            element={
              <PrivateRoute element={<AddAdmin />} redirectTo="/admin/login" />
            }
          />
          <Route
            path="/admin/adduser"
            element={
              <PrivateRoute element={<AddUser />} redirectTo="/admin/login" />
            }
          />
          <Route
            path="/admin/adminprofile/:id"
            element={
              <PrivateRoute
                element={<AdminProfile />}
                redirectTo="/admin/login"
              />
            }
          />
          <Route
            path="/admin/allusers"
            element={
              <PrivateRoute
                element={<AllUsers />}
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
