import React, { useEffect } from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Dashboard from "./Dashboard";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import Home from "./Home";
import All_member from "./All_member";
import LevelIncome from "./Globalmatrix";
import DirectSponcer from "./DirectSponcer";
import TotalIncome from "./TotalIncome";
import Binarical from "./Editprofile";
import GlobalPool from "./GlobalPool";
import PoolDirectSponcer from "./PoolDirectSponcer";
import MagicalPool from "./MagicalPool";
import WeeklyReward from "./WeeklyReward";
import DailyReward from "./DailyReward";
import CLubTwo from "./CLubTwo";
import Registration from "./Registration";
import { addDatatoBlockchain, startNow } from "../redux/helper_function";
import Top_Daily_Winners from "./Top_Daily_Winners";
import Top_Weekly_Winners from "./Top_Weekly_Winners";
import Today_Daily_Winners from "./Today_top_daily";
import Last_Week_Winner from "./Last_Week_Winner";
import new_login from "./new_login";
import AllIncome from "./Allincomes";
import Editprofile from "./Editprofile";
import ChangePass from "./ChangePass";
import Forgetpass from "./Forgetpass";
import Cashbackincome from "./cashback_income";
import Clubincome from "./Clubincome";
import PlatinumDistributor from "./Platinum_Distributor";
import Rewardincome from "./Rewardincome";
import Frenchiseincome from "./Frenchiseincome";
import SeniorDistributor from "./SeniorDistributor";
import AddKyc from "./Addkyc";
import RegistrationSuccessful from "./RegistrationSuccessful";
import Bank_details from "./Bank_details";
import PackageCheckout from "./PackageCheckout";
import Otp from "./otp";
import Newpassword from "./Newpassword";
import Support from "./Support";
import Notification from "./Notification";
import Leveofmember from "./Leveofmember";
import Notification_Alert from "./Notification_alert";
import Globalmatrix from "./Globalmatrix";
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
          {location.pathname.startsWith("/dashboard") && isLoggedIn && (
            <Notification />
          )}

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
            <Route exact path="/" component={Home} />
            <Route
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
              path="/Forget_Password"
              component={(props) =>
                !isLoggedIn ? (
                  <Forgetpass {...props} />
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
            <Route exact path="/ChangePassword" component={Newpassword} />
            <Route
              exact
              path="/registration_successful"
              component={() => <RegistrationSuccessful {...props} />}
            />

            <Route
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
              path="/dashboard/all_member"
              component={(props) =>
                isLoggedIn ? (
                  <All_member {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Global Matrix"
              component={(props) =>
                isLoggedIn ? (
                  <Globalmatrix {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Directs"
              component={(props) =>
                isLoggedIn ? (
                  <Leveofmember {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/GrowthDistributor"
              component={(props) =>
                isLoggedIn ? (
                  <AllIncome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Cashback"
              component={(props) =>
                isLoggedIn ? (
                  <Cashbackincome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/support"
              component={(props) =>
                isLoggedIn ? (
                  <Support {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Business_distributo"
              component={(props) =>
                isLoggedIn ? (
                  <Clubincome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Platinum_Distributor"
              component={(props) =>
                isLoggedIn ? (
                  <PlatinumDistributor {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Senior_Distributor"
              component={(props) =>
                isLoggedIn ? (
                  <SeniorDistributor {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Repurchase_income"
              component={(props) =>
                isLoggedIn ? (
                  <Rewardincome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Franchise_income"
              component={(props) =>
                isLoggedIn ? (
                  <Frenchiseincome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />

            <Route
              path="/dashboard/Income_History"
              component={(props) =>
                isLoggedIn ? (
                  <DirectSponcer {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Addkyc"
              component={(props) =>
                isLoggedIn ? (
                  <AddKyc {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/bank_details"
              component={(props) =>
                isLoggedIn ? (
                  <Bank_details {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Notification"
              component={(props) =>
                isLoggedIn ? (
                  <Notification_Alert {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/products"
              component={(props) =>
                isLoggedIn ? (
                  <TotalIncome {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/Edit_Profile"
              component={(props) =>
                isLoggedIn ? (
                  <Editprofile {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/changepass"
              component={(props) =>
                isLoggedIn ? (
                  <ChangePass {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/global_pool"
              component={(props) =>
                isLoggedIn ? (
                  <GlobalPool {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/pool_sponcer"
              component={(props) =>
                isLoggedIn ? (
                  <PoolDirectSponcer {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/magical_pool"
              component={(props) =>
                isLoggedIn ? (
                  <MagicalPool {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/daily_reward"
              component={(props) =>
                isLoggedIn ? (
                  <DailyReward {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/weekly_reward"
              component={(props) =>
                isLoggedIn ? (
                  <WeeklyReward {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route
              path="/dashboard/withdrawal"
              component={(props) =>
                isLoggedIn ? (
                  <CLubTwo {...props} />
                ) : (
                  <Redirect to="/new_login" />
                )
              }
            />
            <Route path="/daily_reward_winners" component={Top_Daily_Winners} />
            <Route
              path="/last_weekly_reward_winners"
              component={Last_Week_Winner}
            />
            <Route
              path="/today_daily_winners"
              component={Today_Daily_Winners}
            />
            <Route
              path="/weekly_reward_winners"
              component={Top_Weekly_Winners}
            />
            <Route path="/new_login" component={new_login} />
            <Route
              exact
              path="/dashboard/package_checkout"
              component={PackageCheckout}
            />
          </div>
        </div>
      </Switch>
    </>
  );
}
