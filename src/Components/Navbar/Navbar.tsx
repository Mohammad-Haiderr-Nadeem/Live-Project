import React, { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.styles.module.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import validator from "validator";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation([
    "AllProfiles",
    "FriendsProfile",
    "MyProfile",
    "Home",
  ]);

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
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    navigate("/login");
  };

  const handleMyProfileClick = () => {
    navigate(`/myprofile/${Cookies.get("myId")}`);
  };

  const handleAllProfilesClick = () => {
    navigate("/allprofiles");
  };

  const handleMyFriendsClick = () => {
    navigate("/myfriends");
  };

  const handleBlogsClick = () => {
    navigate("/blogs");
  };

  const handleLanguageChange = (selectedLanguage: string) => {
    if (selectedLanguage === "en") {
      i18n.changeLanguage("en");
    } else if (selectedLanguage === "es") {
      i18n.changeLanguage("es");
    }
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
          <ul className={styles.navList}>
            <li className={styles.navItem} onClick={handleMyProfileClick}>
              {t("myprofile")}
            </li>
            <li className={styles.navItem} onClick={handleAllProfilesClick}>
              {t("allprofile")}
            </li>
            <li className={styles.navItem} onClick={handleMyFriendsClick}>
              {t("myfriends")}
            </li>
            <li className={styles.navItem} onClick={handleBlogsClick}>
              {t("Home:home")}
            </li>
          </ul>
          <select
            name="language"
            id="language"
            className={styles.myDropdown}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
