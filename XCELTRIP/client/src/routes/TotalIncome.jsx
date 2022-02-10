import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import Partical from "../components/dashboard/Partical";
import axios from "axios";
import { prepend } from "dom-helpers";
import { getStatesOfCountry } from "country-state-city/dist/lib/state";
import { useHistory } from "react-router-dom";
export default function TotalIncome() {
  const history = useHistory();
  const info = JSON.parse(localStorage.getItem("userdata"));
  const usertoken = info?.token;
  const user_id = info.user.member_id;
  const member_name = info.user.member_name;
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [franchises, setFranchises] = useState([]);
  const [filteredFranchises, setFilteredFranchises] = useState([]);
  const [franchisesList, setFranchisesList] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState({});
  const { id, userdata } = useSelector((state) => state.userinfo);
  const [allStates, setAllStates] = useState(getStatesOfCountry("IN"));


  const getproduct = async () => {
    const headers = { Authorization: `Bearer ${usertoken}` };
    return axios
      .post("https://api.Myfastearn.in/api/admin/getProduct/", {role: "package"},{ headers })
      .then((res) => {
        setAllProducts([...res.data.Product]);
        setProducts([...res.data.Product]);
      });
  };

  const getfranchise = async () => {
    const headers = { Authorization: `Bearer ${usertoken}` };
    return axios
      .post("https://api.Myfastearn.in/api/admin/getFranchise", {}, {headers})
      .then((res) => {
        setFranchises([...res.data.Franchise]);
      });
  };

  const getPackagesRequests = async (status) => {
    const headers = { Authorization: `Bearer ${usertoken}` };
    const res = await axios.post("https://api.Myfastearn.in/api/franchise/getBuy_Package", { status });
    return res.data.Product;
  };

  useEffect(async () => {
    await getproduct();
    await getfranchise();
  }, []);

  useEffect(async () => {
    const fList = franchises.map((franchise) => {
      return <option value={franchise.franchise_id}>{franchise.franchise_name}</option>
    });
    setFranchisesList(fList);
  }, [franchises]);

  useEffect(async () => {
    const fList = filteredFranchises.map((franchise) => {
      return <option value={franchise.franchise_id}>{franchise.franchise_name}</option>
    });
    setFranchisesList(fList);
  }, [filteredFranchises]);

  const BuyNow = (product_id) => {
    const data = {
      member_id: user_id,
      product_id: product_id,
    };
    if(selectedFranchise?.franchise_id) {
      history.push(`/dashboard/package_checkout?member_id=${user_id}&product_id=${product_id}&franchise_id=${selectedFranchise.franchise_id}`);
    } else {
      NotificationManager.error("Please a franchise.");
    }
    
    /* try {
      const headers = { Authorization: `Bearer ${usertoken}` };
      return axios
        .post("https://api.Myfastearn.in/api/buy_package", data, { headers })
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            NotificationManager.success("This Package Successfully Add in your Account");
          }
          if (res.status === 400) {
            NotificationManager.error("Something went wrong");
          }
          if (res.status === 200) {
            NotificationManager.warning(
              "You Should have to buy a joining package first"
            );
          }
        });
    } catch (error) {
      console.log((error) => "error");
    } */
  };

  useEffect(() => {
    console.log("Show Products", selectedFranchise.products);
    console.log(allProducts);
    const franchiseProducts = allProducts.filter((item) => selectedFranchise.products.includes(item.product_id));
    console.log(franchiseProducts);
    setProducts(franchiseProducts);
  }, [selectedFranchise])

  return (
    <>
      <div className="main-panel">
        <Partical />

        <div className="content-wrapper p-2">
          {/* <TopCard visible name={"Total Income"} value={tIncome} /> */}
          <div className="row">
            <div className="col-md-12">
              <div className="main-containers">
                <h5>Purchase Package</h5>
                <div className="row mt-2">
                  <div className="col-md-2">
                    <div className="form-group">
                      <label for="franchise_state">Select State</label>
                      <select className="form-control" name="franchise_state" id="franchise_state" onChange={(e) => {
                        setFilteredFranchises([...franchises.filter((franchise) => franchise.state == e.target.value)]);
                      }}>
                        <option selected disabled>Select State</option>
                        {allStates.map((state) => (<option value={state.isoCode}>{state.name}</option>))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-group">
                      <label for="franchise">Select Franchise</label>
                      <select className="form-control" name="franchise" id="franchise" onChange={(e) => {
                        const finfo = franchises.filter((item) => item.franchise_id == e.target.value);
                        setSelectedFranchise(finfo[0]);
                      }}>
                        <option selected disabled>Select Franchise</option>
                        {franchisesList}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="container" style={{ marginTop: "10px" }}>
                  <div className="row">
                    {products.map((item) => (
                      <div className="col-lg-3">
                        <div class="card" style={{ borderRadius: "10px" }}>
                          <img
                            src={"https://myfastearn.in/images/fastearn_product.jpeg"}
                            style={{ width: "100%" }}
                          />
                          <div className="card-body px-2 py-2">
                            <div className="row">
                              <input type="hidden" value={item.product_id} />
                              <div className="col-lg-12">
                                Product Name:&nbsp; {item.product_name}
                              </div>
                              <div className="col-lg-12">
                                cost: &nbsp; {item.product_price}
                              </div>
                              <div className="col-lg-12">
                                Description: &nbsp; {item.description}
                              </div>
                            </div>
                            <div className="text-right">
                              <button className="btn btn-info" onClick={(e) => BuyNow(item.product_id, item.product_name)}>Buy Now</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
