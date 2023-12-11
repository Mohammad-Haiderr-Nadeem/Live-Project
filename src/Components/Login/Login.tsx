import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.styles.module.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

axios.defaults.withCredentials = true;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegularLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (email && password) {
        const res = await axios.post("http://localhost:8000/loginForm", {
          email,
          password,
        });
        if (res.status === 200) {
          setEmail("");
          setPassword("");
          navigate("/home");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Fields are missing!",
        });
      }
    } catch (err) {
      console.log("error logging into the form", err);
    }
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:8000/google", "_self");
  };

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnChangePassowrd = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(e.target.value);
  };

  const handleOnClickSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.myh2}>Login</h2>
      <form className={styles.myForm} onSubmit={(e) => handleRegularLogin(e)}>
        <div className={styles.inputGroup}>
          <label className={styles.myLabel}>
            <FontAwesomeIcon icon={faEnvelope} />
            Email:
          </label>
          <input
            className={styles.myInput}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => handleOnChangeEmail(e)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.myLabel}>
            <FontAwesomeIcon icon={faLock} />
            Password:
          </label>
          <input
            className={styles.myInput}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleOnChangePassowrd}
          />
        </div>
        <div>
          <button className={styles.myButton} type="submit">
            Login
          </button>
        </div>
      </form>
      <div>
        <button className={styles.myButton} onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
      </div>
      <div>
        <span className={styles.mySpan}>
          New user? Please
          <span className={styles.signUpTitle} onClick={handleOnClickSignUp}>
            Sign Up
          </span>
        </span>
      </div>
    </div>
  );
};

export default Login;
