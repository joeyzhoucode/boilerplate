import ActionCable from 'actioncable'

const BASE_URL = window.location.hostname === "localhost" ? "localhost:3001" : window.location.hostname;
const ACCESS_TOKEN = "accessToken";
const CLIENT = "client";

export const MESSAGE_TYPE = "MESSAGE";

function webSocket(callback, connectionType) {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);
  let client = localStorage.getItem(CLIENT);

  var wsUrl = 'ws://' + BASE_URL + '/cable';
  wsUrl += '?access-token=' + accessToken + '&client=' + client;

  this.callback = callback;
  this.connectionType = connectionType;

  this.connection = ActionCable.createConsumer(wsUrl);
  this.webSocketConnections = {};
}

webSocket.prototype.message = function(content, groupName) {
  let groupConnObj = this.webSocketConnections[groupName];
  if (groupConnObj) {
    groupConnObj.broadcastMessage(content);
  } else {
    console.log('Error: Cannot find group connection');
  }
}

webSocket.prototype.openNewGroup = function(groupName) {
  if (groupName !== undefined && !(groupName in this.webSocketConnections)) {
    this.webSocketConnections[groupName] = this.createWebSocketConnection(groupName);
  } else {
    this.webSocketConnections[groupName].consumer.connect();
  }
}

webSocket.prototype.disconnect = function() {
  Object.values(this.webSocketConnections).forEach(c => {
    c.consumer.disconnect();
  });
}

webSocket.prototype.createWebSocketConnection = function(groupName) {
  let scope = this;
  let connectionType;
  switch(scope.connectionType) {
    case MESSAGE_TYPE:
      connectionType = "Messenger";
      break;
    default:
      connectionType = undefined;
  }
  return this.connection.subscriptions.create({ channel: connectionType + 'Channel', group_name: groupName }, {
    connected: function() {
      console.log(connectionType + ' connected to channel. Group Name: ' + groupName + '.')
    },
    disconnected: function() {
      console.log(connectionType +  ' disconnected from channel. Group Name: ' + groupName + '.')
    },
    received: function(data) {
      return scope.callback(data)
    },
    broadcastMessage: function(content) {
      return this.perform('broadcast', {
        group_name: groupName,
        content: content
      })
    }
  })
}

export default webSocket;