import {
    SET_CONTACTS,
    ADD_CONTACT,
    REMOVE_CONTACT,
    SELECT_CONTACT
  } from "../constants";
  import api from "middleware/api";
  import { Contact } from "models/Contact";  
  
  function setContacts(contacts) {
    return {
      type: SET_CONTACTS,   
      contacts
    };
  }

  function addContact(contact) {
    return {
      type: ADD_CONTACT,   
      contact
    };
  }

  function removeContact(contact) {
    return {
      type: REMOVE_CONTACT,   
      contact
    };
  }

  function selectContact(contact){
    return{
      type: SELECT_CONTACT,   
      contact
    }
  }
  
  
  export function getContacts(cb=null) {
    
    
    return dispatch => {
      return api.getData("contacts")
        .then(( response ) => {

          dispatch(setContacts(response.data ? response.data : []));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveContact(contact,cb = null) {
  
    return dispatch => {
      
      if(contact._id){
        return api.putData("contacts/"+contact._id,contact)
        .then(( response ) => {

          //dispatch(addContact(contact));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData("contacts",contact)
        .then(( response ) => {

          //dispatch(addContact(contact));

          dispatch(selectContact(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteContact(contact) {
  
    return dispatch => {
      return api.deleteData("contacts/"+contact.id)
        .then(( response ) => {

          dispatch(removeContact(contact));          
        
        })
        .catch(err => { console.log("Error: ", err)
           
        });
    }
  }

  export function getContact(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData("contacts/"+id)
        .then(( response ) => {

          dispatch(selectContact(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectContact(
          new Contact()
        ));
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  