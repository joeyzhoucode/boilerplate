import React from 'react';
import agent from '../../agent';

const Tags = props => {
  const tags = props.tags;
  const page = props.page;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              agent.Articles.byTag(tag, page).then(response => props.onClickTag(tag, response));
            };

            return (
              <button
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}>
                {tag}
              </button>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

export default Tags;
