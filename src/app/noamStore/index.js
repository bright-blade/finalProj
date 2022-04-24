import { createStore } from "redux";

const isLogin = (state, action) => {
  if (action.type === "LOGIN") {
    return (state = true);
  } else if (action.type === "LOGOUT") {
    return (state = false);
  }
  return state=false;
};

const Store = createStore(isLogin);

export default Store;
