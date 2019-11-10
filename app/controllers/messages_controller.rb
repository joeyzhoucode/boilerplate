class MessagesController < ApplicationController
  MESSAGE_TYPE = "MESSAGE"

  def index
    @messages = Message.all
    render json: { messages: @messages.as_json }
  end

  def show
    @group = Group.find_by(name: params[:id])
    @messages = Message.where(group_id: group.id).map
    render json: { messages: @messages.as_json }
  end
end
