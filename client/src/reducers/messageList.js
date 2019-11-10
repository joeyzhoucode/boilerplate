import webSocket from "../webSocket";
import { MESSAGE_TYPE } from "../webSocket";
import {
  SET_PAGE,
  MESSENGER_LOADED,
  MESSENGER_UNLOADED,
  MESSENGER_UPDATE,
  ADD_MESSAGE,
  CHANGE_TAB,
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        messages: action.payload.messages,
      };
    case MESSENGER_LOADED:
      const connection = state.connection ||
        new webSocket(action.callback, MESSAGE_TYPE);
      connection.openNewGroup("Global");
      return {
        ...state,
        messages: action.payload.messages,
        connection: connection,
      };
    case MESSENGER_UNLOADED:
      if (state.connection) {
        state.connection.disconnect();
        delete state.connection;
      }
      return {};
    case MESSENGER_UPDATE:
      const messages = state.messages.concat(action.payload);
      return {
        ...state,
        messages: messages,
      };
    case ADD_MESSAGE:
      if (state.connection) {
        state.connection.message(action.payload, "Global");
      }
      return state;
    case CHANGE_TAB:
      return {
        ...state,
        messages: action.payload.messages,
      };
    default:
      return state;
  }
};
