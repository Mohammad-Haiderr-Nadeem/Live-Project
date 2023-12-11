import React, { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.styles.module.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import validator from "validator";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const getImage = useCallback(async () => {
    const userId = Cookies.get("myId");
    const res = await axios.get(`http://localhost:8000/getMyProfile/${userId}`);
    setImage(res.data.image);
  }, []);

  useEffect(() => {
    getImage();
  }, [getImage]);

  const handleImageClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = () => {
    setShowLogout(false);
    Cookies.remove("accessToken");
    Cookies.remove("myId");
    navigate("/login");
  };

  const handleMyProfileClick = () => {
    navigate(`/myprofile/${Cookies.get("myId")}`);
  };

  const handleAllProfilesClick = () => {
    navigate("/allprofiles");
  };

  return (
    <React.Fragment>
      <nav className={styles.navbar}>
        <div className={styles.logoContainer}>
          <img
            src={
              validator.isURL(image)
                ? image
                : image
                ? require(`../../assets/images/${image}`)
                : "image"
            }
            alt="User Avatar"
            className={styles.avatar}
            onClick={handleImageClick}
          />
          {showLogout && (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          )}
          <button className={styles.navBtn} onClick={handleMyProfileClick}>
            My Profile
          </button>
          <button className={styles.navBtn} onClick={handleAllProfilesClick}>
            All Profiles
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
