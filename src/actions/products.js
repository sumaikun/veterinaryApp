import {
    SET_PRODUCTS,
    ADD_PRODUCT,
    REMOVE_PRODUCT,
    SELECT_PRODUCT
  } from "../constants";
  import api from "middleware/api";
  import { Product } from "models/Product";  

  
  
  
  function setProducts(products) {
    return {
      type: SET_PRODUCTS,   
      products
    };
  }

  function addProduct(product) {
    return {
      type: ADD_PRODUCT,   
      product
    };
  }

  function removeProduct(product) {
    return {
      type: REMOVE_PRODUCT,   
      product
    };
  }

  function selectProduct(product){
    return{
      type: SELECT_PRODUCT,   
      product
    }
  }
  
  
  export function getProducts(cb=null) {
    
    
    return dispatch => {
      return api.getData("products")
        .then(( response ) => {

          dispatch(setProducts( response.data ? response.data : [] ));
          
          if(cb) { cb(true,false) }
          
        })
        .catch(err => { console.log("Error: ", err)
          
          if(cb) { cb(false,true) }
        
      });
    }
  }


  export function saveProduct(user,cb = null) {
  
    return dispatch => {
      
      if(user._id){
        return api.putData("products/"+user._id,user)
        .then(( response ) => {

          //dispatch(addProduct(user));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }else{
        return api.postData("products",user)
        .then(( response ) => {

          //dispatch(addProduct(user));

          dispatch(selectProduct(response.data));
          
          if(cb) { cb(response,false) }
        
        })
        .catch(err => { console.log("Error: ", err)
          if(cb) { cb(false,err) }
        });
      }      
      
    }
  }
  

  export function deleteProduct(user) {
  
    return dispatch => {
      return api.deleteData("products/"+user.id)
        .then(( response ) => {

          dispatch(removeProduct(user));          
        
        })
        .catch(err => { console.log("Error: ", err)
           
        });
    }
  }

  export function getProduct(id,cb = null) {
  
    return dispatch => {

      if(id)
      {
        return api.getData("products/"+id)
        .then(( response ) => {

          dispatch(selectProduct(response.data));
          
          if(cb) { cb(true,false) }
        
        })
        .catch(err => { 
          console.log("Error: ", err) 

          if(cb) { cb(false,true) }          
        
        });
      }else{
        
        dispatch(selectProduct(
          new Product()
        ));
        if(cb) { cb(true,false) }
      
      }      
    }
  }
  
  
  