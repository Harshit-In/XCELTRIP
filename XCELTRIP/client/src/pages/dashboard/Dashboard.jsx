import { Route, Routes, useParams } from "react-router-dom";
import DashboardNav from "../../components/DashboardNav";
import DashboardAreaNav from "./DashboardAreaNav";
import DashboardFooter from "./DashboardFooter";
import DashboardHome from "./DashboardHome";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTrasactions from "./DashboardTransactions";
import Settings from "./Settings";
import getWeb3 from "../../helpers/getWeb3";
import {ContractABI,ContractAddress,TokenABI,TokenAddress} from "../../helpers/config";
import { useDispatch } from "react-redux";
import { connection } from "../../redux/User";
import { useEffect } from "react";
import { useSelector } from "react-redux";


export default function Dashboard() {
const dispatch=  useDispatch();
const state = useSelector(state=>state);
 const onConnect= () => {
   return new Promise(async (resolve,reject)=>{
    try {
      const web3 = await getWeb3();
      const contract = new web3.eth.Contract(ContractABI, ContractAddress);
      const token_contract = new web3.eth.Contract(TokenABI, TokenAddress);
      const accounts = await web3.eth.getAccounts();
      web3.currentProvider.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
      const balance = await new web3.eth.getBalance(accounts[0]);
      web3.currentProvider.on("networkChanged", function (networkId) {
        window.location.reload();
      });
      window.userAddress=accounts[0];
      window.contract=contract;
      window.balance=balance/1e18;
      window.token_contract =token_contract;
      dispatch(connection({isWalletConnected: true}));
      resolve("connected");
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      reject("Error");
      console.error(err);
    }
   });

}

const onDeposit = ()=>{
  console.log("isWalletConnected",state)
  if(state){
    window.token_contract.methods.approve(ContractAddress,(100*1e18).toString()).send({from:window.userAddress,value:0}).then(d=>{
      console.log("Approved");
      window.contract.methods.deposit((100*1e18).toString()).send({from:window.userAddress,value:0}).then(d=>{console.log("Deposite Successfull")}).catch(e=>{console.log("Error::",e)})
    }).catch(e=>{
    console.log("Error:: ",e);
  })
  }
}
  const { page } = useParams();
  const pages = {
    settings: <Settings />,
    transactions: <DashboardTrasactions />,
  };

  useEffect(()=>{
    onConnect().then(()=>{
      onDeposit()
    }).catch(e=>{
      console.log("Error::",e);
    })
  },[]);

  return (
    <>
      <DashboardNav />
      <div className="container-fluid bg-soft">
        <div className="row">
          <div className="col-12">
            {/* DashboardSidebar */}
            <DashboardSidebar />
            <main className="content">
              {/* DashboardNav */}
              <DashboardAreaNav />
              {pages?.[page] ? pages[page] : <DashboardHome />}
              {/* DashboardFooter */}
              {/* <DashboardFooter /> */}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
