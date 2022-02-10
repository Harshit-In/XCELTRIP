import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import Partical from "../components/dashboard/Partical";
import * as yup from "yup";
import { Formik } from "formik";
import api from "../api";
export default function AddKyc() {
  const info = JSON.parse(localStorage.getItem("userdata"));
  const usertoken = info?.token;
  let Mid = info.user.member_id;
  const [kycdetails, setkycdetails] = useState([])
  const [Status, setStatus] = useState(3);
  const [dd, setdd] = useState("")
  const regexpattern = "^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$";
  const aadharNo = RegExp("^[0-9]{12}$");
  const panval = RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}");
  const validationSchema = yup.object({
    aadhar_number: yup.string().required("Aadhar No is required").matches(aadharNo, "Enter 12 digit aadhar number")

  });

  const initialValues = {
    member_id: Mid,
    member_photo: "",
    aadhar_number: "",
    back_aadhar_photo: "",
    front_aadhar_photo: "",
    passbook_photo: "",
    pan_number: "",
    pan_photo: "",
  }
  const adduserkyc = (values) => {
    let formdata = new FormData();
    formdata.append("member_id", Mid);
    formdata.append("member_photo", values.member_photo);
    formdata.append("aadhar_number", values.aadhar_number);
    formdata.append("back_aadhar_photo", values.back_aadhar_photo);
    formdata.append("front_aadhar_photo", values.front_aadhar_photo);
    formdata.append("passbook_photo", values.passbook_photo);
    formdata.append("pan_number", values.pan_number);
    formdata.append("pan_photo", values.pan_photo);
    console.log("form Data", formdata);
    return api.post("kycInfo", formdata, {
      headers: { Authorization: `Bearer ${usertoken}` }
    }).then((res) => {
      if (res.status === 200) {
        NotificationManager.success("Kyc Added successfully pleace wait for approvel")
        clearfeild()
      getKycData();

      } else {
        NotificationManager.error("something went wrong")
      }
    })
  }
  const clearfeild = () => {
    document.getElementById("create-course-form").reset();
  }

  const getKycData = () => {
    api.post("admin/getkyc", { member_id: Mid }).then((res) => {
      if (res?.data?.data && res?.data?.data?.length > 0) {
        setStatus(res.data.data?.[0]?.kycStates)
      }
      setkycdetails(res?.data)

    })
  }
  useEffect(() => {
    getKycData();
  }, [])
  return (
    <>
      <div className="main-panel">
        <Partical />
        <div className="content-wrapper p-2">
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Kyc</h5>
                {Status === 0 ? (
                  <div class="alert alert-info" role="alert" style={{
                    color: "#e6b21c",
                    backgroundColor: "#fff3cd",
                    borderColor: "#ffeeba"
                  }}>
                    Your Kyc is Pending Waite For Approvence......
                  </div>
                )
                  : Status === 1 ? (
                    <div class="alert alert-success" role="alert" style={{
                      color: "#155724",
                      backgroundColor: "#d4edda",
                      borderColor: "#c3e6cb"
                    }}>
                      Your Kyc Is Approved
                    </div>) : (
                    <div className="container jumbotron" style={{ marginTop: "10px" }}>
                      <div className="container">
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={(values) => adduserkyc(values)}
                        >
                          {({
                            setFieldValue,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            isValid,
                          }) => (
                            <>
                              <form className="post-form" id="create-course-form">
                                <div className="form-row">
                                  <input
                                    type="hidden"
                                    className="form-control"
                                    required="required"
                                    value={Mid}
                                  />
                                  <div className="form-group col-md-6">
                                    <label style={{ color: "#0c735b" }}>member image</label>
                                    <input
                                      type="file"
                                      className="form-control"
                                      name="member_photo"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "member_photo",
                                          e.target.files[0]
                                        );
                                      }}
                                    />

                                  </div>
                                  <div className="form-group col-md-6">
                                    <label for="inputPassword4" style={{ color: "#0c735b" }}>Aadhar Number</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Adhar No"
                                      name="aadhar_number"
                                      value={values.aadhar_number}
                                      onChange={handleChange("aadhar_number")}
                                      onBlur={handleBlur("aadhar_number")}
                                      maxLength={12}
                                    />
                                    {errors.aadhar_number && errors.aadhar_number && <p
                                      style={{ color: "red", fontSize: 11 }}
                                    >{errors.aadhar_number}</p>}
                                  </div>

                                </div>

                                <div className="form-group ">
                                  <label for="inputAddress" style={{ color: "#0c735b" }}>Aadhar Back Photo</label>

                                  <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    name="back_aadhar_photo"
                                    onChange={(e) => {
                                      setFieldValue(
                                        "back_aadhar_photo",
                                        e.target.files[0]
                                      );
                                    }}
                                  />
                                </div>
                                <div className="form-group ">
                                  <label for="inputAddress" style={{ color: "#0c735b" }}>Aadhar Front Photo</label>
                                  <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    name="front_aadhar_photo"
                                    onChange={(e) => {
                                      setFieldValue(
                                        "front_aadhar_photo",
                                        e.target.files[0]
                                      );
                                    }}
                                  />

                                </div>
                                <div className="form-group ">
                                  <label for="inputAddress" style={{ color: "#0c735b" }}>Passbook Photo</label>
                                  <img id="a_photo" />
                                  <input
                                    type="file"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    name="passbook_photo"
                                    onChange={(e) => {
                                      setFieldValue(
                                        "passbook_photo",
                                        e.target.files[0]
                                      );
                                    }}
                                  />
                                </div>
                                <div className="form-row">
                                  <div className="form-group col-md-6">
                                    <label style={{ color: "#0c735b" }}>Pan image</label>
                                    <img id="p_photo" />
                                    <input
                                      type="file"
                                      className="form-control"
                                      placeholder="Enter Title"
                                      name="pan_photo"
                                      onChange={(e) => {
                                        setFieldValue(
                                          "pan_photo",
                                          e.target.files[0]
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label for="inputPassword4" style={{ color: "#0c735b" }}>Pan number</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Enter Pan No "

                                      name="pan_number"
                                      value={values.pan_number}
                                      onChange={handleChange("pan_number")}
                                      onBlur={handleBlur("pan_number")}
                                    />

                                  </div>

                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                              </form>
                            </>
                          )}
                        </Formik>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
