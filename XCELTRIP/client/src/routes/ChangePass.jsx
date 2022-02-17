import React from "react";
import { NotificationManager } from "react-notifications";
import Partical from "../components/dashboard/Partical";
import { postAPICall } from "../components/request";
export default function Editprofile() {
  const Chngpass = (event) => {
    event.preventDefault();
    var pw1 = document.getElementById("pass").value;
    var pw2 = document.getElementById("confirm_pass").value;
    let formData = new FormData(event.target);
    let formValues = Object.fromEntries(formData.entries());
    if (pw1 != pw2) {
      NotificationManager.error("Password Did not Match")
    } else {
      postAPICall("change_password", formValues).then((res) => {
        if (res.status == 200) {
          NotificationManager.success("Password change Successfully")
        } else {
          NotificationManager.error("Password Do not Match")
        }
      }).catch((error) => {
        NotificationManager.error("something is wrong")
      })
    }
  }

  return (
    <>
      <div className="main-panel">
        <Partical />
        <div className="content-wrapper p-2">
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Change Password</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <div className="container">
                    <form onSubmit={(event => Chngpass(event))}>
                      <div className="row">
                        <div className="col">
                          <label> New Password</label>
                          <input type="password" className="form-control" placeholder="New Password " name="pass" id="pass" />
                        </div>
                        <div className="col">
                          <label>Confirm Password</label>
                          <input type="password" className="form-control" placeholder="Confirm Password " name="confirm_pass" id="confirm_pass" />
                        </div>
                        <div className="col">
                          <div className="" style={{ marginTop: "30px" }}><button type="submit" className="btn btn-success ">Change</button></div>
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
    </>
  );
}
