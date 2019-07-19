class MessagesController < ApplicationController
  MESSAGE_TYPE = "MESSAGE"

  def index
    all_messages = Message.all.map do |m|
      user = User.find_by(id: m.user_id)
      group = Group.find_by(id: m.group_id)
      { group_name: group.name, first_name: user.first_name, last_name: user.last_name, content: m.content, payload_type: MESSAGE_TYPE }
    end
    render json: all_messages
  end

  def show
    group = Group.find_by(name: params[:id])
    group_messages = Message.where(group_id: group.id).map do |m|
      user = User.find_by(id: m.user_id)
      { first_name: user.first_name, last_name: user.last_name, content: m.content, payload_type: MESSAGE_TYPE }
    end
    render json: group_messages
  end
end
