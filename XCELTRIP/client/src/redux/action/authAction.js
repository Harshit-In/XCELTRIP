import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  SET_BALANCE,
  SET_CONNECT,
  SET_USER,
  SET_INSTANCE,
  SEND_AUTH,
} from "../constants";
import { NotificationManager } from "react-notifications";
import { loginlp, signupp } from "../api_function";
import { useHistory } from "react-router-dom";
export const onConnect = (name,password,email,userID,Cpassword,contact,resolve) => {
  return(dispatch)=>{
   try{
    signupp(name,password,email,userID,Cpassword,contact)
    .then((res)=>{
    
      dispatch({ type:SET_CONNECT, isConnected: true });   
    })
    resolve()
   }catch(err){
    NotificationManager.error("Something is wrong...");
    resolve()
   } 
  }
};

export function login(email, password,resolve) {
  return (dispatch) => {
    if(email ==""){
      NotificationManager.error("please enter memeber id");
      resolve()
    }if(password =="")
    {
      NotificationManager.error("please enter password first ")
      resolve()
    }else{
      loginlp(email, password)
      .then((res) =>{
        if(res.status === 200){
          NotificationManager.success("Login successfully")
          localStorage.setItem("userdata",JSON.stringify(res.data))
          dispatch({ type: AUTH_LOGIN ,data:res.data});
        }
        resolve()
      }).catch((error) => {
        NotificationManager.error("Please enter valid MemberId and Password");
        resolve()
        console.log('error: ', error.message)
      });
    }
   
  };
}
export function create(reffral_id, cb) {
  return async (dispatch) => {
    console.log(window.contract, window.userAddress);
    if (window.contract && window.userAddress) {
      window.contract.methods
        .isUserExists(window.userAddress)
        .call()
        .then((is_exist) => {
          if (is_exist) {
            NotificationManager.error("User Already Exist ", "Error", 2000);
          } else {
            window.contract.methods
              .idToAddress(reffral_id)
              .call()
              .then((ref) => {
                if (ref !== "0x0000000000000000000000000000000000000000") {
                  if (window.balance >= 1100) {
                    window.contract.methods
                      .registrationExt(ref)
                      .send({
                        from: window.userAddress,
                        value: "1100000000000000000000",
                      })
                      .then((d) => {
                        NotificationManager.success(
                          "Registation successfully completed . "
                        );
                        cb();
                      })
                      .catch(({ message, code, stack }) => {
                        console.log("Error :", message);
                      });
                  } else {
                    NotificationManager.error(
                      "Required 1100 FESS for create wallet but your wallet balance is " +
                        window.balance +
                        " FESS",
                      "Insufficient Balance",
                      5000
                    );
                  }
                } else {
                  NotificationManager.error(
                    "Invalid Reffral Id",
                    "Error",
                    2000
                  );
                }
              })
              .catch((e) => {
                NotificationManager.error(e, "Error", 2000);
              });
          }
        })
        .catch((e) => {
          NotificationManager.error(e.message, "Error", 2000);
        });
    } else {
      NotificationManager.error("Provider not Connected");
    }
  };
}
export function logout(cb) {
  return (dispatch) => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("dashboarddata");
    dispatch({ type: AUTH_LOGOUT });
    setTimeout(() => cb(), 200);
  };
}
