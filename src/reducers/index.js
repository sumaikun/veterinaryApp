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
import { appointments } from "./appointments"
import { detectedDiseases } from "./detectedDiseases"
import { patientFiles } from "./patientFiles"
import { agendaAnnotations } from "./agendaAnnotations"
import { doctors } from "./doctors"
import { settings } from "./settings"

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
  appointments,
  detectedDiseases,
  patientFiles,
  agendaAnnotations,
  doctors,
  settings
});

export default reducers;