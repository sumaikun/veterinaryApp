import { combineReducers } from "redux";
import { auth } from "./auth";
import { app } from "./app";
import { users } from "./users";
import { products } from "./products";
import { contacts } from "./contacts";


const reducers = combineReducers({
  auth,
  app,
  users,
  products,
  contacts
});

export default reducers;