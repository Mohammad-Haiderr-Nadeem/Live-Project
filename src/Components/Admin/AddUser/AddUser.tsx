import React, { useState } from "react";
import styles from "./AddUser.styles.module.css";
import AdminNavbar from "../Navbar/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const AddUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (
        firstName &&
        lastName &&
        email &&
        profilePhoto &&
        gender &&
        password
      ) {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("image", profilePhoto);
        formData.append("gender", gender);
        formData.append("password", password);
        const res = await axios.post(
          "http://localhost:8000/addUser",
          formData
        );
        if (res.status === 201) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setProfilePhoto(null);
          setGender("");
          setPassword("");
          Swal.fire({
            position: "top",
            icon: "success",
            title: "User has been added!!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add the User!",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fields are missing!",
        });
      }
    } catch (err) {
      console.log("error in signing up", err);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePhoto(e.target.files[0]);
    }
  };

  return (
    <React.Fragment>
      <AdminNavbar />
      <div className={styles.body}>
        <form onSubmit={(e) => handleSignUp(e)} className={styles.form}>
          <div>
            <h2 className={styles.title}>Add User</h2>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              First Name:
              <input
                className={styles.input}
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Last Name:
              <input
                className={styles.input}
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Email:
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Profile Photo :
              <input type="file" name="image" onChange={handleFileChange} />
            </label>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Gender:</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                Male
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                Female
              </label>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>
              Password:
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.button} type="submit">
              Add User
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};
export default AddUser;
