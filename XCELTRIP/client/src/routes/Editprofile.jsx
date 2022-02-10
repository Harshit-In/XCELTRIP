import React, { useEffect, useState } from "react";
import NotificationManager from "react-notifications/lib/NotificationManager";
import { useSelector } from "react-redux";
import api from "../api";
import Partical from "../components/dashboard/Partical";
import { getBinaricalIncome, getUserBinarical } from "../redux/api_function";
export default function Editprofile() {
  const userid = JSON.parse(localStorage.getItem("userdata"));
  const user_id = userid.user.member_id;
  const info = JSON.parse(localStorage.getItem("userdata"));
  const usertoken = info?.token;

  // console.log(hash_password);
  const Updateform=(event)=>{
    event.preventDefault();
    const headers = { Authorization: `Bearer ${usertoken}` };
    let formData = new FormData(event.target);
    let formValues = Object.fromEntries(formData.entries());
    formValues["member_id"] = user_id;
    api.post("updateUserInfo", formValues,{
      headers: { Authorization: `Bearer ${usertoken}` }
    }).then((res) => {
      if (res.status === 200) {
          NotificationManager.success("Your account details added succesfully");
          clearfeild()
      } else{
        NotificationManager.error(res.error);
      }
  }).catch((e)=>{
    NotificationManager.error("Something is wrong "+e.message)
  })
}
const clearfeild = () => {
  document.getElementById("create-course-form").reset();

  }
  return (
    <>
      <div className="main-panel">
        <Partical />
        <div className="content-wrapper p-2">
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Edit Profile</h5>
                <div className="container jumbotron" style={{ marginTop: "10px" }}>
                  <div className="container">
                  <form onSubmit={(event)=>Updateform(event)} id="create-course-form">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputEmail4" style={{ color: "#0c735b" }}>Name</label>
                        <input type="text" class="form-control"  placeholder="Enter Your Name" name="member_name" required="required"/>
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPassword4" style={{ color: "#0c735b" }}>Contact</label>
                        <input type="text" class="form-control" id="inputPassword4" placeholder="Enter Your Contact" name="contact"  required="required"/>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputAddress" style={{ color: "#0c735b" }}>Address</label>
                      <input type="text" class="form-control" id="inputAddress" placeholder="Address..." name="addr"  required="required" />
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputCity" style={{ color: "#0c735b" }}>City</label>
                        <input type="text" class="form-control" id="inputCity" name="city" />
                      </div>
                      <div class="form-group col-md-2">
                        <label for="inputZip" style={{ color: "#0c735b" }}>Zip</label>
                        <input type="text" class="form-control" id="inputZip" name="pincod"/>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                  </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
