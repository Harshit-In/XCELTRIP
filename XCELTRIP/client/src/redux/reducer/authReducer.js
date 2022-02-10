import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  SET_USER,
  SET_CONNECT,
  SET_INSTANCE,
} from "../constants";
const usrinfo = localStorage.getItem("userdata")
const initialState = {
  userinfo: { isLoggedIn: usrinfo ? true : false, id: "", wallet: "" },
  contract: null,
  isConnected: false,
};


export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        userinfo: { ...action.data, isLoggedIn: true },
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        userinfo: { id: "", wallet: "", isLoggedIn: false },
      };
    case SET_USER:
      return {
        ...state,
        userinfo: { wallet: action.data.wallet, balance: action.data.balance,isLoggedIn: false },
      };
    case SET_INSTANCE:
      return {
        ...state,
        contract: action.contract,
      };
    case SET_CONNECT:
      return {
        ...state,
        isConnected: action.isConnected,
      };
    default:
      return {
        ...state,
      };
  }
}
