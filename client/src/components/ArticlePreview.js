import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { ARTICLE_FAVORITED, ARTICLE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: payload => dispatch({
    type: ARTICLE_FAVORITED,
    payload: payload,
  }),
  unfavorite: payload => dispatch({
    type: ARTICLE_UNFAVORITED,
    payload: payload,
  })
});

const ArticlePreview = props => {
  const article = props.article;
  const favorited = article.favorites.find(f => f.user_id === props.currentUser.id);
  const favoriteButtonClass = favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (favorited) {
      agent.Articles.unfavorite(article.slug).then(response => props.unfavorite(response));
    } else {
      agent.Articles.favorite(article.slug).then(response => props.favorite(response));
    }
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/@${article.user.id}`}>
          <img src={article.user.image} alt={`${article.user.first_name}`} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${article.user.id}`}>
            {`${article.user.first_name} ${article.user.last_name}`}
          </Link>
          <span className="date">
            {new Date(article.created_at).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {article.favorites_count}
          </button>
        </div>
      </div>

      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            article.tag_list.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ArticlePreview);
