import ActionCable from 'actioncable'

const BASE_URL = window.location.hostname === "localhost" ? "localhost:3001" : window.location.hostname;
const ACCESS_TOKEN = "accessToken";
const CLIENT = "client";

export const MESSAGE_TYPE = "MESSAGE";

function webSocketConnection(userId, callback, connectionType) {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  let client = localStorage.getItem(CLIENT);

  var wsUrl = 'ws://' + BASE_URL + '/cable';
  wsUrl += '?access-token=' + accessToken + '&client=' + client;

  this.userId = userId;
  this.callback = callback;
  this.connectionType = connectionType;

  this.connection = ActionCable.createConsumer(wsUrl);
  this.webSocketConnections = {};
}

webSocketConnection.prototype.message = function(content, groupName) {
  let groupConnObj = this.webSocketConnections[groupName];
  if (groupConnObj) {
    groupConnObj.broadcastMessage(content);
  } else {
    console.log('Error: Cannot find group connection');
  }
}

webSocketConnection.prototype.openNewGroup = function(groupName) {
  if (groupName !== undefined && !(groupName in this.webSocketConnections)) {
    this.webSocketConnections[groupName] = this.createWebSocketConnection(groupName);
  } else {
    this.webSocketConnections[groupName].consumer.connect();
  }
}

webSocketConnection.prototype.disconnect = function() {
  Object.values(this.webSocketConnections).forEach(c => {
    c.consumer.disconnect();
  });
}

webSocketConnection.prototype.createWebSocketConnection = function(groupName) {
  let scope = this;
  let connectionType;
  switch(scope.connectionType) {
    case MESSAGE_TYPE:
      connectionType = "Messenger";
      break;
    default:
      connectionType = undefined;
  }
  return this.connection.subscriptions.create({channel: 'channel', group_name: groupName, user_id: scope.userId}, {
    connected: function() {
      console.log(connectionType + ' connected to channel. Group: ' + groupName + '.')
    },
    disconnected: function() {
      console.log(connectionType +  ' disconnected from channel. Group: ' + groupName + '.')
    },
    received: function(data) {
      if (data.audience.indexOf(scope.userId) !== -1) {
        return scope.callback(data)
      }
    },
    broadcastMessage: function(content) {
      return this.perform('broadcast_message', {
        group_name: groupName,
        user_id: scope.userId,
        content: content
      })
    }
  })
}

export default webSocketConnection;