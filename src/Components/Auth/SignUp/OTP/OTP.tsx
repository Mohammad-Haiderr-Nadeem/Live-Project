import React, { useState } from "react";
import OTPInput from "./OTPInput/OTPInput";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  return (
    <React.Fragment>
      <OTPInput otp={otp} setOtp={setOtp} />
    </React.Fragment>
  );
};
export default OTP;
