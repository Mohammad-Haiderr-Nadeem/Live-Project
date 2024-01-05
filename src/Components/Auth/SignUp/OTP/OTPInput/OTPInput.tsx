import React from "react";
import styles from "./OTPInput.styles.module.css";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const OTPInput = ({ otp, setOtp }: any) => {
  const navigate = useNavigate();

  const handleResetOTP = async () => {
    try {
      const email = Cookies.get("myEmail");
      const id = Cookies.get("myId");

      if (email && id) {
        await axios.patch(
          `${process.env.REACT_APP_BACKEND_LOCALHOST}/resetOtp`,
          { id, email }
        );
      }
    } catch (err) {
      console.log("error in reseting OTP", err);
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    const nextInput = document.getElementById(`otp-input-${index + 1}`);
    if (nextInput && e.target.value && index < 5) {
      nextInput.focus();
    } else if (index >= 5) {
      try {
        const id = Cookies.get("myId");
        const verified = "yes";
        if (newOtp && id) {
          const res = await axios.post(
            `${process.env.REACT_APP_BACKEND_LOCALHOST}/verifyOtp`,
            {
              id,
              otp: newOtp.join(""),
              verified,
            }
          );
          if (res.status === 200 && res.data.updatedUser.verified === "yes") {
            navigate("/blogs");
          }
        }
      } catch (err: AxiosError | any) {
        if (err.response.status === 404) {
          toast.error("Invalid OTP. Please try again.");
        }
        console.log("error in posting otp", err);
      }
    }
    setOtp(newOtp);
  };

  return (
    <React.Fragment>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h2 className={styles.myHeading}>OTP Verification</h2>
      <div className={styles.otpContainer}>
        {otp?.map(
          (
            digit: string | number | readonly string[] | undefined,
            index: any
          ) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e, index)}
              className={styles.otpInput}
            />
          )
        )}
      </div>
      <p className={styles.myPara} onClick={handleResetOTP}>
        Resend OTP?
      </p>
    </React.Fragment>
  );
};

export default OTPInput;
