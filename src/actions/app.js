import api from "../middleware/api";
import {
    SET_BREEDS,
    SET_SPECIES
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


function setBreeds(breeds) {
    return {
      type: SET_BREEDS,   
      payload:breeds
    };
}

function setSpecies(species) {
    return {
      type: SET_SPECIES,   
      payload:species
    };
}

export function getBreeds(cb=null) {
    
    
    return dispatch => {
      return api.getData("breeds")
        .then(( response ) => {

          dispatch(setBreeds(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
}

export function getSpecies(cb=null) {
    
    
    return dispatch => {
      return api.getData("species")
        .then(( response ) => {

          dispatch(setSpecies(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }