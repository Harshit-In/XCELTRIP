import axios from "axios";
const headers = {
  'Access-Control-Allow-Headers':"*"
}
export function getAPICall(urlslug) {
    //const urlaction = 'https://api.Myfastearn.in/api/'+urlslug
    const urlaction = 'http://localhost:5005/api/'+urlslug
    return axios.get(urlaction,{headers});
  }
  export function postAPICall(urlslug,fomdata) {
    //const urlaction = 'https://api.Myfastearn.in/api/'+urlslug
    const urlaction = 'http://localhost:5005/api/'+urlslug
    return axios.post(urlaction,fomdata,{headers});
  }
  // localhost example
  export function postAPICallto(urlslugg,fomdata) {
    const urlaction = 'http://localhost:5005/api/'+urlslugg
    return axios.post(urlaction,fomdata,{headers});
  }
