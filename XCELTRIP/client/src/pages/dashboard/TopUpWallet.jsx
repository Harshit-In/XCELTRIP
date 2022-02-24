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
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getFormData } from "../../helpers/helpers";
export default function TopUpWallet() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [fundHistory, setFundHistory] = useState([]);
  const topupColumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "level", headerName: "Level", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "coin_wallet", headerName: "Coin Wallet", width: 200 },
    { field: "income_wallet", headerName: "Income Wallet", width: 200 },
    { field: "createdAt", headerName: "Topup Date", type: "date", width: 150 },
  ];
  const fundColumns = [
    { field: "from", headerName: "Transfered From", width: 150 },
    { field: "to", headerName: "Transfered To", width: 200 },
    { field: "amount", headerName: "Amount", width: 200 },
    {
      field: "createdAt",
      headerName: "Transfer Date",
      type: "date",
      width: 150,
    },
  ];

  async function topupUrWallet(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const topupRes = api.post("/createTopup", formData);

    toast.promise(topupRes, {
      loading: "Topup in progress...",
      success: (data) => {
        getLevelIncome();
        return `Congratulations, topup successful.`;
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

  async function transferFund(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    const fundRes = api.post("/fundTransferUserToUser", formData);

    toast.promise(fundRes, {
      loading: "Fund transfer in progress...",
      success: (data) => {
        getFundTransferHistory();
        return `Congratulations, you have successfully transfered fund.`;
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

  async function getLevelIncome() {
    api
      .post("getIncomeHistory", {
        member_id: userInfo?.user?.member_id,
        income_type: "Topup Income",
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

  async function getFundTransferHistory() {
    api
      .post("getFundTransferHistory", {
        from: userInfo?.user?.member_id,
      })
      .then((res) => {
        console.log("LevelIncome:: ", res.data.data);
        setFundHistory([...res.data.data]);
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
    await getLevelIncome();
    await getFundTransferHistory();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Wallet Topup */}
        <div className="col-lg-6">
          <div className="d-block mb-2">
            <h2 className="h4 my-0">Topup your Wallet</h2>
          </div>
          <form
            onSubmit={(e) => {
              topupUrWallet(e);
            }}
          >
            <input
              type="hidden"
              name="member_id"
              value={userInfo?.user?.member_id}
            />
            <div class="d-flex align-items-center">
              <div className="mr-2">
                <strong>Topup With : </strong>
              </div>
              <div className="mr-2">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="coin_ratio"
                    id="exampleRadios1"
                    value="100"
                    checked
                  />
                  <label class="form-check-label m-0" for="exampleRadios1">
                    100% Coins
                  </label>
                </div>
              </div>
              <div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="coin_ratio"
                    id="exampleRadios2"
                    value="50"
                  />
                  <label class="form-check-label m-0" for="exampleRadios2">
                    50% Coins
                  </label>
                </div>
              </div>
            </div>

            <div class="input-group mb-3">
              <input
                type="number"
                name="amount"
                class="form-control"
                placeholder="Topup Amount"
                aria-label="Topup Amount"
                aria-describedby="button-addon2"
                min="0"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Topup Wallet
              </button>
            </div>
          </form>
        </div>
        {/* FundTransfer */}
        <div className="col-lg-6">
          <div className="d-block mb-2">
            <h2 className="h4 my-0">Transfer Fund</h2>
          </div>
          <form
            onSubmit={(e) => {
              transferFund(e);
            }}
          >
            <input
              type="hidden"
              name="user_id"
              value={userInfo?.user?.member_id}
            />
            <div className="form-group mb-2">
              <input
                type="text"
                name="downline_id"
                class="form-control"
                placeholder="Member ID"
                aria-label="Member ID"
                aria-describedby="fund_transfer"
                required
              />
            </div>

            <div class="input-group mb-3">
              <input
                type="number"
                name="amount"
                class="form-control"
                placeholder="Fund Amount"
                aria-label="Fund Amount"
                aria-describedby="fund_transfer"
                min="0"
                required
              />
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="fund_transfer"
              >
                Transfer Fund
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Income History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Topup History</h2>
          <p className="mb-0">All your topups are here...</p>
        </div>
        <DataGrid
          //loading={loadingData}
          getRowId={(r) => r._id}
          rows={tableData}
          columns={topupColumns}
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
      {/* FundTransfer History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Fund Transfer History</h2>
          <p className="mb-0">All your fund transfers are here...</p>
        </div>
        <DataGrid
          //loading={loadingData}
          getRowId={(r) => r._id}
          rows={fundHistory}
          columns={fundColumns}
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
  );
}
