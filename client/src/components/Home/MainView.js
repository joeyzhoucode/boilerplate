import ArticleList from '../ArticleList';
import MessageList from '../MessageList';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.messageList,
  ...state.articleList,
  tags: state.home.tags,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, payload) => dispatch({ type: CHANGE_TAB, tab, payload })
});

const YourFeedTab = props => {
  if (props.currentUser) {
    const clickHandler = ev => {
      ev.preventDefault();
      agent.Articles.feed().then(response => props.onTabClick('feed', response));
    }

    return (
      <li className="nav-item">
        <button
          className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
          onClick={clickHandler}>
          Your Feed
        </button>
      </li>
    );
  }
  return null;
};

const YourChatTab = props => {
  if (props.currentUser) {
    const clickHandler = ev => {
      ev.preventDefault();
      agent.Messages.all().then(response => props.onTabClick('chat', response));
    }

    return (
      <li className="nav-item">
        <button
          className={ props.tab === 'chat' ? 'nav-link active' : 'nav-link' }
          onClick={clickHandler}>
          Your Chat
        </button>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    const articlesPromise = agent.Articles.all();
    articlesPromise.then(response => props.onTabClick('all', response));
  };

  return (
    <li className="nav-item">
      <button
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </button>
    </li>
  );
};

const List = props => {
  if (props.tab === 'chat') {
    return (
      <MessageList />
    );
  } else {
    return (
      <ArticleList
        articles={props.articles}
        loading={props.loading}
        articles_count={props.articles_count}
        currentPage={props.currentPage}
        currentUser={props.currentUser} />
    )
  }
};

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <button className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </button>
    </li>
  );
};

const MainView = props => {
  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab
            currentUser={props.currentUser}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <YourChatTab
            currentUser={props.currentUser}
            tab={props.tab}
            onTabClick={props.onTabClick} />

          <GlobalFeedTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>
      </div>

      <List
        articles={props.articles}
        loading={props.loading}
        articles_count={props.articles_count}
        currentPage={props.currentPage}
        currentUser={props.currentUser}
        tab={props.tab} />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
