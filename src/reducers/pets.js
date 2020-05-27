import {
    SET_PETS,
    ADD_PET,
    REMOVE_PET,
    SELECT_PET
  } from "../constants";
  
  let index
  
  export function pets(
    state = {
      pets:[],     
      selectedPet:{} 
    },
    action
  ) {
    switch (action.type) {
  
      case SET_PETS:
        
        return Object.assign({}, state, {
          pets:action.pets,         
        });
  
      case SELECT_PET:
  
        return Object.assign({}, state, {
          selectedPet:action.pet,         
        });
  
      case ADD_PET:
        
        index = state.pets.findIndex(  data => data.id === action.pet.id  );
  
        index ? state.pets[index] = action.pet : state.pets.push(action.pet);
        
        return state;
  
      case REMOVE_PET:
  
        index = state.pets.findIndex(  data => data.id === action.pet.id  );
  
        state.pets.splice(index,1);
  
        return state;
  
      default:
        return state;
  
  
    }
  }