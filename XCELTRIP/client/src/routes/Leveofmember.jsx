import React,{useEffect,useState} from 'react'
import DataTable from "react-data-table-component";
import Partical from "../components/dashboard/Partical";
import { postAPICall, postAPICallto } from "../components/request";

const Leveofmember = () => {
    const [Directmember, setDirectmember] = useState([])
   
    const userid = JSON.parse(localStorage.getItem("userdata"));
    const user_id = userid.user?.member_id;
  
   
    useEffect(() => {

        const alltxtData = {
          member_id: user_id,
        }
        postAPICall('getdirect', alltxtData).then((res) => {
          setDirectmember(res.data.total_member_of_direct);
          console.log(res.data.total_member_of_direct)
        })
      }, []);
      const active =1;
    return (
        <>
              <div className="main-panel">
        <Partical />
        {/* <Notification/> */}
        <div className="content-wrapper p-2">
           
        <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Your Directs</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                <DataTable
                    data={Directmember}
                    columns={[
                      {
                        name: "Member ID",
                        selector: (row) => row.member_id,
                        sortable: true,
                      },
                      {
                        name: "Total Member",
                        selector: (row) => row.total_member,
                        sortable: true,
                      },
                      {
                        name: "Member name",
                        selector: (row) => row.member_name,
                        sortable: true,
                      },
                      {
                        name: "Direct",
                        selector: (row) => row.total_Direct,
                        sortable: true,
                      },
                      {
                        name: "Status",
                        cell: (row) =>row.activeStatus===active?(<p style={{background: "#bfeebf",
                          padding: "3px 16px 3px 15px",
                          marginTop: "15%",
                          color: "#189217",
                          borderRadius: "19px"}}>Active</p>):( <p className="text-warning" style={{background: "#fffedc",
                          padding: "3px 16px 3px 15px",
                          marginTop: "15%",
                          color: "#c9860d",
                          borderRadius: "19px"}}>inactive </p>),
                        sortable: true,
                      }
                    ]}
                    persistTableHead
                    striped
                    pagination
                    paginationPerPage={7}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <MainTree/>
      */}
        </div>

      </div>
        </>
    )
}

export default Leveofmember
