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
          <Link className="nav-link" to="/dashboard/products" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <i
                class="fa fa-shopping-bag"
                style={{ color: "#517197", fontSize: "20px" }}
              ></i>
            </span>
           Purchase Package
           
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/Global Matrix"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Global Matrix" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <img src="/images/p.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            Global Matrix
          </Link>
        </li>
        
        {/* <li
          className={
            location.pathname == "/dashboard/level_income"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/level_income">
            <span className="icon-bg svgs">
              <img src="/images/d.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            <span className="menu-title"> New Distributor 
            </span>
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/Business_distributo"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Business_distributo">
            <span className="icon-bg svgs">
            <img src="/images/b.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            <span className="menu-title"> Business Distributor
            </span>
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/GrowthDistributor"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/GrowthDistributor">
            <span className="icon-bg svgs">
            <img src="/images/g.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            <span className="menu-title">Growth Distributor
            </span>
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/Platinum_Distributor"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Platinum_Distributor">
            <span className="icon-bg svgs">
            <img src="/images/p.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            <span className="menu-title">Platinum Distributor
            </span>
          </Link>
        </li> */}
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
        {/* <li
          className={
            location.pathname == "/dashboard/Senior_Distributor"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Senior_Distributor">
            <span className="icon-bg svgs">
            <img src="/images/s.png" alt="" className="" style={{color: "#517197", width: "37px"}}/>
            </span>
            <span className="menu-title">Senior Distributor
            </span>
          </Link>
        </li> */}
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
            <span className="menu-title">Income History</span>
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
        {/* <li
          className={
            location.pathname == "/dashboard/Addkyc"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton4"
        >
          <Link className="nav-link" to="/dashboard/Addkyc">
            <span className="icon-bg svgs">
              <i class="side-menu__icon fas fa-book" style={{ color: "#517197", fontSize: "20px" }} />
            </span>
            <span className="menu-title">KYC</span>
          </Link>
        </li> */}
        <li
          className={
            location.pathname == "/dashboard/bank_details"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton4"
        >
          <Link className="nav-link" to="/dashboard/bank_details" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <i class="side-menu__icon fas fa-money" style={{ color: "#517197", fontSize: "20px" }} />
            </span>
            Bank Details
          </Link>
        </li>
        <li
          className={
            location.pathname == "/dashboard/Notification"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton4"
        >
          <Link className="nav-link" to="/dashboard/Notification" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <i class="side-menu__icon fas fa-comment-dots" style={{ color: "#517197", fontSize: "20px" }} />
            </span>
           Notification
          </Link>
        </li>
        {/* <li
          className={
            location.pathname == "/dashboard/Edit_Profile"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/Edit_Profile" style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <i
                class="fas fas fa-edit"
                style={{ color: "#517197", fontSize: "20px" }}
              ></i>
            </span>
             Edit Profile
         
          </Link>
        </li> */}

        <li
          className={
            location.pathname == "/dashboard/changepass"
              ? "nav-item active"
              : "nav-item"
          }
          id="myButton"
        >
          <Link className="nav-link" to="/dashboard/support"   style={{ color: "#517197" }}>
            <span className="icon-bg svgs">
              <i
                class="fa fa-share-square-o"
                style={{ color: "#517197", fontSize: "20px" }}
              ></i>
            </span>
            Support
           
          </Link>
        </li>

      </ul>
    </nav>
    


  );
}
