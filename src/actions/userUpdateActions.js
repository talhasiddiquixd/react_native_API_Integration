// userUpdateActions.js
import {UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE} from './types';

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

export const updateUser =
  (id, {name, job}) =>
  async dispatch => {
    try {
      const updateData = {};
      if (name) {
        updateData.name = name;
      }
      if (job) {
        updateData.job = job;
      }

      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        dispatch(updateUserSuccess());
        return {success: true, id: id};
      } else {
        const errorBody = await response.json();
        dispatch(updateUserFailure(errorBody.error));
        return {success: false, errorMessage: errorBody.error};
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      return {success: false, errorMessage: error.message};
    }
  };
