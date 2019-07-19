class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    payload = {
      group_name: message.group.name,
      content: message.content,
      user: message.user,
      audience: message.group.users.collect(&:id)
    }

    ActionCable.server.broadcast("#{message.group.name}", payload)
  end
end
