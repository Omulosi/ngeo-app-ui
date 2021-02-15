import { 
    SIGNIN,
    SIGNUP,
    LOGOUT,
    SET_ERRORS,
    CLEAR_ERRORS
  } from '../types';
  
  const initialState = {
    authError: null,
    authenticated: false
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SIGNUP:
        return {
          ...state,
          authenticated: true,
        }
        
      case SIGNIN:
        return {
          ...state,
          authenticated: true,
        };
  
      case SET_ERRORS:
        return {
          ...state,
          authError: action.payload
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          authError: null
        };
  
      case LOGOUT:
        return initialState;
  
      default:
        return state;
    }
  };