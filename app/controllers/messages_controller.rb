class MessagesController < ApplicationController
  MESSAGE_TYPE = "MESSAGE"

  def index
    all_messages = Message.all.map do |m|
      user = User.find_by(id: m.user_id)
      theatre = Theatre.find_by(id: m.theatre_id)
      { theatre_code: theatre.code, first_name: user.first_name, last_name: user.last_name, content: m.content, payload_type: MESSAGE_TYPE }
    end
    render json: all_messages
  end

  def show
    theatre = Theatre.find_by(code: params[:id])
    theatre_messages = Message.where(theatre_id: theatre.id).map do |m|
      user = User.find_by(id: m.user_id)
      { first_name: user.first_name, last_name: user.last_name, content: m.content, payload_type: MESSAGE_TYPE }
    end
    render json: theatre_messages
  end
end
