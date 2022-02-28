import axios from "axios";

const api = axios.create({
  baseURL: "https://testapi.myfastearn.in/api/",
  //baseURL: "https://localhost:5000/api/",
  headers: {},
});


export default api;
