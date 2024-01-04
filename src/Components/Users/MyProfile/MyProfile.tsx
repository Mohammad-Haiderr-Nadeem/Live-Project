import React, { useCallback, useEffect, useState } from "react";
import styles from "./MyProfile.styles.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import validator from "validator";
import Navbar from "../../Navbar/Navbar";
import { useTranslation } from "react-i18next";
import MyBlogs from "./MyBlogs/MyBlogs";

const MyProfile = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const { t } = useTranslation(["MyProfile"]);

  const getUser = useCallback(async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_LOCALHOST}/getMyProfile/${Cookies.get("myId")}`
    );
    setFirstName(res.data.firstName);
    setLastName(res.data.lastName);
    setGender(res.data.gender);
    setEmail(res.data.email);
    setImage(res.data.image);
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.myProfile}>
        <div className={styles.profileImage}>
          <img
            src={
              validator.isURL(image)
                ? image
                : image
                ? require(`../../../assets/images/${image}`)
                : "image"
            }
            alt="Avatar"
          />
        </div>
        <div className={styles.profileDetails}>
          <p>
            <strong>{t("email")}:</strong> {email}
          </p>
          <p>
            <strong>{t("firstname")}:</strong> {fisrtName}
          </p>
          <p>
            <strong>{t("lastname")}:</strong> {lastName}
          </p>
          <p>
            <strong>{t("gender")}:</strong> {gender}
          </p>
        </div>
      </div>
      <MyBlogs />
    </React.Fragment>
  );
};
export default MyProfile;
