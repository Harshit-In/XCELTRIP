import React, { useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  Redirect,
  NavLink,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import Registration from "./Registration";
import new_login from "./new_login";

import Otp from "./otp";
import SignInForm from "./auth/SignInForm";
import SignUpForm from "./auth/SignUpForm";
export default function Router(props) {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.userinfo.isLoggedIn);
  console.log(isLoggedIn);
  useEffect(() => {}, []);
  return (
    <>
      <Switch>
        <div
          className={
            location.pathname.startsWith("/dashboard")
              ? "container-scroller"
              : ""
          }
        >
          {location.pathname.startsWith("/dashboard") && <Topbar />}
          <div
            className={
              location.pathname.startsWith("/dashboard")
                ? "container-fluid page-body-wrapper"
                : ""
            }
          >
            {location.pathname.startsWith("/dashboard") && (
              <Sidebar {...props} />
            )}
            {/* <Route exact path="/" component={Home} /> */}
            <Route
              exact
              path="/new_login"
              component={(props) =>
                !isLoggedIn ? (
                  <new_login {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />

            <Route
              exact
              path="/create"
              component={(props) =>
                !isLoggedIn ? (
                  <Registration {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route exact path="/otp" component={Otp} />

            <Route
              exact
              path="/create/ref"
              component={(props) =>
                !isLoggedIn ? (
                  <Registration {...props} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />

            <Route
              exact
              path="/dashboard"
              component={(props) =>
                isLoggedIn ? (
                  <Dashboard {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />

            {/* <Route
              exact
              path="/dashboard/user_dashboard/:member_id"
              component={(props) => <Dashboard {...props} />}
            /> */}

            {/* <Route
              exact
              path="/dashboard/package_checkout"
              component={PackageCheckout}
            />

            {/* <Route exact path="/" component={SignUpForm} />
            <Route path="/sign-in" component={SignInForm} /> */}

            <div className="App">
              <div className="appAside" />
              <div className="appForm">
                <div className="pageSwitcher">
                  <NavLink
                    to="/sign-in"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    exact
                    to="/"
                    activeClassName="pageSwitcherItem-active"
                    className="pageSwitcherItem"
                  >
                    Sign Up
                  </NavLink>
                </div>

                <div className="formTitle">
                  <NavLink
                    to="/sign-in"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                  >
                    Sign In
                  </NavLink>{" "}
                  or{" "}
                  <NavLink
                    exact
                    to="/"
                    activeClassName="formTitleLink-active"
                    className="formTitleLink"
                  >
                    Sign Up
                  </NavLink>
                </div>

                <Route exact path="/" component={SignUpForm} />
                <Route path="/sign-in" component={SignInForm} />
              </div>
            </div>
          </div>
        </div>
      </Switch>
    </>
  );
}
