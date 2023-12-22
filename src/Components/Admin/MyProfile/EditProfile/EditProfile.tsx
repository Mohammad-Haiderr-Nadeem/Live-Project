import React, { useState } from "react";
import styles from "./EditProfile.styles.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const EditProfile = (props: {
  firstName: any;
  lastName: any;
  email: any;
  setShowEditProfile: any;
  getUser: any;
}) => {
  const [formData, setFormData] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        `http://localhost:8000/updateAdminProfile/${Cookies.get("myId")}`,
        formData
      );
      if (res.status === 200) {
        props.setShowEditProfile(false);
        props.getUser();
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Profile has been updated!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log("error in submitting form", err);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.formContainer}>
        <h2 className={styles.myh2}>Admin Information Form</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.mylabel} htmlFor="firstName">
            First Name:
          </label>
          <input
            type="text"
            className={styles.myinput}
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label className={styles.mylabel} htmlFor="lastName">
            Last Name:
          </label>
          <input
            type="text"
            className={styles.myinput}
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label className={styles.mylabel} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            className={styles.myinput}
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <button className={styles.mybutton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default EditProfile;
