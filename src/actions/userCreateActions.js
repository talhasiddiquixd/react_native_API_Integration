import axios from 'axios';
import * as types from './types';

export const createUserSuccess = userId => ({
  type: types.CREATE_USER_SUCCESS,
  payload: userId,
});

export const createUserFailure = error => ({
  type: types.CREATE_USER_FAILURE,
  payload: error,
});

export const createUser = userData => async dispatch => {
  try {
    const response = await axios.post('https://reqres.in/api/users', userData);

    if (response.status === 201) {
      const responseBody = response.data;
      dispatch(createUserSuccess(responseBody.id));
      return {success: true, id: responseBody.id};
    } else {
      const errorBody = response.data;
      const errorMessage = errorBody.error.toString();
      dispatch(createUserFailure(errorMessage));
      return {success: false, errorMessage: errorMessage};
    }
  } catch (error) {
    dispatch(createUserFailure('Failed to create user - ' + error.message));
    return {success: false, errorMessage: error.message};
  }
};
