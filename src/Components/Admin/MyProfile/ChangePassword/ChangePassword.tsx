import React, { useState } from "react";
import styles from "./ChangePassword.styles.module.css";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const ChangePassword = (props: {
  setShowChangePassword: (arg0: boolean) => void;
}) => {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
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
        `http://localhost:8000/changePassword/${Cookies.get("myId")}`,
        formData
      );
      if (res.status === 200) {
        props.setShowChangePassword(false);
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Password has been changed!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err: AxiosError | any) {
      if (
        err.response.status === 404 &&
        err.response.data.msg === "INCORRECT PASSWORD"
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      } else if (
        err.response.status === 404 &&
        err.response.data.msg === "PASSWORD ISN'T MATCHING"
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data.msg,
        });
      }
      console.log("error in submitting form", err);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.formContainer}>
        <h2 className={styles.myh2}>Change Password Form</h2>
        <form onSubmit={handleSubmit}>
          <label className={styles.mylabel} htmlFor="firstName">
            Old Password:
          </label>
          <input
            type="password"
            className={styles.myinput}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className={styles.mylabel} htmlFor="lastName">
            New Password:
          </label>
          <input
            type="password"
            className={styles.myinput}
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <label className={styles.mylabel} htmlFor="email">
            Confirm Password:
          </label>
          <input
            type="password"
            className={styles.myinput}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
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
export default ChangePassword;
