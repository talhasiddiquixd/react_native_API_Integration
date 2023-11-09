// authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  errorMessage: '',
  registrationSuccess: false,
  registrationError: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationSuccess: true,
        registrationError: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registrationSuccess: false,
        registrationError: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
