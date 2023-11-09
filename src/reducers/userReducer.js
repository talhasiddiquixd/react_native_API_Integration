// userReducer.js
import {
    FETCH_USER_DATA_SUCCESS,
    FETCH_USER_DATA_FAILURE,
    FETCH_USER_DATA_BY_EMAIL_SUCCESS,
    FETCH_USER_DATA_BY_EMAIL_FAILURE,
  } from '../actions/types';
  
  const initialState = {
    userData: [],
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {

    switch (action.type) {
      case FETCH_USER_DATA_SUCCESS:
        return {
          ...state,
          userData: [action.payload],
          error: null,
        };
      case FETCH_USER_DATA_FAILURE:
        return {
          ...state,
          userData: [],
          error: action.payload,
        };
      case FETCH_USER_DATA_BY_EMAIL_SUCCESS:
        return {
          ...state,
          userData: [action.payload], 
          error: null,
        };
      case FETCH_USER_DATA_BY_EMAIL_FAILURE:
        return {
          ...state,
          userData: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  