import {
    SET_FETCHING
  } from "../constants";

  export function app(
    state = {
      loading:false
    },
    action
  ) {
    switch (action.type) {

      case SET_FETCHING:
        return Object.assign({}, state, {
          loading:action.payload
        });
              
      default:
        return state;


    }
  }