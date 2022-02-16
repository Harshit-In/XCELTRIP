import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/action/authAction";
import {Link} from "react-router-dom" 
import $ from 'jquery';
export default function Topbar() {
  const dispatch = useDispatch();
  return (
    <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
      <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
        <a className="navbar-brand brand-logo" href="index.html">
          <img src="/images/logo.png" alt="logo" />
        </a>
        <a className="navbar-brand brand-logo-mini" href="index.html">
          <img src="/images/favicon.png" alt="logo" />
        </a>
      </div>
      <div className="navbar-menu-wrapper d-flex align-items-stretch">
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          data-toggle="minimize"
        >
          <span className="mdi mdi-menu"></span>
        </button>
        <ul className="navbar-nav navbar-nav-right">
        <Link className="nav-link" to="/dashboard/changepass">
          <li className="nav-item dropdown">
        
            <div className="launchs2">
           Change Password
            </div>
         
          </li>
          </Link>
          <li className="nav-item dropdown">
            <button className="launchs" onClick={()=>dispatch(logout(()=>{}))}>
              Logout
            </button>
            <div
              className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list"
              aria-labelledby="notificationDropdown"
            ></div>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={()=>$('#sidebar').toggleClass("sidebar-offcanvas")}
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
}
