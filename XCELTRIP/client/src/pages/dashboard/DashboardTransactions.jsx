import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import api from "../../utils/api";

export default function DashboardTrasactions() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    api.post("getFundTransferHistory", {from: userInfo?.user?.member_id}).then((res) => {
      console.log(res.data);
      setTransactions([...res.data.data]);
    }).catch((error) => {
      toast.error("Something went wrong.")
    })
  }, [])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
            <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li className="breadcrumb-item">
                <a href="#">
                  <span className="fas fa-home"></span>
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Volt</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Transactions
              </li>
            </ol>
          </nav>
          <h2 className="h4">All Orders</h2>
          <p className="mb-0">Your web analytics dashboard template.</p>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group">
            <button type="button" className="btn btn-sm btn-outline-primary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-primary">
              Export
            </button>
          </div>
        </div>
      </div>
      <div className="table-settings mb-4">
        <div className="row align-items-center justify-content-between">
          <div className="col col-md-6 col-lg-3 col-xl-4">
            <div className="input-group">
              <span className="input-group-text" id="basic-addon2">
                <span className="fas fa-search"></span>
              </span>
              <input
                type="text"
                className="form-control"
                id="exampleInputIconLeft"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div className="col-4 col-md-2 col-xl-1 pl-md-0 text-right">
            <div className="btn-group">
              <button
                className="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon-sm icon-gray">
                  <span className="fas fa-cog"></span>
                </span>
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                <span className="dropdown-item font-weight-bold text-dark">
                  Show
                </span>
                <a className="dropdown-item d-flex font-weight-bold" href="#">
                  10{" "}
                  <span className="icon icon-small ml-auto">
                    <span className="fas fa-check"></span>
                  </span>
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  20
                </a>
                <a className="dropdown-item font-weight-bold" href="#">
                  30
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-body border-light shadow-sm table-wrapper table-responsive pt-0">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr>
                <td>
                
                </td>
                <td>
                  {transaction.from}
                </td>
                <td>
                  {transaction.to}
                </td>
                <td>
                  {transaction.amount}
                </td>
                <td>
                  <span className="font-weight-normal">{transaction.createdAt}</span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-footer px-3 border-0 d-flex align-items-center justify-content-between">
          <nav aria-label="Page navigation example">
            <ul className="pagination mb-0">
              <li className="page-item">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  4
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  5
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
          <div className="font-weight-bold small">
            Showing <b>5</b> out of <b>25</b> entries
          </div>
        </div>
      </div>
    </>
  );
}
