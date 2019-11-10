import React from 'react';
import { connect } from 'react-redux';
import { ADD_MESSAGE } from '../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onSubmit: payload =>
    dispatch({ type: ADD_MESSAGE, payload })
});

class MessageInput extends React.Component {
  constructor() {
    super();
    this.state = {
      content: ''
    };

    this.setBody = ev => {
      this.setState({ content: ev.target.value });
    };

    this.createMessage = ev => {
      ev.preventDefault();
      this.props.onSubmit(this.state.content);
      this.setState({ content: '' });
    };
  }

  render() {
    return (
      <div className="article-page">
        <form className="card comment-form" onSubmit={this.createMessage}>
          <div className="card-block">
            <textarea className="form-control"
              placeholder="Write a message..."
              value={this.state.content}
              onChange={this.setBody}
              rows="3">
            </textarea>
          </div>
          <div className="card-footer">
            <img
              src={this.props.currentUser.image}
              className="comment-author-img"
              alt={`${this.props.currentUser.first_name}`} />
            <button
              className="btn btn-sm btn-primary"
              type="submit">
              Post Message
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(MessageInput);
