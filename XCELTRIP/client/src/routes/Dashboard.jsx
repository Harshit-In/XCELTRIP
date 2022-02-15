import React, { useEffect, useState } from "react";
import "./dashboard.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TopCard from "../components/dashboard/TopCard";
import { useParams } from "react-router-dom";
import api from "../api";
import { applyMiddleware } from "redux";
export default function Dashboard(props) {
  console.log(props);
  const { member_id } = useParams();
  console.log(member_id);
  const [datadash, setdatadash] = useState();
  const userid = JSON.parse(localStorage.getItem("userdata"));
  console.log(userid);
  const user_id = member_id ?? userid.user?.member_id;
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
   /*  const alltxtData = {
      member_id: user_id,
    }; */

    //console.log("user_id: ", alltxtData);
    /* postAPICall("userInfo").then((res) => {
      console.log("UserData",res.data.data)
      setdatadash(res.data.data);
      setactivationdate(res.data.data?.activation_date);
      setLoading(false);
    }); */

    api.post("userInfo", {member_id: user_id}).then((res)=>{
      console.log(res.data.data)
      setdatadash(res.data.data);
    }).catch((error)=>{
      console.log(error.message)
    })
  },[]);

  return (
    <>
      <div className="main-panel">
        
        <div className="content-wrapper p-2">
          {/* <TopCard visible name={"User Id"} value={id} /> */}
          {datadash ? (
            <>
              <div className="row">
                <div className="col-md-12">
                  <div className="main-containers">
                    <div className="container">
                      <div className="row mb-4" >
                        <div className="col-sm-4 ">
                          {/* <TopCard visible name={"Member Name"} value={userid?.user?.member_id ?? datadash.member_id} /> */}
                        </div>
                        <div className="col-sm-4"> <TopCard visible name={"Member ID"} value={user_id} /></div>
                        <div className="col-sm-4">  <TopCard visible name={"Sponsor Id"} value={userid?.user?.sponsor_id ?? datadash.sponsor_id} /></div>
                        {/* {/* <div className="col-sm-4"> <TopCard visible name={"Member ID"} /></div> */}
                        {/* // <div className="col-sm-4">  <TopCard visible name={"Activation Date"} /></div> */}

                      </div>
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-users  icoon_style " /> Direct Downline</span>
                              </h3>
                              <div className="">
                                <span>{datadash?.direct_coin}</span>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />Coin Wallet</span>
                              </h3>
                              <div className="">
                                <span>{parseInt(datadash?.pin_wallet)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                      {/* second row */}
                      <div className="row">
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />Income Wallet</span>
                              </h3>
                              <div className="">
                                <span>{datadash?.coin_wallet ?? 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />withdrawl Amount</span>
                              </h3>
                              <div className="">
                                {/* <span>{datadash.withdrawl_amount ?? 0}</span> */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />Group Coin</span>
                              </h3>
                              <div className="">
                                <span>{datadash.total_coin}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />Total Members</span>
                              </h3>
                              <div className="">
                                <span>{totalUsers ?? 0}</span>
                              </div>
                            </div>
                          </div>
                        </div> */}

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : null}

          {/* <MainTree/>
      */}
        </div>

      </div>
    </>
  );
}
