import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import { isNum } from "../redux/formvalidtion";
import data from "../routes/bank.json";
import { Country, State, City } from "country-state-city";
import CustomSelect from "./CustomeSelect";
import { postAPICall} from "../components/request";
import axios from "axios";
import api from "../api";
const Bank_details = () => {
    const info = JSON.parse(localStorage.getItem("userdata"));
    const usertoken = info?.token;
    // console.log(usertoken)
    const [toCityList, setToCityList] = useState([]);
    const [toSelectedCity, setToSelectedCity] = useState("");
    const [Bankhsitory, setBankhsitory] = useState([]);
    const [Status, setStatus] = useState();
    const userid = JSON.parse(localStorage.getItem("userdata"));
    const user_id = userid.user.member_id;
    // console.log(user_id)
    const { id, wallet } = useSelector((state) => state.userinfo);
    const adduserbankdetails = (event) => {
        event.preventDefault()
        const headers = { Authorization: `Bearer ${usertoken}` };
        let formData = new FormData(event.target);
        let formValues = Object.fromEntries(formData.entries());
        formValues["bank_city"] = toSelectedCity.label;
        formValues["member_id"] = user_id;
        api.post("bankinfo", formValues, {
            headers: { Authorization: `Bearer ${usertoken}` }
        }).then((res) => {
            if (res.status === 200) {
                NotificationManager.success("Your account details added succesfully");
                clearfeild()
            } if (res.status == 400) {
                NotificationManager.error("Someting went wrong")
            }

        })
    }
    const clearfeild = () => {
        document.getElementById("create-course-form").reset();
    }
    const getAllCitiesForTo = () => {
        const cities = City.getCitiesOfCountry("IN");
        const data = cities.map((city) => {
            return { label: city.name };
        });

        setToCityList(data);
    };
    const gethistoryofbankData = () => {
       
        postAPICall('getBankInfo', { member_id: user_id }).then((res) => {
                setStatus(res?.data?.status)
                console.log(res?.data?.status);
            setBankhsitory(res?.data?.data)
        })
      }

    useEffect(() => {
        getAllCitiesForTo()
        gethistoryofbankData()
    }, []);
    return (
        <>
            <div className="main-panel">
                <Partical />
                <div className="content-wrapper p-2">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="main-containers">
                                <h5>Bank Details</h5>
                               {Status===0?(
    <div className="container jumbotron" style={{ marginTop: "10px", padding: "19px" }}>

    <div className="container">
        <form onSubmit={(event) => adduserbankdetails(event)} id="create-course-form" >
            <div className="form-row">
                <div className="form-group col-md-4">
                    <label style={{ color: "#0c735b" }}>Father Name</label>
                    <input type="text" className="form-control"
                        name="father_name"
                        required="required"
                        id="father_name"

                        placeholder="Enter......" />
                </div>
                <div className="form-group col-md-4">
                    <label style={{ color: "#0c735b" }}>Mother Name</label>
                    <input type="text" className="form-control"
                        name="mother_name"

                        required="required"
                        id="mother_name"

                        placeholder="Enter......" />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Account Holder Name</label>
                    <input type="text" className="form-control" required="required" name="account_holder_name" />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Account Number</label>
                    <input type="text" className="form-control" required="required" name="account_no" />
                </div>
                <div class="form-group col-md-4">
                    <label for="exampleFormControlSelect1" style={{ color: "#0c735b" }}>Gender</label>
                    <select class="form-control" id="exampleFormControlSelect1" name="gender">
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="exampleFormControlSelect1" style={{ color: "#0c735b" }}>Marital status</label>
                    <select class="form-control" id="exampleFormControlSelect1" name="marital_status">
                        <option>married</option>
                        <option>unmarried</option>
                        <option>Divorced</option>
                    </select>
                </div>


                <div className="form-group col-md-4">
                    <label style={{ color: "#0c735b" }}>Aadhar_number</label>
                    <input type="text" className="form-control"
                        name="aadhar_number"
                        maxLength={12}
                        minLength={12}
                        required="required"
                        id="aadhar_number"
                        onChange={(e) => {
                            isNum(e.target.value) && e.target.value.length == 12
                                ? (document.getElementById(
                                    "kycsubmit"
                                ).style.display = "block")
                                : (document.getElementById(
                                    "kycsubmit"
                                ).style.display = "none");
                        }}
                        placeholder="XXXXXXXXXXXX" />
                </div>
                <div className="form-group col-md-4">
                    <label for="inputPassword4" style={{ color: "#0c735b" }}>Pan number</label>
                    <input
                        type="text"
                        name="pan_no"
                      
                        className="form-control"
                        maxLength={10}
                        minLength={10}
                        onChange={(e) => {
                            var pattern = new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
                            if (pattern.test(e.target.value)) {

                            } else {

                                NotificationManager.error("please enter correct pan number")
                            }

                        }}
                        id="pan_number"
                        placeholder="XXXXXXXXXXXX"
                    />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Date of Birth</label>
                    <input type="date" className="form-control" required="required" name="member_dob" />
                </div>

                <div class="form-group col-md-4">
                    <label for="exampleFormControlSelect1" style={{ color: "#0c735b" }} >Bank Name</label>

                    <select class="form-control" id="exampleFormControlSelect1" name="bank_name">
                        {data.map((obj) => (
                            <option >{obj.bank_name}</option>
                        ))}
                    </select>
                </div>
                <div class="form-group col-md-4">
                    <label for="exampleFormControlSelect1" style={{ color: "#0c735b" }} >Account Type</label>

                    <select class="form-control" id="exampleFormControlSelect1" name="account_type">

                        <option>Savings account</option>
                        <option>Salary account</option>
                        <option>Fixed deposit account</option>
                        <option> Recurring deposit account</option>
                        <option>NRI accounts</option>

                    </select>
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Ifsc Code</label>
                    <input type="text" className="form-control" required="required" name="ifsc_code" />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Branch Name</label>
                    <input type="text" className="form-control" required="required" name="branch_name" />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Bank State </label>
                    <input type="text" className="form-control" required="required" name="bank_state" />
                </div>
                <div className="form-group  col-md-4 ">
                    <label style={{ color: "#0c735b" }}>City</label>
                    <CustomSelect
                        value={toSelectedCity}

                        onChange={(item) => {
                            setToSelectedCity(item);
                        }}
                        options={toCityList}
                        placeholder={"Select City"}
                    />
                </div>


            </div>


            <div className="form-row">

                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} > Nominee name </label>
                    <input type="text" className="form-control" required="required" name="nominee_name" />
                </div>

                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Nominee Age </label>
                    <input type="text" className="form-control" required="required" name="nominee_age" />
                </div>
                <div className="form-group  col-md-4">
                    <label style={{ color: "#0c735b" }} >Relation </label>
                    <input type="text" className="form-control" required="required" name="nominee_relation" />
                </div>
            </div>
            <button type="submit" className="btn btn-primary" id="kycsubmit" >Submit</button>
        </form>
    </div>
</div>
                               ):Status===1?(
                                <div className="card card-body w-100"
                                style={{ background: "#0a0909", borderRadius: "10px", minWidth: "500px" }}>
                                <table>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <tr><th className="text-info text-nowrap">Account Holder:</th><td>{Bankhsitory?.account_holder_name??"enter account holder name"}</td></tr>
                                            <tr><th className="text-info">Aadhar Number:</th><td>{Bankhsitory?.aadhar_number??"enter aadhar no"}</td></tr>
                                            <tr><th className="text-info">Account no:</th><td>{Bankhsitory?.account_no?? "enter account no"}</td></tr>
                                            <tr><th className="text-info">Account type:</th><td>{Bankhsitory?.account_type??"account type"}</td></tr>
                                            <tr><th className="text-info">Bank City:</th><td>{Bankhsitory?.bank_city??"your city "}</td></tr>
                                            <tr><th className="text-info">Bank Name:</th><td>{Bankhsitory?.bank_name??"Bank name"}</td></tr>
                                            <tr><th className="text-info">bank State:</th><td>{Bankhsitory?.bank_state??"Your state"}</td></tr>
                                            <tr><th className="text-info">Branch name:</th><td>{Bankhsitory?.branch_name??"Branch name"}</td></tr>
                                            <tr><th className="text-info">Father name:</th><td>{Bankhsitory?.father_name??"Father Name"}</td></tr>
                                        </div>
                                        <div className="col-sm-6">
                                            <tr><th className="text-info">Gender:</th><td>{Bankhsitory?.gender??"gender"}</td></tr>
                                            <tr><th className="text-info">ifsc code:</th><td>{Bankhsitory?.ifsc_code??"enter ifs code"}</td></tr>
                                            <tr><th className="text-info">marital status:</th><td>{Bankhsitory?.marital_status??"marital status"}</td></tr>
                                            <tr><th className="text-info">member DOB:</th><td>{Bankhsitory?.member_dob??"Enter your DOB"}</td></tr>
                                            <tr><th className="text-info">mother name:</th><td>{Bankhsitory?.mother_name??"Mother name"}</td></tr>
                                            <tr><th className="text-info">nominee Age:</th><td>{Bankhsitory?.nominee_age??"Nomine Age "}</td></tr>                                                
                                            <tr><th className="text-info">Nominee Name:</th><td>{Bankhsitory?.nominee_name??"Nominee Name"}</td></tr>
                                            <tr><th className="text-info">nominee relation:</th><td>{Bankhsitory?.nominee_relation??"nominee relation"}</td></tr>
                                            <tr><th className="text-info">pan no:</th><td>{Bankhsitory?.pan_no??"enter pan if you have "}</td></tr>
                                        </div>
                                    </div>


                                </table>

                            </div>
                               ):null}
                            
                             
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Bank_details
