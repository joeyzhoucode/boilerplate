import { Profile, mapStateToProps } from './Profile';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class ProfileFavorites extends Profile {
  componentDidMount() {
    const profilePromise = agent.Profile.get(this.props.match.params.id);
    const articlesPromise = agent.Articles.favoritedBy(this.props.match.params.id);  
    Promise.all([profilePromise, articlesPromise]).then(response => this.props.onLoad(response));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.id}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.profile.id}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileFavorites);
