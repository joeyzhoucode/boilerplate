import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import global from 'reducers/globalReducer';
import profile from 'reducers/profileReducer';

export const initialState = {
  global: {
    
  },
  profile: {
    id: null,
    firstName: "John",
    lastName: "Doe",
    email: "John@Doe.com",
    image: null,
  },
};

export default(history) => combineReducers({
  router: connectRouter(history),
  global,
  profile,
})