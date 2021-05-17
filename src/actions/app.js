import api from "../middleware/api";
import {
    SET_BREEDS,
    SET_SPECIES,
    SET_CURRENT_PATIENT
  } from "../constants";

export function uploadFileToServer(file,cb){

    const formData = new FormData();
    formData.append('file', file)

    return api.postData("fileUpload",formData)
        .then(response => {

            if(cb) { cb(response,false) }
        
        }).catch(err => { console.log("Error: ", err)
            
            if(cb) { cb(false,err) }
        
        });

}

export function deleteFile(file,cb){
    return api.deleteData("deleteFile/"+file)
    .then(response => {

        if(cb) { cb(response,false) }
    
    }).catch(err => { console.log("Error: ", err)
        
        if(cb) { cb(false,err) }
    
    });
}

export function setCurrentPatient(patientId) {
  return {
    type: SET_CURRENT_PATIENT,   
    payload:patientId
  };
}
