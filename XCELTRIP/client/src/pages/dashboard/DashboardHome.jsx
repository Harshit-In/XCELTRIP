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
import { getFormData } from "../../helpers/helpers";
import { ranks } from "./data";

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
    { icon: "fas fa-coins", field: "bep20_wallet", label: "Smart Wallet" },
    { icon: "fas fa-coins", field: "investment", label: "Inexpress Wallet" },
    { icon: "fas fa-wallet", field: "coin_wallet", label: "Vibration Wallet" },
    {
      icon: "fas fa-wallet",
      field: "income_wallet",
      label: "Cashoneer Wallet",
    },
    { icon: "fas fa-coins", field: "direct_coin", label: "Direct Coins" },
    { icon: "fas fa-coins", field: "total_coin", label: "Total Coins" },
    { icon: "fas fa-users", field: "direct_members", label: "Direct Members" },
    { icon: "fas fa-users", field: "total_members", label: "Total Members" },
    {
      icon: "fas fa-coins",
      field: "cashback_earned",
      label: "Moneypal Wallet",
    },
  ];
  const percentage = [5, 10, 15, 20, 25, 30];

  async function transferToCoinWallet(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const fundRes = api.post("/fundInvestmentToCoin", formData);
    toast.promise(fundRes, {
      loading: "transfer in progress...",
      success: (data) => {
        return `Congratulations, you have successfully added fund to your wallet.`;
      },
      error: (err) => {
        return (
          err?.response?.data?.errors ??
          err?.response?.data?.message ??
          err?.message ??
          "OOPs something went wrong."
        );
      },
    });
  }

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
              <div className="col-md-4 mb-2">
                <div className="card card-body border-0 shadow-sm px-2 mb-2">
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
                        <div className="fw-bold" style={{ fontSize: "13px" }}>
                          {userInfo?.user?.email}
                        </div>

                        <table className="table table-borderless">
                          <tr>
                            <th className="p-1">Sponsor ID</th>
                            <td className="p-1">{`${userData.sponsor_id}`}</td>
                          </tr>
                          <tr>
                            <th className="p-1">Current Level</th>
                            <td className="p-1">
                              {`${ranks[userData.level]}` ?? "Not Available"}
                            </td>
                          </tr>
                          <tr>
                            <th className="p-1">Income Ratio</th>
                            <td className="p-1">
                              {`${percentage[userData.level]}%` ?? 0}
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md">
                <div className="row row-cols-3">
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
                              {userData[info.field] ?? 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            {/* WalletTransfer */}
            <div className="card card-body border shadow-sm mb-2">
              <div className="d-flex mb-2 justify-content-between align-items-center">
                <div style={{ fontSize: "13px", fontWeight: "bold" }}>
                  Transfer from Inexpress Wallet to Vibration Wallet
                </div>
              </div>
              <div>
                <form
                  onSubmit={(e) => {
                    transferToCoinWallet(e);
                  }}
                >
                  <input
                    type="hidden"
                    name="member_id"
                    value={userInfo?.user?.member_id}
                  />
                  <div class="input-group mb-3">
                    <input
                      type="number"
                      name="amount"
                      class="form-control"
                      placeholder="Amount"
                      aria-label="Amount"
                      aria-describedby="button-addon2"
                      min="0"
                      required
                    />
                    {/* <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      Transfer
                    </button> */}
                  </div>

                  <div class="input-group mb-3">
                    <input
                      type="password"
                      name="txn_password"
                      class="form-control"
                      placeholder="Transaction Password"
                      aria-label="Transaction Password"
                      aria-describedby="button-addon2"
                      min="0"
                      required
                    />
                    <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      Make Transaction
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
