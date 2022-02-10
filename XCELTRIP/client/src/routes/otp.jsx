import React, { useState, useEffect } from "react";
import Partical from "../components/dashboard/Partical";
import { Link, useHistory } from "react-router-dom";
import { postAPICall } from "../components/request";
import NotificationManager from "react-notifications/lib/NotificationManager";
import api from "../api";
const Otp = () => {
    const [timer, setTimer] = useState(60);
    let history = useHistory();
    const params = new URLSearchParams(window.location.search);
    const member_id = params.get('member_id');
    const Otpvarfication = (event) => {
        event.preventDefault()
        let formData = new FormData(event.target);
        let formValues = Object.fromEntries(formData.entries());
        postAPICall("otp_match", formValues).then((res) => {
            if(res.status == 200) {
                history.push(`/ChangePassword?member_id=${formValues.member_id}`)
            }
        }).catch((error)=>{
            NotificationManager.error(error?.response?.data?.message ?? "Please enter valid otp.");
        })
        // consolne.log("im formvalue", formValues)
    }
    // Timer
    const countDownTimer = () => {
        setTimer(prevTime => {
            return prevTime - 1
        })
    }
    // Resend otp
    const resendOtp = async (event) => {
        let formData = new FormData();
        formData.append('member_id', member_id)
         api.post("forgot", formData).then(() => {
            NotificationManager.success(" otp send succesfully")
            setTimer(60);
        }).catch(error=>{

        })
    }

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                countDownTimer();
            }, 1000);
        }
    }, [timer])


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

                                    <form action="/dashboard" className="was-validated" onSubmit={(event) => Otpvarfication(event)}>
                                        <div className="form-group">
                                            <label for="uname">UserId:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter user id"
                                                name="member_id"
                                                value={member_id}
                                                required="required"
                                            />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">
                                                Please fill out this field.
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label for="uname">Enter your OTP:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter OTP...."
                                                name="userInput"
                                                required="required"
                                            />
                                            <div className="valid-feedback">Valid.</div>
                                            <div className="invalid-feedback">
                                                Please fill out this field.
                                            </div>
                                            <div style={{ color: '#fff' }} className="text-center">{timer > 0 ? timer : null}
                                                {timer < 1 ? (<button className="btn btn-link text-success text-center" onClick={resendOtp} type="button">Resend</button>) : null}
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

export default Otp
