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
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Tree from "react-hierarchy-tree-graph";
import { getFormData } from "../../helpers/helpers";

export default function MyDownlines() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [tableData, setTableData] = useState([]);
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
    api
      .post("/createTopup", formData)
      .then((res) => {
        e.target.reset();
        toast.success("Congratulations, topup successful.");
        //dispatch(login({ isLoggedIn: true, userInfo: res.data }));
        //navigate("../dashboard", { replace: true });
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.errors ??
            error?.response?.data?.message ??
            error?.message ??
            "OOPs something went wrong."
        );
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
  
  const myTreeData = [
    {
      name: 'Top Level',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      children: [
        {
          name: 'Level 2: A',
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
        },
        {
          name: 'Level 2: B',
        },
      ],
    },
  ];

  useEffect(async () => {
    await getLevelIncome();
  }, []);
  return (
    <div className="container-fluid">
      {/*  */}
      <div id="treeWrapper">
          <Tree data={myTreeData} />
        </div>
    </div>
  );
}
