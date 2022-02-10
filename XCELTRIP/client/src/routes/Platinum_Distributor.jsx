import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import TopCard from "../components/dashboard/TopCard";
import { getLevelIncome ,getLevelStatData} from "../redux/api_function";
import axios from "axios";
import { postAPICall } from "../components/request";
const PlatinumDistributor = () => {
  const [distributor,setdistributor] = useState([])
  const userid =JSON.parse(localStorage.getItem("userdata"));
  const user_id=userid.user.member_id;
const Platinum_Dis=()=>{
  const id = {
    member_id:user_id
  };
  postAPICall('income_history',id).then((d)=>{
 const data=d.data.data.filter((item)=>item.income_type=="PlatinumDistributor");
 setdistributor(data)
  })
}
  useEffect(() => {
    Platinum_Dis()
  }, []);
  console.log(distributor)
    return (
        <>
            <div className="main-panel">
      <Partical/>
        <div className="content-wrapper p-2">
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5> Platinum Distributor</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    data={distributor}
                    columns={[
                      {
                        name: "member id",
                        selector: (row) => row.member_id,
                        sortable: true,
                      },
                      {
                        name: "Total amount",
                        selector: (row) => row.total_amount,
                        sortable: true,
                      },
                      {
                        name: "Credited Amount",
                        selector: (row) => row.credited_amount,
                        sortable: true,
                      },
                      {
                        name: "Date",
                        selector: (row) => row.Date,
                        sortable: true,
                      },
                    ]}
                    persistTableHead
                    striped
                    paginationPerPage={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default PlatinumDistributor
