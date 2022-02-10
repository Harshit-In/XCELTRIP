import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import "./dashboard.css"
import { postAPICall} from "../components/request";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TopCard from "../components/dashboard/TopCard";
import MainTree from "./MainTree";
import Notification from "./Notification";
import { useParams } from "react-router-dom";
export default function Dashboard(props) {
  console.log(props);
  const {member_id} = useParams();
  console.log(member_id);
  const [dashboardData, setDashboardData] = useState(0);
  const [datadash, setdatadash] = useState();
  const [activationdate, setactivationdate] = useState("")
  const [Directmember, setDirectmember] = useState([])
  const { id, wallet } = useSelector((state) => state.userinfo);
  const userid = JSON.parse(localStorage.getItem("userdata"));
  const user_id = member_id ?? userid.user?.member_id;
  const dasdata = JSON.parse(localStorage.getItem("dashboarddata"));
  const [totalUsers, setTotalUsers] = useState(0);
  const [isLoading, setLoading] = useState(true);
 
  const levelName = ["New Distributor", "Business Distributor", "Growth Distributor", "Platinum Distributor", "Senior Distributor"];
  useEffect(() => {

    const alltxtData = {
      member_id: user_id,
    }
    postAPICall('userInfo', alltxtData).then((res) => {
      setdatadash(res.data.data);
      setactivationdate(res.data.data?.activation_date);
      setLoading(false)
    })

  }, []);
  console.log("iou897u89",datadash);
  return (
    <>

      <div className="main-panel">
        {/* <Partical /> */}
        {/* <Notification/> */}
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
                          <TopCard visible name={"Member Name"} value={userid?.user?.member_name ?? datadash.member_name} />
                        </div>
                        <div className="col-sm-4"> <TopCard visible name={"Member ID"} value={user_id} /></div>
                        <div className="col-sm-4">  <TopCard visible name={"Activation Date"} value={activationdate} /></div>
                      </div>
                      <div className="row">

                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-users  icoon_style " /> Direct Downline</span>
                              </h3>
                              <div className="">
                                <span>{datadash.direct}</span>

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />
                                  Current Level</span>
                              </h3>
                              <div className="">
                                <span>{datadash.level} : {levelName[datadash.level - 1]}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" /> Wallet Amount</span>
                              </h3>
                              <div className="">
                                <span>{parseInt(datadash.wallet_amount) + parseInt(datadash.pending_withdrawl_amount)}</span>
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
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />New Wallet</span>
                              </h3>
                              <div className="">
                                <span>{datadash?.new_wallet_amount ?? 0}</span>
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
                                <span>{datadash.withdrawl_amount ?? 0}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="transact">
                            <div className="transact-dom">
                              <h3>
                                <span> <i className="fa fa-inr  icoon_style  mr-2" />My Downlines</span>
                              </h3>
                              <div className="">
                                <span>{datadash.total_child}</span>
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
