// userActions.js
import axios from 'axios';
import {
  FETCH_USER_DATA_SUCCESS,
  FETCH_USER_DATA_FAILURE,
  FETCH_USER_DATA_BY_EMAIL_SUCCESS,
  FETCH_USER_DATA_BY_EMAIL_FAILURE,
} from '../actions/types';

export const fetchAllUserDataSuccess = userData => ({
  type: FETCH_USER_DATA_SUCCESS,
  payload: {userData},
});

export const fetchAllUserDataFailure = error => ({
  type: FETCH_USER_DATA_FAILURE,
  payload: error,
});

export const fetchAllUserData = () => async dispatch => {
  try {
    const responsePage1 = await axios.get('https://reqres.in/api/users?page=1');
    const responsePage2 = await axios.get('https://reqres.in/api/users?page=2');

    if (responsePage1.status === 200 && responsePage2.status === 200) {
      const userData = [...responsePage1.data.data, ...responsePage2.data.data];
      dispatch(fetchAllUserDataSuccess(userData));
      return {success: true, userData: userData};
    } else {
      dispatch(fetchAllUserDataFailure('Failed to Load User Data'));
      const errorMessage = response.data.error || 'Failed to Load User Data';
      return {success: false, errorMessage: errorMessage};
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : 'Error loading user data';
    dispatch(fetchAllUserDataFailure('Error loading user data'));
    return {success: false, errorMessage: errorMessage};
  }
};

export const fetchUserDataByEmailSuccess = user => ({
  type: FETCH_USER_DATA_BY_EMAIL_SUCCESS,
  payload: {user},
});

export const fetchUserDataByEmailFailure = error => ({
  type: FETCH_USER_DATA_BY_EMAIL_FAILURE,
  payload: error,
});

export const fetchUserDataByEmail = userEmail => async dispatch => {
  try {
    const response = await axios.get('https://reqres.in/api/users');

    if (response.status === 200) {
      const cleanedUserEmail = userEmail.trim().toLowerCase().toString();

      const userData = response.data.data.find(user => {
        console.log(cleanedUserEmail, user.email);
        const cleanedUserEmailFromResponse = user.email
          .trim()
          .toLowerCase()
          .toString();
        const returnwork = cleanedUserEmailFromResponse == cleanedUserEmail;
        console.log(returnwork);
        return returnwork;
      });
      console.log(userData);
      if (userData) {
        console.log(userData);
        dispatch(fetchUserDataByEmailSuccess(userData));
        return {success: true, userData: userData};
      } else {
        dispatch(fetchUserDataByEmailFailure('User not found'));
        return {success: false, errorMessage: 'User not found'};
      }
    } else {
      const errorMessage = response.data.error || 'Failed to Load User Data';

      dispatch(fetchUserDataByEmailFailure('Failed to Load User Data'));
      return {success: false, errorMessage: errorMessage};
    }
  } catch (error) {
    const errorMessage = error.response
      ? error.response.data.error
      : 'Error loading user data';

    dispatch(fetchUserDataByEmailFailure('Error loading user data'));
    return {success: false, errorMessage: errorMessage};
  }
};

