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

export default function AddFund() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
  const [fundHistory, setFundHistory] = useState([]);
  const topupColumns = [
    { field: "member_id", headerName: "Member ID", width: 150 },
    { field: "trans_hash", headerName: "Transaction ID", width: 150 },
    { field: "amount", headerName: "Amount", width: 200 },
    { field: "createdAt", headerName: "Topup Date", type: "date", width: 150 },
  ];

  async function addFund(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    formData.trans_hash = "X0000223"
    console.log(formData);
    const fundRes = api.post("/investment", formData);

    toast.promise(fundRes, {
      loading: "Fund transfer in progress...",
      success: (data) => {
        getInvestmentHistory();
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

  async function getInvestmentHistory() {
    api
      .post("getcreateInvestment", {
        member_id: userInfo?.user?.member_id,
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
    await getInvestmentHistory();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Widthdrawl Form */}
        <div className="col-lg-6">
          <div className="d-block mb-4 mb-md-0 mb-2">
            <h2 className="h4 my-0">Add Fund</h2>
          </div>
          <form
            onSubmit={(e) => {
              addFund(e);
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
              <button
                class="btn btn-outline-secondary"
                type="submit"
                id="button-addon2"
              >
                Add Fund
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Widthdrawal History */}
      <div className="my-3">
        <div className="d-block mb-4 mb-md-0 mb-2">
          <h2 className="h4 my-0">Investment History</h2>
          <p className="mb-0">All your investments are here...</p>
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
