import { combineReducers } from "redux";
import { auth } from "./auth";
import { app } from "./app";
import { users } from "./users";
import { products } from "./products";
import { contacts } from "./contacts";
import { pets } from "./pets";
import { parameters } from "./parameters";
import { patientReviews } from "./patientReviews";
import { physiologicalConstants } from "./physiologicalConstant"

const reducers = combineReducers({
  auth,
  app,
  users,
  products,
  contacts,
  pets,
  parameters,
  patientReviews,
  physiologicalConstants
});

export default reducers;