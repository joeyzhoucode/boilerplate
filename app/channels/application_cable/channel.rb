module ApplicationCable
  class Channel < ActionCable::Channel::Base
    identified_by :current_user

    def connect
      self.current_user = find_current_user
    end

    private

    def find_current_user
      if current_user = User.find_by(id: cookies.encrypted[:user_id])
        current_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
