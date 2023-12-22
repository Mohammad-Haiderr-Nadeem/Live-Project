import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navbar/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("myId");
    navigate("/admin/login");
  };
  return (
    <React.Fragment>
      <AdminNavbar />
      <h1>Admin Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
    </React.Fragment>
  );
};
export default Dashboard;
