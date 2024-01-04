import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../Auth/Login/Login";
import SignUp from "../Auth/SignUp/SignUp";
import Blogs from "../Blogs/Blogs";
import UserBlog from "../Blogs/UserBlog/UserBlog";
import Navbar from "../Navbar/Navbar";
import PrivateRoute from "../Routes/PrivateRoutes/PrivateRoutes";
import PublicRoute from "../Routes/PublicRoutes/PublicRoutes";
import AllProfiles from "../Users/AllProfiles/AllProfiles";
import MyFriends from "../Users/MyFriends/MyFriends";
import MyProfile from "../Users/MyProfile/MyProfile";
import Comments from "../Blogs/Comments/Comments";

const UserApiRoutes = () => {
  return (
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
          element={<PrivateRoute element={<MyProfile />} redirectTo="/login" />}
        />
        <Route
          path="/allprofiles"
          element={
            <PrivateRoute element={<AllProfiles />} redirectTo="/login" />
          }
        />
        <Route
          path="/myfriends"
          element={<PrivateRoute element={<MyFriends />} redirectTo="/login" />}
        />
        <Route
          path="/myblogs/:id"
          element={<PrivateRoute element={<UserBlog />} redirectTo="/login" />}
        />
        <Route
          path="/comments/:id"
          element={<PrivateRoute element={<Comments />} redirectTo="/login" />}
        />
      </Routes>
    </React.Fragment>
  );
};
export default UserApiRoutes;
