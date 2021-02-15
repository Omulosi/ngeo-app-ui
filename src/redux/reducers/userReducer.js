import { 
    SIGNIN,
    SIGNUP,
    LOGOUT,
    RESET_PASSWORD,
    FETCH_USER_PROFILE,
    SET_ERRORS,
    CLEAR_ERRORS
  } from '../types';
  
  const initialState = {
    loading: false,
    profile: {},
    errors: {},
    authenticated: false,
    editing: false
  };
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          authenticated: true,
          profile: action.payload
        }
        
      case SIGNIN:
        return {
          ...state,
          authenticated: true,
          profile: action.payload
        };

  
      case SET_ERRORS:
        return {
          ...state,
          errors: action.payload
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          errors: {},
        };
  
      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };