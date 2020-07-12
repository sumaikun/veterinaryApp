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
import { diagnosticPlans } from "./diagnosticPlans"
import { therapeuticPlans } from "./therapeuticPlans"
import { appointments } from "./appointments"


const reducers = combineReducers({
  auth,
  app,
  users,
  products,
  contacts,
  pets,
  parameters,
  patientReviews,
  physiologicalConstants,
  diagnosticPlans,
  therapeuticPlans,
  appointments
});

export default reducers;