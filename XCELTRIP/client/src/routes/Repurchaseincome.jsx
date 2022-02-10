import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import Partical from "../components/dashboard/Partical";
import TopCard from "../components/dashboard/TopCard";
import { getLevelIncome ,getLevelStatData} from "../redux/api_function";

const Repurchaseincome = () => {
//     const [levelIncome, setLevelIncome] = useState([]);
//   const [totalLevelIncome,setTotalLevel] =useState(0);
//   const {id,wallet} = useSelector(state=>state.userinfo);
//   useEffect(() => {
//     getLevelStatData(wallet)
//       .then((d) => {
//         setLevelIncome(d);
//         let tot=0;
//         d.map(r=>tot+=r.total_income)
//         setTotalLevel(tot);
//         console.log(d);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }, []);
    return (
        <>
            <div className="main-panel">
      <Partical/>
        <div className="content-wrapper p-2">
        {/* <TopCard visible name={"Total Level Income"} value={totalLevelIncome} /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5> All Income</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    // data={levelIncome}
                    columns={[
                      {
                        name: "Level",
                        selector: (row) => row.level,
                        sortable: true,
                      },
                      {
                        name: "Member Name",
                        selector: (row) => row.total_member,
                        sortable: true,
                      },
                      {
                        name: "Total Income",
                        selector: (row) => row.total_income,
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

export default Repurchaseincome
