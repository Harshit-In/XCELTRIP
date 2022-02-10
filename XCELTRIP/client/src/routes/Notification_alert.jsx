import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import { postAPICall } from "../components/request";
import { isNum } from "../redux/formvalidtion";
import data from "./bank.json";
import CustomSelect from "./CustomeSelect";
import { Country, State, City } from "country-state-city";
import api from "../api";
import "./Button.css";
import DataTable from "react-data-table-component";
const Notification_Alert = () => {
  const userid = JSON.parse(localStorage.getItem("userdata"));
  const info = JSON.parse(localStorage.getItem("userdata"));
  const usertoken = info?.token;
  const user_id = userid.user.member_id;
  const [Bankhsitory, setBankhsitory] = useState([]);
  const [toCityList, setToCityList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [toSelectedCity, setToSelectedCity] = useState("");

  const All_notification = () => {
    const id = {
      member_id: user_id,
    };
    api.post("getsupportTicket", id).then((d) => {
      setMessages([...d.data.ticket]);
      // datas.map((item)=>{
      //     console.log(item)
      // })
    });
  };

  const ExpandedComponent = ({ data }) => <div className="px-2 py-2">
      <div className="text-info"><strong>UserMessage: </strong> {data.user_message}</div>
      <div className="text-dark"><strong>Admin's Reply: </strong>{data.admin_reply}</div>
      </div>;

  useEffect(() => {
    All_notification();
  }, []);

  return (
    <>
      <div className="main-panel">
        <Partical />
        <div className="content-wrapper p-2">
          {/* <TopCard visible name={"Total Level Income"} value={totalLevelIncome} /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Notification's </h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    data={messages}
                    columns={[
                      {
                        name: "Level Name",
                        selector: (row) => row.member_id,
                        sortable: true,
                      },
                      {
                        name: "Amount",
                        selector: (row) => row.user_message,
                        sortable: true,
                      },
                      {
                        name: "Total Income",
                        selector: (row) => row.admin_reply,
                        sortable: true,
                        cell: (data) => (
                          <div className="text-truncate text-wrap">
                            {data.admin_reply.substring(0, 100)}
                          </div>
                        ),
                      },
                    ]}
                    expandableRows={true}
                    expandableRowsComponent={ExpandedComponent}
                    expandOnRowClicked={true}
                    //expandOnRowDoubleClicked={expandOnRowDoubleClicked}
                    //expandableRowsHideExpander={expandableRowsHideExpander}
                    persistTableHead
                    striped
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification_Alert;
