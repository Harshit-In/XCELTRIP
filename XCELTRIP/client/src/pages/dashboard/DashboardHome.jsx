import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import NewTaskExport from "./NewTaskExport";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
  GridSearchIcon,
  GridFilterInputDate,
} from "@mui/x-data-grid";
import { Chip, Stack } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCheckDouble,
  faChevronCircleUp,
  faCoffee,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

export default function DashboardHome() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);
  const [tableData, setTableData] = useState([]);
  const columns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Joined On", type: "date", width: 150 },
  ];
  const newJoinings = [
    { member_id: "XELL000001", name: "Demo User", img: "" },
    { member_id: "XELL000003", name: "Demo User", img: "" },
    { member_id: "XELL000003", name: "Demo User", img: "" },
    { member_id: "XELL000004", name: "Demo User", img: "" },
  ];

  const infoArray = [
    { icon: "fas fa-wallet", field: "coin_wallet", label: "Coin Wallet" },
    { icon: "fas fa-wallet", field: "income_wallet", label: "Income Wallet" },
    { icon: "fas fa-coins", field: "direct_coin", label: "Direct Coins" },
    { icon: "fas fa-coins", field: "total_coin", label: "Total Coins" },
    { icon: "fas fa-coins", field: "total_coin", label: "Current Investment" },
    { icon: "fas fa-users", field: "direct_members", label: "Direct Members" },
    { icon: "fas fa-users", field: "total_members", label: "Total Members" },
    { icon: "fas fa-coins", field: "total_coin", label: "Cashback Earned" },
  ];

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: userInfo?.user?.member_id })
      .then((res) => {
        console.log("userInfo :: ", res.data.data);
        setUserData({ ...res.data.data });
        setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function getLevelIncome() {
    api
      .post("getIncomeHistory", {
        member_id: userInfo?.user?.member_id,
        income_type: "Incom from downline",
      })
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
        setTableData([...res.data.data]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  useEffect(async () => {
    await getUsersInfo();
    await getLevelIncome();
  }, []);
  return (
    <>
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-9">
            <div className="row row-cols-1">
              <div className="col mb-2">
                <div className="card card-body border-0 shadow-sm">
                  <div className="d-flex">
                    <div className="d-flex">
                      <div className="me-2">
                        <img
                          class="user-avatar md-avatar rounded-circle"
                          alt="Image placeholder"
                          src="/theme_files/assets/img/team/profile-picture-3.jpg"
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
                          {userInfo?.user?.member_id}
                        </div>
                        <div style={{ fontSize: "12px" }}>
                          {userInfo?.user?.email}
                        </div>

                        <div style={{ fontSize: "12px" }}>
                          <span className="fw-bold text-uppercase">
                            Sponsor ID :{" "}
                          </span>
                          {userData.sponsor_id}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-cols-4">
              {infoArray.map((info) => (
                <div className="col mb-2">
                  <div className="card card-body border-0 shadow-sm">
                    <h6 className="fw-bold my-0">{info.label}</h6>
                    <div className="d-flex align-items-center">
                      <div className="mr-2">
                        <span className="flink-icon text-light">
                          <span className={info.icon}></span>
                        </span>
                      </div>
                      <div>
                        <span className="fw-bold fs-5">
                          {userData[info.field]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="my-2">
              <div className="d-block mb-4 mb-md-0 mb-2">
                <h2 className="h4 my-0">Level Incomes</h2>
                <p className="mb-0">Your web analytics dashboard template.</p>
              </div>
              <DataGrid
                //loading={loadingData}
                getRowId={(r) => r._id}
                rows={tableData}
                columns={columns}
                //rowCount={totalUsers}
                pageSize={10}
                //rowsPerPageOptions={[10, 25, 25, 50, 100]}
                //checkboxSelection
                //paginationMode="server"
                //onFilterModelChange={onFilterChange}
                //onPageChange={handlePageChange}
                autoHeight={true}
                className="bg-white"
                //components={{
                //  Toolbar: CustomToolbar,
                //}}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card card-body border shadow-sm">
              <div className="d-flex mb-2 justify-content-between align-items-center">
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  New Joinings..
                </div>

                <div>
                  <Link
                    to="downlines"
                    className="text-success"
                    style={{ fontSize: "12px", fontWeight: "bold" }}
                  >
                    View All
                  </Link>
                </div>
              </div>
              <div>
                {directChilds.map((user) => (
                  <Link
                    to=""
                    className="d-flex my-2 justify-content-between align-items-center user-item scale border rounded p-2"
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <img
                          class="user-avatar md-avatar rounded-circle"
                          alt="Image placeholder"
                          src="/theme_files/assets/img/team/profile-picture-3.jpg"
                        />
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                          {user.member_id}
                        </div>
                        <div style={{ fontSize: "10px" }}>{user.email}</div>
                      </div>
                    </div>
                    <div>
                      {/* <span className={userData.status == 1 ? "fas fa-badge-check" : "fas fa-badge" }></span> */}
                      {user.status == 1 ? (
                        <FontAwesomeIcon
                          className="text-success"
                          icon={faCheckDouble}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="text-warning"
                          icon={faCheck}
                        />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  <div className="row justify-content-md-center">
        <div className="col-12 mb-4">
          <div className="card bg-yellow-alt shadow-sm">
            <div className="card-header d-flex flex-row align-items-center flex-0">
              <div className="d-block">
                <div className="h5 font-weight-normal mb-2">Sales Value</div>
                <h2 className="h3">$10,567</h2>
                <div className="small mt-2">
                  <span className="font-weight-bold mr-2">Yesterday</span>
                  <span className="fas fa-angle-up text-success"></span>
                  <span className="text-success font-weight-bold">10.57%</span>
                </div>
              </div>
              <div className="d-flex ml-auto">
                <a href="#" className="btn btn-secondary text-dark btn-sm mr-2">
                  Month
                </a>
                <a href="#" className="btn btn-primary btn-sm mr-3">
                  Week
                </a>
              </div>
            </div>
            <div className="card-body p-2">
              <div className="ct-chart-sales-value ct-double-octave ct-series-g"></div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-light shadow-sm">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon icon-shape icon-md icon-shape-blue rounded mr-4 mr-sm-0">
                    <span className="fas fa-chart-line"></span>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="h5">Customers</h2>
                    <h3 className="mb-1">345,678</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Customers</h2>
                    <h3 className="mb-1">345k</h3>
                  </div>
                  <small>
                    Feb 1 - Apr 1,{" "}
                    <span className="icon icon-small">
                      <span className="fas fa-globe-europe"></span>
                    </span>{" "}
                    WorldWide
                  </small>
                  <div className="small mt-2">
                    <span className="fas fa-angle-up text-success"></span>
                    <span className="text-success font-weight-bold">
                      18.2%
                    </span>{" "}
                    Since last month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-light shadow-sm">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon icon-shape icon-md icon-shape-secondary rounded mr-4">
                    <span className="fas fa-cash-register"></span>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="h5">Revenue</h2>
                    <h3 className="mb-1">$43,594</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Revenue</h2>
                    <h3 className="mb-1">$43,594</h3>
                  </div>
                  <small>
                    Feb 1 - Apr 1,{" "}
                    <span className="icon icon-small">
                      <span className="fas fa-globe-europe"></span>
                    </span>{" "}
                    Worldwide
                  </small>
                  <div className="small mt-2">
                    <span className="fas fa-angle-up text-success"></span>
                    <span className="text-success font-weight-bold">
                      28.2%
                    </span>{" "}
                    Since last month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-light shadow-sm">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="ct-chart-traffic-share ct-golden-section ct-series-a"></div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <h2 className="h5 mb-3">Traffic Share</h2>
                  <h6 className="font-weight-normal text-gray">
                    <span className="icon w-20 icon-xs icon-secondary mr-1">
                      <span className="fas fa-desktop"></span>
                    </span>{" "}
                    Desktop{" "}
                    <a href="#" className="h6">
                      60%
                    </a>
                  </h6>
                  <h6 className="font-weight-normal text-gray">
                    <span className="icon w-20 icon-xs icon-primary mr-1">
                      <span className="fas fa-mobile-alt"></span>
                    </span>{" "}
                    Mobile Web{" "}
                    <a href="#" className="h6">
                      30%
                    </a>
                  </h6>
                  <h6 className="font-weight-normal text-gray">
                    <span className="icon w-20 icon-xs icon-tertiary mr-1">
                      <span className="fas fa-tablet-alt"></span>
                    </span>{" "}
                    Tablet Web{" "}
                    <a href="#" className="h6">
                      10%
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-8 mb-4">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-light shadow-sm">
                <div className="card-header">
                  <div className="row align-items-center">
                    <div className="col">
                      <h2 className="h5">Page visits</h2>
                    </div>
                    <div className="col text-right">
                      <a href="#" className="btn btn-sm btn-secondary">
                        See all
                      </a>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table align-items-center table-flush">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Page name</th>
                        <th scope="col">Page Views</th>
                        <th scope="col">Page Value</th>
                        <th scope="col">Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">/demo/admin/index.html</th>
                        <td>3,225</td>
                        <td>$20</td>
                        <td>
                          <span className="fas fa-arrow-up text-danger mr-3"></span>{" "}
                          42,55%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/demo/admin/forms.html</th>
                        <td>2,987</td>
                        <td>0</td>
                        <td>
                          <span className="fas fa-arrow-down text-success mr-3"></span>{" "}
                          43,52%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/demo/admin/util.html</th>
                        <td>2,844</td>
                        <td>294</td>
                        <td>
                          <span className="fas fa-arrow-down text-success mr-3"></span>{" "}
                          32,35%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/demo/admin/validation.html</th>
                        <td>2,050</td>
                        <td>$147</td>
                        <td>
                          <span className="fas fa-arrow-up text-danger mr-3"></span>{" "}
                          50,87%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/demo/admin/modals.html</th>
                        <td>1,483</td>
                        <td>$19</td>
                        <td>
                          <span className="fas fa-arrow-down text-success mr-3"></span>{" "}
                          32,24%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <div className="card border-light shadow-sm">
                <div className="card-header border-bottom border-light d-flex justify-content-between">
                  <h2 className="h5 mb-0">Team members</h2>
                  <a href="#" className="btn btn-sm btn-secondary">
                    See all
                  </a>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush list my--3">
                    <li className="list-group-item px-0">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <a href="#" className="user-avatar">
                            <img
                              className="rounded-circle"
                              alt="Image placeholder"
                              src="/theme_files/assets/img/team/profile-picture-1.jpg"
                            />
                          </a>
                        </div>
                        <div className="col-auto ml--2">
                          <h4 className="h6 mb-0">
                            <a href="#">Christopher Wood</a>
                          </h4>
                          <span className="text-success">●</span>
                          <small>Online</small>
                        </div>
                        <div className="col text-right">
                          <a href="#" className="btn btn-sm btn-tertiary">
                            <i className="fas fa-calendar-check mr-1"></i>{" "}
                            Invite
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <a href="#" className="user-avatar">
                            <img
                              className="rounded-circle"
                              alt="Image placeholder"
                              src="/theme_files/assets/img/team/profile-picture-2.jpg"
                            />
                          </a>
                        </div>
                        <div className="col-auto ml--2">
                          <h4 className="h6 mb-0">
                            <a href="#">Jose Leos</a>
                          </h4>
                          <span className="text-warning">●</span>
                          <small>In a meeting</small>
                        </div>
                        <div className="col text-right">
                          <a href="#" className="btn btn-sm btn-tertiary">
                            <i className="fas fa-comment mr-1"></i> Message
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <a href="#" className="user-avatar">
                            <img
                              className="rounded-circle"
                              alt="Image placeholder"
                              src="/theme_files/assets/img/team/profile-picture-3.jpg"
                            />
                          </a>
                        </div>
                        <div className="col-auto ml--2">
                          <h4 className="h6 mb-0">
                            <a href="#">Bonnie Green</a>
                          </h4>
                          <span className="text-danger">●</span>
                          <small>Offline</small>
                        </div>
                        <div className="col text-right">
                          <a href="#" className="btn btn-sm btn-tertiary">
                            <i className="fas fa-calendar-check mr-1"></i>{" "}
                            Invite
                          </a>
                        </div>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <a href="#" className="user-avatar">
                            <img
                              className="rounded-circle"
                              alt="Image placeholder"
                              src="/theme_files/assets/img/team/profile-picture-4.jpg"
                            />
                          </a>
                        </div>
                        <div className="col-auto ml--2">
                          <h4 className="h6 mb-0">
                            <a href="#">Neil Sims</a>
                          </h4>
                          <span className="text-success">●</span>
                          <small>Online</small>
                        </div>
                        <div className="col text-right">
                          <a href="#" className="btn btn-sm btn-tertiary">
                            <i className="fas fa-comment mr-1"></i> Message
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 mb-4">
              <div className="card border-light shadow-sm">
                <div className="card-header border-bottom border-light">
                  <h2 className="h5 mb-0">Progress track</h2>
                </div>
                <div className="card-body">
                  <div className="row align-items-center mb-4">
                    <div className="col-auto">
                      <span className="icon icon-md text-purple">
                        <span className="fab fa-bootstrap"></span>
                      </span>
                    </div>
                    <div className="col">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="h6 mb-0">Rocket - SaaS Template</div>
                          <div className="small font-weight-bold text-dark">
                            <span>34 %</span>
                          </div>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-purple"
                            role="progressbar"
                            aria-valuenow="34"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "34%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-auto">
                      <span className="icon icon-md text-danger">
                        <span className="fab fa-angular"></span>
                      </span>
                    </div>
                    <div className="col">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="h6 mb-0">Pixel - Design System</div>
                          <div className="small font-weight-bold text-dark">
                            <span>60 %</span>
                          </div>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-danger"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-auto">
                      <span className="icon icon-md text-success">
                        <span className="fab fa-vuejs"></span>
                      </span>
                    </div>
                    <div className="col">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="h6 mb-0">
                            Spaces - Listings Template
                          </div>
                          <div className="small font-weight-bold text-dark">
                            <span>45 %</span>
                          </div>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-tertiary"
                            role="progressbar"
                            aria-valuenow="45"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center mb-4">
                    <div className="col-auto">
                      <span className="icon icon-md text-info">
                        <span className="fab fa-react"></span>
                      </span>
                    </div>
                    <div className="col">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="h6 mb-0">Stellar - Dashboard</div>
                          <div className="small font-weight-bold text-dark">
                            <span>35 %</span>
                          </div>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-info"
                            role="progressbar"
                            aria-valuenow="35"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "35%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <span className="icon icon-md text-purple">
                        <span className="fab fa-bootstrap"></span>
                      </span>
                    </div>
                    <div className="col">
                      <div className="progress-wrapper">
                        <div className="progress-info">
                          <div className="h6 mb-0">Volt - Dashboard</div>
                          <div className="small font-weight-bold text-dark">
                            <span>34 %</span>
                          </div>
                        </div>
                        <div className="progress mb-0">
                          <div
                            className="progress-bar bg-purple"
                            role="progressbar"
                            aria-valuenow="34"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "34%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4 mb-4">
          <div className="col-12 mb-4">
            <div className="card border-light shadow-sm">
              <div className="card-body d-flex flex-row align-items-center flex-0 border-bottom">
                <div className="d-block">
                  <div className="h6 font-weight-normal text-gray mb-2">
                    Total orders
                  </div>
                  <h2 className="h3">452</h2>
                  <div className="small mt-2">
                    <span className="fas fa-angle-up text-success"></span>
                    <span className="text-success font-weight-bold">18.2%</span>
                  </div>
                </div>
                <div className="d-block ml-auto">
                  <div className="d-flex align-items-center text-right mb-2">
                    <span className="shape-xs rounded-circle bg-quaternary mr-2"></span>
                    <span className="font-weight-normal small">July</span>
                  </div>
                  <div className="d-flex align-items-center text-right">
                    <span className="shape-xs rounded-circle bg-secondary mr-2"></span>
                    <span className="font-weight-normal small">August</span>
                  </div>
                </div>
              </div>
              <div className="card-body p-2">
                <div className="ct-chart-ranking ct-golden-section ct-series-a"></div>
              </div>
            </div>
          </div>
          <div className="col-12 px-0 mb-4">
            <div className="card border-light shadow-sm">
              <div className="card-body">
                <div className="d-flex align-items-center justify-content-between border-bottom border-light pb-3">
                  <div>
                    <h6 className="mb-0">
                      <span className="icon icon-xs mr-3">
                        <span className="fas fa-globe-europe"></span>
                      </span>
                      Global Rank
                    </h6>
                  </div>
                  <div>
                    <a href="#" className="text-primary font-weight-bold">
                      #755
                      <span className="fas fa-chart-line ml-2"></span>
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between border-bottom border-light py-3">
                  <div>
                    <h6 className="mb-0">
                      <span className="icon icon-xs mr-3">
                        <span className="fas fa-flag-usa"></span>
                      </span>
                      Country Rank
                    </h6>
                    <div className="small card-stats">
                      United States
                      <span className="icon icon-xs text-success ml-2">
                        <span className="fas fa-angle-up"></span>
                      </span>
                    </div>
                  </div>
                  <div>
                    <a href="#" className="text-primary font-weight-bold">
                      #32
                      <span className="fas fa-chart-line ml-2"></span>
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-3">
                  <div>
                    <h6 className="mb-0">
                      <span className="icon icon-xs mr-3">
                        <span className="fas fa-folder-open"></span>
                      </span>
                      Category Rank
                    </h6>
                    <a href="#" className="small card-stats">
                      Travel &gt; Accomodation
                    </a>
                  </div>
                  <div>
                    <a href="#" className="text-primary font-weight-bold">
                      #16
                      <span className="fas fa-chart-line ml-2"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 px-0 mb-4">
            <div className="card border-light shadow-sm">
              <div className="card-body">
                <h2 className="h5">Acquisition</h2>
                <p>
                  Tells you where your visitors originated from, such as search
                  engines, social networks or website referrals.
                </p>
                <div className="d-block">
                  <div className="d-flex align-items-center pt-3 mr-5">
                    <div className="icon icon-shape icon-sm icon-shape-danger rounded mr-3">
                      <span className="fas fa-chart-bar"></span>
                    </div>
                    <div className="d-block">
                      <label className="mb-0">Bounce Rate</label>
                      <h4 className="mb-0">33.50%</h4>
                    </div>
                  </div>
                  <div className="d-flex align-items-center pt-3">
                    <div className="icon icon-shape icon-sm icon-shape-quaternary rounded mr-3">
                      <span className="fas fa-chart-area"></span>
                    </div>
                    <div className="d-block">
                      <label className="mb-0">Sessions</label>
                      <h4 className="mb-0">9,567</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
