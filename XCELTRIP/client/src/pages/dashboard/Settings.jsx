import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getFormData } from "../../helpers/helpers";
import api from "../../utils/api";
import { ranks } from "./data";
//import Web3 from 'web3'

export default function Settings() {
  const { isLoggedIn, userInfo } = useSelector((state) => state?.user?.value);
  const [userData, setUserData] = useState({});
  const [directChilds, setDirectChilds] = useState([]);

  async function getUsersInfo() {
    api
      .post("userInfo", { member_id: userInfo?.user?.member_id })
      .then((res) => {
        setUserData({ ...res.data.data });
        setDirectChilds([...res.data.directChild]);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message ??
            error.message ??
            "OOPs, Something went wrong."
        );
      });
  }

  async function changePassword(e) {
    e.preventDefault();
    const formData = getFormData(e.target);
    console.log(formData);
    const fundRes = api.post("/change_password", formData);

    toast.promise(fundRes, {
      loading: "Changing password....",
      success: (data) => {
        return `Congratulations, your password has been changed.`;
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
  useEffect(async () => {
    await getUsersInfo();

    /* Web3 */
    //const web3 = new Web3('https://bsc-dataseed1.binance.org/')
    //console.log("web3::",web3);
  }, []);
  return (
    <>
      {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div>
          <button
            className="btn btn-secondary text-dark mr-2 dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="fas fa-plus mr-2"></span>New
          </button>
          <div className="dropdown-menu dashboard-dropdown dropdown-menu-left mt-2">
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="far fa-file-alt mr-2"></span>Document
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="far fa-comment-dots mr-2"></span>Message
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-box-open mr-2"></span>Product
            </a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-rocket text-danger mr-2"></span>
              Subscription Plan
            </a>
          </div>
        </div>
        <div>
          <button type="button" className="btn btn-primary mr-2">
            <span className="fas fa-calendar-alt"></span>
          </button>
          <button
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="fas fa-clipboard mr-2"></span>Reports
            <span className="icon icon-small ml-1">
              <span className="fas fa-chevron-down"></span>
            </span>
          </button>
          <div className="dropdown-menu dashboard-dropdown dropdown-menu-left mt-2">
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-box-open mr-2"></span>Products
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-store mr-2"></span>Customers
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-cart-arrow-down mr-2"></span>Orders
            </a>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-chart-pie mr-2"></span>Console
            </a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item font-weight-bold" href="#">
              <span className="fas fa-rocket text-success mr-2"></span>All
              Reports
            </a>
          </div>
        </div>
      </div> */}
      <div className="row">
        <div className="col-12 col-xl-8">
          <div className="card card-body bg-white border-light shadow-sm mb-4">
            <h2 className="h5 mb-4">General information</h2>
            <form>
              <div className="row">
                <div className="col-md mb-3">
                  <div>
                    <label for="first_name">First Name</label>
                    <input
                      className="form-control"
                      id="first_name"
                      type="text"
                      placeholder="Full Name"
                      defaultValue={userData.full_name}
                      required
                    />
                  </div>
                </div>
               {/*  <div className="col-md-6 mb-3">
                  <div>
                    <label for="last_name">Last Name</label>
                    <input
                      className="form-control"
                      id="last_name"
                      type="text"
                      placeholder="Also your last name"
                      required
                    />
                  </div>
                </div> */}
              </div>
              {/* <div className="row align-items-center">
                <div className="col-md-6 mb-3">
                  <label for="birthday">Birthday</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <span className="far fa-calendar-alt"></span>
                    </span>
                    <input
                      data-datepicker=""
                      className="form-control"
                      id="birthday"
                      type="text"
                      placeholder="dd/mm/yyyy"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label for="gender">Gender</label>
                  <select
                    className="form-select mb-0"
                    id="gender"
                    aria-label="Gender select example"
                  >
                    <option selected>Gender</option>
                    <option value="1">Female</option>
                    <option value="2">Male</option>
                  </select>
                </div>
              </div> */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="email">Email</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      defaultValue={userData.email}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="form-group">
                    <label for="phone">Phone</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="+12-345 678 910"
                      defaultValue={userData.mobile}
                      required
                    />
                  </div>
                </div>
              </div>
              {/* <h2 className="h5 my-4">Adress</h2>
              <div className="row">
                <div className="col-sm-9 mb-3">
                  <div className="form-group">
                    <label for="address">Address</label>
                    <input
                      className="form-control"
                      id="address"
                      type="text"
                      placeholder="Enter your home address"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-3 mb-3">
                  <div className="form-group">
                    <label for="number">Number</label>
                    <input
                      className="form-control"
                      id="number"
                      type="number"
                      placeholder="No."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4 mb-3">
                  <div className="form-group">
                    <label for="city">City</label>
                    <input
                      className="form-control"
                      id="city"
                      type="text"
                      placeholder="City"
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="zip">ZIP</label>
                    <input
                      className="form-control"
                      id="zip"
                      type="tel"
                      placeholder="ZIP"
                      required
                    />
                  </div>
                </div>
              </div> */}
              <div className="mt-3">
                <button type="submit" className="btn btn-primary">
                  Save All
                </button>
              </div>
            </form>
          </div>

          {/* Change Password Thing */}
          <div className="card card-body bg-white border-light shadow-sm mb-4">
            <h2 className="h5">Change Passwords</h2>
            <form onClick={(e)=>{changePassword(e)}}>
              <input type="hidden" name="member_id" value={userData.member_id} />
              <input type="hidden" name="password_type" value="password" />
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="old_pass">Old Password</label>
                    <input
                      className="form-control"
                      id="old_pass"
                      type="password"
                      placeholder="Old Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="first_name">New password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="New Password"
                      name="pass"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="last_name">Confirm Password</label>
                    <input
                      className="form-control"
                      id="confirm_pass"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>

            <h2 className="h5 mt-4">Change Transaction Password</h2>
            <form onClick={(e)=>{changePassword(e)}}>
              <input type="hidden" name="member_id" value={userData.member_id} />
              <input type="hidden" name="password_type" value="txn_password" />
              <div className="row">
              <div className="col-md-4 mb-3">
                  <div>
                    <label for="old_pass">Old Password</label>
                    <input
                      className="form-control"
                      id="old_pass"
                      type="password"
                      placeholder="Old Password"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="txn_pass">New Password</label>
                    <input
                      className="form-control"
                      id="txn_pass"
                      type="password"
                      placeholder="New Transaction Password"
                      name="pass"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div>
                    <label for="new_txn_pass">Confirm Password</label>
                    <input
                      className="form-control"
                      id="new_txn_pass"
                      type="password"
                      placeholder="Confirm Password"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="mt-1">
                <button type="submit" className="btn btn-primary">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="row">
            <div className="col-12 mb-4">
              <div className="card border-light text-center p-0">
                <div
                  className="profile-cover rounded-top"
                  data-background="/theme_files/assets/img/profile-cover.jpg"
                ></div>
                <div className="card-body pb-5">
                  <img
                    src="/theme_files/assets/img/team/profile-picture-1.jpg"
                    className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
                    alt="Neil Portrait"
                  />
                  <h6 className="h6">{userData?.email}</h6>
                  <h6 className="h6">
                    Current Level : {ranks[userData.level]}
                  </h6>
                  <a className="btn btn-sm btn-primary mr-2" href="#">
                    <span className="fas fa-user-plus mr-1"></span> Connect
                  </a>
                  <a className="btn btn-sm btn-secondary" href="#">
                    Send Message
                  </a>
                </div>
              </div>
            </div>
            {/* Select6 Profile Picture */}
            {/* <div className="col-12">
              <div className="card card-body bg-white border-light shadow-sm mb-4">
                <h2 className="h5 mb-4">Select profile photo</h2>
                <div className="d-xl-flex align-items-center">
                  <div>
                    <div className="user-avatar xl-avatar mb-3">
                      <img
                        className="rounded"
                        src="/theme_files/assets/img/team/profile-picture-3.jpg"
                        alt="change avatar"
                      />
                    </div>
                  </div>
                  <div className="file-field">
                    <div className="d-flex justify-content-xl-center ml-xl-3">
                      <div className="d-flex">
                        <span className="icon icon-md">
                          <span className="fas fa-paperclip mr-3"></span>
                        </span>{" "}
                        <input type="file" />
                        <div className="d-md-block text-left">
                          <div className="font-weight-normal text-dark mb-1">
                            Choose Image
                          </div>
                          <div className="text-gray small">
                            JPG, GIF or PNG. Max size of 800K
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
