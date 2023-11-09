import {combineReducers} from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import userCreationReducer from './userCreationReducer';
import userUpdateReducer from './userUpdateReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  userCreate : userCreationReducer,
  userUpdate: userUpdateReducer,
});

export default rootReducer;
