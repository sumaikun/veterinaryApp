import {
    SET_PETS,
    ADD_PET,
    REMOVE_PET,
    SELECT_PET
  } from "../constants";
  import api from "middleware/api";
  import { Pet } from "models/Pet";  
  
  function setPets(pets) {
    return {
      type: SET_PETS,   
      pets
    };
  }

  function addPet(pet) {
    return {
      type: ADD_PET,   
      pet
    };
  }

  function removePet(pet) {
    return {
      type: REMOVE_PET,   
      pet
    };
  }

  function selectPet(pet){
    return{
      type: SELECT_PET,   
      pet
    }
  }
  
  
  export function getPets(cb=null) {
    
    
    return dispatch => {
      return api.getData("pets")
        .then(( response ) => {

          dispatch(setPets(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function savePet(pet,cb = null) {
  
    return dispatch => {
      
      if(pet._id){
        return api.putData("pets/"+pet._id,pet)
        .then(( response ) => {

          //dispatch(addPet(pet));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData("pets",pet)
        .then(( response ) => {

          //dispatch(addPet(pet));

          dispatch(selectPet(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deletePet(pet) {
  
    return dispatch => {
      return api.deleteData("pets/"+pet.id)
        .then(( response ) => {

          dispatch(removePet(pet));          
        
        })
        .catch(err => { console.log("Error: ", err)
           
        });
    }
  }

  export function getPet(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData("pets/"+id)
        .then(( response ) => {

          dispatch(selectPet(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectPet(
          new Pet()
        ));
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  