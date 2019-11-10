class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user, foreign_key: 'user_id'

  validates_presence_of :content

  after_create_commit { MessageBroadcastJob.perform_later(self) }

  def as_json
    super(include: [
      { user: { except: [:google_token, :google_refresh_token] }}
    ])
  end
end
