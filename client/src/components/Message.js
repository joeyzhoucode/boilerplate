import { Link } from 'react-router-dom';
import React from 'react';

const Message = props => {
  const message = props.message;
  return (
    <div className="article-page">
      <div className="card">
        <div className="card-block">
          <p className="card-text">{message.content}</p>
        </div>
        <div className="card-footer">
          <Link
            to={`/@${message.user.id}`}
            className="comment-author">
            <img src={message.user.image} className="comment-author-img" alt={`${message.user.first_name}`} />
          </Link>
          &nbsp;
          <Link
            to={`/@${message.user.id}`}
            className="comment-author">
            {`${message.user.first_name} ${message.user.last_name}`}
          </Link>
          <span className="date-posted">
            {new Date(message.created_at).toDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
