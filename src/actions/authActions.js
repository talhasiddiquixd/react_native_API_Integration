import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_SUCCESS, REGISTER_FAILURE } from './types';

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', {
      email,
      password,
    });

    console.log('Response:', response);

    if (response.status === 200) {
      dispatch({ type: LOGIN_SUCCESS });
      return { success: true };
    } else {
      const errorMessage = response.data.error || 'Login failed';
      dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
      return { success: false, errorMessage };
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Login failed';
    dispatch({ type: LOGIN_FAILURE, payload: errorMessage });
    return { success: false, errorMessage };
  }
};

export const register = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://reqres.in/api/register', {
      email,
      password,
    });

    console.log('Response:', response);

    if (response.status === 200) {
      dispatch({ type: REGISTER_SUCCESS });
      return { success: true };
    } else {
      const errorMessage = response.data.error || 'Registration failed';
      dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
      return { success: false, errorMessage };
    }
  } catch (error) {
    const errorMessage = error.response ? error.response.data.error : 'Registration failed';
    dispatch({ type: REGISTER_FAILURE, payload: errorMessage });
    return { success: false, errorMessage };
  }
};

