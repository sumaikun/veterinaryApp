import { combineReducers } from "redux";
import { auth } from "./auth";
import { app } from "./app";
import { users } from "./users";
import { products } from "./products";
import { contacts } from "./contacts";
import { pets } from "./pets";
import { parameters } from "./parameters";


const reducers = combineReducers({
  auth,
  app,
  users,
  products,
  contacts,
  pets,
  parameters
});

export default reducers;