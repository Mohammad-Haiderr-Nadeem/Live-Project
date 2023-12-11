import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import MyProfile from "./Components/MyProfile/MyProfile";
import AllProfiles from "./Components/AllProfiles/AllProfiles";
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoutes";
import PublicRoute from "./Components/PublicRoutes/PublicRoutes";

function App() {
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
        <Route path="/*" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<PrivateRoute element={<Navbar />} redirectTo="/login" />}
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
      </Routes>
    </React.Fragment>
  );
}

export default App;
