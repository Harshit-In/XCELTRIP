import React, { useState } from "react";
import Partical from "../components/dashboard/Partical";
import {Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {  postAPICall } from "../components/request";
import { NotificationManager } from "react-notifications";
const Forgetpass = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [userid, setuserid] = useState("");
  const forgetpassword =(event)=>{
    event.preventDefault()
    let formData = new FormData(event.target);
    let formValues = Object.fromEntries(formData.entries());
   
    postAPICall("forgot", formValues).then(() => {
        NotificationManager.success(" otp send succesfully")   
        history.push(`/otp?member_id=${formValues.member_id}`)
      })
  }
  return (
    <>
      <div className="main-panel">
        <Partical />
        <div className="container vh-100 offset-md-1 justify-content-center align-items-center d-flex">
          <div className="row">
            <div className="col-lg-12">
              <div
                class="card"
                style={{ background: "#0a0909", padding: "47px", borderLeft:"2px solid yellow",borderBottom:"2px solid #6bdaec",borderRadius:"5% 5% 5% 5%;"}}
              >
                 <div className="card-title">
                 <div className="">  
                 <img src="images/logo.png" style={{width:"100px"}}/>
                 <h6 className="text-danger mt-3 mb-2">Forget Password</h6></div>
                 </div>
                <div class="card-body">
            
                  <form action="/dashboard" className="was-validated"  onSubmit={(event) => forgetpassword(event)}>
                    <div className="form-group">
                      <label for="uname">UserId:</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter user id"
                       name="member_id"
                       required="required"
                      />
                      <div className="valid-feedback">Valid.</div>
                      <div className="invalid-feedback">
                        Please fill out this field.
                      </div>
                    </div>
                    <div className="text-center">
<span className=""><h6 className="text-warning">Don't Have account? <Link to="/create">SignUp?</Link></h6></span>

                      <button
                       type="submit"
                        className="btn btn-primary"
                      >
                       Change
                      </button>
                    </div>
                  </form> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forgetpass;
