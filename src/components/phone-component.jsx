import { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const handlePhoneNumberChange = (e) => {
    const regix = /[^0-9]/g;
    if (phoneNumber.length > 10 || regix.test(phoneNumber)) {
      alert("Invalid phone number");
      setPhoneNumber("");
      return;
    }
    setPhoneNumber(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    setShowOtpInput(true);
  };
  const onOtpSubmit = (otp) => {
    console.log("login successfull with that OPT", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <p>Enter OTP sent to : {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
