class MessengerChannel < ApplicationCable::Channel
  def subscribed
    if params[:group_name].present?
      stream_from("#{(params[:group_name])}")
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def broadcast(data)
    user = get_user(data['user_id'])
    group_name = data['group_name']
    content = data['content']

    raise 'No group_name!' if group_name.blank?
    group = get_group(group_name)
    raise 'No group found!' if group.blank?
    raise 'No content!' if content.blank?

    group.users << user unless group.users.include?(user)

    Message.create!(
      group: group,
      user: user,
      content: content
    )
  end

  private

  def get_user(id)
    User.find_by(id: id)
  end

  def get_group(name)
    Group.find_by(name: name)
  end
end
