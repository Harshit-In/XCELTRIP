import React from 'react'
import { NotificationManager } from 'react-notifications';
import api from '../api';
import Partical from "../components/dashboard/Partical";
const Support = () => {
    const userid = JSON.parse(localStorage.getItem("userdata"));
    const user_id = userid.user.member_id;
    const sendinfo=(event)=>{
        event.preventDefault()
        let formData = new FormData(event.target);
        let formValues = Object.fromEntries(formData.entries());
        formValues["member_id"] = user_id;
     
        api.post("supportTicket", formValues).then((res) => {
          if (res.status === 200) {
              NotificationManager.success("Message Send succesfully");
              clearfeild()
          } if (res.status == 400) {
              NotificationManager.error("Someting went wrong")
          }

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
                  <div className="bg-white">
                  <h5 className='p-2' className="nhj">Get In Touch</h5>
                  </div>
               <div className="row">
               <div className="col-3"></div>
              <div className="col-6">
              <div className="container bg-white p-4" style={{ marginTop: "10px" }}>
                  <div className="container">
                  <form onSubmit={(event) => sendinfo(event)} id="create-course-form">
                   
                      
                    <div class="form-group">
                      <label for="inputAddress"  style={{ color: "#4873a5",fontWeight:"bold" }}>Message*</label>
                      <textarea class="form-control" id="inputAddress" placeholder="Message......"  required="require" name="user_message"/>
                    </div>
                    
                  <div className="guyhgy">
                  <button type="submit" className='fgdfg' id="njgh">Submit</button>
                  </div>
                  </form>
                  </div>
                </div>
              </div>
              <div className="col-3"></div>
               </div>
            
              </div>
            </div>
          </div>
        </div>
      </div>
            
        </>
    )
}

export default Support
