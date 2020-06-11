import {
    SET_PATIENT_REVIEWS,
    ADD_PATIENT_REVIEW,
    REMOVE_PATIENT_REVIEW,
    SELECT_PATIENT_REVIEW
  } from "../constants";
  import api from "middleware/api";
  import { PatientReview } from "models/PatientReview";
  
  function setPatientReview(patientReviews) {
    return {
      type: SET_PATIENT_REVIEWS,   
      patientReviews
    };
  }

  function addPatientReview(patientReview) {
    return {
      type: ADD_PATIENT_REVIEW,   
      patientReview
    };
  }

  function removePatientReview(patientReview) {
    return {
      type: REMOVE_PATIENT_REVIEW,   
      patientReview
    };
  }

  function selectPatientReview(patientReview){
    return{
      type: SELECT_PATIENT_REVIEW,   
      patientReview
    }
  }
  
  
  export function getPatientReviews(cb=null,modelPoint) {
    
    
    return dispatch => {
      return api.getData(modelPoint)
        .then(( response ) => {

          dispatch(setPatientReview(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function savePatientReview(patientReview,cb = null,modelPoint) {
  
    return dispatch => {
      
      if(patientReview._id){
        return api.putData(modelPoint+"/"+patientReview._id,patientReview)
        .then(( response ) => {

          //dispatch(addPatientReview(patientReview));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,patientReview)
        .then(( response ) => {

          //dispatch(addPatientReview(patientReview));

          dispatch(selectPatientReview(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePatientReview(patientReview,cb,modelPoint) {
  
    return dispatch => {
      return api.deleteData(modelPoint+"/"+patientReview._id)
        .then(( response ) => {

          dispatch(removePatientReview(patientReview));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getPatientReview(id,cb = null,modelPoint) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectPatientReview(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPatientReview(
            new PatientReview()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  