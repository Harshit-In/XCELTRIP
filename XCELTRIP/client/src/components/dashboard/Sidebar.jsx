import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import $ from "jquery";
import { logout } from "../../redux/action/authAction";
export default function Sidebar(props) {
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    $("body").addClass("sidebar-icon-only");
  }, []);
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <ul className="nav">
        <li
          className={
            location.pathname == "/dashboard" ? "nav-item active" : "nav-item"
          }
          id="myButton1"
        >
          <Link className="nav-link" to="/dashboard" style={{ color: "#517197" }}>
            <span className="icon-bg analtics">
              {/* <img src="/assets/images/analytics.png" /> */}
              <i
                class="fas fa-tachometer-alt"
                style={{ color: "#517197", fontSize: "20px" }}
              ></i>
            </span>
            Dashboard
          </Link>
        </li>

        <li
          className={
            location.pathname == "/dashboard/total_income"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
        </li>
        <li
          className={
            location.pathname == "/dashboard/Global Matrix"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
        </li>
        
        
        <li
          className={
            location.pathname == "/dashboard/Cashback"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Cashback" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
            <img src="/images/c.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
           Cashback Income
            
          </Link>
        </li>
       
        <li
          className={
            location.pathname == "/dashboard/Income_History"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton4"
        >
          <Link className="nav-link" to="/dashboard/Income_History" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
            <img src="/images/2024380 .png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            Income History
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/Directs"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton4"
        >
          <Link className="nav-link" to="/dashboard/Directs" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
            <img src="/images/user neww.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
           Direct History
          </Link>
        </li>
      </ul>
    </nav>
    


  );
}
