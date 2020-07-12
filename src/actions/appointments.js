import {
    SET_APPOINTMENTS,
    ADD_APPOINTMENT,
    REMOVE_APPOINTMENT,
    SELECT_APPOINTMENT
  } from "../constants";
  import api from "middleware/api";
  import { Appointment } from "models/Appointment";
  
  function setAppointments(appointments) {
    return {
      type: SET_APPOINTMENTS,   
      appointments
    };
  }

  function addAppointment(appointment) {
    return {
      type: ADD_APPOINTMENT,   
      appointment
    };
  }

  function removeAppointment(appointment) {
    return {
      type: REMOVE_APPOINTMENT,   
      appointment
    };
  }

  function selectAppointment(appointment){
    return{
      type: SELECT_APPOINTMENT,   
      appointment
    }
  }

  const modelPoint = "appointments"
  
  
  export function getAppointmentsByPatient(patient,cb=null) {
    
    return dispatch => {
      return api.getData(modelPoint+"/"+patient)
        .then(( response ) => {

          const result = response.data ? response.data : []

          dispatch(setAppointments(result));
          
          if(cb) { cb(result,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveAppointment(appointment,cb = null) {  

    return dispatch => {
      
      if(appointment._id){
        return api.putData(modelPoint+"/"+appointment._id,appointment)
        .then(( response ) => {

          //dispatch(addAppointment(appointment));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData(modelPoint,appointment)
        .then(( response ) => {
          
          //console.log("patient review creation")

          //dispatch(addAppointment(appointment));

          dispatch(selectAppointment(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteAppointment(appointment,cb) {

    return dispatch => {
      return api.deleteData(modelPoint+"/"+appointment._id)
        .then(( response ) => {

          dispatch(removeAppointment(appointment));
          if(cb) { cb(true,false) }           
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,true) }  
        });
    }
  }

  export function getAppointment(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData(modelPoint+"/"+id)
        .then(( response ) => {

          dispatch(selectAppointment(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectAppointment(
            new Appointment()
        ));
        
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  