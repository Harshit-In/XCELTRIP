import React, { useState } from "react";
import Partical from "../components/dashboard/Partical";
import { login } from "../redux/action/authAction";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Newlogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(0);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.userinfo);
  return (
    <>    <div className="backimgg">
      <div className="main-panel" >

        <div className="container vh-100 justify-content-center align-items-center d-flex">
          <div className="row">
            <div className="col-lg-12">

              <div
                class="card"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
              >
                <img src="images/logo.png" className="loginlogoimg" />
                <div class="card-body">

                  <form action="/dashboard" className="was-validated" id="create-course-form">
                    <div className="form-group kk">
                      <label for="memberid" className="text-white">Email:</label>

                      <input
                        type="text"
                        className="form-control "
                        id="Email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="pwd" className="text-white">Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                      />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="text-center">
                      <Link to="/Forget_Password" style={{ color: "#2ae3ec" }} className="mr-2">
                        Forget Password?
                      </Link>
                      <Link to="/create" style={{ color: "#f4a310" }}>
                        Registration
                      </Link>

                      <div className="text-center mt-2">

                        <button
                          type="button"
                          className="loginbtn"
                          onClick={() => {
                            setLoading(1);
                            dispatch(login(email, password, () => setLoading(0)));

                          }}
                        >
                          {loading ? <div disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span class="sr-only">Loading...</span>
                          </div> : "Login"}

                        </button>
                      </div>
                      <div className="mt-2 ">
                        <Link to="/" className="text-white">
                          <i className="fas fa-home text-white mr-1
                       "></i>
                          Home
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>   </div>
    </div>
    </>
  );
};

export default Newlogin;
