import { useEffect, useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    //if not a number then return.
    if (isNaN(value)) return;
    const newOtp = [...otp];
    //set only one number per input field and update the previous value with the new one
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    //send back the combined otp to the submit handler.
    const combineOtp = newOtp.join("");
    if (combineOtp.length === length) {
      onOtpSubmit(combineOtp);
    }

    //move automatically to next input field untill the last input field
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    //if  e.g 1st input has otp and 2nd is also inputed the move to the third one
    if (
      value &&
      index < length - 2 &&
      inputRefs.current[index + 2] &&
      otp[index + 1] &&
      !otp[index + 2]
    ) {
      inputRefs.current[index + 2].focus();
    }
  };

  const handleClick = (index) => {
    // if the cursor is before the digit move it after
    inputRefs.current[index].setSelectionRange(1, 1);
    //if the previous input feild is missed empty
    if (index && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };
  const handleOnKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      index > 0 &&
      !otp[index] &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            ref={(inputRef) => {
              inputRefs.current[index] = inputRef;
            }}
            key={index}
            value={value}
            onChange={(e) => handleOtpChange(e, index)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
