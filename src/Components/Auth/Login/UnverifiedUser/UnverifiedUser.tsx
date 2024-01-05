import React, { useState } from "react";
import styles from "./Unverified.styles.module.css";
import OTPInput from "../../SignUp/OTP/OTPInput/OTPInput";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const UnverifiedUser = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("myEmail");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <h1 className={styles.myHeading}>Please verify your account</h1>
      <OTPInput otp={otp} setOtp={setOtp} />
      <button className={styles.myButton} onClick={handleLogout}>
        Logout
      </button>
    </React.Fragment>
  );
};
export default UnverifiedUser;
