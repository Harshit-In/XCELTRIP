import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import TopCard from "../components/dashboard/TopCard";
import { getLevelIncome ,getLevelStatData} from "../redux/api_function";
import axios from "axios";
import { postAPICall } from "../components/request";
export default function AllIncome() {
  const [levelIncome, setLevelIncome] = useState([]);
  const [totalLevelIncome,setTotalLevel]=useState(0);
  const [allincome,setAllincome]=useState([]);
  const {id,wallet} = useSelector(state=>state.userinfo);
  const userid =JSON.parse(localStorage.getItem("userdata"));
  const user_id=userid.user.member_id;
const Allinc=()=>{
  const id = {
    member_id:user_id
  };
  postAPICall('income_history',id).then((d)=>{
 const data=d.data.data.filter((item)=>item.income_type=="GrowthDistributor");
 setAllincome(data)
})
}

  useEffect(() => {
    Allinc();
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
                <h5>Growth Distributor</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    data={allincome}
                    columns={[
                      {
                        name: "member id",
                        selector: (row) => row.member_id,
                        sortable: true,
                      },
                      {
                        name: "Income Type",
                        selector: (row) => row.income_type,
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
                      {
                        name: "total Amount",
                        selector: (row) => row.total_amount,
                        sortable: true,
                      },
                    ]}
                    persistTableHead
                    striped
                    // pagination
                    paginationPerPage={10}
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
