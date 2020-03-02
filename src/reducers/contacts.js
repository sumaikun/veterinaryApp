import {
  SET_CONTACTS,
  ADD_CONTACT,
  REMOVE_CONTACT,
  SELECT_CONTACT
} from "../constants";

let index

export function contacts(
  state = {
    contacts:[],     
    selectedContact:{} 
  },
  action
) {
  switch (action.type) {

    case SET_CONTACTS:
      
      return Object.assign({}, state, {
        contacts:action.contacts,         
      });

    case SELECT_CONTACT:

      return Object.assign({}, state, {
        selectedContact:action.contact,         
      });

    case ADD_CONTACT:
      
      index = state.contacts.findIndex(  data => data.id === action.contact.id  );

      index ? state.contacts[index] = action.contact : state.contacts.push(action.contact);
      
      return state;

    case REMOVE_CONTACT:

      index = state.contacts.findIndex(  data => data.id === action.contact.id  );

      state.contacts.splice(index,1);

      return state;

    default:
      return state;


  }
}