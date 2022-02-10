  export function isNum(num) {
    if (num === "") {
      return false;
    } else if (!checkOtp(num)) {
      return false;
    } else {
      return true;
    }
  }
  export function checkOtp(otp) {
    const otpToValidate = otp ? otp : "";
    const otpRegexp = /^[0-9]*$/;
    const res = otpRegexp.test(otpToValidate);
    return res;
  }