import { useEffect } from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import api from "../api";
import Partical from "../components/dashboard/Partical";

export default function PackageCheckout(props) {
    const params = new URLSearchParams(window.location.search);
    const memberID = params.get('member_id');
    const packageID = params.get('product_id');
    const franchiseID = params.get('franchise_id');
    const [productInfo, setProductInfo] = useState({});
    const [franchiseInfo, setFranchiseInfo] = useState({});
    const [isPackagePurchased, setIsPackagePurchased] = useState(false);
    const [purchaseRequest, setPurchaseRequest] = useState({});
    const info = JSON.parse(localStorage.getItem("userdata"));

    const usertoken = info?.token;
    const headers = { Authorization: `Bearer ${usertoken}` };

    const packageProduct = [
        { product_name: "Product One", description: "Product One Description" },
        { product_name: "Product Two", description: "Product Two Description" },
        { product_name: "Product Three", description: "Product Three Description" },
        { product_name: "Product Four", description: "Product Four Description" },
    ]

    const getPackageInfo = async () => {
        api.post('admin/getProduct', { product_id: packageID }, { headers }).then((res) => {
            setProductInfo(res.data.Product[0])
        }).catch((error) => {
            NotificationManager.error('Something went wrong.');
        })
    }

    const getFranchiseInfo = async () => {
        api.post('admin/getFranchise', { franchise_id: franchiseID }, { headers }).then((res) => {
            setFranchiseInfo(res.data.Franchise[0])
        }).catch((error) => {
            NotificationManager.error('Something went wrong.');
        })
    }

    const buyPackage = async () => {
        api.post('buy_package', { franchise_id: franchiseID, product_id: packageID, member_id: memberID }, { headers }).then((res) => {
            setIsPackagePurchased(true);
            setPurchaseRequest(res.data.data)
        }).catch((error) => {
            NotificationManager.error('Something went wrong.');
        })
    }

    useEffect(async () => {
        await getFranchiseInfo();
        await getPackageInfo();
    }, [])
    return (
        <div className="main-panel">
            <Partical />
            <div className="content-wrapper p-2">
                <div className="row justify-content-center">
                    <div className="col-6 ">
                        {isPackagePurchased
                            ?
                            <div className="p-3 text-dark text-center" style={{ background: "rgba(255,255,255,.9)", borderRadius: "10px" }}>
                                <h1 className="text-success">Congratulations</h1>
                                <p className="text-dark">you have successfully purchased <q><strong>{productInfo?.product_name}</strong></q>.<br/> Kindly save your product order number.</p>
                                <h6>Product Order No : { purchaseRequest?.order_no ?? "Not Generated"}</h6>

                            </div>
                            :
                            <div className="p-3 text-dark" style={{ background: "rgba(255,255,255,.9)", borderRadius: "10px" }}>
                                {/* <div className="text-center"><h1 className="text-center text-dark">Checkout</h1></div> */}
                                <div className="text-center"><h2 className="text-center text-dark">{franchiseInfo?.franchise_name}</h2></div>
                                <div className=""><h3 className="text-dark">Order Summary</h3></div>
                                <hr className="my-3 w-100" />
                                <table>
                                    <tr><th>Member ID :</th><td>{memberID}</td></tr>
                                    <tr><th>Member Name :</th><td>{info?.user?.member_name}</td></tr>
                                </table>
                                <hr className="my-3 w-100" />
                                {
                                    packageProduct.map((product) =>
                                        <div className="d-flex justify-content-between my-2">
                                            <div className="">
                                                <div>{product.product_name}</div>
                                                <div><small>{product.description}</small></div>
                                            </div>
                                            {/* <div className="">{productInfo?.product_price}</div> */}
                                        </div>
                                    )
                                }
                                <hr className="my-3 w-100" />
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="font-weight-bold">Total</div>
                                    <div className="font-weight-bold ">{productInfo?.product_price} <span className="fa fa-rupee"></span></div>
                                </div>
                                <hr className="my-3 w-100" />
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={(e) => { buyPackage() }}>Purchase Package</button>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>

    )
}