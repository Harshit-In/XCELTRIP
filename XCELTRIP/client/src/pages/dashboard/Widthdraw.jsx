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

export default function Widthdraw() {
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

  async function widthdrawAmount(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);

    const fundRes = api.post("/widthdrawl", formData);
    toast.promise(fundRes, {
      loading: "widthdrawl in progress...",
      success: (data) => {
        e.target.reset();
        return `Congratulations, you have successfully widthdrawl.`;
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

  useEffect(async () => {
    await getLevelIncome();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Widthdrawl Form */}
        <div className="col-lg-6">
          <div className="d-block mb-4 mb-md-0 mb-2">
            <h2 className="h4 my-0">Widthdraw Amount</h2>
          </div>
          <form
            onSubmit={(e) => {
              widthdrawAmount(e);
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
                placeholder="Amount to widthdraw"
                aria-label="Amount to widthdraw"
                aria-describedby="button-addon2"
                min="0"
                required
              />
              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="wallet_type"
              >
                <option selected disabled>Select Wallet</option>
                <option value="income_wallet">Income Wallet</option>
                <option value="cashback_wallet">Cashback Wallet</option>
              </select>
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Widthdraw
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Widthdrawal History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Widthdraw History</h2>
          <p className="mb-0">All your widthdrawals are here...</p>
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
    </div>
  );
}
