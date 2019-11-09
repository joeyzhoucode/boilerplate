import ArticleList from './ArticleList';
import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  FOLLOW_USER,
  UNFOLLOW_USER,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED
} from '../constants/actionTypes';

const EditProfileSettings = props => {
  if (props.isUser) {
    return (
      <Link
        to="/settings"
        className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i> Edit Profile Settings
      </Link>
    );
  }
  return null;
};

const FollowUserButton = props => {
  if (props.isUser) {
    return null;
  }

  const following = props.user.followers ?
    props.user.followers.find(f => f.id === props.currentUser.id) :
    null;

  let classes = 'btn btn-sm action-btn';
  if (following) {
    classes += ' btn-secondary';
  } else {
    classes += ' btn-outline-secondary';
  }

  const handleClick = ev => {
    ev.preventDefault();
    if (following) {
      agent.Profile.unfollow(props.user.id).then(response => props.unfollow(response));
    } else {
      agent.Profile.follow(props.user.id).then(response => props.follow(response));
    }
  };

  return (
    <button
      className={classes}
      onClick={handleClick}>
      <i className="ion-plus-round"></i>
      &nbsp;
      {following ? 'Unfollow' : 'Follow'} {props.user.first_name}
    </button>
  );
};

const mapStateToProps = state => ({
  ...state.articleList,
  currentUser: state.common.currentUser,
  profile: state.profile
});

const mapDispatchToProps = dispatch => ({
  onFollow: payload => dispatch({ type: FOLLOW_USER, payload: payload }),
  onLoad: payload => dispatch({ type: PROFILE_PAGE_LOADED, payload }),
  onUnfollow: payload => dispatch({ type: UNFOLLOW_USER, payload: payload }),
  onUnload: () => dispatch({ type: PROFILE_PAGE_UNLOADED })
});

class Profile extends React.Component {
  componentDidMount() {
    const profilePromise = agent.Profile.get(this.props.match.params.id);
    const articlesPromise = agent.Articles.byAuthor(this.props.match.params.id);
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
            className="nav-link active"
            to={`/@${this.props.profile.id}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.profile.id}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }

  render() {
    const profile = this.props.profile;
    const currentUser = this.props.currentUser;
    if (!profile) {
      return null;
    }

    const isUser = this.props.currentUser &&
      this.props.profile.id === this.props.currentUser.id;

    const onFollow = this.props.onFollow;
    const onUnfollow = this.props.onUnfollow;
    return (
      <div className="profile-page">

        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">

                <img src={profile.image} className="user-img" alt={`${profile.first_name}`} />
                <h4>{`${profile.first_name} ${profile.last_name}`}</h4>
                <p>{profile.bio}</p>

                <EditProfileSettings isUser={isUser} />
                <FollowUserButton
                  isUser={isUser}
                  user={profile}
                  currentUser={currentUser}
                  follow={onFollow}
                  unfollow={onUnfollow}
                  />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">

              <div className="articles-toggle">
                {this.renderTabs()}
              </div>

              <ArticleList
                articles={this.props.articles}
                articles_count={this.props.articles_count}
                state={this.props.currentPage}
                currentUser={this.props.currentUser} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
export { Profile, mapStateToProps };
