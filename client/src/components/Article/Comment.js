import DeleteButton from './DeleteButton';
import { Link } from 'react-router-dom';
import React from 'react';

const Comment = props => {
  const comment = props.comment;
  const show = props.currentUser &&
    props.currentUser.id === comment.user.id;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`/@${comment.user.id}`}
          className="comment-author">
          <img src={comment.user.image} className="comment-author-img" alt={comment.user.id} />
        </Link>
        &nbsp;
        <Link
          to={`/@${comment.user.id}`}
          className="comment-author">
          {comment.user.id}
        </Link>
        <span className="date-posted">
          {new Date(comment.created_at).toDateString()}
        </span>
        <DeleteButton show={show} slug={props.slug} commentId={comment.id} />
      </div>
    </div>
  );
};

export default Comment;
