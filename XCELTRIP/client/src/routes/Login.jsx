import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, watchWallet } from "../redux/action/authAction";
import "./login.css";
import $ from "jquery";
import Partical from "../components/dashboard/Partical";
export default function Login(props) {
  const [userID, setUserId] = useState();
  const [loading, setLoading] = useState(false);
  const { isConnected } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    $("body").css({ background: "rgba(0,0,0,0.9)" });
  }, []);
  return (
    <div className="main-panel">
      <Partical />

      <div className="container vh-100 offset-md-2 justify-content-center align-items-center d-flex">
        <div className="row">
          <div className="col-12">
            <div className="row row-eq-height lockscreen  mt-5 mb-5">
              <div className=" d-flex flex-column lock-image col-12 col-sm-5 justify-content-center align-items-center">
                <img
                  src="images/logo-white.png"
                  height="50"
                  width="100%"
                  alt=""
                  className="mb-2"
                />
                <div className="form-group mb-0">
                  <p
                    className="text-light text-center "
                    style={{ fontSize: "16px" }}
                  >
                    For access to all the functions of your personal account,
                    use automatic login
                  </p>
                  <button
                    className="btn btn-warning btn-block"
                    // onClick={() => {
                    //   dispatch(
                    //     login((contract, wallet) =>
                    //       props.history.replace("/dashboard")
                    //     )
                    //   );
                    // }}
                  >
                    Automatic Login
                  </button>
                </div>
              </div>
              <div className="login-form col-12 col-sm-7">
                <div className="form-group mb-3">
                  <label
                    htmlFor="walletaddress"
                    className="text-center text-light"
                    style={{ fontSize: "16px" }}
                  >
                    To View Enter Account ID
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="accountId"
                    maxLength="6"
                    placeholder="Account ID"
                    style={{ background: "#ffffff89" }}
                    value={userID}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
                <div className="form-group mb-0 text-center">
                  <button
                    className="btn btn-warning btn-lg"
                    // onClick={() =>
                    //   dispatch(
                    //     watchWallet(userID, () =>
                    //       props.history.replace("/dashboard")
                    //     )
                    //   )
                    // }
                  >
                    View
                  </button>
                </div>
                <p className="my-2 text-muted text-center">
                  --- Or connect with ---
                </p>
                <div className="text-center">
                  <a className="btn btn-social  text-white mb-2">
                    <img
                      src="/auth/images/wallet/tronlink.png"
                      width="25"
                      alt=""
                    />
                  </a>
                  <a className="btn btn-social  text-white mb-2">
                    <img
                      src="/auth/images/wallet/klever.png"
                      width="25"
                      alt=""
                    />
                  </a>
                  <a className="btn btn-social  text-white mb-2">
                    <img
                      src="/auth/images/wallet/tokenpocket.png"
                      width="25"
                      alt=""
                    />
                  </a>
                  <a className="btn btn-social  text-white mb-2">
                    <img
                      src="/auth/images/wallet/imtoken.png"
                      width="25"
                      alt=""
                    />
                  </a>
                  <a className="btn btn-social  text-white mb-2">
                    <img
                      src="/auth/images/wallet/trustwallet.png"
                      width="25"
                      alt=""
                    />
                  </a>
                </div>
                <div className="mt-2 text-center">
                  Don't have an account?
                  <Link className="text-warning" to="/create">
                    Create an Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
