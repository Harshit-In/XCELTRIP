import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { create, onConnect } from "../redux/action/authAction";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Partical from "../components/dashboard/Partical";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
export default function Registration(props) {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [Cpassword, setCpassword] = useState("");
  const [email, setemail] = useState("");
  const [contact, setcontact] = useState("");
  const [userID, setUserId] = useState("");
  const [loading, setLoading] = useState(0);
  const [Sponcer_name, set_Sponcer_name] = useState("");
  const dispatch = useDispatch();
  const { isConnected, contract, wallet } = useSelector((state) => state);

  useEffect(() => {
    $("body").css({
      background: "linear-gradient(to right top, #3e5c8a, #89aec4, #f5efd3)",
    });
  }, []);

  const getUserInfo = async () => {
    const res = await axios
      .post("/userInfo", { member_id: userID })
      .then((d) => {
        set_Sponcer_name(d.data.data.member_name);
      });
    // setUserInfo(res.data.data[0]);
  };
  useEffect(() => {
    getUserInfo();
  }, [userID]);
  return (
    <div className="">
      <div className="main-panel">
        <div className="container vh-100 justify-content-center align-items-center d-flex">
          <div className="row">
            <div className="col-12">
              <div
                class="card "
                style={{ background: "rgba(0, 0, 0, 0.3)", padding: "47px" }}
              >
                                <img src="images/logo.png" style={{ height: "80px", textAlign: "justify"}} />

                <h1>Sign Up</h1>
                <div class="card-body">
                  <form action="/dashboard" className="was-validated">
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label for="uname">Sponcer Id</label>
                          <input
                            type="text"
                            className="form-control"
                            id="sponcer_id"
                            placeholder="Enter sponcer Id"
                            value={userID}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                          />
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">
                            Please fill out this field.
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="uname">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            required
                          />
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">
                            Please fill out this field.
                          </div>
                        </div>
                        <div className="form-group">
                          <label for="pwd">Password:</label>
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
                        <div className="form-group">
                          <label for="pwd">Confirm Password:</label>
                          <input
                            type="password"
                            className="form-control"
                            id="Cpassword"
                            placeholder="Enter password"
                            value={Cpassword}
                            onChange={(e) => setCpassword(e.target.value)}
                            required
                          />
                          <div className="valid-feedback">Valid.</div>
                          <div className="invalid-feedback">
                            Please fill out this field.
                          </div>
                        </div>
                        <div className="text-center mt-4">
                          <button
                            type="button"
                            className="loginbtn"
                            onClick={async () => {
                              setLoading(1);
                              dispatch(
                                onConnect(
                                  name,
                                  password,
                                  email,
                                  userID,
                                  Cpassword,
                                  contact,
                                  () => setLoading(0)
                                )
                              );
                            }}
                          >
                            {loading ? (
                              <div disabled>
                                <span
                                  class="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                <span class="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "SignUp"
                            )}
                          </button>
                        </div>
                        <span className="m-5">
                          If you already registered{" "}
                          <Link to="/new_login">Login</Link>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
