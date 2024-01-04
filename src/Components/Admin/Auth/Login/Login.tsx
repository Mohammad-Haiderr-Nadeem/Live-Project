import React, { useState } from "react";
import styles from "./Login.styles.module.css";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_LOCALHOST}/checkAdmin`, {
        email,
        password,
      });
      if (res.status === 200) {
        setEmail("");
        setPassword("");
        navigate("/admin/dashboard");
      }
    } catch (err: AxiosError | any) {
      if (err.response.status === 406) {
        Swal.fire({
          icon: "error",
          title: "Oops... Invalid credentials",
          text: "Incorrect email!",
        });
      } else if (err.response.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Oops... Invalid credentials",
          text: "Incorrect password!",
        });
      }
      console.log("error is logging in Admin", err);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.mybody}>
        <div className={styles.loginContainer}>
          <h2 className={styles.myh2}>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.myLabel}>Email:</label>
              <input
                type="email"
                className={styles.myInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.myLabel}>Password:</label>
              <input
                type="password"
                className={styles.myInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className={styles.myButton} type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
