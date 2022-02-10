import React, { useState } from "react";
import Partical from "../components/dashboard/Partical";
import { Link,useHistory } from "react-router-dom";
import { postAPICall } from "../components/request";
import { NotificationManager } from "react-notifications";
const Newpassword = () => {
    let history = useHistory()
    const params = new URLSearchParams(window.location.search);
    const id = params.get('member_id');
const Changepassword =(event)=>{
    event.preventDefault()
    let formData = new FormData(event.target);
    let formValues = Object.fromEntries(formData.entries());
    postAPICall("change_password", formValues).then(()=>{
        NotificationManager.success("Password change Successfully")
        history.push(`/new_login`)
    })
    // console.log("im data of confirm password",formValues)
}
    return (
        <div>
        <div className="main-panel">
            <Partical />
            <div className="container vh-100 offset-md-1 justify-content-center align-items-center d-flex">
                <div className="row">
                    <div className="col-lg-12">
                        <div
                            class="card"
                            style={{ background: "#0a0909", padding: "47px", borderLeft: "2px solid yellow", borderBottom: "2px solid #6bdaec", borderRadius: "5% 5% 5% 5%;" }}
                        >
                            <div className="card-title">
                                <div className="">
                                    <img src="images/logo.png" style={{ width: "100px" }} />
                                </div>
                            </div>
                            <div class="card-body">

                                <form action="/dashboard" className="was-validated" onSubmit={(event) => Changepassword(event)}>
                                    <div className="form-group">
                                      
                                        <input
                                            type="hidden"
                                            className="form-control"
                                            placeholder="Enter user id"
                                            name="member_id"
                                            value={id}
                                            required="required"
                                        />
                                       
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">New Password </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter New Password"
                                            name="pass"
                                            required="required"
                                        />
                                        <div className="valid-feedback">Valid.</div>
                                        <div className="invalid-feedback">
                                            Please fill out this field.
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Confirm Password"
                                            name="confirm_pass"
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
                                            className="btn btn-success"
                                        >
                                            Confirm
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Newpassword
