class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    payload = {
      room_name: message.room.name,
      content: message.content,
      user: message.user,
      audience: message.room.users.collect(&:id)
    }

    ActionCable.server.broadcast("#{message.room.name}", payload)
  end
end
