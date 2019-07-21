import { initialState } from './rootReducer';
import webSocketConnection from "utils/webSocketConnection";
import { MESSAGE_TYPE } from 'utils/webSocketConnection';
import { 
  NAVIGATOR_DRAWER_TOGGLE,
  NAVIGATOR_DRAWER_CLOSE,
  UPDATE_MESSAGE_INPUT,
  MESSENGER_FETCH_SUCCESS,
  MESSENGER_SUBSCRIBE,
  MESSENGER_UNSUBSCRIBE,
  MESSENGER_RECIEVE,
  MESSENGER_BROADCAST,
  } from '../actions/globalActions';

export default function global(state = initialState.global, action) {
  let newState;
  let newMessages;
  switch (action.type) {
    case NAVIGATOR_DRAWER_TOGGLE:
      newState = {
        ...state,
        mobileOpen: !state.mobileOpen,
      }
      return newState;
    case NAVIGATOR_DRAWER_CLOSE:
      newState = {
        ...state,
        mobileOpen: false,
      }
      return newState;
    case UPDATE_MESSAGE_INPUT:
      newState = {
        ...state,
        messageInput: action.messageInput,
      }
      return newState;
    case MESSENGER_FETCH_SUCCESS:
      newMessages = [];
      for (const message of action.data){
        newMessages.push({
          userName: message.first_name + " " + message.last_name,
          content: message.content,
        })
      }
      newState = {
        ...state,
        messages: newMessages,
      }
      return newState;
    case MESSENGER_SUBSCRIBE:
      const connection = state.connection || new webSocketConnection(action.userId, action.callback, MESSAGE_TYPE);
      connection.openNewGroup(action.groupName);
      newState = {
        ...state,
        connection: connection,
      }
      return newState;
    case MESSENGER_UNSUBSCRIBE:
      if(state.connection) {
        state.connection.disconnect();
        delete state.connection;
      }
      newState = {
        ...state,
        connection: null,
      }
      return newState;
    case MESSENGER_RECIEVE:
      if(action.data.payload_type !== MESSAGE_TYPE) {
        return state;
      }
      newMessages = state.messages;
      newMessages.push({
        userName: action.data.user.first_name + " " + action.data.user.last_name,
        content: action.data.content,
      })
      newState = {
        ...state,
        messages: newMessages,
      }
      return newState;
    case MESSENGER_BROADCAST:
      state.connection.message(action.data.message, action.data.groupName);
      return state;
    default:
      return state;
  }
}