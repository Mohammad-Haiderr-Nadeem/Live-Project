import React, { useState } from "react";
import styles from "./AddAdmin.styles.module.css";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import AdminNavbar from "../Navbar/Navbar";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: any | string;
};

const AddAdmin = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeImage = (e: any) => {
    if (e.target.files[0]) {
      formData.image = e.target.files[0];
    }
    console.log("formData", formData);
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formDataUser = new FormData();
    formDataUser.append("firstName", formData.firstName);
    formDataUser.append("lastName", formData.lastName);
    formDataUser.append("email", formData.email);
    formDataUser.append("image", formData.image);
    formDataUser.append("password", formData.password);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_LOCALHOST}/addAdmin`,
        formDataUser
      );
      if (res.status === 200) {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Admin has been added!!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err: AxiosError | any) {
      if (
        err.response.status === 404 &&
        err.response.data.msg === "USER ALREADY EXISTS!!"
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
      <AdminNavbar />
      <div className={styles.formContainer}>
        <h2 className={styles.myh2}>Add Admin Form</h2>
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

          <label className={styles.mylabel} htmlFor="email">
            Password:
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

          <label className={styles.mylabel} htmlFor="email">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChangeImage}
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
export default AddAdmin;
