import React, { useCallback, useEffect, useState } from "react";
import styles from "./MyProfile.styles.module.css";
import validator from "validator";
import axios from "axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import AdminNavbar from "../Navbar/Navbar";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangePassword/ChangePassword";

const AdminProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { t } = useTranslation(["MyProfile"]);

  const getUser = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8000/getAdminProfile/${Cookies.get("myAdminId")}`
    );
    setFirstName(res.data.firstName);
    setLastName(res.data.lastName);
    setEmail(res.data.email);
    setImage(res.data.image);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleOnClickEdit = () => {
    setShowEditProfile(!showEditProfile);
  };

  const handleOnClickPassowrdEdit = () => {
    setShowChangePassword(!showChangePassword);
  };

  return (
    <React.Fragment>
      <AdminNavbar />
      <div className={styles.outerContainer}>
        <div className={styles.profileContainer}>
          <div className={styles.profilePhoto}>
            <img
              className={styles.myimg}
              src={
                validator.isURL(image)
                  ? image
                  : image
                  ? require(`../../../assets/images/${image}`)
                  : "image"
              }
              alt="Profile"
            />
          </div>
          <h2 className={styles.name}>
            {t("name")}: {`${firstName} ${lastName}`}
          </h2>
          <p className={styles.email}>
            {t("email")}: {email}
          </p>
          <button className={styles.myButton} onClick={handleOnClickEdit}>
            Edit Profile
          </button>
          <div>
            <button
              className={styles.myPasswordButton}
              onClick={handleOnClickPassowrdEdit}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
      {showEditProfile && (
        <EditProfile
          firstName={firstName}
          lastName={lastName}
          email={email}
          setShowEditProfile={setShowEditProfile}
          getUser={getUser}
        />
      )}
      {showChangePassword && (
        <ChangePassword setShowChangePassword={setShowChangePassword} />
      )}
    </React.Fragment>
  );
};
export default AdminProfile;
