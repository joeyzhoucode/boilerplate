import Banner from './Banner';
import MainView from './MainView';
import React from 'react';
import Tags from './Tags';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
  MESSENGER_LOADED,
  MESSENGER_UNLOADED,
  MESSENGER_UPDATE,
} from '../../constants/actionTypes';

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, payload }),
  onLoad: (tab, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, payload }),
  onUnload: () =>
    dispatch({ type: HOME_PAGE_UNLOADED }),
  onMessengerLoad: (callback, payload) =>
    dispatch({ type: MESSENGER_LOADED, callback, payload }),
  onMessengerUnload: () =>
    dispatch({ type: MESSENGER_UNLOADED }),
  onMessengerUpdate: (payload) =>
    dispatch({ type: MESSENGER_UPDATE, payload }),
});

class Home extends React.Component {
  componentDidMount() {
    const tab = this.props.currentUser ? 'feed' : 'all';
    const articlesPromise = this.props.currentUser ?
      agent.Articles.feed() :
      agent.Articles.all();
    const tagsPromise = agent.Tags.getAll();
    const promise = Promise.all([tagsPromise, articlesPromise]);
    promise.then(response => this.props.onLoad(tab, response));

    agent.Messages.all().then(response => this.props.onMessengerLoad(this.props.onMessengerUpdate, response));
  }

  componentWillUnmount() {
    this.props.onUnload();
    this.props.onMessengerUnload();
  }

  render() {
    return (
      <div className="home-page">

        <Banner currentUser={this.props.currentUser} appName={this.props.appName} />

        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
