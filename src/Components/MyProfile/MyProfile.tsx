import React, { useCallback, useEffect, useState } from "react";
import styles from "./MyProfile.styles.module.css";
import Cookies from "js-cookie";
import axios from "axios";
import validator from "validator";
import Navbar from "../Navbar/Navbar";

const MyProfile = () => {
  const [fisrtName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const getUser = useCallback(async () => {
    const res = await axios.get(
      `http://localhost:8000/getMyProfile/${Cookies.get("myId")}`
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
                ? require(`../../assets/images/${image}`)
                : "image"
            }
            alt="Avatar"
          />
        </div>
        <div className={styles.profileDetails}>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>First Name:</strong> {fisrtName}
          </p>
          <p>
            <strong>Last Name:</strong> {lastName}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MyProfile;
