import axios from "axios";
import { NotificationManager } from "react-notifications";
import { postAPICall } from "../components/request";
const URI = "https://api.Myfastearn.in/api/signup";
const info = JSON.parse(localStorage.getItem("userdata"));
const usertoken = info?.token;
var controller = new AbortController();

export function viewMode(user) {
  return fetch(URI, {
    method: "POST",
    signal: controller.signal,
    body: JSON.stringify({
      action: "VIEW",
      user_id: user,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function loginlp(email, password) {
  return new Promise((resolve, reject) => {
    const alltxtData = {
      email: email,
      password: password,
  }
  console.log(alltxtData);
  postAPICall('signin',alltxtData)
      .then((res) => resolve(res))
      .catch((error) => {
        console.log("error: ", error.message);
        reject(error);
      });
  });
}
export async function signupp(name, password, email, userID,Cpassword,contact) {
  const alltxtData = {
    member_name: name,
    email: email,
    password: password,
    sponsor_id: userID.toUpperCase(),
    conform_password:Cpassword,
    contact: contact
}
postAPICall('signup',alltxtData).then((res)=>{
  if(res.status==200){
    NotificationManager.success("Success")
    const uInfo = res.data.data;
    window.location = '/registration_successful?member_id='+uInfo.member_id;
  }
 else{
    NotificationManager.error("Registration fail for some reasone");
  }

  }).catch((error)=>{
    NotificationManager.error(error?.response?.data?.message ?? error.message);
  })

}



