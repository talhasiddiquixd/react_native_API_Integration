// userUpdateReducer.js
import { UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE } from '../actions/types';

const initialState = {
  error: null,
};

const userUpdateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userUpdateReducer;
