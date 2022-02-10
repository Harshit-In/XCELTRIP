import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./login.css";
import { create, onConnect } from "../redux/action/authAction";
import { NotificationManager } from "react-notifications";
import $ from "jquery";
import Partical from "../components/dashboard/Partical";
import ReCAPTCHA from "react-google-recaptcha";
import { memberRegistration } from "../redux/api_function";
import axios from "axios";
export default function RegistrationSuccessful(props) {
  let params = new URLSearchParams(window.location.search);
  const memberID = params.get("member_id");
  const [UserData, setUserData] = useState("");

  useEffect(async () => {
    $("body").css({ background: "rgba(0,0,0,0.9)" });
  }, []);

  const getUserInfo = async () => {
    const res = await axios
      .post("https://api.myfastearn.in/api/userInfo", { member_id: memberID })
      .then((d) => {
        setUserData(d?.data?.data);
      });
  };
  useEffect(() => {
    getUserInfo();
  }, [memberID]);
  return (
    <div className="main-panel">
      <Partical />

      <div className="container vh-100 offset-md-1 justify-content-center align-items-center d-flex">
        <div className="row">
          <div className="col-12">
            <div
              className="card card-body w-100"
              style={{
                background: "#0a0909",
                borderRadius: "10px",
                minWidth: "500px",
              }}
            >
              <div className="d-flex">
                <img
                  src="images/fast_earn_logo.png"
                  style={{ width: "100px" }}
                />
              </div>
              <h2 className="text-danger my-2">Registration Completed</h2>
              <p className="my-0 text-white">
                Congratulations, Dear{" "}
                <strong className="fw-bold">{UserData.member_name}</strong> you
                are successfully registered with{" "}
                <strong>FastEarn Digital Marketing PVT. LTD.</strong>
              </p>
              <p className="my-0 text-white">
                Your login details are given below.
              </p>

              <table>
                <tr>
                  <th>Member ID :</th>
                  <td>{UserData.member_id}</td>
                </tr>
                <tr>
                  <th>Member Name :</th>
                  <td>{UserData.member_name}</td>
                </tr>
                <tr>
                  <th>Sponsor ID:</th>
                  <td>{UserData.sponsor_id}</td>
                </tr>
                <tr>
                  <th>Sponsor Name:</th>
                  <td>{UserData.sponsor_name}</td>
                </tr>
              </table>

              <div className="mt-3">
                <a href="/" className="btn btn-primary">
                  Home
                </a>
                <a href="/new_login" className="btn btn-primary mx-2">
                  Login
                </a>
                <a href="/create" className="btn btn-primary">
                  Registration
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
