import * as types from '../actions/types';

const initialState = {
  userId: null,
  error: null,
};

const userCreationReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_USER_SUCCESS:
      return {
        userId: action.payload,
        error: null,
      };
    case types.CREATE_USER_FAILURE:
      return {
        userId: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userCreationReducer;