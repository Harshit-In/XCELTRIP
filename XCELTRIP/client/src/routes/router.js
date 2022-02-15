import React, { useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import Registration from "./Registration";
import new_login from "./new_login";

import Otp from "./otp";
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

            <Route
              exact
              path="/dashboard/user_dashboard/:member_id"
              component={(props) => <Dashboard {...props} />}
            />

            <Route
              exact
              path="/dashboard"
              component={(props) => <Dashboard {...props} />}
            />
            <Route exact path="/new_login" component={new_login} />
          </div>
        </div>
      </Switch>
    </>
  );
}
