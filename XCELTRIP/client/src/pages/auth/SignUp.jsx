import { createRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = createRef();

  function registerUser(e) {
    e.preventDefault();
    const recaptchaValue = recaptchaRef.current.getValue();
    console.log("recaptcha", recaptchaValue);
    if (recaptchaValue) {
      const formData = getFormData(e.target);
      const signupRes = api.post("/signup", formData);

      toast
        .promise(signupRes, {
          loading: "Registration in progress...",
          success: (data) => {
            return `Congratulations, you have successfully registered.`;
          },
          error: (err) => {
            return (
              err?.response?.data?.errors ??
              err?.response?.data?.message ??
              err?.message ??
              "OOPs something went wrong."
            );
          },
        })
        .then((data) => {
          e.target.reset();
        });
    } else {
      toast.error("Please verify captcha.")
    } 
  }
  return (
    <section className="vh-lg-100 d-flex align-items-center">
      <div className="container">
        <div
          className="row justify-content-center form-bg-image"
          //data-background-lg="/theme_files/assets/img/illustrations/signin.svg"
          style={{
            backgroundImage:
              "url(/theme_files/assets/img/illustrations/signin.svg)",
          }}
        >
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-2 mt-md-0">
                <h1 className="mb-0 h3">Create an account</h1>
              </div>
              <form
                onSubmit={(e) => {
                  registerUser(e);
                }}
              >
                <div className="form-group mb-2">
                  <label for="fullname">Your Name</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">
                      <span className="fas fa-user"></span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      id="fullname"
                      name="full_name"
                      autofocus
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label for="email">Your Email</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">
                      <span className="fas fa-envelope"></span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@company.com"
                      id="email"
                      name="email"
                      autofocus
                      required
                    />
                  </div>
                </div>

                <div className="form-group mb-2">
                  <label for="mobile">Mobile Number</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon3">
                      <span className="fas fa-mobile"></span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Mobile Number"
                      id="mobile"
                      name="mobile"
                      autofocus
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  {/* Password ConfirmPassword */}
                  {/*  <div className="form-group mb-2">
                    <label for="password">Your Password</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon4">
                        <span className="fas fa-unlock-alt"></span>
                      </span>
                      <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        id="password"
                        name="password"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label for="confirm_password">Confirm Password</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon5">
                        <span className="fas fa-unlock-alt"></span>
                      </span>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        required
                      />
                    </div>
                  </div> */}

                  <div className="form-group mb-2">
                    <label for="sponsor_id">Sponsor</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-user"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Sponsor ID"
                        id="sponsor_id"
                        name="sponsor_id"
                        autofocus
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label for="xcelpay_wallet">XcelPay Wallet Address</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-wallet"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="XcelPay Wallet Address"
                        id="xcelpay_wallet"
                        name="xcelpay_wallet"
                        autofocus
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-2">
                    <label for="country">Country</label>
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        <span className="fas fa-wallet"></span>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country"
                        id="country"
                        name="country"
                        autofocus
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LfZoqweAAAAADv45cRiERxVOzNE6ZlWbYtl3tcN"
                      theme="dark"
                      onChange={(t) => {
                        console.log("cap", t);
                      }}
                    />
                  </div>


                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="terms"
                      required
                    />
                    <label className="form-check-label" for="terms">
                      I agree to the <Link to="">terms and conditions</Link>
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-block btn-primary">
                  Sign Up
                </button>
              </form>
              {/* <div className="mt-3 mb-2 text-center">
                <span className="font-weight-normal">or</span>
              </div>
              <div className="btn-wrapper my-4 text-center">
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-facebook mr-2"
                  type="button"
                  aria-label="facebook button"
                  title="facebook button"
                >
                  <span aria-hidden="true" className="fab fa-facebook-f"></span>
                </button>
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-twitter mr-2"
                  type="button"
                  aria-label="twitter button"
                  title="twitter button"
                >
                  <span aria-hidden="true" className="fab fa-twitter"></span>
                </button>
                <button
                  className="btn btn-icon-only btn-pill btn-outline-light text-facebook"
                  type="button"
                  aria-label="github button"
                  title="github button"
                >
                  <span aria-hidden="true" className="fab fa-github"></span>
                </button>
              </div> */}
              <div className="d-flex justify-content-center align-items-center mt-4">
                <span className="font-weight-normal">
                  Already have an account?
                  <Link to="/signin" className="font-weight-bold">
                    Login here
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
