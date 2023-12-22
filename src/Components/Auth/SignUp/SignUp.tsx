import React, { useState } from "react";
import styles from "./SignUp.styles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePhoto, setProfilePhoto] = useState<File | string | null>(null);
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          "http://localhost:8000/signUpForm",
          formData
        );
        if (res.status === 201) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setProfilePhoto(null);
          setGender("");
          setPassword("");
          navigate("/home");
        } else {
          alert("Error!!");
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

  const handleGoogleSignUp = () => {
    window.open("http://localhost:8000/google", "_self");
  };

  return (
    <React.Fragment>
      <div className={styles.body}>
        <form onSubmit={(e) => handleSignUp(e)} className={styles.form}>
          <div>
            <h2 className={styles.title}>Sign Up</h2>
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
              Sign Up
            </button>
          </div>
          <div className={styles.buttonGroup}>
            <button
              className={`${styles.button} ${styles.googleButton}`}
              type="button"
              onClick={handleGoogleSignUp}
            >
              Sign Up with Google
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUpForm;
