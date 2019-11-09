import ArticleActions from './ArticleActions';
import { Link } from 'react-router-dom';
import React from 'react';

const ArticleMeta = props => {
  const article = props.article;
  return (
    <div className="article-meta">
      <Link to={`/@${article.user.id}`}>
        <img src={article.user.image} alt={`${article.user.first_name}`} />
      </Link>

      <div className="info">
        <Link to={`/@${article.user.id}`} className="author">
          {`${article.user.first_name} ${article.user.last_name}`}
        </Link>
        <span className="date">
          {new Date(article.created_at).toDateString()}
        </span>
      </div>

      <ArticleActions canModify={props.canModify} article={article} />
    </div>
  );
};

export default ArticleMeta;
