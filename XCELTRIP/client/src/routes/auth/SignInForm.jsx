import React, { Component, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { login } from "../../redux/action/authAction";
/* import {
  FacebookLoginButton,
  InstagramLoginButton
} from "react-social-login-buttons"; */

export default function SignInForm() {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    /* this.setState({
      [name]: value
    }); */
    const newData = { ...formData };
    newData[name] = value;
    setFormData(newData);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(formData);
    setLoading(1);
    dispatch(login(formData.email, formData.password, () => setLoading(0)));
  }
  return (
    <>
      <div className="App">
        <div className="appAside d-flex flex-column justify-content-center align-items-center">

        <div><img src="images/logo.png" className="" style={{maxWidth: "500px"}}/></div>

        </div>
        <div className="appForm">
          <div className="pageSwitcher">
            <NavLink
              to="/sign-in"
              activeClassName="pageSwitcherItem-active"
              className="pageSwitcherItem"
            >
              Sign In
            </NavLink>
            <NavLink
              exact
              to="/sign-up"
              activeClassName="pageSwitcherItem-active"
              className="pageSwitcherItem"
            >
              Sign Up
            </NavLink>
          </div>

          <div className="formTitle">
            <NavLink
              to="/sign-in"
              activeClassName="formTitleLink-active"
              className="formTitleLink"
            >
              Sign In
            </NavLink>{" "}
            or{" "}
            <NavLink
              exact
              to="/sign-up"
              activeClassName="formTitleLink-active"
              className="formTitleLink"
            >
              Sign Up
            </NavLink>
          </div>

          {/* SignIn Form */}
          <div className="formCenter">
            <form className="formFields" onSubmit={(e) => handleSubmit(e)}>
              <div className="formField">
                <label className="formFieldLabel" htmlFor="email">
                  E-Mail Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="formFieldInput"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => { handleChange(e) }}
                />
              </div>

              <div className="formField">
                <label className="formFieldLabel" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="formFieldInput"
                  placeholder="Enter your password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => { handleChange(e) }}
                />
              </div>

              <div className="formField">
                <button className="formFieldButton">Sign In</button>{" "}
                <Link to="/sign-up" className="formFieldLink">
                  Create an account
                </Link>
              </div>

              {/*  <div className="socialMediaButtons">
            <div className="facebookButton">
              <FacebookLoginButton onClick={() => alert("Hello")} />
            </div>

            <div className="instagramButton">
              <InstagramLoginButton onClick={() => alert("Hello")} />
            </div>
          </div> */}
            </form>
          </div>
        </div>
      </div>
    </>

  );
}
