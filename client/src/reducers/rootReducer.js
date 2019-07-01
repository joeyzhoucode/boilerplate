import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import profile from './profileReducer';

export const initialState = {
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
  profile,
})