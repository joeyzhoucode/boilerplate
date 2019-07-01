class MessengerChannel < ApplicationCable::Channel
  def subscribed
    if params[:room_name].present?
      stream_from("#{(params[:room_name])}")
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def broadcast(data)
    user = get_user(data['user_id'])
    room_name = data['room_name']
    content = data['content']

    raise 'No room_name!' if room_name.blank?
    room = get_room(room_name)
    raise 'No room found!' if room.blank?
    raise 'No content!' if content.blank?

    room.users << user unless room.users.include?(user)

    Message.create!(
      room: room,
      user: user,
      content: content
    )
  end

  private

  def get_user(id)
    User.find_by(id: id)
  end

  def get_room(name)
    Room.find_by(name: name)
  end
end
