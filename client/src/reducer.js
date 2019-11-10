import article from './reducers/article';
import articleList from './reducers/articleList';
import { combineReducers } from 'redux';
import common from './reducers/common';
import editor from './reducers/editor';
import home from './reducers/home';
import messageList from './reducers/messageList';
import profile from './reducers/profile';
import settings from './reducers/settings';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  article,
  articleList,
  common,
  editor,
  home,
  messageList,
  profile,
  settings,
  router: routerReducer
});
