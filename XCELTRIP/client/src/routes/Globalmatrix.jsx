import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import TopCard from "../components/dashboard/TopCard";
import { getLevelIncome ,getLevelStatData} from "../redux/api_function";
import axios from "axios";
import { postAPICall } from "../components/request";
export default function Globalmatrix() {
 const {id,wallet} = useSelector(state=>state.userinfo);
 
 const userid =JSON.parse(localStorage.getItem("userdata"));
 const user_id=userid.user.member_id;
//  console.log(user_id)
const [DistributorIncome, setDistributorIncome]=useState([]);
  const allincome=()=>{
    const id = {
      member_id:user_id
    };
    postAPICall('admin/get_matrix_user',id).then((d)=>{
      const New_DistributorIncome =d.data[0]
      setDistributorIncome([New_DistributorIncome]);
      console.log(New_DistributorIncome);
   })
  }
  useEffect(() => {
    allincome()
  }, []); 
  return (
    <>
      <div className="main-panel">
      <Partical/>
        <div className="content-wrapper p-2">
        {/* <TopCard visible name={"Total Level Income"} value={totalLevelIncome} /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Distributor Income</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    data={DistributorIncome}
                    columns={[
                      {
                        name: "Member id",
                        selector: (row) => row.member_id,
                        sortable: true,
                      },
                      {
                        name: "Matrix",
                        selector: (row) => row.matrix_id,
                        sortable: true,
                      },
                      {
                        name: "Member (Team)",
                        selector: (row) => row.team,
                        sortable: true,
                      },
                      
                    ]}
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
}
