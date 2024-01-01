import React, { useCallback, useEffect, useState } from "react";
import styles from "./Navbar.styles.module.css";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import axios from "axios";
import validator from "validator";
import { useTranslation } from "react-i18next";

const AdminNavbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { t, i18n } = useTranslation([
    "AddAdmin",
    "AddUser",
    "MyProfile",
    "AllUsers",
    "AllAdmins",
    "Blogs",
  ]);

  const getImage = useCallback(async () => {
    const userId = Cookies.get("myAdminId");
    const res = await axios.get(
      `http://localhost:8000/getAdminProfile/${userId}`
    );
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
    Cookies.remove("adminAccessToken");
    Cookies.remove("myAdminId");
    navigate("/admin/login");
  };

  const handleMyProfileClick = () => {
    navigate(`/admin/adminprofile/${Cookies.get("myAdminId")}`);
  };

  const handleAddUserClick = () => {
    navigate("/admin/adduser");
  };

  const handleAddAdminClick = () => {
    navigate("/admin/addadmin");
  };

  const handleAllUsersClick = () => {
    navigate("/admin/allusers");
  };

  const handleAllAdminsClick = () => {
    navigate("/admin/alladmins");
  };

  const handleBlogsClick = () => {
    navigate("/admin/blogs");
  };

  const handleLanguageChangeEnglish = () => {
    i18n.changeLanguage("en");
  };

  const handleLanguageChangeSpanish = () => {
    i18n.changeLanguage("es");
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
                ? require(`../../../assets/images/${image}`)
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
              {t("MyProfile:myprofile")}
            </li>
            <li className={styles.navItem} onClick={handleAddUserClick}>
              {t("AddUser:adduser")}
            </li>
            <li className={styles.navItem} onClick={handleAddAdminClick}>
              {t("AddAdmin:addadmin")}
            </li>
            <li className={styles.navItem} onClick={handleAllUsersClick}>
              {t("AllUsers:allusers")}
            </li>
            <li className={styles.navItem} onClick={handleAllAdminsClick}>
              {t("AllAdmins:alladmins")}
            </li>
            <li className={styles.navItem} onClick={handleBlogsClick}>
              {t("Blogs:blogs")}
            </li>
          </ul>
          <select
            name="language"
            id="language"
            className={styles.myDropdown}
            onChange={(e) => {
              const selectedLanguage = e.target.value;
              if (selectedLanguage === "en") {
                handleLanguageChangeEnglish();
              } else if (selectedLanguage === "es") {
                handleLanguageChangeSpanish();
              }
            }}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default AdminNavbar;
