import {
    SET_FETCHING,
    SET_BREEDS,
    SET_SPECIES
  } from "../constants";

  export function app(
    state = {
      loading:false,
      breeds:[],
      species:[],
    },
    action
  ) {
    switch (action.type) {

      case SET_FETCHING:
        return Object.assign({}, state, {
          loading:action.payload
      });

      case SET_BREEDS:
        return Object.assign({}, state, {
          breeds:action.payload
      });

      case SET_SPECIES:
        return Object.assign({}, state, {
          species:action.payload
      });
              
      default:
        return state;


    }
  }