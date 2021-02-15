import {
    FETCH_COUNTIES,
    CREATE_COUNTY,
    UPDATE_COUNTY,
    DELETE_COUNTY,
    SET_ERRORS,
    CLEAR_ERRORS,
    SUCCESS,
    LOGOUT
  } from '../types';
  
  const initialState = {
    counties: {
        type: "FeatureCollection",
        features: []
    },
    rivers: {
      type: "FeatureCollection",
      features: []
  },
  roads: {
    type: "FeatureCollection",
    features: []
},
    loading: false,
    errors: {},
    error: ''
  };
  
  export const featureReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COUNTIES:
        return {
          ...state,
          loading: false,
          counties: action.payload
        };
  
      case CREATE_COUNTY:
        return {
          ...state,
          loading: false,
          counties: {...state.counties, features: [...state.counties.features, action.payload]}
        };
  
      case UPDATE_COUNTY:
    
        return {
            ...state,
            loading: false,
            counties: {...state.counties, features: state.counties.features.map(ft => (
                ft.id === action.payload.id? action.payload: ft
            ))}
          };
  
      case DELETE_COUNTY:
        return {
          ...state,
          loading: false,
          allFarms: state.allFarms.filter(
            farm => farm.id !== action.payload.id
          ),
          counties: {...state.counties, features: state.counties.features.filter(
              ft => ft.id !== action.payload.id
          )}
        };

        case SET_ERRORS:
            return {
              ...state,
              errors: action.payload,
              error: action.payload,
              loading: false
            };
      
          case CLEAR_ERRORS:
            return {
              ...state,
              errors: {},
              error: '',
              loading: false,
            };
      
          case SUCCESS:
            return {
              ...state,
              loading: false,
              showNotification: false
            };
          case LOGOUT:
              return initialState;
        
  
      default:
        return state;
    }
  };