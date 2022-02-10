import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getDirctSponcer } from "../redux/api_function";
import { useSelector } from "react-redux";
import TopCard from "../components/dashboard/TopCard";
import Partical from "../components/dashboard/Partical";
import axios from "axios";
import { postAPICall } from "../components/request";
export default function DirectSponcer() {
  const [directSponcer, setDirectSponcer] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [totalIncome,setIncome] = useState(0);
  const [Incomeh,setIncomeh] = useState(0);
  const [start, setStart] = useState();
  const [end, setEnd] = useState();

  const { id, wallet } = useSelector((state) => state.userinfo);
  const userid = JSON.parse(localStorage.getItem("userdata"));
  const user_id = userid.user?.member_id;
  const income_history=()=>{
    const alltxtData = {
      member_id: user_id ,
  }
    postAPICall('income_history',alltxtData).then((d)=>{
      // console.log(d.data.data);
      setIncomeh(d.data.data);
    })
  }
  useEffect(() => {
    income_history();
  }, []);

  const SortAbleCOmponent = React.useMemo(() => {
    return (
      <div className="form-inline">
        <div className="form-group p-2 mb-0">
          <label htmlFor="start" className="text-dark p-2">
            Start Date :
          </label>
          <input
            type="date"
            value={start}
            id="start"
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="form-group p-2 mb-0">
          <label htmlFor="end" className="text-dark p-2">
            End Date :
          </label>
          <input
            type="date"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div className="form-group">
          <div
            className="btn btn-primary"
            onClick={() => {
              console.log(start, end);
              setFilterData(
                directSponcer.filter(
                  (d) =>
                    new Date(d.registration_date) >= new Date(start) &&
                    new Date(d.registration_date) <= new Date(end)
                )
              );
            }}
          >
            Search
          </div>
        </div>
      </div>
    );
  }, [start, end]);

  const column = [
    {
      name: "member Id",
      selector: (row) => row.member_id,
      sortable: true,
    },
    {
      name: "Credited Amount",
      selector: (row) => row.credited_amount,
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
      sortable: true,
    },
    {
      name :"Date",
      selector:(row)=>row.Date,
      sortable:true
    }
  ];

  return (
    <>
      <div className="main-panel">
        <Partical />

        <div className="content-wrapper p-2">
          {/* <TopCard
            visible
            name={"Total  Direct Sponcer Income"}
            value={totalIncome}
          /> */}

          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Income Histroy</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    columns={column}
                    data={Incomeh}
                    subHeader
                    subHeaderComponent={SortAbleCOmponent}
                    //  pagination
                    paginationPerPage={10}
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
