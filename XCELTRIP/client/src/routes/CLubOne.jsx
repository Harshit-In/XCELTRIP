import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { getUserClub1Reward ,withdraw} from "../redux/api_function";
import TopCard from "../components/dashboard/TopCard";
import Partical from "../components/dashboard/Partical";
import { NotificationManager } from "react-notifications";
export default function CLubOne() {
  const [club1Reward, setClubReward] = useState([]);
  const [totalClub, setClub] = useState(0);
  const { id, wallet,mode} = useSelector((state) => state.userinfo);
  useEffect(() => {
    getUserClub1Reward(wallet)
      .then((d) => {
        setClubReward(d.sort((a, b) => new Date(b.date) - new Date(a.date)));
        let ttl = 0;
        d.map((d) => {
          if (d.type == "deposit") {
            ttl += Math.round(d.income*1000)/1000;
          } else {
            ttl -= Math.round(d.income*1000)/1000;
          }
        });
        setClub(Math.round(ttl*1000)/1000);
      
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const subHeaderComponent = React.useMemo(() => {
    return (
      <div className="offset-md-4 col-md-4">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            value={totalClub}
            readOnly
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-primary"
              type="button"
              onClick={() => {
                if (totalClub > 0) {
                  withdraw(wallet, "club1")
                    .then((d) => {
                      console.log(d);
                      if (d.status == 1)
                        NotificationManager.success("withdraw success");
                      else NotificationManager.error("Something went wrong");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                } else {
                  NotificationManager.error("Low Balance");
                }
              }}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    );
  }, [totalClub]);
  return (
    <>
      <div className="main-panel">
        <Partical />

        <div className="content-wrapper p-2">
          <TopCard visible name={"Total Club Income"} value={totalClub} />
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>1% Club Income</h5>
                <div className="container" style={{ marginTop: "10px" }}>
                  <DataTable
                    columns={[
                      {
                        name: "SR No",
                        sortable: true,
                        selector: (r,id) => id+1,
                      },
                      {
                        name: "Income",
                        selector: (row) => row.income,
                      },
                      {
                        name: "Date",
                        selector: (row) => row.date,
                      },
                      {
                        name: "type",
                        selector: (row) => row.type,
                      },
                    ]}
                    data={club1Reward}
                    pagination
                    subHeader
                    subHeaderComponent={mode!='watch'&&subHeaderComponent}
                    persistTableHead
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
