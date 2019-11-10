import Message from './Message';
import MessageInput from './MessageInput';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state.messageList,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
});

class MessageList extends React.Component {
  componentDidUpdate(_prevProps) {
    document.body.scrollIntoView(true);
  }

  render() {
    if (!this.props.messages) {
      return (
        <div className="article-preview">Loading...</div>
      );
    }

    return (
      <div className="article-preview">
        <div style={{ overflowY: "scroll", height: "50vh", width: "100%", margin: "0rem 0rem 1.5rem 0rem" }} ref={(el) => { if(el) { el.scrollTop = el.scrollHeight; }}}>
          {
            this.props.messages.map(message => {
              return (
                <Message message={message} key={message.id} currentUser={this.props.currentUser} />
              );
            })
          }
        </div>
        <MessageInput currentUser={this.props.currentUser} />
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
